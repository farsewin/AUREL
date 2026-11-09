import { useCallback, useMemo, useState } from 'react'
import { AREA_MAX, AREA_MIN, CONFIGURATOR_STEPS } from '../data/pricing'
import { calculateEstimate, clampArea, getProjectType } from '../lib/pricing'
import type { AddOnId, Estimate, EstimateSelection, PackageId, ProjectTypeId } from '../types'

const initialSelection: EstimateSelection = {
  projectType: null,
  area: 220,
  packageId: null,
  addOns: [],
}

export interface EstimatorController {
  step: number
  direction: number
  selection: EstimateSelection
  estimate: Estimate | null
  canContinue: boolean
  validationMessage: string | null
  isLastStep: boolean
  nextLabel: string
  setProjectType: (id: ProjectTypeId) => void
  setArea: (area: number) => void
  setPackage: (id: PackageId) => void
  toggleAddOn: (id: AddOnId) => void
  goNext: () => void
  goBack: () => void
  goToStep: (step: number) => void
  reset: () => void
}

const nextLabels = [
  'Choose size',
  'Choose package',
  'Add extras',
  'Review estimate',
  'Request a proposal',
]

const validationMessages: Record<number, string | null> = {
  0: 'Select a project type to continue.',
  1: null,
  2: 'Choose a level of service to continue.',
  3: null,
  4: null,
}

export function useEstimator(): EstimatorController {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selection, setSelection] = useState<EstimateSelection>(initialSelection)
  const [areaTouched, setAreaTouched] = useState(false)

  const estimate = useMemo(() => calculateEstimate(selection), [selection])
  const isLastStep = step === CONFIGURATOR_STEPS.length - 1

  const canContinue = useMemo(() => {
    if (step === 0) return selection.projectType !== null
    if (step === 1) return selection.area >= AREA_MIN && selection.area <= AREA_MAX
    if (step === 2) return selection.packageId !== null
    if (step === 3) return true
    return estimate !== null
  }, [step, selection, estimate])

  const setProjectType = useCallback(
    (id: ProjectTypeId) => {
      setSelection((current) => ({
        ...current,
        projectType: id,
        area: areaTouched ? current.area : (getProjectType(id)?.defaultArea ?? current.area),
      }))
    },
    [areaTouched],
  )

  const setArea = useCallback((area: number) => {
    setAreaTouched(true)
    setSelection((current) => ({ ...current, area: clampArea(area) }))
  }, [])

  const setPackage = useCallback((id: PackageId) => {
    setSelection((current) => ({ ...current, packageId: id }))
  }, [])

  const toggleAddOn = useCallback((id: AddOnId) => {
    setSelection((current) => {
      const exists = current.addOns.includes(id)
      return {
        ...current,
        addOns: exists ? current.addOns.filter((item) => item !== id) : [...current.addOns, id],
      }
    })
  }, [])

  const goNext = useCallback(() => {
    if (step >= CONFIGURATOR_STEPS.length - 1) return
    setDirection(1)
    setStep((current) => current + 1)
  }, [step])

  const goBack = useCallback(() => {
    if (step <= 0) return
    setDirection(-1)
    setStep(step - 1)
  }, [step])

  const goToStep = useCallback(
    (target: number) => {
      const next = Math.max(0, Math.min(target, CONFIGURATOR_STEPS.length - 1))
      if (next === step) return
      setDirection(next > step ? 1 : -1)
      setStep(next)
    },
    [step],
  )

  const reset = useCallback(() => {
    setDirection(-1)
    setStep(0)
    setAreaTouched(false)
    setSelection(initialSelection)
  }, [])

  return {
    step,
    direction,
    selection,
    estimate,
    canContinue,
    validationMessage: canContinue ? null : validationMessages[step],
    isLastStep,
    nextLabel: nextLabels[step],
    setProjectType,
    setArea,
    setPackage,
    toggleAddOn,
    goNext,
    goBack,
    goToStep,
    reset,
  }
}
