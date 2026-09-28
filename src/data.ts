export type ConnectorId = 'sma' | '3.5' | '2.92' | '2.4' | '1.85'

export type Connector = {
  id: ConnectorId
  name: string
  alias?: string
  maxGHz: number
  impedanceOhm: number
  family: 'A' | 'B'
  torqueNm: number
  imageUrl: string
  imageAlt: string
  imageCredit: string
  imageSourceUrl: string
  imageLicense: string
  notes: string[]
}

const familyAImage =
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/SMA-family-male-female.jpg?width=1200'

export const connectors: Connector[] = [
  {
    id: 'sma',
    name: 'SMA',
    maxGHz: 24,
    impedanceOhm: 50,
    family: 'A',
    torqueNm: 0.9,
    imageUrl: familyAImage,
    imageAlt: 'SMA, 3.5 mm and 2.92 mm male and female connector comparison',
    imageCredit: 'TheUnnamedNewbie / Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:SMA-family-male-female.jpg',
    imageLicense: 'CC BY-SA 4.0',
    notes: [
      'Semi-precision interface; actual frequency rating is component-specific.',
      'Mechanically intermateable with 3.5 mm and 2.92 mm.',
      'A poor or oversized SMA male center pin can damage a precision interface.',
    ],
  },
  {
    id: '3.5',
    name: '3.5 mm',
    maxGHz: 34,
    impedanceOhm: 50,
    family: 'A',
    torqueNm: 0.9,
    imageUrl: familyAImage,
    imageAlt: 'SMA, 3.5 mm and 2.92 mm male and female connector comparison',
    imageCredit: 'TheUnnamedNewbie / Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:SMA-family-male-female.jpg',
    imageLicense: 'CC BY-SA 4.0',
    notes: [
      'Precision air-dielectric connector widely used in RF test equipment.',
      'Mechanically intermateable with SMA and 2.92 mm.',
      'Useful when repeatability and connector robustness matter.',
    ],
  },
  {
    id: '2.92',
    name: '2.92 mm',
    alias: 'K connector',
    maxGHz: 40,
    impedanceOhm: 50,
    family: 'A',
    torqueNm: 0.9,
    imageUrl: familyAImage,
    imageAlt: 'SMA, 3.5 mm and 2.92 mm male and female connector comparison',
    imageCredit: 'TheUnnamedNewbie / Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:SMA-family-male-female.jpg',
    imageLicense: 'CC BY-SA 4.0',
    notes: [
      'Common precision interface for measurements through 40 GHz.',
      'Mechanically intermateable with SMA and 3.5 mm.',
      'Do not assume an attached SMA component preserves 40 GHz performance.',
    ],
  },
  {
    id: '2.4',
    name: '2.4 mm',
    maxGHz: 50,
    impedanceOhm: 50,
    family: 'B',
    torqueNm: 0.9,
    imageUrl: 'https://products.rosenberger.com/media/image/thumbnail/09s121-271s3_a_600x600.jpg',
    imageAlt: 'Rosenberger 2.4 mm precision RF plug example',
    imageCredit: 'Rosenberger product image (externally hosted)',
    imageSourceUrl: 'https://products.rosenberger.com/radio-frequency/connectors/138942/09s121-271s3-straight-plug',
    imageLicense: 'Vendor image — linked, not redistributed in repository',
    notes: [
      'Precision interface commonly used to 50 GHz.',
      'Intermateable with 1.85 mm.',
      'Not mechanically compatible with SMA / 3.5 mm / 2.92 mm; use a precision adapter.',
    ],
  },
  {
    id: '1.85',
    name: '1.85 mm',
    alias: 'V connector',
    maxGHz: 70,
    impedanceOhm: 50,
    family: 'B',
    torqueNm: 0.57,
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/1.85mm_connector_male_female.jpg?width=1000',
    imageAlt: 'Male and female 1.85 mm RF connectors',
    imageCredit: 'Slingmos / Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:1.85mm_connector_male_female.jpg',
    imageLicense: 'Public domain',
    notes: [
      'Precision interface for mmWave test setups around the 67–70 GHz class.',
      'Intermateable with 2.4 mm.',
      'Inspect pin depth and mating surfaces carefully before connection.',
    ],
  },
]

export type Cable = {
  id: string
  name: string
  bestFor: string
  movement: 'low' | 'medium' | 'high'
  phaseStability: 'basic' | 'good' | 'excellent'
  description: string
  example?: { name: string; url: string }
}

export const cables: Cable[] = [
  {
    id: 'general-flex',
    name: 'General flexible RF cable',
    bestFor: 'Signal generator / spectrum analyzer / bench debug',
    movement: 'high',
    phaseStability: 'basic',
    description:
      'Easy to handle and inexpensive. Select by connector, bandwidth, insertion loss, bend radius and power.',
  },
  {
    id: 'low-loss',
    name: 'Low-loss microwave cable',
    bestFor: 'Longer runs or high-frequency setups where insertion loss matters',
    movement: 'medium',
    phaseStability: 'good',
    description:
      'Lower attenuation than a general patch cable; usually thicker and less convenient to move.',
  },
  {
    id: 'phase-stable',
    name: 'Phase-stable VNA test cable',
    bestFor: 'Calibrated S-parameter measurement',
    movement: 'high',
    phaseStability: 'excellent',
    description:
      'Designed to reduce phase and amplitude change when the cable is flexed after calibration.',
    example: {
      name: 'HUBER+SUHNER SUCOFLEX 500 family',
      url: 'https://www.hubersuhner.com/en/shop/product-family/5107',
    },
  },
  {
    id: 'ruggedized',
    name: 'Ruggedized / armored test cable',
    bestFor: 'Production test and frequent reconnects',
    movement: 'high',
    phaseStability: 'good',
    description:
      'Prioritizes mechanical durability, strain relief and repeated flexing.',
  },
  {
    id: 'semi-rigid',
    name: 'Semi-rigid / conformable cable',
    bestFor: 'Fixed fixtures and low-movement routing',
    movement: 'low',
    phaseStability: 'excellent',
    description:
      'Very repeatable after forming, but unsuitable for frequent movement.',
  },
]

export const isMechanicallyCompatible = (a: ConnectorId, b: ConnectorId) => {
  if (a === b) return true
  const ca = connectors.find((item) => item.id === a)!
  const cb = connectors.find((item) => item.id === b)!
  return ca.family === cb.family
}
