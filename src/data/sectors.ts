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
  {
    id: 'steel',
    name: 'Steel',
    shortDescription:
      'Integrated & long-product steel makers, flat-product/value-added producers, alloy & stainless steel, tubes/pipes, and raw-material (iron ore) names listed on NSE/BSE.',
    status: 'active',
    subSectors: [
      { id: 'steel-integrated-long', name: 'Integrated & Long Products' },
      { id: 'steel-flat-valueadded', name: 'Flat Products / Value-added' },
      { id: 'steel-alloy-stainless', name: 'Alloy & Stainless Steel' },
      { id: 'steel-tubes-pipes', name: 'Tubes, Pipes & Downstream' },
      { id: 'steel-rawmaterials', name: 'Iron Ore & Raw Materials' },
    ],
  },
  {
    id: 'cement',
    name: 'Cement',
    shortDescription:
      'Listed cement manufacturers on NSE/BSE. Sub-sector split is by market-cap/scale tier (large/mid/regional-small) rather than an official classification -- cement has no clean product-line taxonomy the way banks or steel do.',
    status: 'active',
    subSectors: [
      { id: 'cement-largecap', name: 'Large-cap / Pan-India' },
      { id: 'cement-midcap', name: 'Mid-cap / Multi-regional' },
      { id: 'cement-regional-smallcap', name: 'Regional / Small-cap' },
    ],
  },
  // Add the next sector here once you're ready to expand further,
  // e.g. { id: 'it-services', name: 'IT Services', status: 'planned', subSectors: [...] }
]
