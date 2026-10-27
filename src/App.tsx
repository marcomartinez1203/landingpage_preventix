import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import BenefitsSection from './components/BenefitsSection'
import MarketSection from './components/MarketSection'
import InnovationSection from './components/InnovationSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  // Smooth scroll polyfill for Safari
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="min-h-screen bg-black-deep text-white-warm overflow-x-hidden">
      <Navbar />
      <main>
        <section id="inicio">
          <HeroSection />
        </section>
        <section id="problema">
          <ProblemSection />
        </section>
        <section id="solucion">
          <SolutionSection />
        </section>
        <section id="funcionalidades">
          <FeaturesSection />
        </section>
        <section id="como-funciona">
          <HowItWorksSection />
        </section>
        <section id="beneficios">
          <BenefitsSection />
        </section>
        <section id="mercado">
          <MarketSection />
        </section>
        <section id="innovacion">
          <InnovationSection />
        </section>
        <section id="contacto">
          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
