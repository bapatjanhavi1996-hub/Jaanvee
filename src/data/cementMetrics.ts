import type { CementMetricQuarter } from '../types'

// Company-level cement capacity/production/utilization/EBITDA-per-tonne,
// sourced from company Q1 FY27 (quarter ended 30-Jun-2026) investor
// presentations, press releases and concall coverage -- research date
// 2026-08-25, extended same day (second pass) to cover all 18 companies.
//
// Note on sourcing method: direct WebFetch access to company IR sites (e.g.
// jklakshmicement.com) is blocked by this environment's network egress proxy,
// so every row below comes from press coverage of each company's investor
// presentation/concall (Investing.com result-slide summaries, EquityBulls/
// ScanX/Whalesbook wire reports, Business Standard) rather than from opening
// the source PDF directly. That's one hop removed from the primary document,
// not a lower-confidence estimate -- the underlying figures are still
// company-disclosed, just relayed rather than sighted firsthand. Two
// companies (KCP, Mangalam Cement) only had company-wide/segment financials
// surface, not cement-specific volume or utilization -- flagged per-row.
//
// This is meant to be a running series: append the next quarter's row per
// company (newest first) as each Q2 FY27 result lands, rather than replacing
// what's here. Only one quarter (Jun-2026) exists per company today.
export const cementMetrics: Record<string, CementMetricQuarter[]> = {
  'ultratech-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 205.5,
      productionMt: null,
      capacityUtilization: 81,
      salesVolumeTonnes: 41310000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Consolidated grey cement sales volume +12% YoY to 41.31 Mt (domestic-only sales 39.2 Mt, +13.1% YoY). Utilization 81% on 200.1 MTPA India installed capacity as of quarter-start; company commissioned a further 8.7 MTPA during the quarter, taking total consolidated capacity to 205.5 MTPA by end-Jun-2026. PAT +17% YoY to ~Rs 2,599-2,604 Cr (source figures vary slightly, Rs 2,599 Cr vs Rs 2,604 Cr, immaterial rounding/consolidation-scope difference). Company guides 212.7 MTPA by FY27-end and 242.5 MTPA by FY28-end. Sources: UltraTechCement.com Q1 FY27 press release, Outlook Business, Business Standard, ScanX -- Jul-2026.',
    },
  ],
  'ambuja-cements-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 109,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: 17100000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Adani Group (Ambuja) reported capacity 109 MTPA as of 30-Jun-2026, targeting 119 MTPA by FY27-end and 140-155 MTPA by FY28 -- this is the combined Adani Cement Group figure (Ambuja + ACC + Sanghi + Penna), not Ambuja standalone, ahead of the ACC amalgamation. Total group sales volumes fell 7% YoY to 17.1 Mt on a deliberate value-over-volume strategy; sequential cost reduction of Rs 206/tonne drove a 331 bps QoQ EBITDA margin expansion to 16.7%. Utilization of recently acquired assets specifically: Sanghi 57%, Penna 46% (as of FY26-end) -- these two alone are well below the group average, the clearest evidence of absorption lag on acquired capacity. Trial production underway/planned at Dahej (1.2 MTPA), Salai Banwa (2.4 MTPA), Bathinda (1.2 MTPA), Jodhpur (2 MTPA), Kalamboli (1 MTPA, Q2), Warisaliganj (2.4 MTPA, Q2); Maratha clinker line (4 MTPA) targeted 2027. Sources: Adani Q1 FY27 investor presentation/press release (28-Jul-2026), Investing.com, Quartr, ScanX.',
    },
  ],
  'acc-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: null,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: 10000000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'ACC standalone Q1 FY27: revenue Rs 5,808 Cr, EBITDA Rs 457 Cr, PAT Rs 147 Cr, cement sales volume 10 Mt. Capacity is not separately disclosed for ACC alone this quarter -- reporting has effectively moved to the combined Ambuja Group figure (109 MTPA, see ambuja-cements-ltd row) ahead of the SEBI-cleared (4-Jun-2026), NCLT-filed (29-Jun-2026) amalgamation into Ambuja Cements, expected to complete during FY27. Source: ACC Q1 FY27 press release/media release (24-Jul-2026), EquityBulls, ANI.',
    },
  ],
  'shree-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 65.8,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Installed capacity 65.8 MTPA, company guiding 68.8 MTPA by FY26-end and 72 MTPA by FY27. Shree led large-cap peers with 17% YoY volume growth in Q1 FY27 (absolute tonnage not disclosed in sources checked). Management stated costs peaked this quarter and are expected to stabilize from Q2 FY27. Note: a separately-circulating "Q1 PAT -45% YoY to Rs 318 Cr" figure was checked and excluded -- its source URL pattern indicates it is actually an Aug-2024 (Q1 FY25) result, not Q1 FY27; do not reuse it for this quarter. Sources: pan-India cement trade press synthesis, Aug-2026.',
    },
  ],
  'dalmia-bharat-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 54.7,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: 7600000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Capacity reached 54.7 MTPA as of 30-Jun-2026 following completion of the Jaiprakash Associates cement-undertaking acquisition (+5.2 MTPA across 4 Central India plants) -- making Dalmia India\'s 4th-largest producer by capacity. Sales volume +9% YoY to 7.6 Mt despite state-election disruption; revenue +7% YoY to Rs 3,890 Cr (vs Rs 3,636 Cr). Company reaffirmed the organic target of 66.7 MTPA by Q3 FY28; FY27 capex guided at Rs 3,200-3,400 Cr excluding acquisition cost, leverage to stay below 2.0x net debt/EBITDA. Sources: Dalmia Bharat Q1 FY27 investor presentation, EquityBulls, Kalkine India, MarketsMojo -- Jul-2026.',
    },
  ],
  'jk-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 35.4,
      productionMt: null,
      capacityUtilization: 75,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Grey cement capacity 32.3 MTPA plus white cement/wall putty 3.1 MTPA (35.4 MTPA combined). Grey cement utilization 75%, clinker utilization 76% in Q1 FY27; grey cement volumes +18% YoY. EBITDA margin compressed to 16.5% on cost pressure; PAT Rs 291 Cr. Company guides FY27 grey cement volumes of 22.5-23 Mt. Source: JK Cement Q1 FY27 investor presentation, Business Upturn, ScanX, Investing.com -- Jul-2026.',
    },
  ],
  'ramco-cements-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: null,
      productionMt: null,
      capacityUtilization: 70,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Capacity utilization 70% in Q1 FY27; cement sales volume +12% YoY, revenue +10% YoY to Rs 2,276 Cr. Company targets ~31 MTPA cement capacity in FY27 via debottlenecking plus brownfield expansion -- current installed capacity not separately confirmed in this pass (a research gap, not a zero). New-tax and cost pressure squeezed earnings despite the volume growth. Source: Ramco Cements Q1 FY27 investor update, InvestyWise, Multibagg -- Aug-2026.',
    },
  ],
  'nuvoco-vistas-corp-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 25,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Capacity 25 MMTPA is the most recent confirmed figure but is dated Q2 FY26 (i.e. carried forward, not independently re-confirmed for Q1 FY27 this pass) -- shown as the latest known reading rather than omitted. Company targets 35 MMTPA by FY27-end. Q1 FY27 utilization/volume/EBITDA-per-tonne not found in this pass -- a research gap to close alongside the other 10 pilot-gap companies. Source: Nuvoco Vistas company disclosures via Business Standard/Upstox, cross-referenced Aug-2026.',
    },
  ],
  'jk-lakshmi-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 18,
      productionMt: null,
      capacityUtilization: 80,
      salesVolumeTonnes: 3598000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: 761,
      netDebtToEbitda: null,
      source:
        'Capacity 18 MTPA (stable since the Sep-2025 Surat grinding unit commissioning). Sales volume +8.2% YoY to 35.98 lakh tonnes (3.598 Mt); capacity utilization of ~80% is derived here (3.598 Mt x 4 / 18 MTPA), not company-stated, and should be read as approximate. Revenue Rs 1,904.78 Cr, EBITDA Rs 273.77 Cr (-18.4% YoY, margin 13.58%) -- EBITDA/tonne of Rs 761 is likewise derived (EBITDA / sales volume), not company-disclosed. PAT fell 28-30% YoY to Rs 106.77-108.07 Cr (source figures vary) partly on a Rs 130 Cr exceptional charge for a cancelled contract. Company guides FY27 capex of Rs 1,500 Cr and a capacity target of 22.6 MTPA by FY28 (Durg brownfield: +2.3 MTPA clinker, +4.6 MTPA cement across 3 grinding units) en route to 30 MTPA by FY30. Sources: SMEStreet, Whalesbook, ScanX, PropNewsTime, BusinessToday -- Q1 FY27 results/concall coverage, Jul-Aug 2026.',
    },
  ],
  'birla-corporation-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 21.4,
      productionMt: null,
      capacityUtilization: 98,
      salesVolumeTonnes: 5050000,
      realizationPerTonne: 4947,
      productionCostPerTonne: null,
      ebitdaPerTonne: 675,
      netDebtToEbitda: null,
      source:
        'Capacity 21.4 MTPA as of Aug-2026 after Kundanganj Line III commissioning (+1.4 MTPA). Capacity utilization 98% in Q1 FY27, down 100 bps YoY from 99%. Cement sales volume +5% YoY to 5.05 Mt; revenue +7.36% YoY to Rs 2,669 Cr; consolidated net profit -3.33% YoY to Rs 116 Cr as cost escalation offset volume gains. Realization +1.8% YoY to Rs 4,947/tonne; EBITDA/tonne -5.6% to Rs 675 (from Rs 715) on a 5% rise in power/fuel costs. Company targets 27.5-27.6 MTPA by FY28-29, guides FY27 capex of Rs 900 Cr and a net debt target of Rs 2,000 Cr. Source: EquityBulls, ScanX, Sahi -- Q1 FY27 results/concall coverage (25-Jul-2026).',
    },
  ],
  'star-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 9.7,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: 1302000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Cement capacity 9.7 MTPA (clinker 6.1 MTPA), following the Feb-2026 commissioning of a 2.0 MTPA grinding unit in Cachar, Assam. Q1 FY27 cement sales volume 13.02 lakh tonnes (1.302 Mt, up from 12.22 lakh tonnes YoY); clinker sales fell to 0.52 lakh tonnes from 0.74 lakh tonnes. Standalone revenue Rs 902.89 Cr; EBITDA fell to Rs 203 Cr from Rs 230 Cr on reduced subsidy, higher packing-material costs and shutdown expenses. Management cut FY27 volume growth guidance to 8-9% from 11-12% on flood disruption in the Northeast, expecting double-digit growth to resume in Q3-Q4. Company targets 18.7 MTPA by FY29E. Source: Quartr, GuruFocus, InvestyWise -- Q1 FY27 earnings call coverage, Jul-Aug 2026.',
    },
  ],
  'prism-johnson-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 6.97,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Cement capacity 5.6 MTPA at Satna (Madhya Pradesh) plus 1.37 MTPA via supply agreements with 4 grinding units in Uttar Pradesh/Bihar (6.97 MTPA total reach). Cement-specific Q1 FY27 volume/utilization not found in this pass -- company-wide (cement + tiles + RMC) figures only: consolidated revenue Rs 1,844 Cr (+2.7% YoY), EBITDA Rs 221 Cr (+26.6% YoY), margin 12.0% (+226 bps). Management characterized cement profitability per tonne as "broadly stable" despite weaker Central India demand -- no exact figure disclosed. Source: Multibagg, InvestyWise, ScanX -- Q1 FY27 results coverage, Jul-2026.',
    },
  ],
  'heidelbergcement-india-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 6.26,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Capacity ~6.26 MTPA (Central India). Q1 FY27 revenue +5.1% YoY to Rs 628.11 Cr; sales volume growth cited inconsistently across sources (+3.6% vs +8.8% in two different reports -- flagged rather than picked, exact tonnage not found). Realization improved a modest +1.5%. Net profit fell 37% YoY to Rs 30.55 Cr (Rs 305.5 million) on rising power, fuel and freight costs (+9.6%). Source: Sahi, ScanX, Quartr -- Q1 FY27 results coverage, Jul-2026.',
    },
  ],
  'orient-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 8.5,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Capacity 8.50 MTPA as of 31-Mar-2026 (Devapur, Jalgaon, Chittapur plants). Q1 FY27: revenue Rs 604 Cr, PAT Rs 77 Cr; volumes fell ~7% YoY on a deliberate "value over volume" strategy (trade sales share improved 74% to 78%, premium products 34%; non-trade volumes down 21%). Note: an EBITDA-margin/cost-per-tonne figure set (331 bps margin expansion to 16.7%, Rs 206/tonne cost cut, Rs 931/tonne EBITDA) surfaced attached to Orient in one search pass but is identical to Ambuja\'s Q1 FY27 figures found separately -- treated as a likely cross-contaminated/mis-attributed search result and deliberately excluded rather than reused. Subject to Ambuja\'s pending amalgamation of Orient Cement. Source: TipRanks, Multibagg, Yahoo Finance -- Q1 FY27 results/concall coverage, Jul-2026.',
    },
  ],
  'kcp-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 4.3,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Cement capacity 4.3 MTPA (Macherla + Muktyala, Andhra Pradesh). Cement-segment-specific Q1 FY27 volume/utilization/EBITDA-per-tonne not found in this pass -- KCP discloses consolidated (cement + heavy engineering + power) financials at the headline level: consolidated revenue Rs 779 Cr (+15.24% YoY), consolidated PAT Rs 36.8 Cr (-42.05% YoY). Not attributable to the cement segment alone; a genuine research gap, not a zero. Source: Sahi -- Q1 FY27 results coverage, Aug-2026.',
    },
  ],
  'mangalam-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 5.6,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: null,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Capacity 5.60 MTPA (4.4 MTPA base plus a 1.2 MTPA Aligarh grinding-unit expansion). Q1 FY27 sales volume/capacity utilization not found in this pass. Standalone revenue Rs 455.22 Cr (+0.8% YoY), PAT fell 44% YoY to Rs 18.07 Cr on cost pressure. Source: Business Standard, Sahi, Multibagg, ScanX -- Q1 FY27 results coverage, Aug-2026.',
    },
  ],
  'sagar-cements-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 11.0,
      productionMt: null,
      capacityUtilization: 63,
      salesVolumeTonnes: 1606000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: 451,
      netDebtToEbitda: null,
      source:
        'Group capacity 11.0 MTPA after a 0.50 MTPA grinding expansion at Jeerabad. Q1 FY27 sales volume 16.06 lakh tonnes (1.606 Mt, +13% YoY); capacity utilization improved to 63% (+660 bps YoY). Operating EBITDA fell 40% YoY to Rs 72.42 Cr (EBITDA/tonne Rs 451) as elevated input costs squeezed margins; net loss of Rs 28.10 Cr vs a Rs 7.49 Cr profit a year earlier. A 1.55 MW Waste Heat Recovery System addition at Gudipadu (commissioned 18-Jun-2026) is expected to help power costs from Q2 FY27. Full-year FY27 volume guidance held at ~7 MT. Source: Investing.com, Whalesbook, ScanX, Sahi -- Q1 FY27 results/concall coverage, 28-Jul-2026.',
    },
  ],
  'shree-digvijay-cement-ltd': [
    {
      period: 'Jun-2026',
      capacityMtpa: 1.2,
      productionMt: null,
      capacityUtilization: null,
      salesVolumeTonnes: 606000,
      realizationPerTonne: null,
      productionCostPerTonne: null,
      ebitdaPerTonne: null,
      netDebtToEbitda: null,
      source:
        'Current capacity 1.2 MTPA; Environmental Clearance received for expansion to 3.0 MTPA (no confirmed commissioning date in sources checked). Q1 FY27 sales volume rose to 6.06 lakh tonnes (0.606 Mt) from 3.59 lakh tonnes YoY (+69%); revenue surged ~72% YoY to Rs 337 Cr. EBITDA/tonne fell despite the revenue surge (margin erosion cited across multiple sources, exact per-tonne figure not confirmed). Smallest company in this universe by capacity. Source: EquityBulls, Whalesbook, MarketsMojo, ScanX -- Q1 FY27 results coverage, Jul-2026.',
    },
  ],
}
