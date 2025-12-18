from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os

app = FastAPI()

origins = ["http://localhost:5173"]  
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TreeRequest(BaseModel):
    path: str
    depth: Optional[int] = None

def get_tree(path: str, max_depth: Optional[int] = None, current_depth=0):
    if max_depth is not None and current_depth >= max_depth:
        return []

    if not os.path.exists(path):
        return []

    tree = []
    try:
        for entry in os.scandir(path):
            tree.append(entry.name)
            if entry.is_dir():
                tree += [f"  {i}" for i in get_tree(entry.path, max_depth, current_depth + 1)]
    except PermissionError:
        tree.append("[Permission Denied]")
    return tree

@app.post("/api/tree")
def generate_tree(req: TreeRequest):
    if not os.path.exists(req.path):
        raise HTTPException(status_code=400, detail="Path does not exist")
    tree = get_tree(req.path, req.depth)
    return {"structure": tree}
