import type { Company } from '../types'

// Starter universe of listed banks & NBFCs believed to be > Rs 1,000 Cr market cap.
// Market cap tiers are indicative (Large/Mid/Small), based on general positioning,
// NOT live-verified figures. Prices and market caps move daily — re-verify before
// acting on anything here, especially names flagged `verifyMcap: true`.
export const companies: Company[] = [
  // --- Private Banks ---
  { id: 'hdfcbank', name: 'HDFC Bank', ticker: 'HDFCBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Large' },
  { id: 'icicibank', name: 'ICICI Bank', ticker: 'ICICIBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Large' },
  { id: 'kotakbank', name: 'Kotak Mahindra Bank', ticker: 'KOTAKBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Large' },
  { id: 'axisbank', name: 'Axis Bank', ticker: 'AXISBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Large' },
  { id: 'indusindbk', name: 'IndusInd Bank', ticker: 'INDUSINDBK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Mid' },
  { id: 'idfcfirstb', name: 'IDFC First Bank', ticker: 'IDFCFIRSTB', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Mid' },
  { id: 'federalbnk', name: 'Federal Bank', ticker: 'FEDERALBNK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Mid' },
  { id: 'bandhanbnk', name: 'Bandhan Bank', ticker: 'BANDHANBNK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Mid' },
  { id: 'rblbank', name: 'RBL Bank', ticker: 'RBLBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Mid' },
  { id: 'yesbank', name: 'Yes Bank', ticker: 'YESBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Mid' },
  { id: 'cityunionbk', name: 'City Union Bank', ticker: 'CUB', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Small' },
  { id: 'kvb', name: 'Karur Vysya Bank', ticker: 'KARURVYSYA', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Small' },
  { id: 'southindbank', name: 'South Indian Bank', ticker: 'SOUTHBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Small', verifyMcap: true },
  { id: 'karnatakabank', name: 'Karnataka Bank', ticker: 'KTKBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Small' },
  { id: 'dcbbank', name: 'DCB Bank', ticker: 'DCBBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Small', verifyMcap: true },
  { id: 'csbbank', name: 'CSB Bank', ticker: 'CSBBANK', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Small', verifyMcap: true },
  { id: 'tmb', name: 'Tamilnad Mercantile Bank', ticker: 'TMB', sectorId: 'banks', subSectorId: 'private-banks', mcapTier: 'Small', verifyMcap: true },

  // --- PSU Banks ---
  { id: 'sbin', name: 'State Bank of India', ticker: 'SBIN', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Large' },
  { id: 'bankbaroda', name: 'Bank of Baroda', ticker: 'BANKBARODA', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Large' },
  { id: 'pnb', name: 'Punjab National Bank', ticker: 'PNB', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Mid' },
  { id: 'canbk', name: 'Canara Bank', ticker: 'CANBK', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Mid' },
  { id: 'unionbank', name: 'Union Bank of India', ticker: 'UNIONBANK', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Mid' },
  { id: 'indianb', name: 'Indian Bank', ticker: 'INDIANB', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Mid' },
  { id: 'bankindia', name: 'Bank of India', ticker: 'BANKINDIA', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Mid' },
  { id: 'maharashtra', name: 'Bank of Maharashtra', ticker: 'MAHABANK', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Mid' },
  { id: 'centralbk', name: 'Central Bank of India', ticker: 'CENTRALBK', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Small' },
  { id: 'iob', name: 'Indian Overseas Bank', ticker: 'IOB', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Small' },
  { id: 'ucobank', name: 'UCO Bank', ticker: 'UCOBANK', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Small' },
  { id: 'psb', name: 'Punjab & Sind Bank', ticker: 'PSB', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Small', verifyMcap: true },
  { id: 'idbi', name: 'IDBI Bank', ticker: 'IDBI', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Mid' },
  { id: 'jkbank', name: 'Jammu & Kashmir Bank', ticker: 'J&KBANK', sectorId: 'banks', subSectorId: 'psu-banks', mcapTier: 'Small' },

  // --- Small Finance Banks ---
  { id: 'ausmallfin', name: 'AU Small Finance Bank', ticker: 'AUBANK', sectorId: 'banks', subSectorId: 'small-finance-banks', mcapTier: 'Mid' },
  { id: 'equitasbnk', name: 'Equitas Small Finance Bank', ticker: 'EQUITASBNK', sectorId: 'banks', subSectorId: 'small-finance-banks', mcapTier: 'Small' },
  { id: 'ujjivansfb', name: 'Ujjivan Small Finance Bank', ticker: 'UJJIVANSFB', sectorId: 'banks', subSectorId: 'small-finance-banks', mcapTier: 'Small' },
  { id: 'esafsfb', name: 'ESAF Small Finance Bank', ticker: 'ESAFSFB', sectorId: 'banks', subSectorId: 'small-finance-banks', mcapTier: 'Small', verifyMcap: true },
  { id: 'utkarshsfb', name: 'Utkarsh Small Finance Bank', ticker: 'UTKARSHBNK', sectorId: 'banks', subSectorId: 'small-finance-banks', mcapTier: 'Small', verifyMcap: true },
  { id: 'suryodaysfb', name: 'Suryoday Small Finance Bank', ticker: 'SURYODAY', sectorId: 'banks', subSectorId: 'small-finance-banks', mcapTier: 'Small', verifyMcap: true },
  { id: 'janasfb', name: 'Jana Small Finance Bank', ticker: 'JSFB', sectorId: 'banks', subSectorId: 'small-finance-banks', mcapTier: 'Small', verifyMcap: true },

  // --- NBFC: Diversified / Large ---
  { id: 'bajfinance', name: 'Bajaj Finance', ticker: 'BAJFINANCE', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Large' },
  { id: 'bajajfinsv', name: 'Bajaj Finserv', ticker: 'BAJAJFINSV', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Large' },
  { id: 'jiofin', name: 'Jio Financial Services', ticker: 'JIOFIN', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Large' },
  { id: 'abcapital', name: 'Aditya Birla Capital', ticker: 'ABCAPITAL', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Mid' },
  { id: 'ltf', name: 'L&T Finance', ticker: 'LTF', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Mid' },
  { id: 'piramalent', name: 'Piramal Enterprises', ticker: 'PEL', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Mid' },
  { id: 'poonawalla', name: 'Poonawalla Fincorp', ticker: 'POONAWALLA', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Mid' },
  { id: 'sammaancap', name: 'Sammaan Capital (fka Indiabulls Housing)', ticker: 'SAMMAANCAP', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Mid' },
  { id: 'iifl', name: 'IIFL Finance', ticker: 'IIFL', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Mid' },
  { id: 'edelweiss', name: 'Edelweiss Financial Services', ticker: 'EDELWEISS', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Small' },
  { id: 'motilaloswal', name: 'Motilal Oswal Financial Services', ticker: 'MOTILALOFS', sectorId: 'nbfc', subSectorId: 'nbfc-diversified', mcapTier: 'Mid' },

  // --- NBFC: Vehicle & Asset Finance ---
  { id: 'cholafin', name: 'Cholamandalam Investment & Finance', ticker: 'CHOLAFIN', sectorId: 'nbfc', subSectorId: 'nbfc-vehicle', mcapTier: 'Large' },
  { id: 'shriramfin', name: 'Shriram Finance', ticker: 'SHRIRAMFIN', sectorId: 'nbfc', subSectorId: 'nbfc-vehicle', mcapTier: 'Large' },
  { id: 'm&mfin', name: 'M&M Financial Services', ticker: 'M&MFIN', sectorId: 'nbfc', subSectorId: 'nbfc-vehicle', mcapTier: 'Mid' },
  { id: 'sundaramfin', name: 'Sundaram Finance', ticker: 'SUNDARMFIN', sectorId: 'nbfc', subSectorId: 'nbfc-vehicle', mcapTier: 'Mid' },

  // --- NBFC: Housing Finance ---
  { id: 'lichsgfin', name: 'LIC Housing Finance', ticker: 'LICHSGFIN', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Mid' },
  { id: 'pnbhousing', name: 'PNB Housing Finance', ticker: 'PNBHOUSING', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Mid' },
  { id: 'bajajhfl', name: 'Bajaj Housing Finance', ticker: 'BAJAJHFL', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Large' },
  { id: 'canfinhome', name: 'Can Fin Homes', ticker: 'CANFINHOME', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Small' },
  { id: 'aavas', name: 'Aavas Financiers', ticker: 'AAVAS', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Small' },
  { id: 'aptus', name: 'Aptus Value Housing Finance', ticker: 'APTUS', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Small' },
  { id: 'homefirst', name: 'Home First Finance', ticker: 'HOMEFIRST', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Small' },
  { id: 'repco', name: 'Repco Home Finance', ticker: 'REPCOHOME', sectorId: 'nbfc', subSectorId: 'nbfc-housing', mcapTier: 'Small', verifyMcap: true },

  // --- NBFC: Gold Loan ---
  { id: 'muthootfin', name: 'Muthoot Finance', ticker: 'MUTHOOTFIN', sectorId: 'nbfc', subSectorId: 'nbfc-gold', mcapTier: 'Large' },
  { id: 'manappuram', name: 'Manappuram Finance', ticker: 'MANAPPURAM', sectorId: 'nbfc', subSectorId: 'nbfc-gold', mcapTier: 'Mid' },

  // --- NBFC: Microfinance ---
  { id: 'cregrameen', name: 'CreditAccess Grameen', ticker: 'CREDITACC', sectorId: 'nbfc', subSectorId: 'nbfc-micro', mcapTier: 'Mid' },
  { id: 'spandana', name: 'Spandana Sphoorty Financial', ticker: 'SPANDANA', sectorId: 'nbfc', subSectorId: 'nbfc-micro', mcapTier: 'Small', verifyMcap: true },
  { id: 'fusion', name: 'Fusion Finance', ticker: 'FUSION', sectorId: 'nbfc', subSectorId: 'nbfc-micro', mcapTier: 'Small', verifyMcap: true },
  { id: 'satin', name: 'Satin Creditcare Network', ticker: 'SATIN', sectorId: 'nbfc', subSectorId: 'nbfc-micro', mcapTier: 'Small', verifyMcap: true },

  // --- NBFC: SME / Small-ticket ---
  { id: 'fivestar', name: 'Five-Star Business Finance', ticker: 'FIVESTAR', sectorId: 'nbfc', subSectorId: 'nbfc-sme', mcapTier: 'Mid' },
  { id: 'sbfc', name: 'SBFC Finance', ticker: 'SBFC', sectorId: 'nbfc', subSectorId: 'nbfc-sme', mcapTier: 'Small' },

  // --- NBFC: Infra / PSU Lending Institutions ---
  { id: 'recltd', name: 'REC Limited', ticker: 'RECLTD', sectorId: 'nbfc', subSectorId: 'nbfc-infra', mcapTier: 'Large' },
  { id: 'pfc', name: 'Power Finance Corporation', ticker: 'PFC', sectorId: 'nbfc', subSectorId: 'nbfc-infra', mcapTier: 'Large' },
  { id: 'irfc', name: 'Indian Railway Finance Corporation', ticker: 'IRFC', sectorId: 'nbfc', subSectorId: 'nbfc-infra', mcapTier: 'Large' },
  { id: 'ireda', name: 'Indian Renewable Energy Development Agency', ticker: 'IREDA', sectorId: 'nbfc', subSectorId: 'nbfc-infra', mcapTier: 'Mid' },
]
