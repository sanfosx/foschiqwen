import { Star, TrendingUp, Clock, DollarSign } from 'lucide-react'

const testimonials = [
  {
    name: 'María G.',
    business: 'Tienda de Ropa Online',
    text: 'Antes no sabía ni cómo usar Instagram para vender. Ahora tengo mi tienda online con pagos automáticos y un chatbot que atiende a mis clientes 24/7. ¡Mis ventas crecieron un 300%!',
    metric: '+300%',
    metricLabel: 'Ventas',
  },
  {
    name: 'Carlos R.',
    business: 'Distribuidora Local',
    text: 'Me ayudó a automatizar todo el proceso de pedidos y entregas. Lo que antes me tomaba 4 horas ahora lo hago en 30 minutos. Increíble.',
    metric: '4h → 30min',
    metricLabel: 'Tiempo ahorrado',
  },
  {
    name: 'Laura M.',
    business: 'Estudio de Diseño',
    text: 'No entendía nada de tecnología y me explicó todo paso a paso. Ahora tengo mi web profesional y un sistema que me genera presupuestos automáticos.',
    metric: '100%',
    metricLabel: 'Automatizado',
  },
]

const results = [
  { icon: TrendingUp, value: '300%', label: 'Aumento promedio en ventas online' },
  { icon: Clock, value: '70%', label: 'Reducción en tareas repetitivas' },
  { icon: DollarSign, value: '50%', label: 'Ahorro en costos operativos' },
  { icon: Star, value: '24/7', label: 'Atención automatizada sin parar' },
]

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Resultados
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Historias de{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              transformación
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Negocios reales que dieron el salto tecnológico y hoy trabajan mejor que nunca.
          </p>
        </div>

        {/* Results Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {results.map((result) => (
            <div
              key={result.label}
              className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl text-center hover:border-cyan-500/30 transition-all"
            >
              <result.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {result.value}
              </p>
              <p className="text-gray-400 text-sm mt-1">{result.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.business}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-cyan-400">{testimonial.metric}</p>
                  <p className="text-xs text-gray-500">{testimonial.metricLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
