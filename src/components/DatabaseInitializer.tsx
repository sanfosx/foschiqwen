import { useState, useEffect } from 'react'
import { Loader2, CheckCircle, XCircle, Database } from 'lucide-react'
import { INSFORGE_BASE_URL, INSFORGE_ADMIN_KEY, INSFORGE_PROJECT_ID } from '../services/insforge'

const SCHEMA_SQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog Articles
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  tags TEXT[] DEFAULT '{}',
  image_emoji TEXT DEFAULT '📝',
  read_time TEXT DEFAULT '5 min',
  author TEXT DEFAULT 'TechBridge AI Agent',
  ai_provider TEXT DEFAULT 'gemini',
  is_published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated Articles
CREATE TABLE IF NOT EXISTS generated_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  ai_provider TEXT NOT NULL DEFAULT 'gemini',
  model_used TEXT,
  tokens_used INTEGER,
  generation_time_ms INTEGER,
  status TEXT DEFAULT 'completed',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  responded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- AI API Logs
CREATE TABLE IF NOT EXISTS ai_api_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  endpoint TEXT,
  request_type TEXT DEFAULT 'generation',
  tokens_input INTEGER,
  tokens_output INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Analytics
CREATE TABLE IF NOT EXISTS site_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'page_view',
  session_id TEXT,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_articles_created ON blog_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_ai_api_logs_provider ON ai_api_logs(provider);

-- RLS Policies
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read articles" ON blog_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public insert contacts" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert analytics" ON site_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access blog" ON blog_articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contacts" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access subscribers" ON newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access analytics" ON site_analytics FOR ALL USING (true) WITH CHECK (true);
`

export default function DatabaseInitializer() {
  const [status, setStatus] = useState<'checking' | 'exists' | 'creating' | 'success' | 'error'>('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkAndInit()
  }, [])

  const checkAndInit = async () => {
    setStatus('checking')
    
    // Check if tables exist
    try {
      const response = await fetch(`${INSFORGE_BASE_URL}/rest/v1/blog_articles?select=id&limit=1`, {
        headers: {
          'Authorization': `Bearer ${INSFORGE_ADMIN_KEY}`,
          'apikey': INSFORGE_ADMIN_KEY,
        },
      })

      if (response.ok) {
        setStatus('exists')
        setMessage('Base de datos lista')
        return
      }
    } catch (err) {
      // Tables don't exist, try to create them
    }

    // Try to create tables
    setStatus('creating')
    setMessage('Inicializando base de datos...')

    try {
      const response = await fetch(`${INSFORGE_BASE_URL}/admin/v1/database/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${INSFORGE_ADMIN_KEY}`,
          'apikey': INSFORGE_ADMIN_KEY,
        },
        body: JSON.stringify({ query: SCHEMA_SQL }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('¡Base de datos inicializada correctamente!')
      } else {
        const errorData = await response.json().catch(() => ({}))
        setStatus('error')
        setMessage(errorData?.message || 'Error al inicializar. Usá el CLI o dashboard.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Error de conexión. Configurá la base de datos manualmente.')
    }
  }

  if (status === 'exists') return null

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            status === 'success' ? 'bg-emerald-500/10' :
            status === 'error' ? 'bg-red-500/10' :
            'bg-blue-500/10'
          }`}>
            {status === 'checking' || status === 'creating' ? (
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              Base de datos
            </p>
            <p className="text-gray-400 text-xs mt-0.5">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
