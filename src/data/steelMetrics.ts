import type { SteelMetricQuarter } from '../types'

// Company-level steel operating metrics (sales volume, realization/tonne,
// EBITDA/tonne, capacity utilization, net debt/EBITDA) researched from company
// results releases, investor presentations and secondary business-news
// coverage -- not available in the bulk Ace Equity export (only generic Net
// Sales/Operating Profit/PAT). Pilot coverage only (16 companies across the
// sector); extend company by company as time allows, same as the bank/NBFC
// pilot. Research date 2026-08-02, deepened 2026-08-03.
//
// Discipline: every number here is sourced -- see `source` per company. Where
// a figure could not be reliably confirmed or was only a self-calculated
// derivation (not company-stated) rather than a disclosed figure, it is left
// `null` rather than estimated. Known conflicts across sources are flagged in
// `source` rather than silently resolved. Several companies (Ratnamani,
// Kalyani Steels, Sarda Energy, Godawari Power, Welspun Corp) simply do not
// publicly disclose per-tonne metrics the way others do -- confirmed by a
// second, deeper research pass -- that is a genuine company-disclosure-
// practice gap, not a research failure, and is called out explicitly.
// Jindal Stainless, Kalyani Steels, Kirloskar Ferrous and Ratnamani all had
// Q1 FY27 results still pending as of 2026-08-03 (board meetings 3-7 Aug
// 2026) -- worth a follow-up pass after those land.
export const steelMetrics: Record<string, SteelMetricQuarter[]> = {
  'jsw-steel-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 6250000,
      realizationPerTonne: 75800,
      ebitdaPerTonne: 15013,
      capacityUtilization: 94,
      netDebtToEbitda: null,
      source:
        'Consolidated basis. Sales volume 6.25 Mt (-12% QoQ) -- a separate "6.59 Mt" figure circulating for this quarter appears to be production rather than sales; sales figure shown. EBITDA/tonne conflicts across sources for this quarter (₹15,013 vs ₹14,990/t, immaterial rounding) -- higher figure shown. Net debt/EBITDA not disclosed as a multiple for this quarter (only net debt/equity 0.42x); a secondary-sourced 1.46x figure exists but is not verified against a primary filing and is not used. India-standalone-only figures not separately disclosed. Sources: Whalesbook, Business Standard, Investing.com, Sahi.',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 7970000,
      realizationPerTonne: null,
      ebitdaPerTonne: 12264,
      capacityUtilization: 96,
      netDebtToEbitda: 1.81,
      source:
        'Consolidated. Record quarterly sales (7.97 Mt); India-operations-only sales 7.84 Mt. Capacity utilization 96% (India ops, excluding the BF-3 shutdown; 87% including it) -- company-stated. Net debt/EBITDA (leverage) 1.81x, company-stated. Realization: only a QoQ delta was disclosed (NSR +₹3,800/t vs Q3 FY26), not an absolute figure. Source: JSW Steel Q4 FY26 press release and earnings call transcript.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: 7640000,
      realizationPerTonne: null,
      ebitdaPerTonne: 8662,
      capacityUtilization: null,
      netDebtToEbitda: 2.91,
      source:
        'Consolidated. India-operations-only EBITDA/tonne for the same quarter is close (₹8,785/t); a separately-sourced standalone-only figure of ₹7,425/t also exists (ICICI Direct) -- likely a standalone vs India-ops vs consolidated distinction rather than a true conflict. Net debt/EBITDA 2.91x, company-stated. Source: JSW Steel Q4 FY26 press release (comparative quarter).',
    },
    {
      period: 'Sep-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 10768,
      capacityUtilization: 92,
      netDebtToEbitda: null,
      source: 'Consolidated basis (+13% YoY, -10% QoQ). Sources: ICICI Direct coverage of Q2 FY26 results; capacity utilization ~92% per separate coverage.',
    },
    {
      period: 'Jun-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 11324,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Consolidated basis (+26% YoY, +33% QoQ). Net debt ₹79,850cr this quarter (context only, not a ratio); a secondary-sourced 3.20x net debt/EBITDA figure exists but is not verified against a primary filing and is not used. Source: Q1 FY27 results coverage citing YoY comparison.',
    },
  ],

  'tata-steel-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 5170000,
      realizationPerTonne: null,
      ebitdaPerTonne: 19162,
      capacityUtilization: null,
      netDebtToEbitda: 2.3,
      source:
        'India standalone/segment basis throughout (deliveries 5.17 Mt, EBITDA/tonne ₹19,162/t, record high) -- consolidated EBITDA/tonne for the same quarter is materially lower at ₹12,898/t, since consolidated includes lower-margin European operations. Net debt/EBITDA (2.3x) is consolidated; company\'s stated through-cycle target range is 2.5-3x. Sources: Investing.com (Q1 FY27 slides), Business Standard, EquityBulls.',
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
      period: 'Dec-2025',
      salesVolumeTonnes: 6040000,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'India deliveries, record quarter (6.04 Mt). India segment EBITDA ₹8,291cr disclosed but not broken out per tonne by the company. Source: company Q3 FY26 disclosure.',
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
    {
      period: 'Jun-2025',
      salesVolumeTonnes: 4750000,
      realizationPerTonne: null,
      ebitdaPerTonne: 15760,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'India deliveries and India EBITDA/tonne (+₹2,510/t QoQ). Source: Angel One Q1 FY26 results coverage.',
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
        'Consolidated. First quarter EBITDA/tonne crossed ₹10,000/t. Volume impacted by planned maintenance shutdowns at IISCO/Durgapur/Hazira/Bokaro (vs 4.55 Mt a year earlier). Capacity utilization and a clean net debt/EBITDA multiple remain undisclosed despite a deeper research pass (only net debt/equity ~0.36x found; a separate "debt/EBITDA ~2.80x FY26 average" figure exists but is lower-confidence/ambiguous methodology). Sources: Indian Masterminds, Investing.com, SAIL official release.',
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
      source:
        'Consolidated. Q2 FY26 and Q3 FY26 volume figures found in a deeper research pass (9.46 Mt and 5.1 Mt respectively) are excluded here -- they don\'t reconcile against this quarter\'s 4.55 Mt or Q4 FY26\'s 5.3 Mt and look like a unit/scope mismatch across sources rather than genuine data. Source: Business Standard, cited as the YoY comparison base for Q1 FY27 results.',
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
      period: 'Mar-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: 61900,
      ebitdaPerTonne: 11695,
      capacityUtilization: null,
      netDebtToEbitda: 1.66,
      source:
        'Consolidated. Blended realization ~₹61,900/t (+₹4,766/t QoQ, attributed to the safeguard duty). EBITDA/tonne remains genuinely unresolved across sources: ₹11,695/t (adjusted, excluding a ₹125cr blast-furnace-3 startup cost) shown here; ₹10,093/t is the unadjusted/reported figure for the same quarter, and a third figure of ₹11,218/t was also found -- likely a rounding/estimate variant of the adjusted figure. Treat the adjusted-vs-reported gap as the main driver, not a data error.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 8701,
      capacityUtilization: null,
      netDebtToEbitda: 1.72,
      source: 'Consolidated. Source: Yahoo Finance earnings call highlights.',
    },
    {
      period: 'Sep-2025',
      salesVolumeTonnes: 1870000,
      realizationPerTonne: null,
      ebitdaPerTonne: 10010,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Consolidated. Production 2.00 Mt, sales 1.87 Mt. EBITDA/tonne from an official BSE filing (5-Nov-2025). Capacity utilization not disclosed for any quarter despite a deeper research pass.',
    },
  ],

  'shyam-metalics-and-energy-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 404858,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Carbon steel segment volume shown (stable YoY); carbon steel realization/EBITDA-per-tonne not disclosed this specific quarter (other segments were: stainless steel realization ₹1,75,925/t and EBITDA/t ₹10,194/t, speciality alloys realization ₹1,06,613/t and EBITDA/t ₹21,809/t, aluminium foil realization ₹4,83,467/t). Pellets 391,074t (+25.3% YoY), pig iron 289,201t (+137.5% YoY). No single blended company-wide EBITDA/tonne is disclosed -- confirmed again on a deeper pass, a genuine disclosure-practice gap. Sources: EquityBulls, Investing.com.',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: 7460,
      capacityUtilization: null,
      netDebtToEbitda: -0.16,
      source:
        'Carbon steel segment EBITDA/tonne shown as the closest single-figure proxy for "steel" (other segments same quarter: stainless steel ₹8,512/t, speciality alloys ₹18,780/t, aluminium foil ₹36,562/t). Net cash ₹378cr as of Mar-2026 (net debt/EBITDA shown as negative). Sources: EquityBulls, Investing.com, AlCircle.',
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
        'Confirmed on a second, deeper research pass (screener.in, Trendlyne, BSE filings, brokerage reports all checked): this company does not publicly disclose per-tonne steel metrics (sales volume, realization, EBITDA/tonne) or capacity utilization in any quarter -- a genuine company-disclosure gap, not a research failure. FY26 production volumes exist (Iron Ore Pellets 826,293 MT, Sponge Iron 345,066 MT) but are production, not sales, with no realization or EBITDA/tonne attached. Net debt reduced sharply to ₹215cr (Mar-2026) from ₹1,566cr a year earlier; a clean net debt/EBITDA multiple was not found (conflicting secondary claims of "well below 1x" vs "1.83x"). Q1 FY27 revenue ₹1,717cr, EBITDA ₹762cr. Sources: ScanX, Daily Guardian.',
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
        'Confirmed on a second, deeper research pass: sales volume, realization/tonne and EBITDA/tonne remain undisclosed in any accessible source (investor-presentation PDFs on BSE returned 403). Only qualitative plant-utilization language available: the new 2.0 MnT Raipur pellet plant ramped to ~78% utilization in Q4 FY26, existing structural-steel capacity runs >95%. Company is net cash (₹423cr as of FY26; ₹682cr cash vs ₹259cr debt) -- not shown as a net debt/EBITDA multiple since it isn\'t a debt position. The Raipur pellet plant was temporarily suspended from 14-Jul-2026 (gas shortage), flagged by the company as a Q2 FY27 profit risk. Sources: DSIJ, Business Upturn, ScanX.',
    },
  ],

  'jindal-stainless-ltd': [
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 641743,
      realizationPerTonne: null,
      ebitdaPerTonne: 22670,
      capacityUtilization: null,
      netDebtToEbitda: 0.55,
      source: 'Standalone finished-goods sales volume. EBITDA/tonne explicitly company-stated (not a derived figure) -- resolved on a deeper pass. Net debt/EBITDA 0.55x (from 0.86x a year earlier). Sources: Angel One, Business Standard, Yahoo Finance.',
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
        'Standalone. EBITDA/tonne for this quarter excluded (only a self-calculated ~₹21,412/t found, not company-stated). Q1 FY27 results were due 3-Aug-2026 (results/earnings call fell right around this research window) -- not yet captured here, worth a follow-up pass. FY27 management guidance range ₹18,000-20,000/t (a target, not an actual). Actual (not target) capacity utilization not found for any quarter despite two research passes. Source: Angel One.',
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
      source:
        'Company results release. -6% YoY volume, +18% YoY EBITDA/tonne. Net cash ₹1,410cr this quarter (vs ₹1,530cr at FY26-end) -- context only, not a net debt/EBITDA multiple. Realization/tonne confirmed on a deeper pass as genuinely not disclosed by this company (it reports EBITDA/tonne only, not a blended ASP).',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 925000,
      realizationPerTonne: null,
      ebitdaPerTonne: 5525,
      capacityUtilization: 90,
      netDebtToEbitda: -0.9,
      source: 'Capacity utilization ~90% on 5 MT installed capacity, achieved Dec-2025 (peak test, not a full-quarter average). FY26 year-end net debt/EBITDA -0.9x (net cash position, vs -0.3x FY25). Company results release.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: 917000,
      realizationPerTonne: null,
      ebitdaPerTonne: 5150,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Record quarterly volume, +11% YoY. EBITDA/tonne has a minor conflict: Nuvama broker estimate ~₹4,900/t vs reported ~₹5,150/t -- reported figure shown. Net cash ₹560cr this quarter.',
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
      source: 'Segment EBITDA/tonne also disclosed this quarter: Heavy structural ₹8,382/t, Structural-light ₹5,415/t, General ₹2,741/t, Rust-proof ₹5,437/t. Net cash ₹210cr this quarter. Company results release.',
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
        'Confirmed on a second, deeper research pass: multiple sources explicitly note management "focuses on absolute EBITDA numbers rather than per-tonne metrics" -- likely a genuine disclosure-practice choice, not a research gap. Only a US-segment-only figure surfaced ("above long-term target of ~$300/ton"), still qualitative. Company reports net cash of ₹2,336cr this quarter (₹1,627cr at FY26 year-end); stated target is <1x net debt/EBITDA through-cycle. Record quarterly EBITDA ₹756cr, +35% YoY, margin 18.5%. Sources: company results release, press coverage.',
    },
  ],

  'ratnamani-metals-tubes-ltd': [
    {
      period: 'Mar-2026',
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Q1 FY27 results not yet released as of research date -- board meeting scheduled 7-Aug-2026. Sales volume (tonnes) and EBITDA/tonne remain undisclosed by this company after two research passes -- press/analyst coverage is revenue-and-margin only (this quarter: consolidated revenue ₹1,085cr). A stale FY21-22 concall figure ("60-80% capacity utilization") was found but is ~4 years old and not usable for current tracking. Company confirmed standalone debt-free per Q4 FY26 filing. This looks like a genuine company-disclosure-practice difference versus peers like APL Apollo, not a research gap.',
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
        'Iron & Steel Pipes segment sales volume (+11% YoY); pellets segment sold separately (282,000 MT, +27% YoY). EBITDA/tonne for the pipes segment specifically not disclosed -- company-wide EBITDA spans pipes + pellets + other segments. The earlier three-way company-wide EBITDA conflict is now well-explained (not fully confirmed): standalone ≈ ₹396-397cr, consolidated ≈ ₹420-421cr (down 39-41% YoY, margin ~8.9%) -- two separate but consistent sources support this split, though no single source states both side-by-side. Consolidated net debt ₹2,472cr as of Jun-2026 (vs ₹2,528cr Mar-2026) -- absolute figures only, no EBITDA denominator confirmed for a multiple. Capacity utilization not quantified; qualitative commentary attributes weaker Q1FY27 margins partly to "lower capacity utilisation" alongside the API license suspension (Jan-mid-Jun 2026) and MENA/Strait of Hormuz disruptions. Sources: SBI Securities-cited coverage, company releases.',
    },
  ],

  'usha-martin-ltd': [
    {
      period: 'Jun-2026',
      salesVolumeTonnes: 26000,
      realizationPerTonne: null,
      ebitdaPerTonne: 40581,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source:
        'Wire ropes segment (the company\'s core steel-linked business), EBITDA/tonne +42% YoY. Sales volume ~26,000 MT is moderate-confidence -- found via search synthesis but could not be re-pinned to one specific article on a follow-up check; treat as indicative pending verification. Net cash ₹465cr this quarter (vs ₹332cr at FY26-end). Realization/tonne and capacity utilization confirmed still undisclosed after a deeper pass. Source: SOIC-cited analysis.',
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
      salesVolumeTonnes: 27000,
      realizationPerTonne: null,
      ebitdaPerTonne: 28502,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Sales volume ~27,000 MT is moderate-confidence, same caveat as the Jun-2026 figure. Cited as the YoY comparison base for the Jun-2026 EBITDA/tonne figure -- the improvement from ₹28,502/t to ₹40,581/t a year later is a real and notable trend, not a data artifact.',
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
        'Q1 FY27 results not yet released as of research date -- board meeting scheduled 7-Aug-2026. No quarterly volume/EBITDA-per-tonne/capacity-utilization disclosed by the company in investor communications found after two research passes -- a genuine disclosure-practice gap versus peers. One qualitative claim (a Substack analysis) says the company "operates above 100% capacity utilization" currently vs "80-90% historically" -- directional only, not tied to a specific quarter, not used as a data point. One external annual estimate exists (CARE Ratings credit report: ~₹10,300/tonne average PBILDT/tonne for FY24) but is a rating-agency calculation, not company-quarterly data, and is not used here. This quarter: net sales ₹484.39cr, net profit ₹71.68cr, EBITDA margin 20.44%.',
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
        'Iron ore miner, not a steel producer -- included as the sector\'s key upstream raw-material play; volume/₹-per-tonne here refer to iron ore, not steel. Dispatch volume +2% YoY; production 15.10 Mt, +26% YoY. Realization/tonne not found for this quarter despite a deeper pass (only that price hikes of ₹500-600/t were taken). Capacity utilization not quantified; qualitative note that NMDC "touched Environmental Clearance capacity at all its mines" for the first time as of Apr-2026, implying utilization near mine-approved limits. Company is debt-free/net cash (net debt/equity -0.21).',
    },
    {
      period: 'Mar-2026',
      salesVolumeTonnes: 15300000,
      realizationPerTonne: 4759,
      ebitdaPerTonne: 1729,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Domestic realization -5% YoY (from ₹5,007/t); a second search found a conflicting ₹4,873/t figure for the same quarter -- ₹4,759/t (with an explicit YoY comparison) shown as the more traceable figure. Dispatch +21% YoY. Notified list prices for specific ore grades (e.g. Baila Lump/Fines) are revised periodically and do not equal this blended realization figure.',
    },
    {
      period: 'Dec-2025',
      salesVolumeTonnes: null,
      realizationPerTonne: 4681,
      ebitdaPerTonne: 1691,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Realization -₹171/t QoQ (new in the deeper pass). EBITDA ₹2,150cr, margin 39.2%.',
    },
    {
      period: 'Jun-2025',
      salesVolumeTonnes: 11510000,
      realizationPerTonne: null,
      ebitdaPerTonne: null,
      capacityUtilization: null,
      netDebtToEbitda: null,
      source: 'Production 11.99 Mt (+30.5% YoY), sales 11.51 Mt (+14.3% YoY). EBITDA/tonne not found for this specific quarter.',
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
        'Q1 FY27 results not yet released as of research date -- board meeting scheduled 5-Aug-2026. Pig iron volume shown (Koppal plant, +5% QoQ, -6% YoY); a separate auto-grade castings line despatched ~38kt (+20% YoY, a slightly different "despatches" measure from the 34,980 MT "sales" figure found in the first pass -- likely not a true conflict, just a different metric) at ₹1,31,790/tonne realization; a tube-making line also despatched ~51.1kt (-1% YoY), not previously captured. Per-tonne EBITDA for pig iron specifically was not disclosed even after a deeper pass -- one investor explicitly asked management for segment-wise EBITDA/tonne on a call, implying the company doesn\'t routinely disclose it. Net debt/EBITDA remains a genuine cross-source conflict: 1.60x vs 1.23x both appear to originate from the same underlying coverage (MarketsMojo) without a clear reconciliation; 2.88x was also found for both Q2 FY26 and Q3 FY26 identically, which may be a search-synthesis artifact rather than two independently confirmed values -- none of the H1/Q2/Q3 figures are used here pending clarification, only the Q4 FY26 figure is shown.',
    },
  ],
}
