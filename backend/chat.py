import json
import logging
from collections.abc import AsyncIterator
from pathlib import Path
from typing import Literal, Self

from anthropic import APIError, AsyncAnthropic
from pydantic import BaseModel, Field, model_validator

logger = logging.getLogger(__name__)

MODEL = "claude-haiku-5-5"
KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"

INSTRUCTIONS = """\
Tu es l'assistant du portfolio de Thibault Adet, développeur full stack. \
Les visiteurs (recruteurs, clients, curieux) te posent des questions sur son parcours.

Comportement :
- <knowledge> est ta seule source : chaque fait, chiffre, compétence ou impact \
que tu cites en vient. Si l'information n'y est pas, dis que tu ne sais pas \
et propose de contacter Thibault sur LinkedIn.
- Stack ou compétence absente de <knowledge> : cite ce qu'il fait de proche, \
puis son envie d'apprendre avec une preuve de la section « Apprendre ».
- Rémunération, tarif ou autres coordonnées que LinkedIn et GitHub : \
renvoie vers LinkedIn.
- Hors sujet (autre chose que Thibault) : recentre poliment.
- Parle de Thibault à la troisième personne.
- Réponds dans la langue du visiteur.
- Sois bref : 2 à 5 phrases, une liste seulement si elle aide. Markdown autorisé.
- Liens : toujours en markdown, avec l'URL complète de <knowledge>, \
par exemple [LinkedIn](https://www.linkedin.com/in/thibault-adet).
- Ton factuel, sobre et modeste. Humour pince-sans-rire par petites touches : \
une pointe de temps en temps, les faits restent exacts.
- Ponctuation : virgules, deux-points, parenthèses.

Vocabulaire imposé :
- Beny : son titre est « Founding Engineer ». Beny s'est arrêté en novembre 2026 : \
parles-en au passé, avec ses seuls résultats de <knowledge>.
- Son rôle technique : « de bout en bout » ou « toute la partie technique ».
- Software factory : « 7 agents reviewers ».
"""


def load_knowledge() -> str:
    docs = (
        f'<document name="{p.name}">\n{p.read_text()}</document>'
        for p in sorted(KNOWLEDGE_DIR.glob("*.md"))
    )
    return "<knowledge>\n" + "\n".join(docs) + "\n</knowledge>"


SYSTEM = [
    {"type": "text", "text": INSTRUCTIONS},
    {
        "type": "text",
        "text": load_knowledge(),
        "cache_control": {"type": "ephemeral"},
    },
]


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=20)

    @model_validator(mode="after")
    def last_message_from_user(self) -> Self:
        if self.messages[-1].role != "user":
            raise ValueError("Le dernier message doit venir du visiteur.")
        return self


client = AsyncAnthropic()


def sse(event: dict) -> str:
    return f"data: {json.dumps(event)}\n\n"


async def stream_chat(req: ChatRequest) -> AsyncIterator[str]:
    try:
        async with client.messages.stream(
            model=MODEL,
            max_tokens=1024,
            system=SYSTEM,
            messages=[m.model_dump() for m in req.messages],
            output_config={"effort": "low"},
        ) as stream:
            async for text in stream.text_stream:
                yield sse({"type": "text", "text": text})

            final = await stream.get_final_message()
    except APIError:
        logger.exception("Claude API call failed")
        yield sse({"type": "error", "message": "L’assistant est indisponible."})
        return

    usage = final.usage
    logger.info(
        "tokens: input=%s cache_read=%s cache_write=%s output=%s",
        usage.input_tokens,
        usage.cache_read_input_tokens,
        usage.cache_creation_input_tokens,
        usage.output_tokens,
    )

    if final.stop_reason == "refusal":
        yield sse(
            {
                "type": "error",
                "message": "L’assistant ne peut pas répondre à cette question.",
            }
        )
    else:
        yield sse({"type": "done"})
