-- ============================================
-- TechBridge Backend - Database Schema
-- InsForge PostgreSQL
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- BLOG ARTICLES TABLE
-- ============================================
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

-- ============================================
-- GENERATED ARTICLES TABLE (AI Generation Log)
-- ============================================
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

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
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

-- ============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- ============================================
-- AI API USAGE LOG TABLE
-- ============================================
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

-- ============================================
-- SITE ANALYTICS TABLE
-- ============================================
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

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_articles_created ON blog_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_articles_provider ON generated_articles(ai_provider);
CREATE INDEX IF NOT EXISTS idx_generated_articles_created ON generated_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_api_logs_provider ON ai_api_logs(provider);
CREATE INDEX IF NOT EXISTS idx_ai_api_logs_created ON ai_api_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_analytics_page ON site_analytics(page);
CREATE INDEX IF NOT EXISTS idx_site_analytics_created ON site_analytics(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_api_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- Public read access for blog articles
CREATE POLICY "Public can read published articles" ON blog_articles
  FOR SELECT USING (is_published = true);

-- Public can insert contact messages
CREATE POLICY "Public can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Public can subscribe to newsletter
CREATE POLICY "Public can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Public can read active subscribers (for validation)
CREATE POLICY "Public can read own subscription" ON newsletter_subscribers
  FOR SELECT USING (is_active = true);

-- Public can insert analytics
CREATE POLICY "Public can insert analytics" ON site_analytics
  FOR INSERT WITH CHECK (true);

-- Admin full access (using admin key)
CREATE POLICY "Admin full access blog" ON blog_articles
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access generated" ON generated_articles
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access contacts" ON contact_messages
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access subscribers" ON newsletter_subscribers
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access ai_logs" ON ai_api_logs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access analytics" ON site_analytics
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- SEED DATA: Initial blog articles
-- ============================================
INSERT INTO blog_articles (title, slug, excerpt, content, category, tags, image_emoji, read_time) VALUES
(
  'Cómo un Chatbot con IA puede Aumentar tus Ventas un 40%',
  'chatbot-ia-aumentar-ventas',
  'Descubrí cómo los agentes de IA están transformando la atención al cliente y generando más ventas de forma automática.',
  '# Cómo un Chatbot con IA puede Aumentar tus Ventas un 40%

La inteligencia artificial ya no es ciencia ficción. Hoy, los chatbots con IA están ayudando a negocios de todos los tamaños a vender más, atender mejor y ahorrar tiempo.

## ¿Qué es un Chatbot con IA?

Un chatbot con IA es un asistente virtual inteligente que puede:
- Entender preguntas en lenguaje natural
- Responder de forma personalizada
- Aprender de cada interacción
- Trabajar 24/7 sin descanso

## Beneficios Reales para tu Negocio

### 1. Atención 24/7
Tus clientes no duermen. Un chatbot puede responder consultas a las 3 AM mientras vos descansás.

### 2. Más Ventas Automáticas
Un chatbot bien entrenado puede recomendar productos, resolver dudas de compra y guiar al cliente hasta el checkout.

### 3. Ahorro de Tiempo
Lo que antes te tomaba horas respondiendo mensajes, ahora lo hace la IA en segundos.

## Conclusión

Un chatbot con IA no es un gasto, es una inversión. Si te ahorra 2 horas diarias y aumenta tus ventas un 40%, se paga solo en semanas.',
  'Inteligencia Artificial',
  ARRAY['IA', 'Chatbots', 'Ventas', 'Automatización'],
  '🤖',
  '5 min'
),
(
  '5 Automatizaciones que Todo Pequeño Negocio Necesita',
  '5-automatizaciones-pequeno-negocio',
  'Dejá de perder tiempo en tareas repetitivas. Estas automatizaciones te van a cambiar la vida.',
  '# 5 Automatizaciones que Todo Pequeño Negocio Necesita

Si todavía estás haciendo tareas manuales repetitivas, estás perdiendo tiempo y dinero.

## 1. Automatización de Facturación
Un sistema que genera facturas automáticamente, las envía por email y te avisa cuando hay pagos pendientes.

## 2. Respuestas Automáticas en WhatsApp
Un chatbot que responde preguntas frecuentes, envía catálogos y agenda reuniones.

## 3. Gestión de Inventario Inteligente
Un sistema que te avisa cuando el stock está bajo y predice qué vas a necesitar.

## 4. Seguimiento Automático de Clientes
Un sistema que envía recordatorios, pide feedback y reactiva clientes inactivos.

## 5. Reportes Automáticos
Un dashboard que se actualiza en tiempo real y te envía un resumen diario.

## Conclusión

La automatización no es para grandes empresas. Es para cualquier negocio que quiera crecer sin trabajar más horas.',
  'Automatización',
  ARRAY['Automatización', 'Productividad', 'Negocios', 'Herramientas'],
  '⚡',
  '7 min'
),
(
  'Tu Primera Página Web: Guía Completa para Principiantes',
  'primera-pagina-web-guia',
  'Todo lo que necesitás saber para tener tu página web profesional, sin complicaciones.',
  '# Tu Primera Página Web: Guía Completa para Principiantes

Tener una página web ya no es opcional. Es tu vidriera digital, tu carta de presentación 24/7.

## ¿Por Qué Necesitás una Página Web?

- Credibilidad: Un negocio sin web parece menos profesional
- Visibilidad: Te encuentran en Google
- Control: No dependés de redes sociales
- Ventas: Podés vender directamente

## Tipos de Páginas Web

### 1. Landing Page
Una sola página con objetivo específico.

### 2. Sitio Web Corporativo
Varias páginas con presentación completa.

### 3. Tienda Online
Catálogo, carrito y pagos.

## Conclusión

Tu página web es una inversión, no un gasto. Una buena web se paga sola con los clientes que te trae.',
  'Desarrollo Web',
  ARRAY['Web', 'Diseño', 'Principiantes', 'Negocios'],
  '🌐',
  '8 min'
),
(
  'IA para No-Tech: Cómo Usar ChatGPT en tu Negocio',
  'ia-no-tech-chatgpt-negocio',
  'Aprendé a usar ChatGPT para ahorrar tiempo, crear contenido y tomar mejores decisiones en tu negocio.',
  '# IA para No-Tech: Cómo Usar ChatGPT en tu Negocio

ChatGPT no es solo para programadores. Es una herramienta poderosa que cualquier emprendedor puede usar.

## 10 Formas de Usar ChatGPT en tu Negocio

### 1. Escribir Emails Profesionales
### 2. Crear Contenido para Redes
### 3. Responder Consultas de Clientes
### 4. Generar Ideas de Productos
### 5. Mejorar Textos
### 6. Analizar Competencia
### 7. Crear Planes de Negocio
### 8. Traducir Contenido
### 9. Resolver Problemas
### 10. Automatizar Tareas

## Conclusión

ChatGPT es como tener un asistente inteligente disponible 24/7. La clave está en saber cómo pedirle las cosas.',
  'Inteligencia Artificial',
  ARRAY['ChatGPT', 'IA', 'Productividad', 'Negocios'],
  '🧠',
  '10 min'
)
ON CONFLICT (slug) DO NOTHING;
