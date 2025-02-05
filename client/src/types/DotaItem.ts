export interface DotaItem {
  id: number
  img: string
  dname: string
  qual: string
  cost: number
  behavior: string
  notes?: string
  mc?: boolean
  hc?: boolean
  cd?: number
  lore?: string
  components?: string[] | null
  created?: boolean
  charges?: boolean
  abilities?: Ability[]
  hint: unknown[]
  attrib: Attribute[]
}

interface Ability {
  type: string
  title: string
  description: string
}

interface Attribute {
  key: string
  value: string
  display?: string
}
