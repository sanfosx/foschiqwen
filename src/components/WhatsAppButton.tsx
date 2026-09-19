import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = '5491100000000' // Cambiar por el número real
  const message = encodeURIComponent('Hola! Me interesa saber más sobre tus servicios de tecnología e IA.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform group-hover:shadow-xl group-hover:shadow-green-500/40">
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
            <p className="text-white text-sm font-medium">¡Hablemos por WhatsApp!</p>
            <div className="absolute top-full right-5 w-2 h-2 bg-gray-900 border-r border-b border-gray-700 rotate-45 -mt-1" />
          </div>
        </div>
      </div>
    </a>
  )
}
