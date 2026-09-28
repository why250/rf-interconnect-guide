export type PrecisionConnectorId = '2.92' | '2.4' | '1.85'
export type Gender = 'male' | 'female'

export type AdapterEnd = {
  connector: PrecisionConnectorId
  gender: Gender
}

export type Adapter = {
  partNumber: string
  endA: AdapterEnd
  endB: AdapterEnd
  maxGHz: number
  maxSWR: number
  maxInsertionLossDb: number
  couplingTorqueNm: number
  matingCycles: number
  manufacturer: string
  source: string
  datasheetUrl: string
  series: 'in-series' | 'between-series'
}

const manufacturer = 'Kawashima Manufacturing (KMCO)'
const source = 'SHF Communication Technologies'

const buildVariants = (
  connectorA: PrecisionConnectorId,
  connectorB: PrecisionConnectorId,
  prefixA: string,
  prefixB: string,
  maxGHz: number,
  maxSWR: number,
  maxInsertionLossDb: number,
  datasheetUrl: string,
): Adapter[] => {
  const variants: Array<[Gender, Gender, string]> =
    connectorA === connectorB
      ? [
          ['male', 'female', 'MF'],
          ['female', 'female', 'FF'],
          ['male', 'male', 'MM'],
        ]
      : [
          ['female', 'female', 'F' + prefixB + 'F'],
          ['female', 'male', 'F' + prefixB + 'M'],
          ['male', 'female', 'M' + prefixB + 'F'],
          ['male', 'male', 'M' + prefixB + 'M'],
        ]

  return variants.map(([genderA, genderB, suffix]) => ({
    partNumber:
      connectorA === connectorB
        ? 'KPC' + prefixA + suffix
        : 'KPC' + prefixA + suffix,
    endA: { connector: connectorA, gender: genderA },
    endB: { connector: connectorB, gender: genderB },
    maxGHz,
    maxSWR,
    maxInsertionLossDb,
    couplingTorqueNm: 0.9,
    matingCycles: 1000,
    manufacturer,
    source,
    datasheetUrl,
    series: connectorA === connectorB ? 'in-series' : 'between-series',
  }))
}

export const adapters: Adapter[] = [
  ...buildVariants(
    '2.92',
    '2.92',
    '292',
    '292',
    40,
    1.2,
    0.2,
    'https://www.shf-communication.com/wp-content/uploads/datasheet_kpc_in_series_292_292.pdf',
  ),
  ...buildVariants(
    '2.4',
    '2.4',
    '240',
    '240',
    50,
    1.25,
    0.3,
    'https://www.shf-communication.com/wp-content/uploads/datasheet_kpc_in_series_240_240.pdf',
  ),
  ...buildVariants(
    '1.85',
    '1.85',
    '185',
    '185',
    70,
    1.3,
    0.45,
    'https://www.shf-communication.com/wp-content/uploads/datasheet_kpc_in_series_185_185.pdf',
  ),
  ...buildVariants(
    '2.92',
    '1.85',
    '292',
    '185',
    40,
    1.3,
    0.35,
    'https://www.shf-communication.com/wp-content/uploads/datasheet_kpc_between_series_292_185.pdf',
  ),
  ...buildVariants(
    '2.92',
    '2.4',
    '292',
    '240',
    40,
    1.22,
    0.25,
    'https://www.shf-communication.com/wp-content/uploads/datasheet_kpc_between_series_292_240.pdf',
  ),
  ...buildVariants(
    '2.4',
    '1.85',
    '240',
    '185',
    50,
    1.25,
    0.4,
    'https://www.shf-communication.com/wp-content/uploads/datasheet_kpc_between_series_240_185.pdf',
  ),
]

export const precisionConnectors: Array<{
  id: PrecisionConnectorId
  label: string
}> = [
  { id: '2.92', label: '2.92 mm / K' },
  { id: '2.4', label: '2.4 mm' },
  { id: '1.85', label: '1.85 mm / V' },
]

export const oppositeGender = (gender: Gender): Gender =>
  gender === 'male' ? 'female' : 'male'

const endsMatch = (
  end: AdapterEnd,
  connector: PrecisionConnectorId,
  gender: Gender,
) => end.connector === connector && end.gender === gender

export const adapterMatchesPorts = (
  adapter: Adapter,
  portAConnector: PrecisionConnectorId,
  portAGender: Gender,
  portBConnector: PrecisionConnectorId,
  portBGender: Gender,
) => {
  const neededA = oppositeGender(portAGender)
  const neededB = oppositeGender(portBGender)

  return (
    (endsMatch(adapter.endA, portAConnector, neededA) &&
      endsMatch(adapter.endB, portBConnector, neededB)) ||
    (endsMatch(adapter.endB, portAConnector, neededA) &&
      endsMatch(adapter.endA, portBConnector, neededB))
  )
}

export const directMatePossible = (
  connectorA: PrecisionConnectorId,
  genderA: Gender,
  connectorB: PrecisionConnectorId,
  genderB: Gender,
) => {
  if (genderA === genderB) return false
  if (connectorA === connectorB) return true
  return (
    (connectorA === '2.4' && connectorB === '1.85') ||
    (connectorA === '1.85' && connectorB === '2.4')
  )
}
