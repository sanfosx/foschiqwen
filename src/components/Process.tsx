import { Search, Lightbulb, Code, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tu situación actual, identificamos problemas y oportunidades de mejora tecnológica.',
    color: 'cyan',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: 'Estrategia',
    description: 'Diseñamos un plan personalizado con las herramientas y tecnologías ideales para tus objetivos.',
    color: 'blue',
  },
  {
    icon: Code,
    step: '03',
    title: 'Implementación',
    description: 'Desarrollamos e integramos las soluciones: apps, automatizaciones, agentes IA y más.',
    color: 'purple',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Crecimiento',
    description: 'Te acompañamos en la adopción, capacitación y escalamiento para maximizar resultados.',
    color: 'emerald',
  },
]

const colorClasses: Record<string, { bg: string; text: string; line: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', line: 'from-cyan-500' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', line: 'from-blue-500' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', line: 'from-purple-500' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', line: 'from-emerald-500' },
}

export default function Process() {
  return (
    <section id="proceso" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Cómo{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              trabajamos
            </span>{' '}juntos?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Un proceso simple y transparente para llevar tu negocio al siguiente nivel tecnológico.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const colors = colorClasses[step.color]
            return (
              <div key={step.step} className="relative group">
                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-800 to-transparent z-0" />
                )}
                
                <div className="relative p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-300 h-full">
                  {/* Step number */}
                  <span className={`text-5xl font-black ${colors.text} opacity-20 absolute top-4 right-4`}>
                    {step.step}
                  </span>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
