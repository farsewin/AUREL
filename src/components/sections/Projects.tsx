import { useCallback, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/content'
import type { Project } from '../../types'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { TextLink } from '../ui/TextLink'
import { ProjectModal } from './ProjectModal'

interface ProjectsProps {
  onStartProject: () => void
  onContact: () => void
}

const gridPosition: Record<Project['layout'], string> = {
  feature: 'md:col-span-7',
  offset: 'md:col-span-4 md:col-start-9 md:mt-28 lg:mt-40',
  wide: 'md:col-span-10 md:col-start-2 md:mt-6 lg:mt-12',
  landscape: 'md:col-span-5 md:col-start-2',
}

const imageAspect: Record<Project['layout'], string> = {
  feature: 'aspect-[4/5]',
  offset: 'aspect-[3/4]',
  wide: 'aspect-[16/9]',
  landscape: 'aspect-[4/3]',
}

export function Projects({ onStartProject, onContact }: ProjectsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null

  const closeProject = useCallback(() => setSelectedId(null), [])

  const navigateProject = useCallback((next: Project) => {
    setSelectedId(next.id)
  }, [])

  return (
    <section id="projects" className="scroll-mt-[68px] bg-ivory py-20 md:py-28 lg:py-36">
      <div className="container-aurel">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:items-end md:gap-6">
          <Reveal className="md:col-span-8">
            <SectionLabel index="01" label="Selected work" />
            <h2 className="serif-display mt-7 text-[clamp(3.2rem,7.2vw,7rem)] text-charcoal md:mt-9">
              A quieter kind
              <br />
              of <em className="italic">legacy.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-4 md:justify-self-end md:pb-2">
            <p className="max-w-[34ch] text-sm font-light leading-[1.8] text-stone">
              Four recent commissions, each shaped by place, light and the people who live there. A
              selection from the studio&rsquo;s current archive.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 md:max-w-[280px]">
              <span className="eyebrow text-stone">2011 — 2026</span>
              <span className="eyebrow text-stone">04 Projects</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-x-6 md:gap-y-28">
          {projects.map((project, index) => {
            const isWide = project.layout === 'wide'
            return (
              <Reveal
                key={project.id}
                delay={index === 1 ? 0.1 : 0}
                className={`${gridPosition[project.layout]} min-w-0`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className="group block w-full text-left"
                  aria-label={`View ${project.title} case study`}
                >
                  {isWide && (
                    <div className="mb-5 grid grid-cols-1 items-end gap-3 border-b border-line pb-4 sm:grid-cols-2 md:mb-6">
                      <div className="flex items-baseline gap-4">
                        <span className="eyebrow text-gold-deep">{project.index}</span>
                        <h3 className="serif-display text-[clamp(2rem,4vw,3.4rem)] text-charcoal">
                          {project.title}
                        </h3>
                      </div>
                      <p className="eyebrow text-[9px] text-stone sm:text-right">
                        {project.location} <span className="mx-2 text-stone">/</span>{' '}
                        {project.category} <span className="mx-2 text-stone">/</span> {project.year}
                      </p>
                    </div>
                  )}

                  <div
                    className={`relative overflow-hidden bg-ivory-warm ${imageAspect[project.layout]}`}
                  >
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/10" />
                    <span className="absolute right-4 top-4 flex size-10 translate-y-2 items-center justify-center border border-ivory/40 bg-charcoal/20 text-ivory opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:right-5 md:top-5">
                      <ArrowUpRight className="size-4" strokeWidth={1.25} aria-hidden="true" />
                    </span>
                  </div>

                  {!isWide && (
                    <div className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-4">
                      <div>
                        <div className="flex items-baseline gap-3">
                          <span className="eyebrow text-gold-deep">{project.index}</span>
                          <h3 className="serif-display text-[clamp(1.7rem,2.6vw,2.5rem)] text-charcoal transition-colors duration-300 group-hover:text-gold-deep">
                            {project.title}
                          </h3>
                        </div>
                        <p className="eyebrow mt-2.5 text-[8.5px] text-stone md:text-[9px]">
                          {project.location} <span className="mx-2 text-stone">/</span>{' '}
                          {project.category}
                        </p>
                      </div>
                      <span className="eyebrow shrink-0 pt-1 text-[9px] text-stone">
                        {project.year}
                      </span>
                    </div>
                  )}
                </button>
              </Reveal>
            )
          })}

          <Reveal delay={0.08} className="md:col-span-4 md:col-start-8 md:mb-8 md:self-end">
            <div className="border-t border-charcoal/20 pt-5">
              <p className="eyebrow text-stone">Archive</p>
              <p className="serif-display mt-5 max-w-[18ch] text-[clamp(2rem,3.6vw,3rem)] text-charcoal">
                A further <em className="italic">twelve</em> spaces, quietly kept.
              </p>
              <p className="mt-5 max-w-[30ch] text-sm font-light leading-[1.8] text-stone">
                Select commissions remain private. Request the full portfolio and we will share the work
                that is not shown here.
              </p>
              <TextLink className="mt-7" onClick={onContact}>
                Request the archive
              </TextLink>
            </div>
          </Reveal>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        onChangeProject={navigateProject}
        onStartProject={onStartProject}
      />
    </section>
  )
}
