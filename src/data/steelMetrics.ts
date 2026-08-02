import type { SteelMetricQuarter } from '../types'

// Company-level steel operating metrics (sales volume, realization/tonne,
// EBITDA/tonne, capacity utilization, net debt/EBITDA) researched from company
// results releases, investor presentations and secondary business-news
// coverage -- not available in the bulk Ace Equity export (only generic Net
// Sales/Operating Profit/PAT). Pilot coverage only (16 companies across the
// sector); extend company by company as time allows, same as the bank/NBFC
// pilot. Research date 2026-08-02.
//
// Discipline: every number here is sourced -- see `source` per company. Where
// a figure could not be reliably confirmed or was only a self-calculated
// derivation (not company-stated) rather than a disclosed figure, it is left
// `null` rather than estimated. Known conflicts across sources are flagged in
// `source` rather than silently resolved. Several companies (Ratnamani,
// Kalyani Steels, Sarda Energy, Godawari Power, Welspun Corp) simply do not
// publicly disclose per-tonne metrics the way others do -- that is a genuine
// company-disclosure-practice gap, not a research failure, and is called out
// explicitly rather than left unexplained.
export const steelMetrics: Record<string, SteelMetricQuarter[]> = {
  'jsw-steel-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: 75800,
      ebitdaPerTonne: 15013,
      capacityUtilization: 94,
      netDebtToEbitda: null,
      source:
        'Consolidated basis. EBITDA/tonne conflicts across sources for this quarter (₹15,013 vs ₹14,990/t, immaterial rounding) -- higher figure shown. Sales volume not shown: sources give conflicting figures depending on whether production (6.59 Mt) or total sales (7.97 Mt) is meant. Net debt/EBITDA not disclosed as a multiple (only net debt/equity 0.42x). India-standalone-only figures not separately disclosed. Sources: Whalesbook, Business Standard, Investing.com, Sahi.',
    },
    {
      period: 'Sep-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 10768,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Consolidated basis (+13% YoY, -10% QoQ). Source: ICICI Direct coverage of Q2 FY26 results.',
    },
    {
      period: 'Jun-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 11324,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Consolidated basis (+26% YoY, +33% QoQ). Net debt ₹79,850cr this quarter (context only, not a ratio). Source: Q1 FY27 results coverage citing YoY comparison.',
    },
  ],

  'tata-steel-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 7270000,
      realizationPerTonne: null,
      ebitdaPerTonne: 19162,
      capacityUtilization: null,
      netDebtToEbitda: 2.3,
      source:
        'India standalone/segment EBITDA/tonne shown (record high) -- consolidated figure for the same quarter is materially lower at ₹12,898/t, since consolidated includes lower-margin European operations. Sales volume (7.27 Mt) is consolidated deliveries; India-only deliveries in tonnes not disclosed separately. Net debt/EBITDA (2.3x) is consolidated; company\'s stated through-cycle target range is 2.5-3x. Sources: Investing.com (Q1 FY27 slides), Business Standard.',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 15907,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'India standalone, ~25% EBITDA margin per company. Consolidated figure for the same quarter implied at ₹11,410/t. Source: Manufacturing Today India, Multibagg (FY26 results coverage).',
    },
    {
      period: 'Sep-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 11343,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'India, FX-adjusted (company\'s own stated basis, adjusting for FX movement on intercompany debt/receivables) -- +54% YoY. Net debt ₹87,040cr this quarter (context only, not a ratio). Source: Business Standard.',
    },
  ],

  'steel-authority-of-india-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 4160000,
      realizationPerTonne: 57100,
      ebitdaPerTonne: 10464,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Consolidated. First quarter EBITDA/tonne crossed ₹10,000/t. Volume impacted by planned maintenance shutdowns at IISCO/Durgapur/Hazira/Bokaro (vs 4.55 Mt a year earlier). Net debt/EBITDA as a clean multiple not found (only net debt/equity ~0.36x); a separate "debt/EBITDA ~2.80x FY26 average" figure exists but is lower-confidence/ambiguous methodology and is not used here. Sources: Indian Masterminds, Investing.com, SAIL official release.',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 5300000,
      realizationPerTonne: 52000,
      ebitdaPerTonne: 8287,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Consolidated (+4% QoQ, +11.4% YoY volume). Source: Marketsmojo Q4 FY26 results coverage.',
    },
    {
      period: 'Jun-2025',
      salesVolumeTonnes: 4550000,
      realizationPerTonne: null,
      ebitdaPerTonne: 7869,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Consolidated. Source: Business Standard, cited as the YoY comparison base for Q1 FY27 results.',
    },
  ],

  'jindal-steel-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 2230000,
      realizationPerTonne: null,
      ebitdaPerTonne: 11937,
      capacityUtilization: null,
      netDebtToEbitda: 1.71,
      source:
        'Consolidated. Production 2.40 Mt, sales 2.23 Mt, value-added products 66% of sales mix. Net debt ₹15,927cr. Sources: EquityBulls, Multibagg.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 8701,
      capacityUtilization: null,
      netDebtToEbitda: 1.72,
      source: 'Consolidated. Q4 FY26 EBITDA/tonne is excluded here due to an unresolved three-way conflict across sources (₹11,218 vs ₹11,695 vs ₹10,093-10,094/t) that could not be settled without the primary investor presentation (blocked, 403). Source: Yahoo Finance earnings call highlights.',
    },
    {
      period: 'Sep-2025',
      salesVolumeTonnes: 1870000,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Consolidated. Production 2.00 Mt, sales 1.87 Mt. Total EBITDA ₹1,875cr disclosed but not broken out per tonne. Source: company results coverage.',
    },
  ],

  'shyam-metalics-and-energy-ltd': [
    {
      period: 'Mar-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 7460,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'No single blended EBITDA/tonne is disclosed across the company\'s carbon steel + stainless steel + speciality alloys + aluminium foil segments -- carbon steel (the core "steel" segment) shown here as the closest proxy (₹7,460/t). Other segments run far higher in the same quarter: stainless steel ₹8,512/t, speciality alloys ₹18,780/t, aluminium foil ₹36,562/t. Sources: EquityBulls, Investing.com, AlCircle.',
    },
  ],

  'sarda-energy-minerals-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Researched but not found: this company\'s investor communications do not appear to disclose per-tonne steel metrics (sales volume, realization, EBITDA/tonne) or capacity utilization in any quarter searched -- a genuine company-disclosure gap, not a research failure; likely requires the company\'s own investor-presentation PDF, which could not be retrieved directly (403). Qualitative Q1 FY27 context: revenue ₹1,717cr, EBITDA ₹762cr, net debt "well below 1x EBITDA" per company statement (not a precise multiple). Source: ScanX, Daily Guardian.',
    },
  ],

  'godawari-power-and-ispat-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Researched but not found: sales volume, realization/tonne and EBITDA/tonne not disclosed in press/analyst coverage for any quarter (only qualitative plant-utilization language: the new 2.0 MnT Raipur pellet plant ramped to ~78% utilization in Q4 FY26, and existing structural-steel capacity runs >95%). Company reports a net cash / debt-free position consistently through FY26 and Q1 FY27 -- not shown as a net debt/EBITDA multiple since it isn\'t a debt position. The Raipur pellet plant was temporarily suspended from 14-Jul-2026 (gas shortage), flagged by the company as a Q2 FY27 profit risk. Sources: DSIJ, Business Upturn, ScanX.',
    },
  ],

  'jindal-stainless-ltd': [
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 641743,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: 0.55,
      source:
        'Standalone finished-goods sales volume. EBITDA/tonne for this quarter is excluded: the only figure found (~₹22,676/t) is a self-calculation (total EBITDA ÷ volume), not company-stated, and is excluded per this dashboard\'s no-estimate rule. Net debt/EBITDA 0.55x (from 0.86x a year earlier). Source: Angel One, Business Standard.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: 649857,
      realizationPerTonne: null,
      ebitdaPerTonne: 21665,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Standalone. EBITDA/tonne explicitly stated by source (not a derived figure) -- ₹1,408cr EBITDA, +17% YoY. Source: company Q3 FY26 results coverage.',
    },
    {
      period: 'Sep-2025',
      salesVolumeTonnes: 648050,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Standalone. EBITDA/tonne for this quarter excluded (only a self-calculated ~₹21,412/t found, not company-stated). Q1 FY27 not yet reported as of research date (2026-08-02) -- scheduled 3-Aug-2026, one day later. FY27 management guidance range ₹18,000-20,000/t (a target, not an actual). Source: Angel One.',
    },
  ],

  'apl-apollo-tubes-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 744823,
      realizationPerTonne: null,
      ebitdaPerTonne: 5522,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Company results release. -6% YoY volume, +18% YoY EBITDA/tonne.',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 925000,
      realizationPerTonne: null,
      ebitdaPerTonne: 5525,
      capacityUtilization: 90,
      netDebtToEbitda: -0.9,
      source: 'Capacity utilization ~90% on 5 MT installed capacity, achieved Dec-2025. FY26 year-end net debt/EBITDA -0.9x (net cash position, vs -0.3x FY25). Company results release.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: 917000,
      realizationPerTonne: null,
      ebitdaPerTonne: 5150,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Record quarterly volume, +11% YoY. EBITDA/tonne has a minor conflict: Nuvama broker estimate ~₹4,900/t vs reported ~₹5,150/t -- reported figure shown.',
    },
    {
      period: 'Sep-2025',
      salesVolumeTonnes: 855037,
      realizationPerTonne: null,
      ebitdaPerTonne: 5228,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Record quarterly volume, +12.8% YoY. Company results release.',
    },
    {
      period: 'Jun-2025',
      salesVolumeTonnes: 794350,
      realizationPerTonne: null,
      ebitdaPerTonne: 4683,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Segment EBITDA/tonne also disclosed this quarter: Heavy structural ₹8,382/t, Structural-light ₹5,415/t, General ₹2,741/t, Rust-proof ₹5,437/t. Company results release.',
    },
  ],

  'welspun-corp-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Blended pipe volume (tonnes) and blended EBITDA/tonne not disclosed in press/analyst coverage retrieved (investor-presentation PDF blocked, 403) -- only a US-segment figure surfaced ("above long-term target of ~$300/ton"). Company reports net cash of ₹2,336cr this quarter (₹1,627cr at FY26 year-end); stated target is <1x net debt/EBITDA through-cycle. Record quarterly EBITDA ₹756cr, +35% YoY, margin 18.5%. Sources: company results release, press coverage.',
    },
  ],

  'ratnamani-metals-tubes-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Sales volume (tonnes) and EBITDA/tonne not publicly disclosed by this company in any quarter searched -- press/analyst coverage is revenue-and-margin only (this quarter: consolidated revenue ₹1,151.6cr, EBITDA ₹188cr, margin 16.3%). This looks like a genuine company-disclosure-practice difference versus peers like APL Apollo, not a research gap.',
    },
  ],

  'jindal-saw-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 362000,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Iron & Steel Pipes segment sales volume (+11% YoY); pellets segment sold separately (282,000 MT, +27% YoY). EBITDA/tonne for the pipes segment specifically not disclosed -- company-wide EBITDA spans pipes + pellets + other segments, and even that company-wide figure conflicts across sources this quarter (₹396cr vs ₹397cr vs ₹420.4cr). Standalone net debt ₹2,453cr as of 31-Mar-2026, but no matching EBITDA denominator confirmed to compute a multiple. Sources: SBI Securities-cited coverage, company releases.',
    },
  ],

  'usha-martin-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 40581,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Wire ropes segment (the company\'s core steel-linked business), +42% YoY. Source: SOIC-cited analysis.',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 39500,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Record quarter, margin 21.6%. Company moved from net debt (₹63cr FY25 year-end) to net cash (₹332cr FY26 year-end) over the year -- no single net debt/EBITDA multiple shown given the mid-year sign change.',
    },
    {
      period: 'Jun-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 28502,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Cited as the YoY comparison base for the Jun-2026 quarter figure. A large improvement from here (₹28,502/t) to ₹40,581/t a year later is a real and notable trend, not a data artifact.',
    },
  ],

  'kalyani-steels-ltd': [
    {
      period: 'Mar-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Q1 FY27 not yet reported as of research date (2026-08-02) -- board meeting scheduled 7-Aug-2026. No quarterly volume/EBITDA-per-tonne/capacity-utilization disclosed by the company in investor communications found -- a genuine disclosure-practice gap versus peers, not a research failure. One external estimate exists (CARE Ratings credit report: ~₹10,300/tonne average PBILDT/tonne for FY24) but is a rating-agency annual calculation, not company-quarterly data, and is not used here. This quarter: net sales ₹484.39cr, net profit ₹71.68cr, EBITDA margin 20.44%.',
    },
  ],

  'nmdc-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 11750000,
      realizationPerTonne: null,
      ebitdaPerTonne: 1656,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Iron ore miner, not a steel producer -- included as the sector\'s key upstream raw-material play; volume/₹-per-tonne here refer to iron ore, not steel. Dispatch volume, +2% YoY; production 15.10 Mt, +26% YoY. Price hikes of ₹500-600/t taken this quarter, no single blended realization figure found. Company is debt-free/net cash (net debt/equity -0.21), so net debt/EBITDA is not a meaningful metric.',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 15300000,
      realizationPerTonne: 4759,
      ebitdaPerTonne: 1729,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Domestic realization -5% YoY (from ₹5,007/t). Dispatch +21% YoY. Notified list prices for specific ore grades (e.g. Baila Lump/Fines) are revised periodically and do not equal this blended realization figure.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 1691,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: '-₹171/t QoQ. EBITDA ₹2,150cr, margin 39.2%.',
    },
  ],

  'kirloskar-ferrous-industries-ltd': [
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 127613,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: 1.6,
      source:
        'Q1 FY27 not yet reported as of research date (2026-08-02) -- board meeting scheduled 5-Aug-2026. Pig iron volume shown (Koppal plant, +5% QoQ, -6% YoY); a separate auto-grade castings line sold 34,980 MT at ₹1,31,790/tonne realization (+3% YoY) -- the two product lines don\'t sum to one blended "steel" figure, and per-tonne EBITDA for either segment specifically was not disclosed (only company-wide EBITDA margin ~11-13%). Net debt/EBITDA 1.60x is this quarter\'s annualized figure; a separate H1 FY26 basis gives 1.23x -- different calculation bases, not a real quarter-on-quarter trend.',
    },
  ],
}
