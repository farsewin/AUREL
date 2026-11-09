import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { projects } from '../../data/content'
import { useDialog } from '../../hooks/useUi'
import { EASE, EASE_IN_OUT } from '../../lib/motion'
import type { Project } from '../../types'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onChangeProject: (project: Project) => void
  onStartProject: () => void
}

export function ProjectModal({
  project,
  onClose,
  onChangeProject,
  onStartProject,
}: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [displayed, setDisplayed] = useState<Project | null>(project)
  const open = project !== null

  if (project && project.id !== displayed?.id) {
    setDisplayed(project)
  }

  useDialog({
    open,
    onClose,
    panelRef,
    initialFocusRef: closeRef,
  })

  useEffect(() => {
    if (!open || !panelRef.current) return
    panelRef.current.scrollTo({ top: 0, behavior: 'auto' })
  }, [open, displayed?.id])

  const currentIndex = displayed ? projects.findIndex((item) => item.id === displayed.id) : -1
  const nextProject =
    currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : projects[0]

  const beginProject = () => {
    onClose()
    window.setTimeout(onStartProject, 180)
  }

  return (
    <AnimatePresence>
      {open && displayed && (
        <motion.div
          key="project-modal"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          tabIndex={-1}
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-ivory text-charcoal outline-none"
        >
          <div className="sticky top-0 z-20 border-b border-line bg-ivory/90 backdrop-blur-xl">
            <div className="container-aurel flex h-[68px] items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="eyebrow text-stone">Case Study</span>
                <span className="hidden h-px w-8 bg-gold/60 sm:block" aria-hidden="true" />
                <span className="eyebrow hidden text-stone sm:block">
                  {displayed.index} / 04
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="group flex min-h-11 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-charcoal/70 transition-colors hover:text-charcoal"
                aria-label="Close case study"
              >
                <span className="hidden sm:inline">Close</span>
                <span className="flex size-10 items-center justify-center border border-charcoal/15 transition-colors group-hover:border-charcoal/50">
                  <X className="size-4" strokeWidth={1.25} aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>

          <div className="container-aurel pb-16 pt-10 md:pb-24 md:pt-16">
            <motion.div
              key={displayed.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_IN_OUT }}
            >
              <div className="grid grid-cols-1 gap-y-7 md:grid-cols-12 md:items-end md:gap-6">
                <div className="md:col-span-8">
                  <SectionLabel index={displayed.index} label={displayed.category} />
                  <h2
                    id="project-modal-title"
                    className="serif-display mt-6 text-[clamp(3.4rem,8vw,7.5rem)] text-charcoal"
                  >
                    {displayed.title}
                  </h2>
                </div>
                <div className="md:col-span-4 md:justify-self-end md:pb-2 md:text-right">
                  <p className="eyebrow text-stone">{displayed.location}</p>
                  <p className="eyebrow mt-2 text-stone">
                    {displayed.year} <span className="mx-2">/</span> {displayed.area}
                  </p>
                </div>
              </div>

              <div className="mt-9 overflow-hidden bg-ivory-warm md:mt-12">
                <img
                  src={displayed.image}
                  alt={displayed.alt}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover md:aspect-[16/9]"
                />
              </div>

              <div className="mt-12 grid grid-cols-1 gap-y-10 md:mt-16 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="border-t border-charcoal/20 pt-5">
                    <p className="eyebrow text-stone">Details</p>
                    <dl className="mt-5 space-y-3.5 text-[13px]">
                      <div className="flex items-baseline justify-between gap-6">
                        <dt className="text-stone">Location</dt>
                        <dd className="text-right text-charcoal">{displayed.location}</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-6">
                        <dt className="text-stone">Year</dt>
                        <dd className="text-right text-charcoal">{displayed.year}</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-6">
                        <dt className="text-stone">Area</dt>
                        <dd className="text-right text-charcoal">{displayed.area}</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-6">
                        <dt className="text-stone">Type</dt>
                        <dd className="text-right text-charcoal">{displayed.category}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-8 border-t border-charcoal/20 pt-5">
                    <p className="eyebrow text-stone">Scope</p>
                    <ul className="mt-4 space-y-2.5 text-[13px] text-charcoal/80">
                      {displayed.scope.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-[0.55em] size-1 shrink-0 bg-gold" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-6">
                  <p className="serif-display max-w-[22ch] text-[clamp(1.8rem,3.2vw,2.75rem)] leading-[1.15] text-charcoal">
                    {displayed.summary}
                  </p>
                  <div className="mt-8 space-y-5 text-[13.5px] font-light leading-[1.85] text-stone md:text-sm">
                    {displayed.story.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-10 border-t border-charcoal/20 pt-7">
                    <p className="eyebrow text-stone">Begin your own</p>
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Button variant="solid-dark" onClick={beginProject}>
                        Start a similar project
                      </Button>
                      <span className="text-xs leading-relaxed text-stone">
                        A first conversation, without obligation.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 border-t border-charcoal/20 pt-6 md:mt-24">
                <p className="eyebrow text-stone">Next project</p>
                <button
                  type="button"
                  onClick={() => onChangeProject(nextProject)}
                  className="group mt-5 flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow text-gold-deep">{nextProject.index}</span>
                    <span className="serif-display text-[clamp(2.4rem,6vw,4.8rem)] text-charcoal transition-colors duration-300 group-hover:text-gold-deep">
                      {nextProject.title}
                    </span>
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center border border-charcoal/20 transition-colors duration-300 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory">
                    <ArrowUpRight className="size-4" strokeWidth={1.25} aria-hidden="true" />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
