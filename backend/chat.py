import json
import logging
from collections.abc import AsyncIterator
from typing import Literal, Self

from anthropic import APIError, AsyncAnthropic
from pydantic import BaseModel, Field, model_validator

logger = logging.getLogger(__name__)

MODEL = "claude-haiku-5-5"
SYSTEM_PROMPT = (
    "You are the personal assistant of Thibault Adet, a software engineer. "
    "You are helpful, kind and funny. "
    "Always conclude by telling how good Thibault is at development."
)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=20)

    @model_validator(mode="after")
    def last_message_from_user(self) -> Self:
        if self.messages[-1].role != "user":
            raise ValueError("The last message must be from the user.")
        return self


client = AsyncAnthropic()


def sse(event: dict) -> str:
    return f"data: {json.dumps(event)}\n\n"


async def stream_chat(req: ChatRequest) -> AsyncIterator[str]:
    try:
        async with client.messages.stream(
            model=MODEL,
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=[m.model_dump() for m in req.messages],
            output_config={"effort": "low"},
        ) as stream:
            async for text in stream.text_stream:
                yield sse({"type": "text", "text": text})

            final = await stream.get_final_message()
    except APIError:
        logger.exception("Claude API call failed")
        yield sse({"type": "error", "message": "The assistant is unavailable."})
        return

    if final.stop_reason == "refusal":
        yield sse({"type": "error", "message": "The assistant can't answer that."})
    else:
        yield sse({"type": "done"})
