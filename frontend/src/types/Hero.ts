export interface Hero {
  id: number // Unique identifier for the hero
  name: string // Internal name of the hero (e.g., npc_dota_hero_antimage)
  localized_name: string // Localized (display) name of the hero (e.g., Anti-Mage)
  img: string // Path to the hero's image
  primary_attr: string // Primary attribute of the hero (Agility, Strength, Intelligence)
  attack_type: 'Melee' | 'Ranged' // Type of attack (Melee or Ranged)
  roles: string[] // Array of roles such as Carry, Escape, Nuker
  legs: number // The number of legs the hero has
}
