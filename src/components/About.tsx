import { CheckCircle, Target, Users, Lightbulb } from 'lucide-react'

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl" />
              
              {/* Main card */}
              <div className="relative h-full bg-gray-900/80 border border-gray-800 rounded-3xl p-8 flex flex-col justify-center backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                      🚀
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Tu aliado tecnológico</h3>
                      <p className="text-gray-400">Analista & Consultor</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      'Análisis de necesidades tecnológicas',
                      'Implementación de soluciones IA',
                      'Capacitación personalizada',
                      'Acompañamiento continuo',
                      'Resultados medibles y escalables',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-cyan-400">100%</p>
                      <p className="text-xs text-gray-500">Dedicación</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">24/7</p>
                      <p className="text-xs text-gray-500">Soporte IA</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-400">∞</p>
                      <p className="text-xs text-gray-500">Posibilidades</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
              Sobre Mí
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Tu puente entre el{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                hoy y el mañana
              </span>{' '}
              tecnológico
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Como analista de tecnología, mi misión es clara: hacer que la tecnología trabaje para ti, 
              no al revés. Ya seas una persona que quiere aprender sobre IA o un negocio que necesita 
              digitalizarse, estoy aquí para guiarte con soluciones prácticas y accesibles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <Target className="w-8 h-8 text-cyan-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Enfoque Práctico</h4>
                <p className="text-gray-400 text-sm">Soluciones reales que resuelven problemas reales de tu día a día.</p>
              </div>
              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Para Todos</h4>
                <p className="text-gray-400 text-sm">Desde emprendedores hasta pequeñas empresas, sin importar tu nivel.</p>
              </div>
              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <Lightbulb className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Innovación Constante</h4>
                <p className="text-gray-400 text-sm">Siempre actualizado con las últimas tendencias en IA y tecnología.</p>
              </div>
              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl">
                <CheckCircle className="w-8 h-8 text-emerald-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Resultados Reales</h4>
                <p className="text-gray-400 text-sm">Cada proyecto está orientado a generar impacto medible en tu negocio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
