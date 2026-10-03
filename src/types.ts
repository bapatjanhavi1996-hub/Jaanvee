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
  // Set true when the market cap is borderline vs the ₹1,000 Cr threshold or
  // was not confirmed against a clean sourced print and should be re-checked
  // against live data (documented in README).
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
  // Broker / capital-market intermediary themes
  | 'Active Clients / Market Share'
  | 'Revenue Diversification'
  | 'Funding Book / MTF'
  | 'Regulatory Impact'
  | 'New Products / Platform'

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

// ============================ BROKERS ============================
// Company-level, per-quarter operating metrics for brokers / capital-market
// intermediaries. The generic QuarterlyFinancial table (total income / op
// profit / PAT) is the P&L trend layer shown for every company; this is the
// broker-specific operating layer. The whole sector thesis is a revenue-mix
// story -- transaction (broking) revenue is under structural regulatory
// pressure, so the fields that matter are the ones that show the pivot away
// from it: the active-client base (the land-grab), the margin-funding (MTF)
// book and interest income (the lending pivot), and interest income as a share
// of gross revenue (how far diversification has actually gone). Left null, not
// estimated, wherever a company doesn't disclose it (many smaller full-service
// names report nothing beyond the statutory P&L).
export interface BrokerMetricQuarter {
  period: string
  totalClientsMn: number | null // total registered clients, millions
  nseActiveClientsMn: number | null // NSE active clients (traded in last 12m), millions
  activeClientShare: number | null // % of the NSE active-client base
  grossBrokingRevenueCr: number | null // broking/transaction revenue only (₹ Cr)
  interestIncomeCr: number | null // interest/financing income, mainly MTF (₹ Cr)
  interestIncomeShare: number | null // interest income as % of gross revenue
  clientFundingBookCr: number | null // margin-trading-facility (MTF) / funding book (₹ Cr)
  source: string
}

// The active-client league table -- the single most-watched competitive metric
// in Indian broking. NSE publishes member-wise active clients monthly, so this
// is the cleanest public read on who is gaining and losing share. Includes the
// two unlisted giants (Zerodha, Upstox) because you cannot understand the
// listed names' share without them -- isListed flags what is actually
// investable.
export interface BrokerActiveClientRow {
  broker: string
  isListed: boolean
  ticker: string | null
  activeClientsMn: number | null
  sharePct: number | null
  yoyGrowthPct: number | null
  asOf: string
}

// Industry-wide backdrop rows (demat accounts, total active base, SIP flows,
// F&O turnover trend) -- the sector's macro layer, analogous to the RBI/steel
// aggregate tables. Each row carries its own as-of date and source because
// they come from different publishers (NSE, CDSL/NSDL, AMFI, SEBI) at
// different cadences.
export interface BrokerIndustryRow {
  metric: string
  value: string
  asOf: string
  source: string
  note?: string
}

// SEBI/exchange regulatory actions -- for brokers this is what trade-policy is
// to steel: the dominant exogenous driver of the sector thesis. The 2024-25
// derivatives + true-to-label package is the reason transaction revenue is
// under pressure industry-wide.
export interface BrokerRegulatoryEvent {
  date: string
  measure: string
  status: 'Effective' | 'Imposed' | 'Proposed' | 'Under review' | 'Eased'
  detail: string
  source: string
}
