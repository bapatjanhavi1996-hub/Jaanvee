import type { SeriesPoint } from '../components/MiniLineChart'

// World/major-country crude steel production and capacity, for context
// against the India-only figures elsewhere in this dashboard. Research date
// 2026-08-03. Granularity follows whatever each source actually publishes:
// worldsteel's production releases are monthly (used as-is below); capacity
// is only published annually at best, so it is presented as a reference
// panel, not a forced monthly/quarterly series.

const months = [
  'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025', 'Oct-2025', 'Nov-2025', 'Dec-2025',
  'Jan-2026', 'Feb-2026', 'Mar-2026', 'Apr-2026', 'May-2026', 'Jun-2026',
]

const worldValues = [151.4, 150.1, 145.3, 141.8, 143.3, 140.1, 139.6, 147.3, 141.8, 159.9, 153.4, 157.9, 155.7]
const chinaValues = [83.2, 79.7, 77.4, 73.5, 72.0, 69.9, 68.2, 75.3, 76.1, 87.0, 83.6, 84.4, 83.7]

export const worldSteelProductionMonthly: SeriesPoint[] = months.map((label, i) => ({ label, value: worldValues[i] }))
export const chinaSteelProductionMonthly: SeriesPoint[] = months.map((label, i) => ({ label, value: chinaValues[i] }))

export const worldProductionSource =
  'worldsteel.org monthly "crude steel production" press releases (69-70 country reporting panel; the exact panel size shifts slightly month to month as a few countries occasionally miss the reporting deadline -- not a data error). 2025 full-year world total: 1,849.4 Mt. China ~52% of world total in 2025 (worldsteel / World Steel in Figures 2026).'

export interface OtherProducerReading {
  country: string
  month: string
  productionMt: number
  yoyPct: number
  note?: string
}

// Most major producers only had one or two months surface via search in this
// pass -- shown here as the latest available single-month reading rather
// than a forced (and mostly empty) chart. A fuller country x month matrix
// exists in worldsteel's monthly PDF releases but wasn't extractable this
// round (direct PDF fetch blocked in this environment).
export const otherProducersLatest: OtherProducerReading[] = [
  { country: 'Japan', month: 'Jun-2026', productionMt: 6.8, yoyPct: 1.3 },
  { country: 'United States', month: 'Jun-2026', productionMt: 7.2, yoyPct: 3.5 },
  { country: 'Russia', month: 'Jun-2026', productionMt: 5.6, yoyPct: -3.4, note: 'worldsteel labels Russia\'s monthly figure "estimated"' },
  { country: 'South Korea', month: 'Jun-2026', productionMt: 5.3, yoyPct: -0.9 },
  { country: 'Germany', month: 'Jun-2026', productionMt: 2.9, yoyPct: 9.5 },
  { country: 'Turkey', month: 'Jun-2026', productionMt: 3.3, yoyPct: 14.7 },
  { country: 'Brazil', month: 'Jun-2026', productionMt: 2.8, yoyPct: 0.1 },
  { country: 'Vietnam', month: 'Jun-2026', productionMt: 2.6, yoyPct: 27.5, note: 'Displaced Iran from the top 10 producers by this month' },
  { country: 'Iran', month: 'Jan-2026', productionMt: 2.6, yoyPct: 15.1, note: 'Older reading -- no more recent month surfaced; Iran had dropped out of the top 10 by Jun-2026 (see Vietnam)' },
]

export interface CapacityFact {
  label: string
  value: string
  asOf: string
  source: string
}

// Capacity is a much lower-frequency, more contested figure than production
// -- these are the real, sourced numbers, including two genuine conflicts
// that couldn't be resolved from what's publicly retrievable, flagged rather
// than picked.
export const globalCapacityFacts: CapacityFact[] = [
  {
    label: 'World crude steelmaking capacity',
    value: '2,482 Mt',
    asOf: '2024',
    source: 'OECD Steel Committee, 96th Session Chair\'s Statement, Nov-2024',
  },
  {
    label: 'World crude steelmaking capacity (later vintage)',
    value: '~2,445 Mt',
    asOf: '2025',
    source:
      'OECD Steel Outlook 2026 (Jun-2026), which simultaneously describes 2025 as capacity\'s "4th consecutive year of increase" -- apparently inconsistent with a *lower* figure than the 2024 estimate above. Likely an OECD secretariat data revision between publications rather than an actual capacity decline; not resolved here, both figures shown.',
  },
  {
    label: 'Global steel excess capacity',
    value: '640 Mt (2025), projected 745 Mt by 2028',
    asOf: '2025 / 2028 projection',
    source: 'OECD Steel Outlook 2026',
  },
  {
    label: 'China share of world capacity',
    value: '47% (≈1,167 Mt, arithmetic from the OECD figures above -- not an independently published China number)',
    asOf: '2024',
    source: 'OECD DSTI/SC(2024)3/FINAL',
  },
  {
    label: 'India share of world capacity (OECD)',
    value: '6% (≈149 Mt, same arithmetic caveat)',
    asOf: '2024',
    source:
      'OECD DSTI/SC(2024)3/FINAL. This sits well below India\'s own government-reported capacity (200-205 Mt, see below) -- likely a methodology difference between OECD\'s capacity concept and India\'s nameplate/installed-capacity figure, not resolved here.',
  },
  {
    label: 'India crude steel capacity (government-reported)',
    value: '200.3 Mt (also cited as 205 Mt elsewhere)',
    asOf: 'FY2024-25',
    source: 'India Ministry of Steel, "Overview of Steel Sector"; industry press citing a 10% YoY rise',
  },
  {
    label: 'India capacity target',
    value: '300 Mt',
    asOf: 'by FY2030-31',
    source: 'Ministry of Steel Secretary statement, Feb-2026',
  },
]
