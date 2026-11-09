import type { AddOn, DesignPackage, ProjectType } from '../types'

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'residence',
    label: 'Private Residence',
    shortLabel: 'Residence',
    description: 'A home, apartment or country house, designed around the way you live.',
    ratePerSqm: 520,
    defaultArea: 220,
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    shortLabel: 'Hospitality',
    description: 'Hotels, members’ clubs and restaurants with a distinct point of view.',
    ratePerSqm: 680,
    defaultArea: 380,
  },
  {
    id: 'commercial',
    label: 'Commercial',
    shortLabel: 'Commercial',
    description: 'Workplaces, showrooms and retail spaces that carry a brand with restraint.',
    ratePerSqm: 590,
    defaultArea: 300,
  },
]

export const DESIGN_PACKAGES: DesignPackage[] = [
  {
    id: 'essential',
    label: 'Essential',
    description: 'A clear design direction, ready to be developed by your team.',
    multiplier: 0.65,
    features: ['Spatial concept', 'Material & lighting direction', 'Furniture specification'],
    weekBuffer: 0,
  },
  {
    id: 'signature',
    label: 'Signature',
    description: 'Our complete interior architecture service, from concept to completion.',
    multiplier: 1,
    features: ['Everything in Essential', 'Technical drawings & joinery', 'Procurement & site oversight'],
    weekBuffer: 4,
    recommended: true,
  },
  {
    id: 'atelier',
    label: 'Atelier',
    description: 'An immersive, fully managed commission with bespoke pieces and art.',
    multiplier: 1.4,
    features: ['Everything in Signature', 'Bespoke furniture', 'Art curation & styling'],
    weekBuffer: 8,
  },
]

export const ADD_ONS: AddOn[] = [
  {
    id: 'furniture',
    label: 'Furniture curation',
    description: 'Sourcing, commissioning and placing every piece, from vintage finds to bespoke joins.',
    fee: 18000,
  },
  {
    id: 'lighting',
    label: 'Architectural lighting',
    description: 'A layered lighting scheme developed with our lighting consultant.',
    fee: 9500,
  },
  {
    id: 'art',
    label: 'Art & object advisory',
    description: 'Access to our network of galleries, makers and private collections.',
    fee: 7500,
  },
  {
    id: 'management',
    label: 'On-site project management',
    description: 'Weekly site attendance, supplier coordination and quality control.',
    fee: 24000,
  },
]

export const CONFIGURATOR_STEPS = [
  { id: 'type', label: 'Type', title: 'What are you creating?' },
  { id: 'size', label: 'Size', title: 'How large is the space?' },
  { id: 'package', label: 'Package', title: 'Choose your level of service.' },
  { id: 'extras', label: 'Extras', title: 'Add the finishing touches.' },
  { id: 'review', label: 'Review', title: 'Your indicative investment.' },
] as const

export const AREA_MIN = 50
export const AREA_MAX = 800
export const AREA_STEP = 10
export const PRICE_SPREAD = 0.09

export const AREA_PRESETS = [
  { label: 'Apartment', area: 120, note: 'Up to 140 m²' },
  { label: 'Townhouse', area: 280, note: '140 – 360 m²' },
  { label: 'Estate', area: 500, note: '360 m² +' },
]
