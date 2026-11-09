import { CONFIGURATOR_STEPS, PROJECT_TYPES } from '../../data/pricing'
import { formatGBP } from '../../lib/pricing'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const stepDetails = [
  'Residence, hospitality or commercial',
  'A considered area, in square metres',
  'Essential, Signature or Atelier',
  'Furniture, lighting, art or management',
  'A clear, indicative design fee',
]

const entryRate = Math.min(...PROJECT_TYPES.map((type) => type.ratePerSqm))

interface EstimatorInviteProps {
  onStartProject: () => void
}

export function EstimatorInvite({ onStartProject }: EstimatorInviteProps) {
  return (
    <section className="border-t border-line bg-ivory py-20 md:py-28 lg:py-32">
      <div className="container-aurel">
        <div className="grid grid-cols-1 gap-y-9 md:grid-cols-12 md:items-end md:gap-6">
          <Reveal className="md:col-span-7">
            <SectionLabel index="04" label="Project estimator" />
            <h2 className="serif-display mt-7 max-w-[13ch] text-[clamp(3.1rem,6.5vw,6.4rem)] text-charcoal md:mt-9">
              An honest place to <em className="italic">begin.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:pb-2">
            <p className="max-w-[34ch] text-[13.5px] font-light leading-[1.9] text-stone">
              Five questions, two minutes. Build a considered estimate for your project before a single
              meeting takes place. No obligation, no automated follow-up.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <Button variant="solid-dark" onClick={onStartProject}>
                Configure your project
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-20">
          <div className="grid grid-cols-1 border-y border-charcoal/20 md:grid-cols-5">
            {CONFIGURATOR_STEPS.map((step, index) => (
              <div
                key={step.id}
                className="flex gap-5 border-t border-charcoal/15 py-5 first:border-t-0 md:block md:border-l md:border-t-0 md:px-5 md:py-7 md:first:border-l-0 lg:px-7 lg:py-8"
              >
                <span className="serif-display mt-[-0.15em] min-w-9 text-[2.1rem] leading-none text-gold-deep md:mt-0 md:text-[2.6rem]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="md:mt-7">
                  <p className="font-serif text-[1.4rem] leading-none text-charcoal md:text-[1.5rem]">
                    {step.label}
                  </p>
                  <p className="mt-2 max-w-[24ch] text-[11.5px] font-light leading-[1.65] text-stone md:mt-3 md:text-xs">
                    {stepDetails[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-6 flex flex-col gap-3 text-[11px] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            Indicative design fees from{' '}
            <span className="text-charcoal">{formatGBP(entryRate)} per m²</span> + VAT.
          </p>
          <p>Excludes furniture, finishes and construction.</p>
        </Reveal>
      </div>
    </section>
  )
}
