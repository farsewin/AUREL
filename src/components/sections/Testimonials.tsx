import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../../data/content'
import { EASE } from '../../lib/motion'
import { cn } from '../../lib/utils'
import { SectionLabel } from '../ui/SectionLabel'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const go = (direction: number) => {
    setIndex((value) => (value + direction + testimonials.length) % testimonials.length)
  }

  return (
    <section className="border-t border-line bg-ivory py-20 md:py-28 lg:py-32">
      <div className="container-aurel">
        <div className="flex flex-col gap-5 border-b border-charcoal/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <SectionLabel index="05" label="In their words" />
          <p className="eyebrow text-[8px] text-stone md:text-[9px]">
            Private clients &amp; collaborators
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-12 md:mt-16 md:grid-cols-12 md:gap-6 lg:mt-20">
          <div className="flex flex-col md:col-span-7">
            <div className="flex-1">
              <span className="block font-serif text-6xl leading-none text-gold/70" aria-hidden="true">
                &ldquo;
              </span>

              <div className="relative mt-3 min-h-[270px] sm:min-h-[280px] md:min-h-[330px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={current.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-x-0 top-0"
                  >
                    <p className="serif-display max-w-[24ch] text-[clamp(1.8rem,3.6vw,3.3rem)] leading-[1.14] text-charcoal">
                      {current.quote}
                    </p>
                    <footer className="mt-7 md:mt-9">
                      <p className="eyebrow text-charcoal/80">{current.name}</p>
                      <p className="eyebrow mt-2 text-[8px] text-stone">
                        {current.project} <span className="mx-2">/</span> {current.location}{' '}
                        <span className="mx-2">/</span> {current.year}
                      </p>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-9 flex items-center justify-between border-t border-charcoal/15 pt-5 md:mt-10">
              <div className="flex items-center gap-5">
                <span className="eyebrow text-[9px] text-charcoal">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center">
                  {testimonials.map((testimonial, itemIndex) => (
                    <button
                      key={testimonial.id}
                      type="button"
                      onClick={() => setIndex(itemIndex)}
                      aria-label={`Show testimonial ${itemIndex + 1}`}
                      aria-current={itemIndex === index ? 'true' : undefined}
                      className="group flex h-9 items-center px-1.5"
                    >
                      <span
                        className={cn(
                          'block h-px transition-all duration-500',
                          itemIndex === index
                            ? 'w-9 bg-charcoal'
                            : 'w-4 bg-charcoal/25 group-hover:bg-charcoal/50',
                        )}
                      />
                    </button>
                  ))}
                </div>
                <span className="eyebrow text-[9px] text-stone">
                  {String(testimonials.length).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex size-11 items-center justify-center border border-charcoal/20 text-charcoal/70 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.25} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="-ml-px flex size-11 items-center justify-center border border-charcoal/20 text-charcoal/70 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="size-4" strokeWidth={1.25} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:pt-16 lg:pt-24">
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory-warm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.imageAlt}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.025 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-charcoal/15 pt-3">
              <p className="eyebrow text-[8px] text-stone">{current.project}</p>
              <p className="eyebrow text-[8px] text-stone">{current.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
