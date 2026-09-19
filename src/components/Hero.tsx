import { ArrowRight, Sparkles, Bot, Globe } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300 font-medium">Tu puente hacia el futuro tecnológico</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">Transformamos tu negocio</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            con Inteligencia Artificial
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Soy tu analista de tecnología. Ayudo a personas y negocios a integrarse con las nuevas tecnologías, 
          creando soluciones de <strong className="text-cyan-300">ventas</strong>, <strong className="text-cyan-300">logística</strong>, 
          <strong className="text-cyan-300"> automatizaciones</strong> y <strong className="text-cyan-300">agentes IA</strong> que impulsan tu crecimiento.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contacto"
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:scale-105 flex items-center gap-2"
          >
            Comenzar ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#servicios"
            className="px-8 py-4 border border-gray-700 rounded-full font-semibold text-lg text-gray-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
          >
            Ver servicios
          </a>
        </div>

        {/* Stats / Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">IA</p>
              <p className="text-sm text-gray-400">Agentes inteligentes</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">Web</p>
              <p className="text-sm text-gray-400">Páginas & apps</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">Auto</p>
              <p className="text-sm text-gray-400">Automatización total</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
