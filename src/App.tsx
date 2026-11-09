import { useCallback, useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Studio } from './components/sections/Studio'
import { Services } from './components/sections/Services'
import { EstimatorInvite } from './components/sections/EstimatorInvite'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { EstimatorDrawer } from './components/configurator/EstimatorDrawer'
import { useScrollSpy } from './hooks/useUi'
import { buildEstimateEnquiry } from './lib/pricing'
import { scrollToSection } from './lib/utils'
import type { ContactPrefill, Estimate } from './types'

export default function App() {
  const [estimatorOpen, setEstimatorOpen] = useState(false)
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null)
  const activeSection = useScrollSpy()

  const openEstimator = useCallback(() => setEstimatorOpen(true), [])
  const closeEstimator = useCallback(() => setEstimatorOpen(false), [])
  const goToContact = useCallback(() => scrollToSection('contact'), [])

  const handleRequestProposal = useCallback((estimate: Estimate) => {
    const addOnNames = estimate.selectedAddOns.map((item) => item.label)
    setContactPrefill({
      subject: `Project enquiry — ${estimate.projectType.label}`,
      message: buildEstimateEnquiry(estimate, addOnNames),
      projectType: estimate.projectType.label,
    })
    setEstimatorOpen(false)
  }, [])

  const clearPrefill = useCallback(() => setContactPrefill(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:border focus:border-charcoal/20 focus:bg-ivory focus:px-4 focus:py-3 focus:text-[10px] focus:uppercase focus:tracking-[0.2em] focus:text-charcoal"
      >
        Skip to content
      </a>

      <Navbar onStartProject={openEstimator} activeSection={activeSection} />

      <main id="main">
        <Hero onStartProject={openEstimator} />
        <Projects onStartProject={openEstimator} onContact={goToContact} />
        <Studio onContact={goToContact} />
        <Services onStartProject={openEstimator} />
        <EstimatorInvite onStartProject={openEstimator} />
        <Testimonials />
        <Contact prefill={contactPrefill} onPrefillConsumed={clearPrefill} />
      </main>

      <Footer onStartProject={openEstimator} />

      <EstimatorDrawer
        open={estimatorOpen}
        onClose={closeEstimator}
        onRequestProposal={handleRequestProposal}
      />

      <motion.div className="grain-overlay" aria-hidden="true" />
    </MotionConfig>
  )
}
