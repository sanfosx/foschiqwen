#!/usr/bin/env node

/**
 * TechBridge - Database Initialization Script
 * 
 * This script initializes the InsForge database with the required schema.
 * Run this after deploying the app or when setting up a new environment.
 * 
 * Usage: node scripts/init-database.js
 */

const INSFORGE_URL = 'https://uagk9992.us-east.insforge.app'
const ADMIN_KEY = 'uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU'

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

async function initializeDatabase() {
  console.log('🚀 TechBridge - Database Initialization')
  console.log('========================================')
  console.log('')

  try {
    console.log('📡 Connecting to InsForge...')
    
    const response = await fetch(`${INSFORGE_URL}/admin/v1/database/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_KEY}`,
        'apikey': ADMIN_KEY,
      },
      body: JSON.stringify({ query: SCHEMA_SQL }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || `HTTP ${response.status}`)
    }

    console.log('✅ Database schema created successfully!')
    console.log('')
    console.log('📊 Tables created:')
    console.log('   - blog_articles')
    console.log('   - generated_articles')
    console.log('   - contact_messages')
    console.log('   - newsletter_subscribers')
    console.log('   - ai_api_logs')
    console.log('   - site_analytics')
    console.log('')
    console.log('🔐 Row Level Security enabled')
    console.log('📈 Indexes created')
    console.log('')
    console.log('✅ Database initialization complete!')
    console.log('')
    console.log('🌐 Your app is ready to use the database.')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message)
    console.log('')
    console.log('💡 Troubleshooting:')
    console.log('   1. Check your InsForge URL and API key')
    console.log('   2. Verify you have admin permissions')
    console.log('   3. Try running the SQL manually from the InsForge dashboard')
    console.log('')
    console.log('📝 Manual SQL location: supabase/migrations/001_initial_schema.sql')
    process.exit(1)
  }
}

// Run initialization
initializeDatabase()
