import { useState, useEffect } from 'react'
import { Key, Eye, EyeOff, CheckCircle, XCircle, AlertCircle, Loader2, Trash2, ExternalLink } from 'lucide-react'
import {
  AIProvider,
  AIProviderStatus,
  getGeminiApiKey,
  getGroqApiKey,
  setGeminiApiKey,
  setGroqApiKey,
  removeGeminiApiKey,
  removeGroqApiKey,
  checkGeminiAvailability,
  checkGroqAvailability,
} from '../services/aiService'

interface ApiConfigProps {
  onStatusChange: (statuses: AIProviderStatus[]) => void
}

export default function ApiConfig({ onStatusChange }: ApiConfigProps) {
  const [geminiKey, setGeminiKey] = useState(getGeminiApiKey())
  const [groqKey, setGroqKey] = useState(getGroqApiKey())
  const [showGeminiKey, setShowGeminiKey] = useState(false)
  const [showGroqKey, setShowGroqKey] = useState(false)
  const [checking, setChecking] = useState(false)
  const [statuses, setStatuses] = useState<AIProviderStatus[]>([
    {
      provider: 'gemini',
      name: 'Google Gemini',
      available: false,
      apiKeyConfigured: !!getGeminiApiKey(),
      lastChecked: null,
      error: null,
      model: 'gemini-3.6-flash',
    },
    {
      provider: 'groq',
      name: 'Groq',
      available: false,
      apiKeyConfigured: !!getGroqApiKey(),
      lastChecked: null,
      error: null,
      model: 'groq/compound',
    },
  ])

  const checkAllApis = async () => {
    setChecking(true)
    
    const [geminiResult, groqResult] = await Promise.all([
      checkGeminiAvailability(),
      checkGroqAvailability(),
    ])

    const newStatuses: AIProviderStatus[] = [
      {
        provider: 'gemini',
        name: 'Google Gemini',
        available: geminiResult.available,
        apiKeyConfigured: !!geminiKey,
        lastChecked: new Date(),
        error: geminiResult.error,
        model: 'gemini-3.6-flash',
      },
      {
        provider: 'groq',
        name: 'Groq',
        available: groqResult.available,
        apiKeyConfigured: !!groqKey,
        lastChecked: new Date(),
        error: groqResult.error,
        model: 'groq/compound',
      },
    ]

    setStatuses(newStatuses)
    onStatusChange(newStatuses)
    setChecking(false)
  }

  useEffect(() => {
    if (geminiKey || groqKey) {
      checkAllApis()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSaveGeminiKey = () => {
    setGeminiApiKey(geminiKey)
    setStatuses(prev => prev.map(s => s.provider === 'gemini' ? { ...s, apiKeyConfigured: !!geminiKey } : s))
    checkAllApis()
  }

  const handleSaveGroqKey = () => {
    setGroqApiKey(groqKey)
    setStatuses(prev => prev.map(s => s.provider === 'groq' ? { ...s, apiKeyConfigured: !!groqKey } : s))
    checkAllApis()
  }

  const handleDeleteGeminiKey = () => {
    removeGeminiApiKey()
    setGeminiKey('')
    setStatuses(prev => prev.map(s => s.provider === 'gemini' ? { ...s, apiKeyConfigured: false, available: false, error: 'API Key eliminada' } : s))
  }

  const handleDeleteGroqKey = () => {
    removeGroqApiKey()
    setGroqKey('')
    setStatuses(prev => prev.map(s => s.provider === 'groq' ? { ...s, apiKeyConfigured: false, available: false, error: 'API Key eliminada' } : s))
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
            <Key className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Configuración de APIs</h3>
            <p className="text-sm text-gray-400">Ingresá tus API Keys para activar los modelos</p>
          </div>
        </div>
        <button
          onClick={checkAllApis}
          disabled={checking}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-all flex items-center gap-2"
        >
          {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : <AlertCircle className="w-4 h-4" />}
          Verificar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gemini Config */}
        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-lg">
                🔷
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Google Gemini</p>
                <p className="text-gray-500 text-xs">{statuses[0].model}</p>
              </div>
            </div>
            <StatusBadge status={statuses[0]} />
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                type={showGeminiKey ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full px-3 py-2 pr-10 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
              />
              <button
                onClick={() => setShowGeminiKey(!showGeminiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveGeminiKey}
                disabled={!geminiKey}
                className="flex-1 px-3 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-lg text-xs text-blue-300 hover:bg-blue-600/30 transition-all disabled:opacity-50"
              >
                Guardar
              </button>
              {geminiKey && (
                <button
                  onClick={handleDeleteGeminiKey}
                  className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Obtener API Key gratis en Google AI Studio
            </a>
            {statuses[0].error && (
              <p className="text-xs text-red-400/80">{statuses[0].error}</p>
            )}
          </div>
        </div>

        {/* Groq Config */}
        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center text-lg">
                ⚡
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Groq</p>
                <p className="text-gray-500 text-xs">{statuses[1].model}</p>
              </div>
            </div>
            <StatusBadge status={statuses[1]} />
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                type={showGroqKey ? 'text' : 'password'}
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full px-3 py-2 pr-10 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
              />
              <button
                onClick={() => setShowGroqKey(!showGroqKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showGroqKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveGroqKey}
                disabled={!groqKey}
                className="flex-1 px-3 py-1.5 bg-orange-600/20 border border-orange-500/30 rounded-lg text-xs text-orange-300 hover:bg-orange-600/30 transition-all disabled:opacity-50"
              >
                Guardar
              </button>
              {groqKey && (
                <button
                  onClick={handleDeleteGroqKey}
                  className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-400 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Obtener API Key gratis en Groq Console
            </a>
            {statuses[1].error && (
              <p className="text-xs text-red-400/80">{statuses[1].error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: AIProviderStatus }) {
  if (!status.apiKeyConfigured) {
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-400">
        <AlertCircle className="w-3 h-3" />
        Sin key
      </span>
    )
  }

  if (status.available) {
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
        <CheckCircle className="w-3 h-3" />
        Activo
      </span>
    )
  }

  if (status.error) {
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400">
        <XCircle className="w-3 h-3" />
        Error
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs text-yellow-400">
      <AlertCircle className="w-3 h-3" />
      Pendiente
    </span>
  )
}
