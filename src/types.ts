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
  isin: string
  sectorId: string
  subSectorId: string
  industryLabel: string
  marketCapCr: number
  latestPrice: number | null
  priceToBV: number | null
  ttmPE: number | null
  note?: string
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

export interface QuarterlyFinancial {
  period: string
  totalIncome: number
  operatingProfit: number | null
  pat: number | null
}

export interface BankMetricQuarter {
  period: string
  deposits: number | null
  advancesOrAum: number | null
  nim: number | null
  casa: number | null
  costOfFunds: number | null
  gnpa: number | null
  nnpa: number | null
  costToIncome: number | null
  source: string
}

export type CommentaryTheme =
  | 'Asset Quality'
  | 'Growth'
  | 'CASA / Funding Mix'
  | 'NIM / Margins'
  | 'Cost of Borrowings'
  | 'Opex Efficiency'

export interface ManagementCommentary {
  id: string
  companyId: string
  quarter: string
  theme: CommentaryTheme
  summary: string
  source: string
}

export interface RepoRateEvent {
  date: string
  rate: number
  action: 'Cut' | 'Hold' | 'Hike'
  changeBps: number
  source: string
}

export interface SystemCreditDepositPoint {
  asOf: string
  creditGrowthYoy: number | null
  depositGrowthYoy: number | null
  note?: string
  source: string
}

export interface SystemAssetQualityPoint {
  asOf: string
  gnpa: number | null
  nnpa: number | null
  crar: number | null
  cet1: number | null
  source: string
}

export interface NbfcSectorPoint {
  asOf: string
  aumRsLakhCr: number | null
  creditGrowthGuidance: string | null
  microfinanceGnpa: number | null
  source: string
}
