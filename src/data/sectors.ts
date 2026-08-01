import type { Sector } from '../types'

export const sectors: Sector[] = [
  {
    id: 'banks',
    name: 'Banks',
    shortDescription: 'Private banks, PSU banks, and small finance banks listed on NSE/BSE.',
    status: 'active',
    subSectors: [
      { id: 'private-banks', name: 'Private Banks' },
      { id: 'psu-banks', name: 'PSU Banks' },
      { id: 'small-finance-banks', name: 'Small Finance Banks' },
    ],
  },
  {
    id: 'nbfc',
    name: 'NBFCs / Financial Lenders',
    shortDescription: 'Non-bank lenders across diversified, housing, gold loan, microfinance, and vehicle finance.',
    status: 'active',
    subSectors: [
      { id: 'nbfc-diversified', name: 'Diversified / Large NBFC' },
      { id: 'nbfc-vehicle', name: 'Vehicle & Asset Finance' },
      { id: 'nbfc-housing', name: 'Housing Finance' },
      { id: 'nbfc-gold', name: 'Gold Loan' },
      { id: 'nbfc-micro', name: 'Microfinance' },
      { id: 'nbfc-sme', name: 'SME / Small-ticket Lending' },
      { id: 'nbfc-infra', name: 'Infra / PSU Lending Institutions' },
    ],
  },
  // Add the next sector here once you're ready to expand beyond financial lenders,
  // e.g. { id: 'it-services', name: 'IT Services', status: 'planned', subSectors: [...] }
]
