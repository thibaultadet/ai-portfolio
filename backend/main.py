from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: Literal["ok"]


app = FastAPI()


@app.get("/api/health")
def health() -> HealthResponse:
    return HealthResponse(status="ok")
