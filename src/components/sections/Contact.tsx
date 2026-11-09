import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { EASE } from '../../lib/motion'
import { cn } from '../../lib/utils'
import type { ContactPrefill } from '../../types'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

interface ContactProps {
  prefill: ContactPrefill | null
  onPrefillConsumed: () => void
}

type FormState = {
  name: string
  email: string
  projectType: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = {
  name: '',
  email: '',
  projectType: 'Private Residence',
  message: '',
}

const projectOptions = ['Private Residence', 'Hospitality', 'Commercial', 'Not sure yet']

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Please tell us your name.'
  if (!form.email.trim()) {
    errors.email = 'Please add an email address.'
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = 'Please check the email address.'
  }
  if (!form.message.trim()) {
    errors.message = 'A few words about the project, please.'
  } else if (form.message.trim().length < 12) {
    errors.message = 'A little more detail will help us respond well.'
  }
  return errors
}

export function Contact({ prefill, onPrefillConsumed }: ContactProps) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [prefilled, setPrefilled] = useState(false)
  const formPanelRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!prefill) return
    // A proposal request is an external event from the parent; sync it into the form.
    // oxlint-disable-next-line react/set-state-in-effect
    setForm((current) => ({
      ...current,
      projectType: prefill.projectType,
      message: prefill.message,
    }))
    setPrefilled(true)
    setStatus('idle')
    onPrefillConsumed()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => {
      formPanelRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }, 650)
    window.setTimeout(() => {
      document.getElementById('name')?.focus({ preventScroll: true })
    }, 850)
  }, [prefill, onPrefillConsumed])

  useEffect(() => {
    const field = messageRef.current
    if (!field) return
    field.style.height = 'auto'
    field.style.height = `${Math.min(field.scrollHeight, 360)}px`
  }, [form.message])

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = nextErrors.name
        ? 'name'
        : nextErrors.email
          ? 'email'
          : nextErrors.message
            ? 'message'
            : null
      if (firstInvalid) document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus('sending')
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 1100)
    })
    setStatus('success')
    setForm(initialForm)
    setPrefilled(false)
  }

  const restart = () => {
    setStatus('idle')
    setForm(initialForm)
    setErrors({})
    setPrefilled(false)
  }

  const fieldClasses = (hasError: boolean) =>
    cn(
      'w-full border-0 border-b bg-transparent py-3 text-[14px] font-light text-ivory outline-none transition-colors duration-300 placeholder:text-ivory/50 focus:ring-0',
      hasError ? 'border-gold-light' : 'border-ivory/25 focus:border-gold',
    )

  return (
    <section id="contact" className="scroll-mt-[68px] bg-charcoal py-20 text-ivory md:py-28 lg:py-36">
      <div className="container-aurel">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-6 lg:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel index="06" label="Contact" tone="light" />
              <h2 className="serif-display mt-7 max-w-[10ch] text-[clamp(3.4rem,6.4vw,6.2rem)] text-ivory md:mt-9">
                Let&rsquo;s begin with a <em className="italic text-gold-light">conversation.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[34ch] text-[13.5px] font-light leading-[1.9] text-ivory/65 md:mt-9">
                Tell us a little about the place, the people and what you hope to make of it. We reply to
                every enquiry personally, within two working days.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-10 md:mt-14">
              <div className="border-t border-ivory/15">
                <div className="grid grid-cols-2 gap-6 border-b border-ivory/15 py-5">
                  <div>
                    <p className="eyebrow text-[8px] text-ivory/55">Enquiries</p>
                    <a
                      href="mailto:studio@aurel.design"
                      className="link-line mt-2.5 inline-block text-[13px] text-ivory/80"
                    >
                      studio@aurel.design
                    </a>
                  </div>
                  <div>
                    <p className="eyebrow text-[8px] text-ivory/55">Telephone</p>
                    <a
                      href="tel:+442079460832"
                      className="link-line mt-2.5 inline-block text-[13px] text-ivory/80"
                    >
                      +44 (0)20 7946 0832
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-b border-ivory/15 py-5">
                  <div>
                    <p className="eyebrow text-[8px] text-ivory/55">London</p>
                    <address className="mt-2.5 text-[13px] not-italic leading-[1.8] text-ivory/70">
                      14 Marylebone Lane
                      <br />
                      London W1U 2NF
                    </address>
                  </div>
                  <div>
                    <p className="eyebrow text-[8px] text-ivory/55">Copenhagen</p>
                    <address className="mt-2.5 text-[13px] not-italic leading-[1.8] text-ivory/70">
                      Bredgade 24
                      <br />
                      1260 København K
                    </address>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
                  <span className="eyebrow text-[8px] text-ivory/55">Follow</span>
                  {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
                    <a
                      key={social}
                      href={`https://www.${social.toLowerCase()}.com`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-line inline-block py-1 text-[11px] text-ivory/70 transition-colors hover:text-ivory"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7 md:pt-1">
            <div
              ref={formPanelRef}
              className="scroll-mt-20 border border-ivory/15 px-5 py-7 sm:px-8 sm:py-9 md:px-9 md:py-10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-ivory/60">Project enquiry</p>
                <p className="eyebrow text-[8px] text-ivory/60">* Required</p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[420px] flex-col justify-center py-8"
                    role="status"
                  >
                    <span className="flex size-12 items-center justify-center border border-gold/50">
                      <Check className="size-5 text-gold" strokeWidth={1.25} aria-hidden="true" />
                    </span>
                    <h3 className="serif-display mt-8 text-4xl text-ivory md:text-5xl">
                      Thank you — it&rsquo;s with us.
                    </h3>
                    <p className="mt-4 max-w-[36ch] text-sm font-light leading-[1.85] text-ivory/65">
                      We have received your enquiry and will reply personally within two working days. In
                      the meantime, our recent work is always here to revisit.
                    </p>
                    <Button
                      variant="outline-light"
                      onClick={restart}
                      showIcon={false}
                      className="mt-8 self-start"
                    >
                      Send another enquiry
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-8"
                  >
                    {prefilled && (
                      <p className="mb-7 flex items-start gap-2 border-l border-gold/60 pl-3 text-[11px] leading-relaxed text-gold-light/90">
                        Your estimate has been added below. Feel free to adjust the message.
                      </p>
                    )}

                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="eyebrow block text-[8px] text-ivory/60">
                          Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(event) => updateField('name', event.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={cn('contact-input mt-1', fieldClasses(Boolean(errors.name)))}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-2 text-[11px] text-gold-light">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="eyebrow block text-[8px] text-ivory/60">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) => updateField('email', event.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={cn('contact-input mt-1', fieldClasses(Boolean(errors.email)))}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-2 text-[11px] text-gold-light">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="relative mt-6">
                      <label htmlFor="project-type" className="eyebrow block text-[8px] text-ivory/60">
                        Project type
                      </label>
                      <div className="relative">
                        <select
                          id="project-type"
                          name="projectType"
                          value={form.projectType}
                          onChange={(event) => updateField('projectType', event.target.value)}
                          className="w-full appearance-none border-0 border-b border-ivory/25 bg-transparent py-3 pr-8 text-[14px] font-light text-ivory outline-none transition-colors duration-300 focus:border-gold"
                        >
                          {projectOptions.map((option) => (
                            <option key={option} value={option} className="bg-ivory text-charcoal">
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-ivory/40"
                          strokeWidth={1.25}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="message" className="eyebrow block text-[8px] text-ivory/60">
                        Message *
                      </label>
                      <textarea
                        ref={messageRef}
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={cn(
                          'contact-input mt-1 resize-none leading-[1.8]',
                          fieldClasses(Boolean(errors.message)),
                        )}
                        placeholder="The place, the scale, and what you have in mind…"
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-2 text-[11px] text-gold-light">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col gap-5 border-t border-ivory/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-[28ch] text-[10.5px] leading-[1.7] text-ivory/55">
                        Your details stay with the studio. No lists, no automated follow-up.
                      </p>
                      <Button
                        type="submit"
                        variant="solid-light"
                        disabled={status === 'sending'}
                        showIcon={status !== 'sending'}
                        className="min-w-[170px] shrink-0"
                      >
                        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                      </Button>
                    </div>

                    <div aria-live="polite" className="sr-only">
                      {status === 'sending' ? 'Sending your enquiry.' : ''}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
