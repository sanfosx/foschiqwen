import { useState, useEffect } from 'react'
import { Bot, Sparkles, Loader2, CheckCircle, Zap, Brain, FileText, RefreshCw } from 'lucide-react'

interface GenerationStep {
  text: string
  icon: React.ReactNode
  completed: boolean
}

export default function AIAgent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [generatedArticles, setGeneratedArticles] = useState(0)
  const [showDemo, setShowDemo] = useState(false)

  const steps: GenerationStep[] = [
    { text: 'Analizando tendencias tecnológicas actuales...', icon: <Brain className="w-4 h-4" />, completed: false },
    { text: 'Investigando temas relevantes para tu audiencia...', icon: <Zap className="w-4 h-4" />, completed: false },
    { text: 'Generando estructura del artículo...', icon: <FileText className="w-4 h-4" />, completed: false },
    { text: 'Escribiendo contenido optimizado...', icon: <Sparkles className="w-4 h-4" />, completed: false },
    { text: 'Optimizando para SEO...', icon: <CheckCircle className="w-4 h-4" />, completed: false },
  ]

  const [stepsState, setStepsState] = useState<GenerationStep[]>(steps)

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval)
            setTimeout(() => {
              setIsGenerating(false)
              setGeneratedArticles((prev) => prev + 1)
              setCurrentStep(0)
              setStepsState(steps)
            }, 1000)
            return prev
          }
          setStepsState((prevSteps) =>
            prevSteps.map((step, index) => ({
              ...step,
              completed: index <= prev + 1,
            }))
          )
          return prev + 1
        })
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [isGenerating])

  const handleGenerate = () => {
    setIsGenerating(true)
    setCurrentStep(0)
    setStepsState(steps.map(s => ({ ...s, completed: false })))
  }

  return (
    <section id="ai-agent" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            <Bot className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Agente IA Activo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestro{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Agente de Contenido
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Un agente de IA especializado que genera artículos de blog automáticamente, 
            siempre actualizado con las últimas tendencias.
          </p>
        </div>

        {/* Agent Dashboard */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Agent Header */}
          <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">ContentAI Agent</h3>
                  <p className="text-sm text-gray-400">Generador automático de contenido</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-400">{generatedArticles}</p>
                <p className="text-xs text-gray-500">Artículos generados</p>
              </div>
            </div>
          </div>

          {/* Agent Controls */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isGenerating
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Generar Nuevo Artículo
                  </>
                )}
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Agente activo y listo</span>
              </div>
            </div>

            {/* Generation Progress */}
            {isGenerating && (
              <div className="space-y-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-400 mb-4 font-medium">Proceso de generación:</p>
                {stepsState.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 transition-all ${
                      index <= currentStep ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      step.completed
                        ? 'bg-green-500/10 text-green-400'
                        : index === currentStep
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'bg-gray-800 text-gray-600'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : index === currentStep ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span className={`text-sm ${
                      step.completed ? 'text-green-400' : index === currentStep ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Success Message */}
            {generatedArticles > 0 && !isGenerating && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium text-sm">¡Artículo generado exitosamente!</p>
                  <p className="text-gray-400 text-xs">El nuevo contenido ya está disponible en el blog.</p>
                </div>
              </div>
            )}
          </div>

          {/* Agent Stats */}
          <div className="p-6 border-t border-gray-800 bg-gray-900/30">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">24/7</p>
                <p className="text-xs text-gray-500">Disponibilidad</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-400">~3min</p>
                <p className="text-xs text-gray-500">Tiempo por artículo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">SEO</p>
                <p className="text-xs text-gray-500">Optimizado</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">100%</p>
                <p className="text-xs text-gray-500">Original</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="text-gray-400 hover:text-cyan-400 transition-colors text-sm underline"
          >
            {showDemo ? 'Ocultar' : 'Ver'} cómo funciona el agente
          </button>
        </div>

        {showDemo && (
          <div className="mt-6 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <h4 className="text-lg font-bold text-white mb-4">¿Cómo funciona el agente?</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-purple-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Análisis de Tendencias</p>
                  <p className="text-gray-400 text-sm">El agente analiza las últimas tendencias en tecnología, IA y negocios.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-pink-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-pink-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Generación de Contenido</p>
                  <p className="text-gray-400 text-sm">Crea artículos completos, optimizados y relevantes para tu audiencia.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-cyan-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Publicación Automática</p>
                  <p className="text-gray-400 text-sm">Los artículos se publican automáticamente en el blog, listos para tus visitantes.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
