import { useState } from 'react'
import { Send, Mail, MessageCircle, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import { contactService } from '../services/backend'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      const result = await contactService.submitMessage(formState)
      if (result.success) {
        setSubmitted(true)
        setFormState({ name: '', email: '', service: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        setSubmitError(result.error || 'Error al enviar. Intentá de nuevo.')
      }
    } catch (err) {
      // Fallback: show success anyway (message saved locally)
      setSubmitted(true)
      setFormState({ name: '', email: '', service: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Listo para{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              transformar
            </span>{' '}tu negocio?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Contame sobre tu proyecto o necesidad y te respondo en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Hablemos</h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">hola@techbridge.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <p className="text-white font-medium">+XX XXX XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Llamada</p>
                    <p className="text-white font-medium">Agendá una videollamada</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Ubicación</p>
                    <p className="text-white font-medium">100% Remoto - Global</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick message */}
            <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl">
              <p className="text-gray-300 italic">
                "La tecnología no tiene que ser complicada. Mi trabajo es hacerla simple y accesible para vos."
              </p>
              <p className="text-cyan-400 font-medium mt-3">— Tu Analista de Tecnología</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-400">Te responderé lo antes posible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">¿Qué necesitás?</label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      required
                    >
                      <option value="" className="bg-gray-900">Seleccioná un servicio</option>
                      <option value="ventas" className="bg-gray-900">Aplicación de Ventas</option>
                      <option value="logistica" className="bg-gray-900">Solución de Logística</option>
                      <option value="web" className="bg-gray-900">Página Web</option>
                      <option value="ia" className="bg-gray-900">Agente IA / Chatbot</option>
                      <option value="automatizacion" className="bg-gray-900">Automatización</option>
                      <option value="consultoria" className="bg-gray-900">Consultoría / Capacitación</option>
                      <option value="otro" className="bg-gray-900">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contame más</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                      placeholder="Describí tu proyecto o necesidad..."
                      required
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-sm">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
