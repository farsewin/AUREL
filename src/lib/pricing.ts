import {
  ADD_ONS,
  AREA_MAX,
  AREA_MIN,
  DESIGN_PACKAGES,
  PRICE_SPREAD,
  PROJECT_TYPES,
} from '../data/pricing'
import type {
  AddOn,
  DesignPackage,
  Estimate,
  EstimateSelection,
  PackageId,
  ProjectType,
  ProjectTypeId,
} from '../types'

export const roundTo = (value: number, step = 100) => Math.round(value / step) * step

export function getProjectType(id: ProjectTypeId | null): ProjectType | null {
  return PROJECT_TYPES.find((type) => type.id === id) ?? null
}

export function getDesignPackage(id: PackageId | null): DesignPackage | null {
  return DESIGN_PACKAGES.find((item) => item.id === id) ?? null
}

export function getAddOn(id: string): AddOn | null {
  return ADD_ONS.find((item) => item.id === id) ?? null
}

export function clampArea(area: number): number {
  return Math.min(AREA_MAX, Math.max(AREA_MIN, Math.round(area)))
}

export function calculateDesignFee(
  area: number,
  typeId: ProjectTypeId | null,
  packageId: PackageId | null,
): number | null {
  const projectType = getProjectType(typeId)
  const designPackage = getDesignPackage(packageId)
  if (!projectType || !designPackage) return null

  return roundTo(clampArea(area) * projectType.ratePerSqm * designPackage.multiplier)
}

export function calculateEstimate(selection: EstimateSelection): Estimate | null {
  const projectType = getProjectType(selection.projectType)
  const designPackage = getDesignPackage(selection.packageId)
  if (!projectType || !designPackage) return null

  const area = clampArea(selection.area)
  const base = roundTo(area * projectType.ratePerSqm * designPackage.multiplier)
  const selectedAddOns = ADD_ONS.filter((item) => selection.addOns.includes(item.id))
  const addOnsTotal = selectedAddOns.reduce((total, item) => total + item.fee, 0)
  const midpoint = base + addOnsTotal
  const low = roundTo(midpoint * (1 - PRICE_SPREAD))
  const high = roundTo(midpoint * (1 + PRICE_SPREAD))
  const deposit = roundTo(midpoint * 0.25)
  const weeksBase = Math.round(14 + area / 55 + designPackage.weekBuffer)

  return {
    projectType,
    designPackage,
    area,
    base,
    addOnsTotal,
    midpoint,
    low,
    high,
    deposit,
    weeks: [weeksBase, weeksBase + 6],
    selectedAddOns,
  }
}

export function formatGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatGBPCompact(value: number): string {
  if (value >= 1_000_000) {
    return `£${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}m`
  }
  return `£${Math.round(value / 1000)}k`
}

export function formatRange(low: number, high: number): string {
  return `${formatGBP(low)} – ${formatGBP(high)}`
}

export function formatRangeCompact(low: number, high: number): string {
  return `${formatGBPCompact(low)} – ${formatGBPCompact(high)}`
}

export function describeArea(area: number): string {
  const value = clampArea(area)
  if (value < 130) return 'A considered city apartment'
  if (value < 240) return 'A generous townhouse or lateral apartment'
  if (value < 400) return 'A substantial family home'
  return 'An estate-scale commission or larger property'
}

export function buildEstimateEnquiry(estimate: Estimate, addOnNames: string[]): string {
  const lines = [
    'I would like to discuss a project based on the estimate below.',
    '',
    `Project type: ${estimate.projectType.label}`,
    `Property size: ${estimate.area} m²`,
    `Design package: ${estimate.designPackage.label}`,
    `Indicative design fee: ${formatRange(estimate.low, estimate.high)} + VAT`,
  ]

  if (addOnNames.length > 0) {
    lines.push(`Additional services: ${addOnNames.join(', ')}`)
  }

  lines.push('', 'A little more about the project:')
  return lines.join('\n')
}
