import type { NbfcSectorPoint, RepoRateEvent, SystemAssetQualityPoint, SystemCreditDepositPoint } from '../types'

// System-wide RBI/industry aggregates -- the macro backdrop every company-level
// trigger and trend should be read against. Sourced via web search of RBI releases
// and business-news coverage of them (RBI's own site is not directly reachable from
// this environment). Newest first.

export const repoRateHistory: RepoRateEvent[] = [
  { date: 'Jun-2026', rate: 5.25, action: 'Hold', changeBps: 0, source: 'RBI MPC resolution, June 2026' },
  { date: 'Feb-2026', rate: 5.25, action: 'Hold', changeBps: 0, source: 'RBI MPC resolution, February 2026' },
  { date: 'Dec-2025', rate: 5.25, action: 'Cut', changeBps: -25, source: 'RBI MPC resolution, December 2025 (cut from 5.50%)' },
  { date: 'Apr-2025', rate: 6.00, action: 'Cut', changeBps: -25, source: 'RBI MPC resolution, April 2025 (cut from 6.25%)' },
  { date: 'Feb-2025', rate: 6.25, action: 'Cut', changeBps: -25, source: 'RBI MPC resolution, February 2025 (cut from 6.50%)' },
]

// Note: RBI/press coverage states a cumulative 125 bps of cuts since Feb-2025 to
// reach 5.25% by Dec-2025, but only 75 bps of that is individually confirmed above
// (Feb-2025, Apr-2025, Dec-2025). The remaining ~50 bps was cut across one or more
// mid-2025 MPC meetings (likely Jun/Aug 2025) not individually confirmed in sources
// checked -- flagged here rather than guessed at.

export const systemCreditDeposit: SystemCreditDepositPoint[] = [
  {
    asOf: '27-Jun-2026',
    creditGrowthYoy: 18.6,
    depositGrowthYoy: null,
    note: 'Credit growth at a 2-year high; ~₹7 trillion deposits mobilised in the fortnight; credit-deposit growth gap remained above 500 bps',
    source: 'Business Standard, RBI fortnightly data',
  },
  {
    asOf: '31-Mar-2026 (FY26 end)',
    creditGrowthYoy: 16.0,
    depositGrowthYoy: 13.4,
    note: 'Credit ₹213.6 lakh Cr, Deposits ₹262.3 lakh Cr',
    source: 'ICICIdirect, RBI data',
  },
  {
    asOf: '30-Jan-2026',
    creditGrowthYoy: 13.0,
    depositGrowthYoy: 10.6,
    note: 'Seasonal moderation — Jan 2026 fortnight saw credit contract ₹1.88 trillion, deposits contract ₹3.57 trillion',
    source: 'Business Standard, RBI fortnightly data',
  },
  {
    asOf: '31-Dec-2025',
    creditGrowthYoy: 14.5,
    depositGrowthYoy: 12.7,
    source: 'RBI fortnightly data (aggregated coverage)',
  },
]

export const systemAssetQuality: SystemAssetQualityPoint[] = [
  {
    asOf: '31-Mar-2026',
    gnpa: 1.8,
    nnpa: 0.5,
    crar: 17.7,
    cet1: 15.3,
    source: 'RBI Financial Stability Report, June 2026 edition. RBI projects GNPA edging up to 1.9% by Mar-2028 under baseline scenario',
  },
]

export const nbfcSectorAggregates: NbfcSectorPoint[] = [
  {
    asOf: 'FY26 (est.)',
    aumRsLakhCr: 50,
    creditGrowthGuidance: '15-17% (FY26-FY28, CRISIL MI&A)',
    microfinanceGnpa: 3.6,
    source: 'CRISIL MI&A / CareEdge, aggregated industry coverage (microfinance GNPA is a projection for FY26-end, vs 5.4% sector average at start of FY26)',
  },
]
