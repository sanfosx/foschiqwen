import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Contacto', href: '#contacto' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/90 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#inicio" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              TechBridge
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
            >
              Hablemos
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-xl rounded-2xl mt-2 p-6 border border-gray-800">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-cyan-400 transition-colors text-base font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contacto"
                className="mt-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold text-center"
                onClick={() => setIsOpen(false)}
              >
                Hablemos
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
