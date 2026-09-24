import { useState, useEffect } from 'react'
import { Database, CheckCircle, XCircle, Loader2, AlertTriangle, RefreshCw, Terminal, Copy, ExternalLink } from 'lucide-react'
import { initializeDatabase } from '../services/backend'
import { INSFORGE_BASE_URL, INSFORGE_PROJECT_ID, INSFORGE_APP_KEY } from '../services/insforge'

interface DatabaseStatus {
  connected: boolean
  message: string
  tables: {
    blog_articles: boolean
    generated_articles: boolean
    contact_messages: boolean
    newsletter_subscribers: boolean
    site_analytics: boolean
  }
}

export default function DatabaseSetup() {
  const [status, setStatus] = useState<DatabaseStatus>({
    connected: false,
    message: 'Verificando conexión...',
    tables: {
      blog_articles: false,
      generated_articles: false,
      contact_messages: false,
      newsletter_subscribers: false,
      site_analytics: false,
    },
  })
  const [checking, setChecking] = useState(true)
  const [showSetup, setShowSetup] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    setChecking(true)
    const result = await initializeDatabase()
    
    setStatus({
      connected: result.success,
      message: result.message,
      tables: {
        blog_articles: result.success,
        generated_articles: result.success,
        contact_messages: result.success,
        newsletter_subscribers: result.success,
        site_analytics: result.success,
      },
    })
    setChecking(false)
  }

  const copySchemaCommand = () => {
    const command = `npx @insforge/cli link --project-id ${INSFORGE_PROJECT_ID}`
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="database" className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">Backend InsForge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Estado de la Base de Datos
          </h2>
          <p className="text-gray-400">
            Proyecto: <code className="text-cyan-400 text-sm">{INSFORGE_PROJECT_ID.slice(0, 8)}...</code>
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Connection Status */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  status.connected ? 'bg-emerald-500/10' : 'bg-red-500/10'
                }`}>
                  {checking ? (
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  ) : status.connected ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {status.connected ? 'Conectado' : 'No conectado'}
                  </h3>
                  <p className="text-sm text-gray-400">{status.message}</p>
                </div>
              </div>
              <button
                onClick={checkConnection}
                disabled={checking}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-emerald-500/30 hover:text-emerald-300 transition-all flex items-center gap-2"
              >
                {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Verificar
              </button>
            </div>
          </div>

          {/* Tables Status */}
          <div className="p-6 border-b border-gray-800">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Tablas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(status.tables).map(([table, exists]) => (
                <div
                  key={table}
                  className={`flex items-center gap-2 p-3 rounded-lg border ${
                    exists
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-gray-800/30 border-gray-700'
                  }`}
                >
                  {exists ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                  <span className={`text-sm font-mono ${exists ? 'text-emerald-300' : 'text-gray-500'}`}>
                    {table}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Setup Instructions */}
          {!status.connected && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h4 className="text-white font-semibold">Configuración requerida</h4>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Para inicializar la base de datos, necesitás ejecutar el schema SQL. Seguí estos pasos:
                </p>

                {/* Step 1 */}
                <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
                  <p className="text-white font-medium text-sm mb-2">1. Instalá el CLI de InsForge</p>
                  <code className="block p-3 bg-gray-900 rounded-lg text-xs text-cyan-300 font-mono overflow-x-auto">
                    npm install -g @insforge/cli
                  </code>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
                  <p className="text-white font-medium text-sm mb-2">2. Linkeá el proyecto</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-3 bg-gray-900 rounded-lg text-xs text-cyan-300 font-mono overflow-x-auto">
                      npx @insforge/cli link --project-id {INSFORGE_PROJECT_ID}
                    </code>
                    <button
                      onClick={copySchemaCommand}
                      className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-500/30 transition-all"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
                  <p className="text-white font-medium text-sm mb-2">3. Ejecutá el schema SQL</p>
                  <p className="text-gray-400 text-xs mb-2">
                    El archivo está en <code className="text-cyan-300">supabase/migrations/001_initial_schema.sql</code>
                  </p>
                  <p className="text-gray-400 text-xs">
                    Podés ejecutarlo desde el dashboard de InsForge o con el CLI.
                  </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`https://insforge.dev/dashboard/project/${INSFORGE_PROJECT_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-lg text-sm text-emerald-300 hover:bg-emerald-600/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir Dashboard
                  </a>
                  <a
                    href="https://docs.insforge.dev/core-concepts/database/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Documentación
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Connection Info */}
          <div className="p-6 bg-gray-900/30 border-t border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">Project ID</p>
                <p className="text-gray-300 font-mono text-xs">{INSFORGE_PROJECT_ID}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">App Key</p>
                <p className="text-gray-300 font-mono text-xs">{INSFORGE_APP_KEY}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">API URL</p>
                <p className="text-gray-300 font-mono text-xs truncate">{INSFORGE_BASE_URL}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
