import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { SectionId } from '../types'

let scrollLockCount = 0
let previousOverflow = ''
let previousPaddingRight = ''

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    if (scrollLockCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      previousOverflow = document.body.style.overflow
      previousPaddingRight = document.body.style.paddingRight
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    scrollLockCount += 1

    return () => {
      scrollLockCount = Math.max(0, scrollLockCount - 1)
      if (scrollLockCount === 0) {
        document.body.style.overflow = previousOverflow
        document.body.style.paddingRight = previousPaddingRight
      }
    }
  }, [locked])
}

interface DialogOptions {
  open: boolean
  onClose: () => void
  panelRef: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
}

export function useDialog({ open, onClose, panelRef, initialFocusRef }: DialogOptions) {
  const previousFocus = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return

    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const focusTimer = window.setTimeout(() => {
      const target = initialFocusRef?.current ?? panelRef.current
      target?.focus({ preventScroll: true })
    }, 80)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (focusable.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === first || activeElement === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus.current?.focus({ preventScroll: true })
    }
  }, [open, panelRef, initialFocusRef])
}

const spySections: SectionId[] = ['projects', 'studio', 'services', 'contact']

export function useScrollSpy(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const focusLine = window.innerHeight * 0.42
      let current: SectionId | null = null

      for (const id of spySections) {
        const element = document.getElementById(id)
        if (!element) continue
        const rect = element.getBoundingClientRect()
        if (rect.top <= focusLine && rect.bottom > focusLine) {
          current = id
        }
      }

      setActive((existing) => (existing === current ? existing : current))
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return active
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}
