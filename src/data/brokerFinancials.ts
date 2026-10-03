import type { BrokerFinancialYear } from '../types'

// Annual consolidated financials, sourced from screener.in (research date
// 2026-10-03). Stored NEWEST-FIRST (FY26 → FY24) to match the
// QuarterlyFinancial convention; CompanyDetail flips to ascending for display
// and computes net margin + P/E + P/B from these plus the company's market cap.
//
// Coverage: the 11 core, liquid, well-disclosed names (the "done deeply" set).
// netWorthCr = Equity Capital + Reserves. For the exchanges (BSE, MCX) and
// depository (CDSL), a large part of Total Assets is settlement-guarantee /
// clearing / client float money held in trust, NOT operating capital -- so
// read ROE/net worth, not total assets, for those. Every row cites screener's
// consolidated statements; figures can differ slightly from company press
// releases (e.g. PAT before vs after minority interest) -- screener is used
// consistently so the cross-company comparison holds.
export const brokerFinancials: Record<string, BrokerFinancialYear[]> = {
  'angel-one-ltd': [
    { fy: 'FY26', salesCr: 5138, operatingProfitCr: 1820, opmPct: 35, netProfitCr: 915, netWorthCr: 6118, borrowingsCr: 7951, totalAssetsCr: 23904, roePct: 16, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 5239, operatingProfitCr: 1983, opmPct: 38, netProfitCr: 1172, netWorthCr: 5621, borrowingsCr: 3414, totalAssetsCr: 16889, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 4272, operatingProfitCr: 1693, opmPct: 40, netProfitCr: 1126, netWorthCr: 3039, borrowingsCr: 2541, totalAssetsCr: 13254, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  'billionbrains-garage-ventures-ltd': [
    { fy: 'FY26', salesCr: 4645, operatingProfitCr: 2744, opmPct: 59, netProfitCr: 2083, netWorthCr: 9652, borrowingsCr: 292, totalAssetsCr: 18511, roePct: 29, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 4061, operatingProfitCr: 2530, opmPct: 62, netProfitCr: 1824, netWorthCr: 4812, borrowingsCr: 610, totalAssetsCr: 10076, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 2794, operatingProfitCr: 743, opmPct: 27, netProfitCr: -805, netWorthCr: 2499, borrowingsCr: 91, totalAssetsCr: 8018, roePct: null, source: 'screener.in consolidated (FY24) — PAT was a loss due to a one-time tax charge on the India domicile shift, not an operating loss' },
  ],
  'motilal-oswal-financial-services-ltd': [
    { fy: 'FY26', salesCr: 9381, operatingProfitCr: 3877, opmPct: 41, netProfitCr: 1872, netWorthCr: 12888, borrowingsCr: 21255, totalAssetsCr: 43401, roePct: 15.5, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 8340, operatingProfitCr: 4546, opmPct: 55, netProfitCr: 2508, netWorthCr: 11079, borrowingsCr: 14732, totalAssetsCr: 33916, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 7069, operatingProfitCr: 4067, opmPct: 58, netProfitCr: 2446, netWorthCr: 8732, borrowingsCr: 13787, totalAssetsCr: 31771, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  '360-one-wam-ltd': [
    { fy: 'FY26', salesCr: 4470, operatingProfitCr: 2815, opmPct: 63, netProfitCr: 1216, netWorthCr: 9836, borrowingsCr: 15931, totalAssetsCr: 27199, roePct: 14.4, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 3684, operatingProfitCr: 2391, opmPct: 65, netProfitCr: 1015, netWorthCr: 7065, borrowingsCr: 11160, totalAssetsCr: 19768, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 2921, operatingProfitCr: 1705, opmPct: 58, netProfitCr: 804, netWorthCr: 3450, borrowingsCr: 9472, totalAssetsCr: 15114, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  'nuvama-wealth-management-ltd': [
    { fy: 'FY26', salesCr: 4638, operatingProfitCr: 2450, opmPct: 53, netProfitCr: 1040, netWorthCr: 4121, borrowingsCr: 11544, totalAssetsCr: 34491, roePct: 27, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 4162, operatingProfitCr: 2220, opmPct: 53, netProfitCr: 985, netWorthCr: 3490, borrowingsCr: 7839, totalAssetsCr: 28388, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 3156, operatingProfitCr: 1565, opmPct: 50, netProfitCr: 625, netWorthCr: 2894, borrowingsCr: 6746, totalAssetsCr: 20387, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  'prudent-corporate-advisory-services-ltd': [
    { fy: 'FY26', salesCr: 1341, operatingProfitCr: 333, opmPct: 25, netProfitCr: 222, netWorthCr: 883, borrowingsCr: 34, totalAssetsCr: 1223, roePct: 25, source: 'screener.in consolidated (FY26); 3-yr avg ROE ~32%' },
    { fy: 'FY25', salesCr: 1133, operatingProfitCr: 292, opmPct: 26, netProfitCr: 196, netWorthCr: 668, borrowingsCr: 31, totalAssetsCr: 944, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 823, operatingProfitCr: 211, opmPct: 26, netProfitCr: 139, netWorthCr: 482, borrowingsCr: 20, totalAssetsCr: 757, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  'central-depository-services-ltd': [
    { fy: 'FY26', salesCr: 1145, operatingProfitCr: 582, opmPct: 51, netProfitCr: 455, netWorthCr: 1960, borrowingsCr: 2, totalAssetsCr: 2419, roePct: 25, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 1082, operatingProfitCr: 625, opmPct: 58, netProfitCr: 526, netWorthCr: 1760, borrowingsCr: 3, totalAssetsCr: 2162, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 812, operatingProfitCr: 488, opmPct: 60, netProfitCr: 420, netWorthCr: 1463, borrowingsCr: 1, totalAssetsCr: 1781, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  'bse-ltd': [
    { fy: 'FY26', salesCr: 5124, operatingProfitCr: 3480, opmPct: 68, netProfitCr: 2487, netWorthCr: 6673, borrowingsCr: 0, totalAssetsCr: 13446, roePct: 46, source: 'screener.in consolidated (FY26); total assets include settlement/SGF funds held in trust' },
    { fy: 'FY25', salesCr: 3212, operatingProfitCr: 1876, opmPct: 58, netProfitCr: 1322, netWorthCr: 4424, borrowingsCr: 0, totalAssetsCr: 10342, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 1568, operatingProfitCr: 711, opmPct: 45, netProfitCr: 772, netWorthCr: 3302, borrowingsCr: 0, totalAssetsCr: 9450, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  'multi-commodity-exchange-of-india-ltd': [
    { fy: 'FY26', salesCr: 2302, operatingProfitCr: 1642, opmPct: 71, netProfitCr: 1332, netWorthCr: 2848, borrowingsCr: 5, totalAssetsCr: 7501, roePct: 56, source: 'screener.in consolidated (FY26); total assets include settlement funds held in trust' },
    { fy: 'FY25', salesCr: 1113, operatingProfitCr: 665, opmPct: 60, netProfitCr: 560, netWorthCr: 1884, borrowingsCr: 1, totalAssetsCr: 4325, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 684, operatingProfitCr: 63, opmPct: 9, netProfitCr: 83, netWorthCr: 1378, borrowingsCr: 2, totalAssetsCr: 3409, roePct: null, source: 'screener.in consolidated (FY24) — margins were depressed by the software-platform transition that year' },
  ],
  'computer-age-management-services-ltd': [
    { fy: 'FY26', salesCr: 1516, operatingProfitCr: 683, opmPct: 45, netProfitCr: 472, netWorthCr: 1321, borrowingsCr: 64, totalAssetsCr: 1809, roePct: 36, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 1422, operatingProfitCr: 652, opmPct: 46, netProfitCr: 465, netWorthCr: 1118, borrowingsCr: 89, totalAssetsCr: 1596, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 1137, operatingProfitCr: 505, opmPct: 44, netProfitCr: 351, netWorthCr: 914, borrowingsCr: 96, totalAssetsCr: 1413, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
  'kfin-technologies-ltd': [
    { fy: 'FY26', salesCr: 1301, operatingProfitCr: 530, opmPct: 41, netProfitCr: 344, netWorthCr: 1674, borrowingsCr: 55, totalAssetsCr: 2770, roePct: 22, source: 'screener.in consolidated (FY26)' },
    { fy: 'FY25', salesCr: 1091, operatingProfitCr: 479, opmPct: 44, netProfitCr: 333, netWorthCr: 1408, borrowingsCr: 47, totalAssetsCr: 1750, roePct: null, source: 'screener.in consolidated (FY25)' },
    { fy: 'FY24', salesCr: 838, operatingProfitCr: 364, opmPct: 43, netProfitCr: 246, netWorthCr: 1141, borrowingsCr: 49, totalAssetsCr: 1418, roePct: null, source: 'screener.in consolidated (FY24)' },
  ],
}
