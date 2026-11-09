export type SectionId = 'projects' | 'studio' | 'services' | 'contact'

export type ProjectLayout = 'feature' | 'offset' | 'wide' | 'landscape'

export interface Project {
  id: string
  index: string
  title: string
  location: string
  category: string
  year: string
  image: string
  alt: string
  layout: ProjectLayout
  summary: string
  story: string[]
  scope: string[]
  area: string
}

export interface Service {
  id: string
  index: string
  title: string
  description: string
  deliverables: string[]
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  project: string
  location: string
  year: string
  image: string
  imageAlt: string
}

export interface NavItem {
  label: string
  href: string
  section: SectionId
}

export type ProjectTypeId = 'residence' | 'hospitality' | 'commercial'
export type PackageId = 'essential' | 'signature' | 'atelier'
export type AddOnId = 'furniture' | 'lighting' | 'art' | 'management'

export interface ProjectType {
  id: ProjectTypeId
  label: string
  shortLabel: string
  description: string
  ratePerSqm: number
  defaultArea: number
}

export interface DesignPackage {
  id: PackageId
  label: string
  description: string
  multiplier: number
  features: string[]
  weekBuffer: number
  recommended?: boolean
}

export interface AddOn {
  id: AddOnId
  label: string
  description: string
  fee: number
}

export interface EstimateSelection {
  projectType: ProjectTypeId | null
  area: number
  packageId: PackageId | null
  addOns: AddOnId[]
}

export interface Estimate {
  projectType: ProjectType
  designPackage: DesignPackage
  area: number
  base: number
  addOnsTotal: number
  midpoint: number
  low: number
  high: number
  deposit: number
  weeks: [number, number]
  selectedAddOns: AddOn[]
}

export interface ContactPrefill {
  subject: string
  message: string
  projectType: string
}
