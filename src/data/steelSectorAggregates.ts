import type { SteelProductionPoint, SteelPriceBenchmarks, TradePolicyEvent } from '../types'

// Unlike RBI banking data, Indian steel pricing has no single free authoritative
// benchmark index -- SteelMint/BigMint/Kallanish are the industry-standard
// sources and are paywalled. Figures below are triangulated from public
// government releases (PIB, worldsteel, DGTR) plus secondary trade press;
// research date 2026-08-02. Where a field is a directional range from a
// non-benchmark source rather than a precise index print, that is called out
// explicitly rather than presented as a hard number.

export const steelProduction: SteelProductionPoint[] = [
  {
    month: 'Jun-2026',
    crudeSteelProductionMt: 14.1,
    productionGrowthYoyPct: 4.5,
    source: 'worldsteel.org, "June 2026 crude steel production" press release (India #2 global producer behind China)',
  },
  {
    month: 'May-2026',
    crudeSteelProductionMt: 14.21,
    productionGrowthYoyPct: 2.9,
    source: 'worldsteel.org monthly crude steel production data',
  },
  {
    month: 'Apr-2026',
    crudeSteelProductionMt: 14.09,
    productionGrowthYoyPct: 5.8,
    source: 'PIB (Press Information Bureau, Govt of India), "Indian Steel Sector Maintains Growth Momentum in April 2026" release, 5-May-2026',
  },
]

export const steelH1Fy26ProductionNote =
  'H1 2026 (Jan-Jun) cumulative crude steel production: 87 million tonnes, +7.1% YoY (worldsteel) -- a different metric/period than the monthly figures above, not in conflict with them.'

export const steelPriceBenchmarks: SteelPriceBenchmarks = {
  domesticHrcPriceRange: '₹52,000–58,000/tonne',
  domesticHrcAsOf: 'late Jun-2026',
  domesticHrcNote:
    'Commercial retail listing (OfBusiness), not a benchmark index -- directional only. HR Coil prices rose ~6.3% MoM in Apr-2026 per PIB, i.e. an uptrend through Q1-Q2 2026 following the safeguard duty (see Trade Policy below).',
  domesticRebarPriceRange: '₹60,000–66,000/tonne',
  domesticRebarAsOf: 'Jul-2026',
  domesticRebarNote:
    'TMT Bar 12mm Fe500D, 50-city tracker (InfraLens), directional. Rebar lagged HRC\'s recovery -- flat-to-declining through late 2025/early 2026, only turned positive YoY (+3%) in Apr-2026.',
  chinaHrcFobUsdTonne: 485,
  chinaHrcFobAsOf: '24-Jul-2026',
  ironOreDomesticRsTonne: 4168,
  ironOreAsOf: 'May-2026',
  ironOreNote:
    'Fe 58-60% fines, IBM (Indian Bureau of Mines) average sale price via CEIC. IBM\'s official series updates with a natural lag -- this is not stale by search failure, it is the latest IBM has published.',
  cokingCoalUsdTonne: 241,
  cokingCoalAsOf: '1-10 Aug-2026 laycan',
  capacityUtilizationPct: null,
  capacityUtilizationNote:
    'Conflicting analyst estimates: ICRA puts FY26 industry utilization just above 80% (a 4-year low in FY25 at 78%); Kotak Institutional Equities says utilization will stay above 90% given ~9% YoY demand growth. No official JPC/worldsteel system-wide print found to resolve the gap -- left null rather than picking a side.',
}

export const steelTradePolicy: TradePolicyEvent[] = [
  {
    date: '31-Dec-2025',
    measure: 'Safeguard Duty',
    product: 'Non-alloy & alloy flat steel imports',
    status: 'Imposed',
    detail:
      'Progressive 3-year safeguard duty following a DGTR injury finding: 12% in Year 1 (Apr-2025 to Apr-2026), 11.5% in Year 2 (Apr-2026 to Apr-2027, currently in force), 11% in Year 3. Rolled-steel imports fell 38.7% YoY in H1 FY26 (to 3.04 million tonnes) following imposition -- the biggest domestic-sector catalyst of the period.',
    source: 'DGTR injury finding; Govt notification 31-Dec-2025 (via multiple trade-press reprints)',
  },
  {
    date: '22-Jun-2026',
    measure: 'Anti-dumping Duty Investigation (initiated, no duty yet)',
    product: 'CRGO (Cold Rolled Grain-Oriented) electrical steel & Amorphous Metal',
    status: 'Under review',
    detail: 'DGTR investigation into imports from China, Japan, South Korea and Russia -- initiated 22-Jun-2026, outcome pending.',
    source: 'DGTR case filings',
  },
  {
    date: '~30-Jul-2026',
    measure: 'Anti-dumping Duty Investigation (initiated, no duty yet)',
    product: 'Cold-rolled flat stainless steel (300/400 series)',
    status: 'Under review',
    detail:
      'Wide respondent set named: China, Korea, EU, Japan, Taiwan, Indonesia, USA, Thailand, South Africa, UAE, Hong Kong, Singapore, Mexico, Vietnam, Malaysia.',
    source: 'DGTR case page (dgtr.gov.in)',
  },
]
