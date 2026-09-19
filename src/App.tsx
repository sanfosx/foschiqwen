import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Technologies from './components/Technologies'
import AIAgent from './components/AIAgent'
import Blog from './components/Blog'
import Testimonials from './components/Testimonials'
import Plans from './components/Plans'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import DatabaseSetup from './components/DatabaseSetup'
import DatabaseInitializer from './components/DatabaseInitializer'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Process />
      <Technologies />
      <AIAgent />
      <Blog />
      <Testimonials />
      <Plans />
      <FAQ />
      <FinalCTA />
      <Contact />
      <DatabaseSetup />
      <Footer />
      <WhatsAppButton />
      <DatabaseInitializer />
    </div>
  )
}

export default App
