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
    asOf: '15-Jun-2026',
    creditGrowthYoy: 18.6,
    depositGrowthYoy: null,
    cdRatio: 83.38,
    note: 'Credit growth at a 2-year high (fortnight ended 27-Jun-2026); ~₹7 trillion deposits mobilised in the fortnight; credit-deposit growth gap remained above 500 bps. CD ratio is the closest dated reading (mid-Jun), up from 82.74% on 31-May-2026',
    source: 'Business Standard / CEIC, RBI fortnightly & biweekly data',
  },
  {
    asOf: '31-Mar-2026 (FY26 end)',
    creditGrowthYoy: 16.0,
    depositGrowthYoy: 13.4,
    cdRatio: null,
    note: 'Credit ₹213.6 lakh Cr, Deposits ₹262.3 lakh Cr. No CD ratio reading found within ~6 weeks of this date',
    source: 'ICICIdirect, RBI data',
  },
  {
    asOf: '30-Jan-2026',
    creditGrowthYoy: 13.0,
    depositGrowthYoy: 10.6,
    cdRatio: 82.3,
    note: 'Seasonal moderation — Jan 2026 fortnight saw credit contract ₹1.88 trillion, deposits contract ₹3.57 trillion. CD ratio "including merger impact", third consecutive high at the time',
    source: 'Business Standard, RBI fortnightly data',
  },
  {
    asOf: '31-Dec-2025',
    creditGrowthYoy: 14.5,
    depositGrowthYoy: 12.7,
    cdRatio: 81.75,
    note: 'CD ratio was an all-time high as of this date',
    source: 'RBI fortnightly data; CareEdge (aggregated coverage)',
  },
  {
    asOf: '30-Jun-2025',
    creditGrowthYoy: null,
    depositGrowthYoy: null,
    cdRatio: 78.9,
    note: 'CD ratio eased from the Mar-2025 peak as deposit growth held ~10% YoY while credit growth slowed',
    source: 'Business Standard, RBI data',
  },
  {
    asOf: '31-Mar-2025',
    creditGrowthYoy: null,
    depositGrowthYoy: null,
    cdRatio: 80.8,
    note: 'Highest CD ratio in 61 years at the time',
    source: 'Business Standard, RBI data',
  },
]

// RBI's Financial Stability Report is published semi-annually (data as of end-March
// and end-September), so this is genuinely the finest cadence GNPA/NNPA/CRAR/CET1 are
// disclosed at -- not a limitation of this dashboard. CASA and CD ratio are disclosed
// more frequently elsewhere (RBI weekly statistical supplement); where a reading isn't
// available for the exact FSR date, the nearest dated reading found is used and its
// actual date is carried in `casaAsOf`/`cdRatioAsOf` rather than mislabeled.
export const systemAssetQuality: SystemAssetQualityPoint[] = [
  {
    asOf: '31-Mar-2026',
    gnpa: 1.8,
    nnpa: 0.5,
    crar: 17.7,
    cet1: 15.3,
    casa: null,
    casaAsOf: null,
    cdRatio: 83.38,
    cdRatioAsOf: 'mid-Jun-2026',
    source: 'RBI Financial Stability Report, June 2026 edition. RBI projects GNPA edging up to 1.9% by Mar-2028 under baseline scenario. CASA not found for a date close to Mar-2026 — system CASA has been on a sustained multi-year decline (43.7% FY22 → 38.9% FY25)',
  },
  {
    asOf: '30-Sep-2025',
    gnpa: 2.1,
    nnpa: 0.5,
    crar: 17.2,
    cet1: 14.8,
    casa: null,
    casaAsOf: null,
    cdRatio: null,
    cdRatioAsOf: null,
    source: 'RBI Financial Stability Report, December 2025 edition. CRAR/CET1 shown are aggregate SCB; PSU banks CRAR 16.0%, private banks CRAR 18.1% separately. No CD ratio or CASA reading found within ~6 weeks of this date (nearest are Jun-2025 78.9% and Dec-2025 81.75% CD ratio, both too far to attribute here)',
  },
  {
    asOf: '31-Mar-2025',
    gnpa: 2.2,
    nnpa: 0.5,
    crar: 17.36,
    cet1: 14.81,
    casa: 38.9,
    casaAsOf: '31-Mar-2025 (FY25)',
    cdRatio: 80.8,
    cdRatioAsOf: '31-Mar-2025',
    source: 'RBI Financial Stability Report, June 2025 edition (one source separately cited GNPA at 2.31%, described as a 20-year low — basis difference not resolved). CASA is SBI Research’s FY25 system estimate, down from 43.7% in FY22',
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
