import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: '¿No sé nada de tecnología, puedo trabajar con vos?',
    answer: '¡Por supuesto! Mi trabajo es justamente eso: traducir la tecnología a un lenguaje simple. No necesitás saber nada previo, te explico todo paso a paso y te capacito para que puedas manejar tus herramientas con confianza.',
  },
  {
    question: '¿Cuánto tiempo tarda un proyecto?',
    answer: 'Depende del alcance. Una página web básica puede estar lista en 1-2 semanas. Un sistema de ventas con automatización puede tomar 3-6 semanas. Los agentes IA avanzados pueden tomar 4-8 semanas. Siempre te doy un timeline claro antes de empezar.',
  },
  {
    question: '¿Qué es un "agente IA" y para qué me sirve?',
    answer: 'Es como un empleado virtual inteligente que trabaja 24/7. Puede atender consultas de clientes por WhatsApp, hacer reservas, enviar cotizaciones, responder preguntas frecuentes e incluso ayudar a vender. Todo automatizado y personalizado para tu negocio.',
  },
  {
    question: '¿Trabajás con negocios muy pequeños?',
    answer: '¡Sí! De hecho, mi especialidad son los pequeños negocios y emprendedores. Entiendo que no todos tienen grandes presupuestos, por eso ofrezco soluciones escalables que crecen con tu negocio.',
  },
  {
    question: '¿Qué pasa después de que terminamos el proyecto?',
    answer: 'No te dejo solo. Todos mis planes incluyen un período de soporte donde resuelvo dudas y ajustes. Además, ofrezco planes de mantenimiento mensual para que todo siga funcionando perfecto.',
  },
  {
    question: '¿Cómo es el proceso de pago?',
    answer: 'Trabajo con un esquema flexible: generalmente 50% al inicio y 50% al finalizar. Acepto transferencia, efectivo y tarjetas. Para proyectos grandes, podemos armar un plan de pagos adaptado.',
  },
  {
    question: '¿Puedo ver ejemplos de trabajos anteriores?',
    answer: '¡Claro! En nuestra primera charla te muestro casos de éxito y demos de proyectos similares al tuyo. También puedo armarte una demo personalizada para que veas exactamente cómo quedaría tu solución.',
  },
  {
    question: '¿Qué tecnologías usás?',
    answer: 'Trabajo con las mejores herramientas del mercado: ChatGPT, Claude AI para inteligencia artificial; React, Next.js para desarrollo web; Make, n8n para automatizaciones; WhatsApp Business API para comunicación; y muchas más. Siempre elijo la mejor opción para cada caso.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Preguntas{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              frecuentes
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Resolvé tus dudas antes de empezar. Si no encontrás tu respuesta, ¡escribime!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-900/50 border rounded-xl overflow-hidden transition-all ${
                openIndex === index ? 'border-cyan-500/30' : 'border-gray-800'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-900/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${
                    openIndex === index ? 'text-cyan-400' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    openIndex === index ? 'text-white' : 'text-gray-300'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
                  openIndex === index ? 'rotate-180 text-cyan-400' : ''
                }`} />
              </button>
              
              {openIndex === index && (
                <div className="px-5 pb-5 pt-0">
                  <div className="pl-8 border-l-2 border-cyan-500/20">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">¿Tenés otra pregunta?</p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
          >
            Escribime directamente
          </a>
        </div>
      </div>
    </section>
  )
}
