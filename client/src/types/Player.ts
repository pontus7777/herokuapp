import type { Hero } from './Hero'

export interface Player {
  id: number
  name: string
  rank: string
  img: string
  profile: string
  mmr_estimate: number
  hero: Hero | null
}
