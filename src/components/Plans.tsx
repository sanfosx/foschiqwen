import { Check, Sparkles, Zap, Crown } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    subtitle: 'Para empezar',
    icon: Sparkles,
    price: 'Consultá',
    description: 'Ideal si estás empezando y necesitás una presencia digital básica.',
    color: 'cyan',
    features: [
      'Diagnóstico tecnológico inicial',
      'Página web profesional (1-3 secciones)',
      'Configuración de redes sociales',
      'Capacitación básica (2 sesiones)',
      'Soporte por 30 días',
    ],
    popular: false,
  },
  {
    name: 'Business',
    subtitle: 'El más elegido',
    icon: Zap,
    price: 'Consultá',
    description: 'Para negocios que quieren automatizar y vender más con tecnología.',
    color: 'blue',
    features: [
      'Todo lo del plan Starter',
      'Tienda online o app de ventas',
      'Chatbot / Agente IA básico',
      'Automatización de 3 procesos',
      'Integración con WhatsApp',
      'Capacitación completa (5 sesiones)',
      'Soporte por 90 días',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    subtitle: 'Transformación total',
    icon: Crown,
    price: 'A medida',
    description: 'Solución integral para negocios que quieren liderar con tecnología.',
    color: 'purple',
    features: [
      'Todo lo del plan Business',
      'Agentes IA avanzados multi-canal',
      'Sistema de logística personalizado',
      'Automatización ilimitada',
      'Dashboard de métricas en tiempo real',
      'Capacitación para todo tu equipo',
      'Soporte prioritario 6 meses',
      'Consultoría estratégica continua',
    ],
    popular: false,
  },
]

const colorStyles: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  cyan: {
    border: 'border-gray-800',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    badge: '',
  },
  blue: {
    border: 'border-cyan-500/40',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    badge: 'bg-gradient-to-r from-cyan-500 to-blue-600',
  },
  purple: {
    border: 'border-gray-800',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    badge: '',
  },
}

export default function Plans() {
  return (
    <section id="planes" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Planes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Elegí el plan{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ideal para vos
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada negocio es único. Estos son puntos de partida, pero todo se adapta a tus necesidades reales.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const styles = colorStyles[plan.color]
            return (
              <div
                key={plan.name}
                className={`relative p-8 bg-gray-900/50 border ${styles.border} rounded-2xl transition-all hover:border-gray-700 ${
                  plan.popular ? 'md:-translate-y-4 shadow-xl shadow-cyan-500/5' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-bold text-white">
                      ⭐ MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className={`w-14 h-14 ${styles.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <plan.icon className={`w-7 h-7 ${styles.text}`} />
                </div>

                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{plan.subtitle}</p>
                
                <div className="my-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                </div>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 ${styles.text} shrink-0 mt-0.5`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                      : 'border border-gray-700 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-300'
                  }`}
                >
                  Empezar ahora
                </a>
              </div>
            )
          })}
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          💡 ¿Necesitás algo diferente? Armamos un plan a medida para tu caso específico.
        </p>
      </div>
    </section>
  )
}
