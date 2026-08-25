import type { CementMetricQuarter } from '../types'

// Company-level cement capacity/production/utilization/EBITDA-per-tonne,
// sourced from company Q1 FY27 (quarter ended 30-Jun-2026) investor
// presentations, press releases and concall coverage -- research date
// 2026-08-25. Pilot coverage only, same discipline as steelMetrics.ts: 8 of
// the 18 companies in cementCompanies.ts have real per-quarter detail below
// (UltraTech, Ambuja, ACC, Shree Cement, Dalmia Bharat, JK Cement, Ramco
// Cements, Nuvoco Vistas); the remaining 10 (JK Lakshmi, Birla Corporation,
// Star Cement, Prism Johnson, HeidelbergCement India, Orient Cement, KCP,
// Mangalam Cement, Sagar Cements, Shree Digvijay Cement) are a genuine
// research gap, not a data error -- extend company by company from their PPTs/
// annual reports/concalls as time allows.
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
}
