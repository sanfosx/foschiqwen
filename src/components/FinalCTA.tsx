import { ArrowRight, Calendar, Sparkles } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 md:p-16 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Primer paso gratuito</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              El futuro de tu negocio{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                empieza hoy
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Agendá una llamada gratuita de 30 minutos. Analizamos tu situación actual, 
              te muestro qué es posible con tecnología e IA, y te doy un plan de acción claro. 
              Sin compromiso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contacto"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Agendar llamada gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              ⚡ Respuesta en menos de 24hs • 🎯 Sin compromiso • 💬 100% personalizado
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
