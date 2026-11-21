from typing import Literal

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from chat import ChatRequest, stream_chat


class HealthResponse(BaseModel):
    status: Literal["ok"]


app = FastAPI()


@app.get("/api/health")
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.post("/api/chat")
async def chat(req: ChatRequest) -> StreamingResponse:
    return StreamingResponse(stream_chat(req), media_type="text/event-stream")
