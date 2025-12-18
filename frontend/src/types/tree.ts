export interface TreeRequest {
  path: string
  depth?: number
}

export interface TreeResponse {
  structure: string[]
}
