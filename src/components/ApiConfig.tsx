import { useState, useEffect } from 'react'
import { Key, Eye, EyeOff, CheckCircle, XCircle, AlertCircle, Loader2, Trash2, ExternalLink } from 'lucide-react'
import {
  AIProvider,
  AIProviderStatus,
  getGeminiApiKey,
  getGrokApiKey,
  setGeminiApiKey,
  setGrokApiKey,
  removeGeminiApiKey,
  removeGrokApiKey,
  checkGeminiAvailability,
  checkGrokAvailability,
} from '../services/aiService'

interface ApiConfigProps {
  onStatusChange: (statuses: AIProviderStatus[]) => void
}

export default function ApiConfig({ onStatusChange }: ApiConfigProps) {
  const [geminiKey, setGeminiKey] = useState(getGeminiApiKey())
  const [grokKey, setGrokKey] = useState(getGrokApiKey())
  const [showGeminiKey, setShowGeminiKey] = useState(false)
  const [showGrokKey, setShowGrokKey] = useState(false)
  const [checking, setChecking] = useState(false)
  const [statuses, setStatuses] = useState<AIProviderStatus[]>([
    {
      provider: 'gemini',
      name: 'Google Gemini',
      available: false,
      apiKeyConfigured: !!getGeminiApiKey(),
      lastChecked: null,
      error: null,
      model: 'gemini-2.0-flash',
    },
    {
      provider: 'grok',
      name: 'xAI Grok',
      available: false,
      apiKeyConfigured: !!getGrokApiKey(),
      lastChecked: null,
      error: null,
      model: 'grok-2-latest',
    },
  ])

  const checkAllApis = async () => {
    setChecking(true)
    
    const [geminiResult, grokResult] = await Promise.all([
      checkGeminiAvailability(),
      checkGrokAvailability(),
    ])

    const newStatuses: AIProviderStatus[] = [
      {
        provider: 'gemini',
        name: 'Google Gemini',
        available: geminiResult.available,
        apiKeyConfigured: !!geminiKey,
        lastChecked: new Date(),
        error: geminiResult.error,
        model: 'gemini-2.0-flash',
      },
      {
        provider: 'grok',
        name: 'xAI Grok',
        available: grokResult.available,
        apiKeyConfigured: !!grokKey,
        lastChecked: new Date(),
        error: grokResult.error,
        model: 'grok-2-latest',
      },
    ]

    setStatuses(newStatuses)
    onStatusChange(newStatuses)
    setChecking(false)
  }

  useEffect(() => {
    if (geminiKey || grokKey) {
      checkAllApis()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSaveGeminiKey = () => {
    setGeminiApiKey(geminiKey)
    setStatuses(prev => prev.map(s => s.provider === 'gemini' ? { ...s, apiKeyConfigured: !!geminiKey } : s))
    checkAllApis()
  }

  const handleSaveGrokKey = () => {
    setGrokApiKey(grokKey)
    setStatuses(prev => prev.map(s => s.provider === 'grok' ? { ...s, apiKeyConfigured: !!grokKey } : s))
    checkAllApis()
  }

  const handleDeleteGeminiKey = () => {
    removeGeminiApiKey()
    setGeminiKey('')
    setStatuses(prev => prev.map(s => s.provider === 'gemini' ? { ...s, apiKeyConfigured: false, available: false, error: 'API Key eliminada' } : s))
  }

  const handleDeleteGrokKey = () => {
    removeGrokApiKey()
    setGrokKey('')
    setStatuses(prev => prev.map(s => s.provider === 'grok' ? { ...s, apiKeyConfigured: false, available: false, error: 'API Key eliminada' } : s))
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

        {/* Grok Config */}
        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-lg">
                ✖️
              </div>
              <div>
                <p className="text-white font-semibold text-sm">xAI Grok</p>
                <p className="text-gray-500 text-xs">{statuses[1].model}</p>
              </div>
            </div>
            <StatusBadge status={statuses[1]} />
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                type={showGrokKey ? 'text' : 'password'}
                value={grokKey}
                onChange={(e) => setGrokKey(e.target.value)}
                placeholder="xai-..."
                className="w-full px-3 py-2 pr-10 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
              />
              <button
                onClick={() => setShowGrokKey(!showGrokKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showGrokKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveGrokKey}
                disabled={!grokKey}
                className="flex-1 px-3 py-1.5 bg-purple-600/20 border border-purple-500/30 rounded-lg text-xs text-purple-300 hover:bg-purple-600/30 transition-all disabled:opacity-50"
              >
                Guardar
              </button>
              {grokKey && (
                <button
                  onClick={handleDeleteGrokKey}
                  className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <a
              href="https://console.x.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-400 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Obtener API Key en xAI Console
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
