import { useState, useEffect } from 'react'
import { Bot, Sparkles, Loader2, CheckCircle, Zap, Brain, FileText, RefreshCw, Settings, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import {
  AIProvider,
  AIProviderStatus,
  generateContent,
  getBlogGenerationPrompt,
  BLOG_SYSTEM_PROMPT,
  getGeminiApiKey,
  getGrokApiKey,
} from '../services/aiService'
import ApiConfig from './ApiConfig'

interface GeneratedArticle {
  id: number
  title: string
  content: string
  provider: AIProvider
  timestamp: Date
  topic: string
}

export default function AIAgent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('gemini')
  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState('Inteligencia Artificial')
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showConfig, setShowConfig] = useState(false)
  const [providerStatuses, setProviderStatuses] = useState<AIProviderStatus[]>([])
  const [showApiInfo, setShowApiInfo] = useState(false)

  const categories = [
    'Inteligencia Artificial',
    'Automatización',
    'Desarrollo Web',
    'Negocios Digitales',
    'E-commerce',
    'Logística',
  ]

  const suggestedTopics = [
    'Cómo un chatbot con IA puede aumentar tus ventas',
    '5 automatizaciones esenciales para tu negocio',
    'Guía para crear tu primera tienda online',
    'Cómo usar ChatGPT en tu emprendimiento',
    'Agentes IA para atención al cliente',
    'Tendencias tecnológicas para pequeños negocios',
  ]

  // Check if provider has API key
  const hasApiKey = (provider: AIProvider): boolean => {
    if (provider === 'gemini') return !!getGeminiApiKey()
    return !!getGrokApiKey()
  }

  // Check if provider is available
  const isProviderAvailable = (provider: AIProvider): boolean => {
    const status = providerStatuses.find(s => s.provider === provider)
    return status?.available ?? false
  }

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Por favor ingresá un tema para el artículo')
      return
    }

    if (!hasApiKey(selectedProvider)) {
      setError(`Necesitás configurar la API Key de ${selectedProvider === 'gemini' ? 'Gemini' : 'Grok'} primero`)
      setShowConfig(true)
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const prompt = getBlogGenerationPrompt(topic, category)
      const content = await generateContent({
        prompt,
        systemPrompt: BLOG_SYSTEM_PROMPT,
        provider: selectedProvider,
        temperature: 0.8,
        maxTokens: 4096,
      })

      // Extract title from content (first # heading)
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : topic

      setGeneratedArticle({
        id: Date.now(),
        title,
        content,
        provider: selectedProvider,
        timestamp: new Date(),
        topic,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar contenido')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStatusChange = (statuses: AIProviderStatus[]) => {
    setProviderStatuses(statuses)
  }

  return (
    <section id="ai-agent" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            <Bot className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Agente IA Multi-Modelo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Generá contenido con{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gemini o Grok
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Elegí tu modelo de IA preferido, ingresá un tema y generá artículos de blog automáticamente.
          </p>
        </div>

        {/* Provider Selector */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Modelo de IA</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProvider('gemini')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                    selectedProvider === 'gemini'
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <span className="text-lg">🔷</span>
                  <span className="font-medium text-sm">Gemini</span>
                  {hasApiKey('gemini') && (
                    <span className={`w-2 h-2 rounded-full ${isProviderAvailable('gemini') ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  )}
                </button>
                <button
                  onClick={() => setSelectedProvider('grok')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                    selectedProvider === 'grok'
                      ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <span className="text-lg">✖️</span>
                  <span className="font-medium text-sm">Grok</span>
                  {hasApiKey('grok') && (
                    <span className={`w-2 h-2 rounded-full ${isProviderAvailable('grok') ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-600 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">API Keys</span>
              {showConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* API Config Panel */}
        {showConfig && (
          <div className="mb-6 animate-fade-in">
            <ApiConfig onStatusChange={handleStatusChange} />
          </div>
        )}

        {/* Generation Panel */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Agent Header */}
          <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    selectedProvider === 'gemini'
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                      : 'bg-gradient-to-br from-purple-500 to-pink-600'
                  }`}>
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                    isGenerating ? 'bg-yellow-500 animate-pulse' : 
                    hasApiKey(selectedProvider) ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedProvider === 'gemini' ? 'Gemini Agent' : 'Grok Agent'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedProvider === 'gemini' ? 'Google Gemini 2.0 Flash' : 'xAI Grok 2 Latest'}
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className={`text-sm font-medium ${hasApiKey(selectedProvider) ? 'text-green-400' : 'text-gray-500'}`}>
                  {hasApiKey(selectedProvider) ? '● Conectado' : '○ Sin API Key'}
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 space-y-4">
            {/* Topic Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tema del artículo
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: Cómo usar IA para automatizar tu negocio"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                ))}
              </select>
            </div>

            {/* Suggested Topics */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Temas sugeridos:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((suggested) => (
                  <button
                    key={suggested}
                    onClick={() => setTopic(suggested)}
                    className="px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-400 hover:border-purple-500/30 hover:text-purple-300 transition-all"
                  >
                    {suggested}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !hasApiKey(selectedProvider)}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                isGenerating || !hasApiKey(selectedProvider)
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : selectedProvider === 'gemini'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generando artículo...
                </>
              ) : !hasApiKey(selectedProvider) ? (
                <>
                  <AlertTriangle className="w-5 h-5" />
                  Configurá la API Key primero
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generar Artículo con {selectedProvider === 'gemini' ? 'Gemini' : 'Grok'}
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <div className="px-6 pb-6">
              <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700 space-y-3">
                <p className="text-sm text-gray-400 font-medium">Procesando con {selectedProvider === 'gemini' ? 'Gemini' : 'Grok'}:</p>
                {[
                  { icon: Brain, text: 'Analizando tema y contexto...' },
                  { icon: FileText, text: 'Generando contenido del artículo...' },
                  { icon: Zap, text: 'Optimizando formato y estructura...' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm text-gray-300">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Article Preview */}
          {generatedArticle && !isGenerating && (
            <div className="p-6 border-t border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium text-sm">¡Artículo generado exitosamente!</span>
                <span className="text-xs text-gray-500 ml-auto">
                  por {generatedArticle.provider === 'gemini' ? '🔷 Gemini' : '✖️ Grok'} •{' '}
                  {generatedArticle.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl max-h-96 overflow-y-auto">
                <h4 className="text-lg font-bold text-white mb-3">{generatedArticle.title}</h4>
                <div className="prose prose-invert prose-sm max-w-none">
                  {generatedArticle.content.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mt-4 mb-2">{line.slice(2)}</h1>
                    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-cyan-300 mt-4 mb-2">{line.slice(3)}</h2>
                    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-white mt-3 mb-1">{line.slice(4)}</h3>
                    if (line.startsWith('- ')) return <li key={i} className="text-gray-300 ml-4 list-disc">{line.slice(2)}</li>
                    if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-white font-semibold mt-2">{line.slice(2, -2)}</p>
                    if (line.trim() === '') return <br key={i} />
                    return <p key={i} className="text-gray-300 leading-relaxed">{line}</p>
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* API Info Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowApiInfo(!showApiInfo)}
            className="text-gray-400 hover:text-cyan-400 transition-colors text-sm underline"
          >
            {showApiInfo ? 'Ocultar' : 'Ver'} información sobre las APIs
          </button>
        </div>

        {showApiInfo && (
          <div className="mt-4 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  🔷 Google Gemini API
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Modelo: gemini-2.0-flash</li>
                  <li>• API Key gratuita en Google AI Studio</li>
                  <li>• Excelente para contenido creativo</li>
                  <li>• Soporta contexto largo</li>
                  <li>• Rate limit generoso en plan gratuito</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  ✖️ xAI Grok API
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Modelo: grok-2-latest</li>
                  <li>• API Key en console.x.ai</li>
                  <li>• Compatible con formato OpenAI</li>
                  <li>• Excelente razonamiento</li>
                  <li>• Acceso a información actualizada</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
