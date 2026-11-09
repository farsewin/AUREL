import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { asset } from '../../lib/utils'
import { SectionLabel } from '../ui/SectionLabel'
import { TextLink } from '../ui/TextLink'

const stats = [
  { value: '15', label: 'Years of practice' },
  { value: '124', label: 'Commissions completed' },
  { value: '9', label: 'Design awards' },
  { value: '02', label: 'Studios — London & Copenhagen' },
]

interface StudioProps {
  onContact: () => void
}

export function Studio({ onContact }: StudioProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section id="studio" className="scroll-mt-[68px] border-t border-line/70 bg-ivory-deep py-20 md:py-28 lg:py-36">
      <div className="container-aurel">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-4">
            <SectionLabel index="02" label="The studio" />
            <div className="mt-10 hidden max-w-[22ch] border-t border-charcoal/15 pt-4 md:block">
              <p className="eyebrow text-stone">Practice</p>
              <p className="mt-3 text-[13px] font-light leading-[1.8] text-stone">
                A small, senior team led by its founding partners. Deliberately few projects at a time.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-8">
            <Reveal>
              <h2 className="serif-display max-w-[13ch] text-[clamp(3.1rem,6.4vw,6.6rem)] text-charcoal">
                Rooms that feel <em className="italic">inevitable.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[52ch] text-sm font-light leading-[1.9] text-stone md:mt-10 md:text-[15px]">
                We believe a room is not finished when it looks complete, but when it feels as though it
                could not have been any other way. Our work begins with the life that will happen inside
                it.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-y-12 md:mt-20 md:grid-cols-12 md:gap-6 lg:mt-24">
          <Reveal className="md:col-span-5">
            <div ref={imageRef} className="relative overflow-hidden bg-ivory-warm">
              <motion.img
                src={asset('/images/studio-atelier.webp')}
                alt="A sculptural oak interior in Copenhagen, photographed during an atelier visit"
                loading="lazy"
                decoding="async"
                style={reduceMotion ? undefined : { y: imageY }}
                className="aspect-[4/5] w-full scale-[1.1] object-cover"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-charcoal/15 pt-3">
              <p className="eyebrow text-[8px] text-stone">Material study — Copenhagen</p>
              <p className="eyebrow text-[8px] text-stone">2025</p>
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7 md:pt-10 lg:pt-20">
            <Reveal>
              <p className="eyebrow text-gold-deep">Our point of view</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="serif-display mt-5 max-w-[18ch] text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.1] text-charcoal">
                We listen first. Then we remove everything that does not belong.
              </h3>
            </Reveal>
            <div className="mt-7 space-y-5 text-[13.5px] font-light leading-[1.9] text-stone md:mt-9 md:text-sm">
              <Reveal delay={0.12}>
                <p>
                  AUREL is an interior architecture and design studio based in London and Copenhagen. We
                  work at the intersection of architecture, craft and the everyday — making interiors that
                  are tactile, generous and built to remain.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p>
                  Every commission is led by a founding partner and developed by a small, senior team.
                  We work closely with architects, makers and artisans, and we take on only a limited
                  number of projects each year.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-9 md:mt-11">
              <div className="flex flex-col gap-4 border-t border-charcoal/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-xl italic text-charcoal">Isabel Laurent</p>
                  <p className="eyebrow mt-1 text-[8px] text-stone">Founding partner</p>
                </div>
                <TextLink onClick={onContact}>Begin a conversation</TextLink>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 border-t border-charcoal/20 pt-8 md:mt-24 md:pt-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="serif-display lining-nums block text-[clamp(3.2rem,5.2vw,5rem)] leading-none text-charcoal">
                    {stat.value}
                  </span>
                  <span className="eyebrow mt-4 block max-w-[18ch] text-[8px] leading-[1.7] text-stone md:text-[9px]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
