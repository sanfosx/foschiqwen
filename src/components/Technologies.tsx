export default function Technologies() {
  const technologies = [
    { name: 'ChatGPT / OpenAI', category: 'IA Conversacional' },
    { name: 'Claude AI', category: 'IA Avanzada' },
    { name: 'Make / Zapier', category: 'Automatización' },
    { name: 'React / Next.js', category: 'Desarrollo Web' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'IA & Data' },
    { name: 'WhatsApp Business API', category: 'Comunicación' },
    { name: 'n8n', category: 'Workflows' },
    { name: 'Supabase', category: 'Base de datos' },
    { name: 'TensorFlow', category: 'Machine Learning' },
    { name: 'Google Cloud', category: 'Infraestructura' },
    { name: 'Stripe / MercadoPago', category: 'Pagos' },
  ]

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Tecnologías
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Herramientas de{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              vanguardia
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trabajo con las tecnologías más avanzadas del mercado para ofrecerte soluciones robustas y escalables.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-cyan-500/30 hover:bg-gray-900/80 transition-all duration-300 text-center"
            >
              <p className="text-white font-medium text-sm group-hover:text-cyan-300 transition-colors">
                {tech.name}
              </p>
              <p className="text-gray-500 text-xs mt-1">{tech.category}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 p-6 bg-gradient-to-r from-cyan-500/5 to-blue-600/5 border border-gray-800 rounded-2xl">
            <div className="text-left">
              <p className="text-white font-semibold">¿No ves tu tecnología favorita?</p>
              <p className="text-gray-400 text-sm">Trabajo con muchas más herramientas. ¡Consultame!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
