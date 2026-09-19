import { Zap, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800">
      <div className="absolute inset-0 bg-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#inicio" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                TechBridge
              </span>
            </a>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Tu analista de tecnología de confianza. Ayudamos a personas y negocios 
              a integrarse con las nuevas tecnologías, IA y automatizaciones.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              {['Apps de Ventas', 'Logística', 'Páginas Web', 'Agentes IA', 'Automatización', 'Consultoría'].map((item) => (
                <li key={item}>
                  <a href="#servicios" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { name: 'Inicio', href: '#inicio' },
                { name: 'Servicios', href: '#servicios' },
                { name: 'Sobre Mí', href: '#sobre-mi' },
                { name: 'Proceso', href: '#proceso' },
                { name: 'Contacto', href: '#contacto' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TechBridge. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-red-400 fill-red-400" /> y mucha tecnología
          </p>
        </div>
      </div>
    </footer>
  )
}
