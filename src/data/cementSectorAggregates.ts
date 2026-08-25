import type {
  NationalCapacityReconciliationRow,
  CementCapacityTarget,
  CementPriceActionPoint,
} from '../types'

// Cement sector diagnostic data, transcribed from the 25-Aug-2026 in-house
// sector research note (itself citing CRISIL Ratings, CareEdge, Axis
// Securities and Jefferies). Status: documented, not actionable -- see the
// method note below and the sector's trigger calendar entry.
//
// ============================================================================
// THE NATIONAL CAPACITY RECONCILIATION BELOW IS THE SINGLE SOURCE OF TRUTH.
// Company-level targets in cementCapacityTargets sum to well more than the
// national capacity addition here because they include capacity ALREADY
// INSIDE the 668 MTPA base being acquired from other listed players (Kesoram,
// India Cements, Penna, Orient, Sanghi, Jaiprakash) -- ownership transfer, not
// new tonnes. When updating this file for a future quarter, update the row
// values below directly; do NOT derive the national gap by summing company
// targets, and do not let the two tables silently drift apart.
// ============================================================================
export const nationalCapacityReconciliation: NationalCapacityReconciliationRow[] = [
  { metric: 'Total installed capacity', value: '668 MTPA', note: 'As of Mar-2025' },
  { metric: 'Actual production, FY26', value: '420-490 MT', note: 'Range reflects source disagreement, not a typo' },
  { metric: 'Utilisation, FY25', value: '~70%', note: 'Decadal average ~65%' },
  { metric: 'New capacity, FY26-28 (largely brownfield)', value: '160-170 MT', note: 'The real national addition -- the figure to trust' },
  { metric: "Prior three fiscals' additions", value: '95 MT' },
  { metric: 'Of which FY26 alone', value: '70-75 MT' },
  { metric: 'Total capex, FY26-28', value: 'Rs 1.2 lakh crore', note: '~50% above the prior 3 years' },
  { metric: 'Incremental demand p.a.', value: '30-40 MT' },
  { metric: 'Demand growth over 3 years', value: '90-120 MT' },
  { metric: 'SUPPLY-DEMAND GAP', value: '~50-70 MT surplus', note: 'At 30-40 MT/yr demand growth, absorption runs to roughly FY29 -- no dateable event fixes this sooner' },
]

export const nationalCapacitySource =
  'CRISIL Ratings (covers 17 producers, ~85% of installed capacity), CareEdge, Axis Securities, Jefferies -- synthesized in-house sector research, 25-Aug-2026.'

// Company targets as disclosed by each company (PPTs/concalls/press releases)
// -- do not sum these to re-derive a national figure, see warning above.
export const cementCapacityTargets: CementCapacityTarget[] = [
  {
    companyId: 'ultratech-cement-ltd',
    company: 'UltraTech Cement',
    capacityNowMtpa: 205.5,
    capacityAsOf: 'Jun-2026',
    targetMtpa: 242.5,
    targetDate: 'FY28-end (200 MTPA already reached FY27-28; interim 212.7 MTPA FY27-end)',
    namedAcquisitions: 'Kesoram Industries (Feb-2025), India Cements',
    organicComponent: '+15.9 MTPA FY27, +29.8 MTPA FY28; Rs 32,400 Cr capex',
  },
  {
    companyId: 'ambuja-cements-ltd',
    company: 'Ambuja Cements (Adani)',
    capacityNowMtpa: 109,
    capacityAsOf: 'Jun-2026',
    targetMtpa: 155,
    targetDate: 'FY28 (upper end; 119 MTPA FY27-end interim, 140-155 MTPA FY28)',
    namedAcquisitions: 'Penna Cement, Orient Cement, Sanghi Industries; base inherited from Holcim',
    organicComponent: 'FY28 target raised by 15 MTPA of organic additions at an estimated ~$48/tonne',
  },
  {
    companyId: 'dalmia-bharat-ltd',
    company: 'Dalmia Bharat',
    capacityNowMtpa: 54.7,
    capacityAsOf: 'Jun-2026',
    targetMtpa: 75,
    targetDate: 'FY28 (interim 66.7 MTPA by Q3 FY28)',
    namedAcquisitions: 'Jaiprakash Associates cement undertaking (completed, +5.2 MTPA)',
    organicComponent: 'Not separately disclosed',
  },
  {
    companyId: 'shree-cement-ltd',
    company: 'Shree Cement',
    capacityNowMtpa: 65.8,
    capacityAsOf: 'current',
    targetMtpa: 80,
    targetDate: 'FY28-end (interim 68.8 MTPA FY26-end, 72 MTPA FY27)',
    namedAcquisitions: '"Balanced mix" -- not itemised in sources checked',
    organicComponent: 'Rajasthan, Uttar Pradesh, Karnataka brownfield/greenfield lines',
  },
  {
    companyId: 'ramco-cements-ltd',
    company: 'The Ramco Cements',
    capacityNowMtpa: 26,
    capacityAsOf: 'approximate, not independently confirmed this pass',
    targetMtpa: 31,
    targetDate: 'FY27',
    namedAcquisitions: 'None named',
    organicComponent: 'Rs 1,403 Cr ongoing capex; debottlenecking plus brownfield',
  },
  {
    companyId: 'nuvoco-vistas-corp-ltd',
    company: 'Nuvoco Vistas',
    capacityNowMtpa: 25,
    capacityAsOf: 'Q2 FY26 (last confirmed reading)',
    targetMtpa: 35,
    targetDate: 'FY27-end',
    namedAcquisitions: 'None named',
    organicComponent: 'Not separately disclosed',
  },
]

// JSW Cement was privately held (pre-IPO) at the research date, so it is
// excluded from cementCompanies.ts (no Rs 1,000 Cr *listed* market cap to
// screen on) -- kept here as a reference row since it competes directly with
// the listed majors above for the same acquisition targets (Penna, Sanghi,
// etc.) and its capacity math is part of the same national reconciliation.
export const jswCementReference: CementCapacityTarget = {
  companyId: 'jsw-cement-unlisted',
  company: 'JSW Cement (unlisted at research date; IPO-funded)',
  capacityNowMtpa: 20,
  capacityAsOf: 'implied, not independently confirmed this pass',
  targetMtpa: 60,
  targetDate: 'Not dated in sources checked',
  namedAcquisitions: '"Organic and acquisitions", unspecified mix',
  organicComponent: 'Rs 3,600 Cr IPO-funded capex',
}

export const cementCapacityTargetsCaveat =
  'Company targets above sum to far more than the 160-170 MT national addition in nationalCapacityReconciliation because they include acquired capacity already inside the 668 MTPA installed base -- trust the national CRISIL figure; treat acquisitions (Kesoram, India Cements, Penna, Orient, Sanghi, Jaiprakash) as ownership transfer, not new tonnes.'

// The 24-Aug-2026 sector-wide price rout that prompted this diagnostic --
// seventeen of eighteen names down together, only Mangalam breaking the
// pattern. Magnitudes are as reported in the source research note; treat
// large moves (e.g. Orient -46%) as this specific report's framing of the
// move (which may span more than a single session) rather than assume a
// single-day circuit-breaker event.
export const cementPriceAction: CementPriceActionPoint[] = [
  { companyId: 'orient-cement-ltd', company: 'Orient Cement', pctChange: -46, asOf: '24-Aug-2026' },
  { companyId: 'jk-lakshmi-cement-ltd', company: 'JK Lakshmi Cement', pctChange: -40, asOf: '24-Aug-2026' },
  { companyId: 'birla-corporation-ltd', company: 'Birla Corporation', pctChange: -32, asOf: '24-Aug-2026' },
  { companyId: 'ambuja-cements-ltd', company: 'Ambuja Cements', pctChange: -32, asOf: '24-Aug-2026' },
  { companyId: 'sagar-cements-ltd', company: 'Sagar Cements', pctChange: -32, asOf: '24-Aug-2026' },
  { companyId: 'prism-johnson-ltd', company: 'Prism Johnson', pctChange: -29, asOf: '24-Aug-2026' },
  { companyId: 'acc-ltd', company: 'ACC', pctChange: -28, asOf: '24-Aug-2026' },
  { companyId: 'nuvoco-vistas-corp-ltd', company: 'Nuvoco Vistas', pctChange: -24, asOf: '24-Aug-2026' },
  { companyId: 'heidelbergcement-india-ltd', company: 'HeidelbergCement India', pctChange: -24, asOf: '24-Aug-2026' },
  { companyId: 'jk-cement-ltd', company: 'JK Cement', pctChange: -22, asOf: '24-Aug-2026' },
  { companyId: 'shree-cement-ltd', company: 'Shree Cement', pctChange: -21, asOf: '24-Aug-2026' },
  { companyId: 'ramco-cements-ltd', company: 'Ramco Cements', pctChange: -21, asOf: '24-Aug-2026' },
  { companyId: 'star-cement-ltd', company: 'Star Cement', pctChange: -20, asOf: '24-Aug-2026' },
  { companyId: 'dalmia-bharat-ltd', company: 'Dalmia Bharat', pctChange: -16, asOf: '24-Aug-2026' },
  { companyId: 'shree-digvijay-cement-ltd', company: 'Shree Digvijay Cement', pctChange: -14, asOf: '24-Aug-2026' },
  { companyId: 'kcp-ltd', company: 'KCP', pctChange: -13, asOf: '24-Aug-2026' },
  { companyId: 'ultratech-cement-ltd', company: 'UltraTech Cement', pctChange: -5, asOf: '24-Aug-2026' },
  { companyId: 'mangalam-cement-ltd', company: 'Mangalam Cement', pctChange: 52, asOf: '24-Aug-2026' },
]

export interface CementDiagnosticMetric {
  metric: string
  value: string
}

export const cementQ1Fy27Diagnostic: CementDiagnosticMetric[] = [
  { metric: 'Volumes', value: '+8%' },
  { metric: 'Blended realisation', value: 'Rs 5,700/tonne, +5% QoQ' },
  { metric: 'Production cost/tonne', value: '+11% QoQ, +5% YoY' },
  { metric: 'EBITDA/tonne', value: 'Rs 1,005, -7% QoQ, -16% YoY' },
  { metric: 'Capacity utilisation (pan-India)', value: '65-70% (optimal 80-85%)' },
]

export const cementQ1Fy27Note =
  'Volumes fine, prices up, margins still down -- not a demand problem, not a valuation de-rating. A supply glut. Ambuja PAT -33.6% YoY, -68.5% QoQ. Jefferies cut sector coverage EBITDA ~2%, steeper 6-9% for Ambuja, Ramco and JSW Cement specifically.'

export const cementCycleFinding =
  'Consolidation did not create pricing discipline -- it triggered a capacity arms race. Jefferies: the consolidation theme is largely over; focus shifts back to regional demand-supply. Central-region pricing is weakest precisely because of new-player ramp-up plus Dalmia scaling the acquired Jaiprakash assets. Critically, the additions are genuinely new brownfield capacity, not reactivated latent capacity -- latent capacity can be idled again, but new lines with Rs 1.2 lakh crore sunk into them will run. The industry over-built against its own optimism after three years of 9.5% demand growth. Analysts expect only a 1.5-2% price rise FY27-28; CareEdge says sustained price hikes need 70-75% utilisation, unlikely pan-India through the capacity wave.'

export const cementWatchItems: string[] = [
  'Quarterly EBITDA/tonne across the cluster -- Rs 1,005/tonne is the current floor reference',
  'Pan-India utilisation crossing 70-75%',
  'Petcoke prices (moderated slightly in Jun-2026; further relief if West Asia tensions ease)',
  'Any capex deferral announcements -- the first real sign the cycle is turning',
]

export const cementTrapFlag =
  'India Cements: Q1 FY27 profit rebound to Rs 26.85 Cr from a year-ago loss, but on a 158x PE vs ~34x industry, ROE 0.79%, five-year sales growth -0.11%, EBIT growth -29%. An optical recovery on a collapsed base, not a real trough signal.'
