export interface PlayerSearchResult {
  account_id: number
  personaname: string
  avatarfull: string
  last_match_time?: string // Optional field
  similarity: number
}
