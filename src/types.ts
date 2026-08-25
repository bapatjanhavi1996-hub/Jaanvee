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
  | 'Realization / Pricing'
  | 'Raw Material Costs'
  | 'Capacity Utilization & Expansion'
  | 'Demand Outlook'
  | 'Trade Policy Impact'
  | 'Balance Sheet / Leverage'

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
  cdRatio: number | null
  note?: string
  source: string
}

export interface SystemAssetQualityPoint {
  asOf: string
  gnpa: number | null
  nnpa: number | null
  crar: number | null
  cet1: number | null
  casa: number | null
  casaAsOf: string | null
  cdRatio: number | null
  cdRatioAsOf: string | null
  source: string
}

export interface NbfcSectorPoint {
  asOf: string
  aumRsLakhCr: number | null
  creditGrowthGuidance: string | null
  microfinanceGnpa: number | null
  source: string
}

export interface SteelMetricQuarter {
  period: string
  salesVolumeTonnes: number | null
  realizationPerTonne: number | null
  ebitdaPerTonne: number | null
  capacityUtilization: number | null
  netDebtToEbitda: number | null
  source: string
}

export interface SteelProductionPoint {
  month: string
  crudeSteelProductionMt: number | null
  productionGrowthYoyPct: number | null
  source: string
}

// Unlike production, these have no clean weekly/monthly benchmark index publicly
// available (SteelMint/BigMint/Kallanish are paywalled) -- each field is a
// separately-sourced spot reading, so each carries its own as-of date rather
// than sharing one across the row.
export interface SteelPriceBenchmarks {
  domesticHrcPriceRange: string | null
  domesticHrcAsOf: string | null
  domesticHrcNote: string | null
  domesticRebarPriceRange: string | null
  domesticRebarAsOf: string | null
  domesticRebarNote: string | null
  chinaHrcFobUsdTonne: number | null
  chinaHrcFobAsOf: string | null
  ironOreDomesticRsTonne: number | null
  ironOreAsOf: string | null
  ironOreNote: string | null
  cokingCoalUsdTonne: number | null
  cokingCoalAsOf: string | null
  capacityUtilizationPct: number | null
  capacityUtilizationNote: string | null
}

export interface TradePolicyEvent {
  date: string
  measure: string
  product: string
  status: 'Imposed' | 'Extended' | 'Under review' | 'Expired' | 'Recommended'
  detail: string
  source: string
}

// Company-level, per-quarter cement operating metrics -- capacity/production
// are asked for explicitly (unlike steel, where only sales/realization/EBITDA
// per tonne were tracked) because the entire cement thesis right now is a
// capacity-vs-demand reconciliation, so capacityMtpa and productionMt need to
// be visible quarter by quarter per company, not just as a one-time snapshot.
export interface CementMetricQuarter {
  period: string
  capacityMtpa: number | null
  productionMt: number | null
  capacityUtilization: number | null
  salesVolumeTonnes: number | null
  realizationPerTonne: number | null
  productionCostPerTonne: number | null
  ebitdaPerTonne: number | null
  netDebtToEbitda: number | null
  source: string
}

export interface CementCapacityTarget {
  companyId: string
  company: string
  capacityNowMtpa: number
  capacityAsOf: string
  targetMtpa: number
  targetDate: string
  namedAcquisitions: string
  organicComponent: string
  note?: string
}

// The India-level capacity/demand/supply-gap reconciliation. This is the
// authoritative, trusted figure for the sector (CRISIL/CareEdge/Axis/Jefferies)
// -- company-level targets in CementCapacityTarget sum to more than the
// national addition because they double-count acquired capacity already
// inside the installed base. Keep this table as the single source of truth
// when updating the sector over time; don't let it drift by summing company
// targets instead.
export interface NationalCapacityReconciliationRow {
  metric: string
  value: string
  note?: string
}

export interface CementPriceActionPoint {
  companyId: string
  company: string
  pctChange: number
  asOf: string
}
