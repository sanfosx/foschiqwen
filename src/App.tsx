import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Technologies from './components/Technologies'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Process />
      <Technologies />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
