import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { CONFIGURATOR_STEPS } from '../../data/pricing'
import { useDialog } from '../../hooks/useUi'
import { useEstimator } from '../../hooks/useEstimator'
import { EASE, EASE_IN_OUT } from '../../lib/motion'
import { formatRangeCompact } from '../../lib/pricing'
import { cn } from '../../lib/utils'
import type { Estimate } from '../../types'
import { Button } from '../ui/Button'
import {
  StepAddOns,
  StepPackage,
  StepReview,
  StepSize,
  StepType,
} from './EstimatorSteps'

interface EstimatorDrawerProps {
  open: boolean
  onClose: () => void
  onRequestProposal: (estimate: Estimate) => void
}

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 28 : -28,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: EASE },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -20 : 20,
    transition: { duration: 0.22, ease: EASE },
  }),
}

const rootVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 1, transition: { duration: 0.62 } },
}

export function EstimatorDrawer({ open, onClose, onRequestProposal }: EstimatorDrawerProps) {
  const panelRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const estimator = useEstimator()
  const {
    step,
    direction,
    selection,
    estimate,
    canContinue,
    validationMessage,
    isLastStep,
    setProjectType,
    setArea,
    setPackage,
    toggleAddOn,
    goNext,
    goBack,
    goToStep,
    reset,
  } = estimator

  useDialog({
    open,
    onClose,
    panelRef,
    initialFocusRef: closeRef,
  })

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [step, open])

  const handleRequest = () => {
    if (estimate) onRequestProposal(estimate)
  }

  const node = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="estimator-drawer"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={rootVariants}
          className="fixed inset-0 z-[120]"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.35 } },
              exit: { opacity: 0, transition: { duration: 0.45 } },
            }}
            className="absolute inset-0 bg-charcoal/65 backdrop-blur-[6px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="estimator-dialog-title"
            tabIndex={-1}
            variants={{
              hidden: { x: '100%' },
              visible: {
                x: 0,
                transition: { duration: 0.65, ease: EASE_IN_OUT },
              },
              exit: {
                x: '100%',
                transition: { duration: 0.55, ease: EASE_IN_OUT },
              },
            }}
            className="absolute right-0 top-0 flex h-[100dvh] w-full flex-col bg-ivory text-charcoal outline-none sm:w-[min(94vw,680px)]"
          >
            <header className="shrink-0 border-b border-line px-5 pb-5 pt-5 md:px-8 md:pb-6 md:pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="font-serif text-[1.15rem] uppercase tracking-[0.28em] text-charcoal">
                    Aurel
                  </span>
                  <span className="h-3.5 w-px bg-line" aria-hidden="true" />
                  <span className="eyebrow text-[8px] text-stone">Project estimator</span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="group flex size-11 items-center justify-center border border-charcoal/15 text-charcoal/65 transition-colors hover:border-charcoal/50 hover:text-charcoal"
                  aria-label="Close project estimator"
                >
                  <X className="size-4" strokeWidth={1.25} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <p
                  id="estimator-dialog-title"
                  className="font-serif text-[1.45rem] leading-none text-charcoal"
                >
                  Your commission, considered.
                </p>
                <p className="eyebrow shrink-0 text-[8px] text-stone">
                  Step {String(step + 1).padStart(2, '0')} / 05
                </p>
              </div>

              <nav aria-label="Estimator progress" className="mt-5">
                <ol className="grid grid-cols-5 gap-2">
                  {CONFIGURATOR_STEPS.map((item, index) => {
                    const isCurrent = index === step
                    const isComplete = index < step
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => goToStep(index)}
                          disabled={index > step}
                          aria-current={isCurrent ? 'step' : undefined}
                          aria-label={`Step ${index + 1}: ${item.label}`}
                          className={cn(
                            'group block w-full pt-2 text-left transition-opacity',
                            index > step && 'cursor-default',
                          )}
                        >
                          <span
                            className={cn(
                              'block h-px w-full transition-colors duration-500',
                              isCurrent
                                ? 'bg-gold'
                                : isComplete
                                  ? 'bg-charcoal'
                                  : 'bg-line',
                            )}
                          />
                          <span className="mt-2 flex flex-col gap-0.5">
                            <span
                              className={cn(
                                'text-[8px] tabular-nums transition-colors',
                                isCurrent
                                  ? 'text-gold-deep'
                                  : isComplete
                                    ? 'text-charcoal'
                                    : 'text-stone/35',
                              )}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={cn(
                                'text-[6.5px] uppercase tracking-[0.14em] transition-colors',
                                isCurrent
                                  ? 'text-charcoal'
                                  : isComplete
                                    ? 'text-stone'
                                    : 'text-stone/35',
                              )}
                            >
                              {item.label}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            </header>

            <div
              ref={bodyRef}
              className="drawer-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 md:px-8 md:py-9"
            >
              <p className="sr-only" aria-live="polite">
                Step {step + 1} of {CONFIGURATOR_STEPS.length}: {CONFIGURATOR_STEPS[step].label}
              </p>

              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {step === 0 && (
                    <StepType selected={selection.projectType} onSelect={setProjectType} />
                  )}
                  {step === 1 && <StepSize area={selection.area} onAreaChange={setArea} />}
                  {step === 2 && (
                    <StepPackage
                      area={selection.area}
                      projectType={selection.projectType}
                      selected={selection.packageId}
                      onSelect={setPackage}
                    />
                  )}
                  {step === 3 && (
                    <StepAddOns selected={selection.addOns} onToggle={toggleAddOn} />
                  )}
                  {step === 4 && (
                    <StepReview estimate={estimate} onEdit={goToStep} onReset={reset} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="shrink-0 border-t border-line bg-ivory px-5 py-4 md:px-8 md:py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="eyebrow text-[7.5px] text-stone">Indicative fee</p>
                  {estimate ? (
                    <p className="mt-1 truncate font-serif text-[1.05rem] leading-none tabular-nums text-charcoal sm:text-[1.15rem] md:text-[1.45rem]">
                      {formatRangeCompact(estimate.low, estimate.high)}
                      <span className="ml-1.5 hidden align-middle text-[8px] uppercase tracking-[0.14em] text-stone sm:inline">
                        + VAT
                      </span>
                    </p>
                  ) : (
                    <p className="mt-1 text-[10.5px] leading-tight text-stone">
                      Complete options to see a range.
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex size-11 items-center justify-center border border-charcoal/20 text-charcoal/60 transition-colors hover:border-charcoal hover:text-charcoal sm:hidden"
                      aria-label="Previous step"
                    >
                      <ArrowLeft className="size-4" strokeWidth={1.25} aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="hidden h-11 items-center gap-2 border border-charcoal/20 px-4 text-[9px] uppercase tracking-[0.18em] text-charcoal/60 transition-colors hover:border-charcoal hover:text-charcoal disabled:pointer-events-none disabled:opacity-0 sm:flex"
                  >
                    <ArrowLeft className="size-3.5" strokeWidth={1.25} aria-hidden="true" />
                    Back
                  </button>

                  {isLastStep ? (
                    <Button
                      variant="solid-dark"
                      onClick={handleRequest}
                      disabled={!canContinue}
                      className="min-h-11 px-5 py-2.5 text-[9px] tracking-[0.18em] md:px-6"
                    >
                      <span className="sm:hidden">Request</span>
                      <span className="hidden sm:inline">Request a proposal</span>
                    </Button>
                  ) : (
                    <Button
                      variant="solid-dark"
                      onClick={goNext}
                      disabled={!canContinue}
                      className="min-h-11 px-5 py-2.5 text-[9px] tracking-[0.18em] md:px-6"
                    >
                      Continue
                    </Button>
                  )}
                </div>
              </div>

              <p
                aria-live="polite"
                className={cn(
                  'mt-2 text-[9.5px] leading-[1.6]',
                  canContinue ? 'text-stone' : 'text-gold-deep',
                )}
              >
                {validationMessage ?? 'No obligation — only a considered next step.'}
              </p>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null
  return createPortal(node, document.body)
}
