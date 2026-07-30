export type McapTier = 'Large' | 'Mid' | 'Small'

export interface SubSector {
  id: string
  name: string
}

export interface Sector {
  id: string
  name: string
  shortDescription: string
  subSectors: SubSector[]
  status: 'active' | 'planned'
}

export interface Company {
  id: string
  name: string
  ticker: string
  sectorId: string
  subSectorId: string
  mcapTier: McapTier
  verifyMcap?: boolean
}

export type TriggerFrequency =
  | 'Continuous / Real-time'
  | 'Daily'
  | 'Monthly'
  | 'Quarterly'
  | 'Bi-monthly (RBI MPC)'
  | 'Event-driven'
  | 'Annual'

export interface Trigger {
  id: string
  sectorId: string
  category: string
  name: string
  description: string
  whyItMatters: string
  watchFor: string[]
  typicalSource: string
  frequency: TriggerFrequency
}

export type TriggerImpact = 'Positive' | 'Negative' | 'Neutral' | 'Watch'

export interface TrackingLogEntry {
  id: string
  date: string
  sectorId: string
  triggerId: string
  companyIds: string[]
  headline: string
  detail: string
  source: string
  impact: TriggerImpact
}
