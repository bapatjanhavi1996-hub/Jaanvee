import type { Company } from '../types'

// Universe: listed brokers / capital-market intermediaries on NSE/BSE.
// As with cement, there was NO bulk Ace Equity/Accord Fintech export for this
// sector in this pass -- the universe and market caps were assembled via web
// research, research date 2026-10-03. Treat every marketCapCr as approximate
// and re-pull from a live export before acting on it:
//   * Figures carrying `verifyMcap: true` were NOT found in a clean sourced
//     print during research and are rough placeholders -- the number is
//     directional only.
//   * The seven names WITHOUT the flag (Motilal Oswal, 360 ONE, Nuvama,
//     Prudent, IIFL Capital, Anand Rathi Share & Stock, 5paisa) were taken
//     from a dated screener print on 2026-10-03.
// latestPrice / priceToBV / ttmPE are null across the board (same as cement) --
// no reliable per-company source surfaced and estimating them would be worse
// than leaving the gap explicit.
//
// ISINs are best-effort from research; a few (notably Groww, newly listed
// Nov-2025) could not be confirmed and are left blank rather than guessed.
// Re-pull identifiers from a live export.
//
// Sub-sector split is by BUSINESS MODEL, not an official taxonomy. Note two
// of the biggest players in the sector -- Zerodha and Upstox -- are NOT here
// because they are unlisted (hence not investable); they dominate the active-
// client league table in brokerSectorAggregates.ts and you cannot read the
// listed names' market share without them. ICICI Securities, once the largest
// bank-led broker, delisted in Mar-2024 after being absorbed into ICICI Bank
// via share swap, so it is also absent.
export const brokerCompanies: Company[] = [
  // ---------------- DISCOUNT / DIGITAL-FIRST ----------------
  {
    id: 'angel-one-ltd',
    name: 'Angel One Ltd.',
    isin: 'INE732I01013',
    sectorId: 'brokers',
    subSectorId: 'brokers-discount',
    industryLabel: 'Stock Broking - Discount',
    marketCapCr: 24000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'Market cap approximate (verify). The listed bellwether of the discount model: moved from percentage brokerage to flat ₹20/order in 2019-20, rebranded Angel Broking → Angel One, now positioning as a fintech (AMC, wealth, credit distribution, Super App).',
  },
  {
    id: 'billionbrains-garage-ventures-ltd',
    name: 'Billionbrains Garage Ventures Ltd. (Groww)',
    isin: '',
    sectorId: 'brokers',
    subSectorId: 'brokers-discount',
    industryLabel: 'Stock Broking - Discount',
    marketCapCr: 75000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'Groww\'s listed entity. IPO Nov-2025 (listed ₹114 vs ₹100 issue; raised ~₹6,630 Cr). #1 broker by NSE active clients since 2023. Market cap approximate -- verify; ISIN not confirmed.',
  },
  {
    id: '5paisa-capital-ltd',
    name: '5paisa Capital Ltd.',
    isin: 'INE618L01018',
    sectorId: 'brokers',
    subSectorId: 'brokers-discount',
    industryLabel: 'Stock Broking - Discount',
    marketCapCr: 1532,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
  },

  // ---------------- FULL-SERVICE / TRADITIONAL ----------------
  {
    id: 'motilal-oswal-financial-services-ltd',
    name: 'Motilal Oswal Financial Services Ltd.',
    isin: 'INE338I01027',
    sectorId: 'brokers',
    subSectorId: 'brokers-fullservice',
    industryLabel: 'Stock Broking - Full Service / Diversified',
    marketCapCr: 61862,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    note: 'Most diversified of the listed brokers: broking + AMC + wealth + capital markets (IB) + housing finance + large treasury/equity book. The equity-investment/treasury book makes reported PAT volatile (mark-to-market driven) -- read operating segments, not headline PAT.',
  },
  {
    id: 'iifl-capital-services-ltd',
    name: 'IIFL Capital Services Ltd.',
    isin: '',
    sectorId: 'brokers',
    subSectorId: 'brokers-fullservice',
    industryLabel: 'Stock Broking - Full Service',
    marketCapCr: 10674,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    note: 'Renamed from IIFL Securities. Broking + institutional equities + investment banking + distribution. ISIN not confirmed -- verify.',
  },
  {
    id: 'anand-rathi-share-stock-brokers-ltd',
    name: 'Anand Rathi Share & Stock Brokers Ltd.',
    isin: '',
    sectorId: 'brokers',
    subSectorId: 'brokers-fullservice',
    industryLabel: 'Stock Broking - Full Service',
    marketCapCr: 3084,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    note: 'The BROKING arm of the Anand Rathi group (listed 2025) -- distinct from Anand Rathi Wealth Ltd below. ISIN not confirmed -- verify.',
  },
  {
    id: 'geojit-financial-services-ltd',
    name: 'Geojit Financial Services Ltd.',
    isin: 'INE007B01023',
    sectorId: 'brokers',
    subSectorId: 'brokers-fullservice',
    industryLabel: 'Stock Broking - Full Service',
    marketCapCr: 2000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'South-India-focused full-service broker with a research/advisory heritage; BNP Paribas is a large shareholder. Market cap approximate -- verify.',
  },

  // ---------------- WEALTH MANAGEMENT ----------------
  {
    id: '360-one-wam-ltd',
    name: '360 ONE WAM Ltd.',
    isin: 'INE466L01038',
    sectorId: 'brokers',
    subSectorId: 'brokers-wealth',
    industryLabel: 'Wealth & Asset Management',
    marketCapCr: 44514,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    note: 'Formerly IIFL Wealth. Pure-play UHNI/HNI wealth + asset management -- fee/AUM-based, almost no retail-transaction exposure, so structurally insulated from the F&O squeeze that hits the discount names.',
  },
  {
    id: 'nuvama-wealth-management-ltd',
    name: 'Nuvama Wealth Management Ltd.',
    isin: 'INE531F01015',
    sectorId: 'brokers',
    subSectorId: 'brokers-wealth',
    industryLabel: 'Wealth & Asset Management',
    marketCapCr: 32013,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    note: 'Demerged from Edelweiss; PAG-backed. Wealth + asset services + capital markets + asset management. HNI/affluent tilt.',
  },
  {
    id: 'anand-rathi-wealth-ltd',
    name: 'Anand Rathi Wealth Ltd.',
    isin: 'INE463V01026',
    sectorId: 'brokers',
    subSectorId: 'brokers-wealth',
    industryLabel: 'Wealth Management',
    marketCapCr: 20000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'Mutual-fund + structured-product led wealth manager for the mass-affluent/HNI segment. Distinct from the group\'s broking arm above. Market cap approximate -- verify.',
  },

  // ---------------- MF & PRODUCT DISTRIBUTION ----------------
  {
    id: 'prudent-corporate-advisory-services-ltd',
    name: 'Prudent Corporate Advisory Services Ltd.',
    isin: 'INE00F201020',
    sectorId: 'brokers',
    subSectorId: 'brokers-distribution',
    industryLabel: 'MF Distribution',
    marketCapCr: 14083,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    note: 'B2B2C mutual-fund distribution platform (serves ~imposing network of MF distributors). A pure financialization/SIP-flow play -- revenue is trail commission on AUM, not broking, so it rises with SIP book regardless of F&O.',
  },

  // ---------------- MARKET INFRASTRUCTURE (PICKS & SHOVELS) ----------------
  {
    id: 'central-depository-services-ltd',
    name: 'Central Depository Services (India) Ltd. (CDSL)',
    isin: 'INE736A01011',
    sectorId: 'brokers',
    subSectorId: 'brokers-mii',
    industryLabel: 'Depository',
    marketCapCr: 35000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: '~80% of all demat accounts. A toll booth on account growth and corporate actions, largely independent of trading volumes -- the cleanest "more investors" play. Market cap approximate -- verify.',
  },
  {
    id: 'bse-ltd',
    name: 'BSE Ltd.',
    isin: 'INE118H01025',
    sectorId: 'brokers',
    subSectorId: 'brokers-mii',
    industryLabel: 'Exchange',
    marketCapCr: 110000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'Took meaningful index-options share from NSE via Sensex/Bankex weekly contracts -- the one name that directly benefited from SEBI\'s expiry-day rationalisation. Also parents CDSL (large stake) and StAR MF. Market cap approximate -- verify; moves a lot.',
  },
  {
    id: 'multi-commodity-exchange-of-india-ltd',
    name: 'Multi Commodity Exchange of India Ltd. (MCX)',
    isin: 'INE745G01035',
    sectorId: 'brokers',
    subSectorId: 'brokers-mii',
    industryLabel: 'Exchange',
    marketCapCr: 35000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'Near-monopoly commodity-derivatives exchange. Options-on-futures volumes (gold, silver, crude, natgas) are the growth driver; commodity F&O was less directly hit by the equity-F&O curbs. Market cap approximate -- verify.',
  },
  {
    id: 'computer-age-management-services-ltd',
    name: 'Computer Age Management Services Ltd. (CAMS)',
    isin: 'INE596I01012',
    sectorId: 'brokers',
    subSectorId: 'brokers-mii',
    industryLabel: 'Registrar & Transfer Agent (RTA)',
    marketCapCr: 20000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'Dominant MF registrar (~70% of MF AUM serviced) -- revenue scales with MF AUM/folios, a direct SIP-flow proxy, uncorrelated to F&O. Market cap approximate -- verify.',
  },
  {
    id: 'kfin-technologies-ltd',
    name: 'KFin Technologies Ltd.',
    isin: 'INE138W01020',
    sectorId: 'brokers',
    subSectorId: 'brokers-mii',
    industryLabel: 'Registrar & Transfer Agent (RTA)',
    marketCapCr: 25000,
    latestPrice: null,
    priceToBV: null,
    ttmPE: null,
    verifyMcap: true,
    note: 'The #2 RTA (vs CAMS) plus international/issuer-solutions businesses. Same SIP/AUM-flow logic as CAMS. Market cap approximate -- verify; ISIN verify.',
  },
]
