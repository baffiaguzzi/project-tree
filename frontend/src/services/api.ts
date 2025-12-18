import type { TreeRequest, TreeResponse } from "../types/tree"

const API_URL = "http://127.0.0.1:8000/api/tree"

export async function generateTree(payload: TreeRequest): Promise<TreeResponse> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to generate tree")
  }

  return res.json()
}
