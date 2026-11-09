import { Check } from 'lucide-react'
import {
  ADD_ONS,
  AREA_MAX,
  AREA_MIN,
  AREA_PRESETS,
  DESIGN_PACKAGES,
  PROJECT_TYPES,
} from '../../data/pricing'
import {
  calculateDesignFee,
  describeArea,
  formatGBP,
  formatRange,
} from '../../lib/pricing'
import { cn } from '../../lib/utils'
import type {
  AddOnId,
  Estimate,
  PackageId,
  ProjectTypeId,
} from '../../types'

const stepLabels = ['Type', 'Size', 'Package', 'Extras', 'Review']

function StepHeader({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description?: string
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="eyebrow text-gold-deep">Step {String(step + 1).padStart(2, '0')}</span>
        <span className="h-px w-6 bg-gold/50" aria-hidden="true" />
        <span className="eyebrow text-[8px] text-stone">{stepLabels[step]}</span>
      </div>
      <h3
        id={`estimator-step-${step}`}
        className="serif-display mt-4 max-w-[15ch] text-[clamp(2rem,5.4vw,2.9rem)] leading-[1.02] text-charcoal"
      >
        {title}
      </h3>
      {description && (
        <p className="mt-3 max-w-[42ch] text-[12.5px] font-light leading-[1.8] text-stone">
          {description}
        </p>
      )}
    </div>
  )
}

function CheckMark({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        'mt-0.5 flex size-5 shrink-0 items-center justify-center border transition-colors duration-300',
        selected ? 'border-charcoal bg-charcoal text-ivory' : 'border-charcoal/25 text-transparent',
      )}
      aria-hidden="true"
    >
      <Check className="size-3" strokeWidth={2.2} />
    </span>
  )
}

export function StepType({
  selected,
  onSelect,
}: {
  selected: ProjectTypeId | null
  onSelect: (id: ProjectTypeId) => void
}) {
  return (
    <div>
      <StepHeader
        step={0}
        title="What are you creating?"
        description="Choose the closest fit. We can refine the brief together once we understand the space."
      />

      <fieldset className="mt-6">
        <legend className="sr-only">Project type</legend>
        {PROJECT_TYPES.map((type) => {
          const isSelected = selected === type.id
          return (
            <label
              key={type.id}
              className={cn(
                'choice-row mt-3 flex cursor-pointer items-start gap-4 border p-4 transition-colors duration-300 md:p-5',
                isSelected
                  ? 'border-charcoal bg-ivory-deep'
                  : 'border-line hover:border-charcoal/40',
              )}
            >
              <input
                type="radio"
                name="project-type"
                value={type.id}
                checked={isSelected}
                onChange={() => onSelect(type.id)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-serif text-[1.45rem] leading-none text-charcoal">
                    {type.label}
                  </span>
                  <span className="eyebrow text-[8px] text-stone">
                    From {formatGBP(type.ratePerSqm)} / m²
                  </span>
                </div>
                <p className="mt-2 max-w-[36ch] text-[11.5px] font-light leading-[1.7] text-stone">
                  {type.description}
                </p>
              </div>
              <CheckMark selected={isSelected} />
            </label>
          )
        })}
      </fieldset>
    </div>
  )
}

export function StepSize({
  area,
  onAreaChange,
}: {
  area: number
  onAreaChange: (area: number) => void
}) {
  const progress = ((area - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100

  return (
    <div>
      <StepHeader
        step={1}
        title="How large is the space?"
        description="An approximate internal area is enough to begin. We will confirm exact dimensions at the first site visit."
      />

      <div className="mt-8 flex items-end gap-4">
        <span className="serif-display text-[clamp(4.4rem,14vw,6.6rem)] leading-[0.8] tabular-nums text-charcoal">
          {area}
        </span>
        <span className="mb-1 font-serif text-2xl italic text-stone">m²</span>
      </div>
      <p className="mt-4 text-[11.5px] font-light text-stone">{describeArea(area)}</p>
      <p className="sr-only" aria-live="polite">
        {area} square metres selected
      </p>

      <div className="relative mt-8">
        <span className="absolute inset-x-0 top-5 h-px bg-line" aria-hidden="true" />
        <span
          className="absolute left-0 top-5 h-px bg-charcoal transition-[width] duration-150"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
        <input
          type="range"
          min={AREA_MIN}
          max={AREA_MAX}
          step={10}
          value={area}
          onChange={(event) => onAreaChange(Number(event.target.value))}
          aria-label="Approximate internal area in square metres"
          aria-valuetext={`${area} square metres`}
          className="range-input range-input--bare relative z-10 w-full"
        />
      </div>

      <div className="mt-1 flex items-center justify-between">
        <span className="eyebrow text-[8px] text-stone">{AREA_MIN} m²</span>
        <span className="eyebrow text-[8px] text-stone">{AREA_MAX} m²</span>
      </div>

      <div className="mt-7 flex flex-wrap gap-x-7 gap-y-1 border-t border-line pt-4">
        {AREA_PRESETS.map((preset) => {
          const active = area === preset.area
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onAreaChange(preset.area)}
              aria-pressed={active}
              className={cn(
                'group flex items-baseline gap-2 py-2 text-left transition-colors',
                active ? 'text-charcoal' : 'text-stone hover:text-charcoal',
              )}
            >
              <span
                className={cn(
                  'text-[10px] uppercase tracking-[0.18em]',
                  active && 'underline decoration-gold decoration-1 underline-offset-4',
                )}
              >
                {preset.label}
              </span>
              <span className="text-[9px] text-stone">{preset.area} m²</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function StepPackage({
  area,
  projectType,
  selected,
  onSelect,
}: {
  area: number
  projectType: ProjectTypeId | null
  selected: PackageId | null
  onSelect: (id: PackageId) => void
}) {
  return (
    <div>
      <StepHeader
        step={2}
        title="Choose your level of service."
        description="Every package is led by a founding partner. The difference is the depth of our involvement once the design direction is set."
      />

      <fieldset className="mt-6">
        <legend className="sr-only">Design package</legend>
        {DESIGN_PACKAGES.map((option) => {
          const isSelected = selected === option.id
          const fee = calculateDesignFee(area, projectType, option.id)
          return (
            <label
              key={option.id}
              className={cn(
                'choice-row mt-3 block cursor-pointer border p-4 transition-colors duration-300 md:p-5',
                isSelected
                  ? 'border-charcoal bg-ivory-deep'
                  : 'border-line hover:border-charcoal/40',
              )}
            >
              <input
                type="radio"
                name="design-package"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-serif text-[1.45rem] leading-none text-charcoal">
                      {option.label}
                    </span>
                    {option.recommended && (
                      <span className="border border-gold/50 px-2 py-1 text-[7.5px] font-medium uppercase tracking-[0.18em] text-gold-deep">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-[38ch] text-[11.5px] font-light leading-[1.7] text-stone">
                    {option.description}
                  </p>
                  <p className="mt-3 text-[10px] leading-[1.7] text-stone">
                    {option.features.join(' · ')}
                  </p>
                  <p className="eyebrow mt-3 text-[8px] text-stone">
                    {area} m² <span className="mx-1.5 text-stone">/</span>{' '}
                    {fee ? `from ${formatGBP(fee)}` : 'Add a project type to price'}
                  </p>
                </div>
                <CheckMark selected={isSelected} />
              </div>
            </label>
          )
        })}
      </fieldset>

      <p className="mt-4 text-[10px] leading-[1.7] text-stone">
        Fees shown are indicative design fees only and exclude VAT, furniture, finishes and
        construction.
      </p>
    </div>
  )
}

export function StepAddOns({
  selected,
  onToggle,
}: {
  selected: AddOnId[]
  onToggle: (id: AddOnId) => void
}) {
  const total = ADD_ONS.filter((item) => selected.includes(item.id)).reduce(
    (sum, item) => sum + item.fee,
    0,
  )

  return (
    <div>
      <StepHeader
        step={3}
        title="Add the finishing touches."
        description="Optional services that extend our involvement. Choose any that would be useful; nothing is binding at this stage."
      />

      <fieldset className="mt-6 border-t border-line">
        <legend className="sr-only">Additional services</legend>
        {ADD_ONS.map((item) => {
          const isSelected = selected.includes(item.id)
          return (
            <label
              key={item.id}
              className="choice-row group flex cursor-pointer items-start gap-4 border-b border-line py-4 transition-colors duration-300"
            >
              <input
                type="checkbox"
                name="add-ons"
                value={item.id}
                checked={isSelected}
                onChange={() => onToggle(item.id)}
                className="sr-only"
              />
              <span
                className={cn(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center border transition-colors duration-300',
                  isSelected
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/25 text-transparent group-hover:border-charcoal/50',
                )}
                aria-hidden="true"
              >
                <Check className="size-3" strokeWidth={2.2} />
              </span>
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-[13px] text-charcoal">{item.label}</span>
                  <span className="shrink-0 text-[12px] tabular-nums text-charcoal/75">
                    + {formatGBP(item.fee)}
                  </span>
                </span>
                <span className="mt-1 block max-w-[40ch] text-[10.5px] font-light leading-[1.7] text-stone">
                  {item.description}
                </span>
              </span>
            </label>
          )
        })}
      </fieldset>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="eyebrow text-[8px] text-stone">Additional services</span>
        <span className="font-serif text-xl tabular-nums text-charcoal">
          {total > 0 ? formatGBP(total) : '—'}
        </span>
      </div>
    </div>
  )
}

function ReviewRow({
  label,
  value,
  onEdit,
  multiline = false,
}: {
  label: string
  value: string
  onEdit: () => void
  multiline?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-line py-3.5">
      <div className="min-w-0">
        <p className="eyebrow text-[8px] text-stone">{label}</p>
        <p
          className={cn(
            'mt-1.5 text-[12.5px] leading-[1.6] text-charcoal',
            !multiline && 'truncate',
          )}
        >
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 border-b border-charcoal/25 pb-0.5 text-[9px] uppercase tracking-[0.18em] text-stone transition-colors hover:border-gold hover:text-charcoal"
      >
        Edit
      </button>
    </div>
  )
}

export function StepReview({
  estimate,
  onEdit,
  onReset,
}: {
  estimate: Estimate | null
  onEdit: (step: number) => void
  onReset: () => void
}) {
  if (!estimate) {
    return (
      <div>
        <StepHeader
          step={4}
          title="Your indicative investment."
          description="Complete the previous steps to see an indicative fee."
        />
      </div>
    )
  }

  const addOnValue =
    estimate.selectedAddOns.length > 0
      ? estimate.selectedAddOns.map((item) => item.label).join(', ')
      : 'None selected'

  return (
    <div>
      <StepHeader
        step={4}
        title="Your indicative investment."
        description="A considered starting point, based on the scope you have chosen. No two projects are identical, so this range is refined after a first conversation."
      />

      <div className="mt-7 border border-charcoal/20 bg-ivory-deep/60 p-5 md:p-6">
        <p className="eyebrow text-[8px] text-stone">Indicative design fee</p>
        <p className="serif-display mt-3 whitespace-nowrap text-[clamp(1.75rem,5.6vw,2.65rem)] tabular-nums leading-none text-charcoal">
          {formatRange(estimate.low, estimate.high)}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="text-[10px] text-stone">Excludes VAT · Design fees only</p>
          <p className="text-[10px] text-stone">
            A range of ±9% around the midpoint
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 border-y border-line">
        <div className="py-4 pr-4">
          <p className="eyebrow text-[8px] text-stone">Indicative timeline</p>
          <p className="mt-2 font-serif text-[1.3rem] leading-none text-charcoal">
            {estimate.weeks[0]}–{estimate.weeks[1]} weeks
          </p>
        </div>
        <div className="border-l border-line py-4 pl-4">
          <p className="eyebrow text-[8px] text-stone">Deposit</p>
          <p className="mt-2 font-serif text-[1.3rem] leading-none text-charcoal">
            {formatGBP(estimate.deposit)}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <p className="eyebrow text-[8px] text-stone">Your brief</p>
        <div className="mt-2 border-t border-line">
          <ReviewRow
            label="Project type"
            value={estimate.projectType.label}
            onEdit={() => onEdit(0)}
          />
          <ReviewRow
            label="Area"
            value={`${estimate.area} m²`}
            onEdit={() => onEdit(1)}
          />
          <ReviewRow
            label="Service"
            value={estimate.designPackage.label}
            onEdit={() => onEdit(2)}
          />
          <ReviewRow
            label="Additional services"
            value={addOnValue}
            onEdit={() => onEdit(3)}
            multiline
          />
        </div>
      </div>

      <div className="mt-6 space-y-2.5 text-[11px]">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-stone">Base design fee</span>
          <span className="tabular-nums text-charcoal">{formatGBP(estimate.base)}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-stone">Additional services</span>
          <span className="tabular-nums text-charcoal">
            {estimate.addOnsTotal > 0 ? formatGBP(estimate.addOnsTotal) : '—'}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-charcoal/15 pt-2.5">
          <span className="text-charcoal">Indicative midpoint</span>
          <span className="tabular-nums text-charcoal">{formatGBP(estimate.midpoint)}</span>
        </div>
      </div>

      <p className="mt-6 text-[10px] leading-[1.8] text-stone">
        This estimate is indicative and not a formal quotation. It excludes VAT, travel, furniture,
        finishes, construction and third-party fees. A detailed proposal follows a site visit and
        brief.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 border-b border-charcoal/20 pb-0.5 text-[9px] uppercase tracking-[0.18em] text-stone transition-colors hover:border-gold hover:text-charcoal"
      >
        Start again
      </button>
    </div>
  )
}
