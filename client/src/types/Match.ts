import type { Team } from './Team'

export interface Match {
  id: number
  date: string
  team1: Team
  team2: Team
  result: 'win' | 'loss' | 'draw'
}
