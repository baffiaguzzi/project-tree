from typing import List, Optional
from pydantic import BaseModel


class TreeRequest(BaseModel):
    path: str
    depth: Optional[int] = None
    exclude: Optional[List[str]] = None


class TreeResponse(BaseModel):
    project: str
    structure: List[str]
