import { ShoppingCart, Truck, Globe, Bot, Workflow, Brain, ArrowUpRight } from 'lucide-react'

const services = [
  {
    icon: ShoppingCart,
    title: 'Aplicaciones de Ventas',
    description: 'Desarrollo de tiendas online, catálogos digitales y sistemas de venta que convierten visitantes en clientes.',
    color: 'cyan',
    features: ['E-commerce', 'Catálogos digitales', 'Pasarelas de pago', 'CRM integrado'],
  },
  {
    icon: Truck,
    title: 'Soluciones de Logística',
    description: 'Optimiza tu cadena de suministro con herramientas inteligentes de seguimiento, inventario y distribución.',
    color: 'blue',
    features: ['Tracking en tiempo real', 'Gestión de inventario', 'Rutas optimizadas', 'Reportes automáticos'],
  },
  {
    icon: Globe,
    title: 'Páginas Web Profesionales',
    description: 'Diseño y desarrollo de sitios web modernos, rápidos y optimizados que representan tu marca.',
    color: 'purple',
    features: ['Diseño responsive', 'SEO optimizado', 'Alta velocidad', 'Panel admin'],
  },
  {
    icon: Bot,
    title: 'Agentes IA',
    description: 'Creación de asistentes virtuales inteligentes que atienden, venden y resuelven por ti 24/7.',
    color: 'green',
    features: ['Chatbots avanzados', 'Atención al cliente', 'Ventas automatizadas', 'Multi-canal'],
  },
  {
    icon: Workflow,
    title: 'Automatización de Procesos',
    description: 'Elimina tareas repetitivas y deja que la tecnología trabaje por ti. Más eficiencia, menos errores.',
    color: 'orange',
    features: ['Flujos automáticos', 'Integraciones', 'Notificaciones', 'Reportes IA'],
  },
  {
    icon: Brain,
    title: 'Consultoría & Capacitación',
    description: 'Te guío paso a paso para que tú y tu equipo dominen las herramientas tecnológicas del presente.',
    color: 'pink',
    features: ['Diagnóstico tech', 'Capacitación', 'Estrategia digital', 'Mentoría 1:1'],
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', glow: 'group-hover:shadow-cyan-500/10' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', glow: 'group-hover:shadow-purple-500/10' },
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', glow: 'group-hover:shadow-orange-500/10' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20', glow: 'group-hover:shadow-pink-500/10' },
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Soluciones que impulsan tu{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              crecimiento
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada servicio está diseñado para resolver problemas reales de tu negocio, 
            usando tecnología de vanguardia adaptada a tus necesidades.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const colors = colorMap[service.color]
            return (
              <div
                key={service.title}
                className={`group relative p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-300 hover:shadow-xl ${colors.glow}`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <service.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                
                <p className="text-gray-400 mb-5 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-medium rounded-full border ${colors.border}`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
