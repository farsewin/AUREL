import { services } from '../../data/content'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

interface ServicesProps {
  onStartProject: () => void
}

export function Services({ onStartProject }: ServicesProps) {
  return (
    <section id="services" className="scroll-mt-[68px] bg-charcoal py-20 text-ivory md:py-28 lg:py-36">
      <div className="container-aurel">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7">
            <SectionLabel index="03" label="Services" tone="light" />
            <h2 className="serif-display mt-7 max-w-[13ch] text-[clamp(3.1rem,6.8vw,6.8rem)] text-ivory md:mt-9">
              One hand, from first sketch to <em className="italic text-gold-light">final object.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:self-end md:pb-2">
            <p className="max-w-[36ch] text-[13.5px] font-light leading-[1.9] text-ivory/55">
              We take on a limited number of commissions each year. Every engagement is led by a founding
              partner, supported by a small senior team and a trusted network of makers.
            </p>
            <p className="eyebrow mt-6 text-[8px] text-ivory/60">Engagements typically 9–18 months</p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          <ul className="border-b border-ivory/15">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="group relative border-t border-ivory/15 py-7 md:py-9 lg:py-10"
              >
                <Reveal delay={index * 0.05}>
                  <span
                    className="absolute left-0 top-0 h-px w-0 bg-gold transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-12 items-start gap-x-4 gap-y-4 md:gap-x-6">
                    <span className="col-span-2 pt-1.5 md:col-span-1">
                      <span className="eyebrow text-gold">{service.index}</span>
                    </span>

                    <h3 className="col-span-10 md:col-span-5">
                      <span className="serif-display block text-[clamp(2.05rem,3.5vw,3.15rem)] leading-[1.02] text-ivory transition-[color,transform] duration-500 group-hover:translate-x-1.5 group-hover:text-gold-light">
                        {service.title}
                      </span>
                    </h3>

                    <div className="col-span-12 pl-[16.666%] md:col-span-4 md:col-start-7 md:pl-0">
                      <p className="max-w-[38ch] text-[13px] font-light leading-[1.85] text-ivory/65 transition-colors duration-500 group-hover:text-ivory/85">
                        {service.description}
                      </p>
                      <p className="eyebrow mt-4 text-[7.5px] leading-[1.8] tracking-[0.18em] text-ivory/60 transition-colors duration-500 group-hover:text-ivory/85 md:text-[8px]">
                        {service.deliverables.join(' · ')}
                      </p>
                    </div>

                    <div className="col-span-12 hidden justify-end pt-1 md:col-span-2 md:col-start-11 md:flex">
                      <span className="eyebrow text-[8px] text-ivory/60">Service {service.index}</span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.08} className="mt-14 flex flex-col gap-7 border-t border-ivory/15 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="serif-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1] text-ivory">
              Not sure where your project <em className="italic">begins?</em>
            </p>
            <p className="mt-2 text-[13px] font-light text-ivory/60">
              A first conversation, and an indicative estimate, is the simplest place to start.
            </p>
          </div>
          <Button variant="solid-light" onClick={onStartProject} className="shrink-0 md:ml-8">
            Configure your project
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
