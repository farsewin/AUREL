import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../../lib/motion'
import { asset, scrollToSection } from '../../lib/utils'
import { Button } from '../ui/Button'

interface HeroProps {
  onStartProject: () => void
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const line = {
  hidden: { y: '115%' },
  visible: (index: number) => ({
    y: '0%',
    transition: { duration: 1.1, delay: 0.25 + index * 0.1, ease: EASE },
  }),
}

export function Hero({ onStartProject }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const imageMotion = reduceMotion ? undefined : { y: imageY }

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[690px] max-h-[1120px] w-full overflow-hidden bg-charcoal"
    >
      <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={imageMotion}>
        <motion.img
          src={asset('/images/hero-casa.webp')}
          alt="The living room at Casa Alba, its glass wall opening onto the garden"
          fetchPriority="high"
          decoding="async"
          initial={{ scale: reduceMotion ? 1 : 1.055 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="size-full object-cover object-[center_56%]"
        />
      </motion.div>

      <div className="vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-aurel relative z-10 flex h-full flex-col justify-end pb-6 pt-28 md:pb-8 md:pt-32">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-[1240px]">
          <motion.div variants={fade} className="flex items-center gap-4">
            <span className="h-px w-9 bg-gold md:w-12" aria-hidden="true" />
            <p className="eyebrow text-ivory/70">
              Interior architecture &amp; design<span className="hidden sm:inline"> — London</span>
            </p>
          </motion.div>

          <h1
            className="serif-display mt-6 max-w-[1180px] text-[clamp(3.15rem,10.8vw,9.25rem)] text-ivory md:mt-8"
            aria-label="Spaces that hold the light."
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span custom={0} variants={line} className="block origin-left">
                Spaces that
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span custom={1} variants={line} className="block origin-left">
                hold the <em className="font-light italic text-ivory/95">light.</em>
              </motion.span>
            </span>
          </h1>

          <div className="mt-7 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end md:gap-6">
            <motion.p
              variants={fade}
              className="max-w-[44ch] text-[13.5px] font-light leading-[1.8] text-ivory/70 md:col-span-5 md:text-sm"
            >
              AUREL is an interior architecture studio shaping calm, enduring interiors for private homes
              and considered hospitality. Material, proportion and daylight do the talking.
            </motion.p>

            <motion.div
              variants={fade}
              className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:col-start-8 md:flex-col md:items-end lg:flex-row lg:justify-end"
            >
              <Button
                variant="solid-light"
                onClick={onStartProject}
                className="w-full whitespace-nowrap sm:w-auto"
                showIcon
              >
                Start a project
              </Button>
              <Button
                variant="outline-light"
                onClick={() => scrollToSection('projects')}
                className="w-full whitespace-nowrap sm:w-auto"
                showIcon={false}
              >
                Explore selected work
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 flex items-center justify-between gap-4 border-t border-ivory/20 pt-4 md:mt-12"
        >
          <p className="eyebrow text-[8px] text-ivory/65 md:text-[9px]">
            <span className="hidden sm:inline">Featured — </span>Casa Alba{' '}
            <span className="text-ivory/35">/</span> Cotswolds
          </p>
          <p className="eyebrow hidden text-[9px] text-ivory/55 md:block">
            Est. 2011 <span className="mx-2 text-ivory/30">—</span> London / Copenhagen
          </p>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="group flex min-h-8 items-center gap-3 text-[9px] font-medium uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-ivory"
          >
            <span>Scroll</span>
            <span className="relative block h-7 w-px overflow-hidden bg-ivory/20" aria-hidden="true">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-ivory/80"
                animate={reduceMotion ? undefined : { y: ['-100%', '220%'] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
                }
              />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
