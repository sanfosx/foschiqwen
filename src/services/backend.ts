import db from './insforgeClient'

// ============================================
// TYPES
// ============================================
export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  image_emoji: string
  read_time: string
  author: string
  ai_provider: string
  is_published: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface GeneratedArticle {
  id: string
  topic: string
  category: string
  title: string | null
  content: string
  ai_provider: string
  model_used: string | null
  tokens_used: number | null
  generation_time_ms: number | null
  status: string
  error_message: string | null
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  service: string
  message: string
  status: string
  responded: boolean
  created_at: string
  updated_at: string
}

// ============================================
// BLOG SERVICE
// ============================================
export const blogService = {
  async getArticles(category?: string): Promise<BlogArticle[]> {
    const { data, error } = await db.from<BlogArticle>('blog_articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Blog fetch error, using fallback:', error.message)
      return []
    }

    let articles = (data as BlogArticle[]) || []
    if (category && category !== 'Todos') {
      articles = articles.filter(a => a.category === category)
    }
    return articles
  },

  async getArticleBySlug(slug: string): Promise<BlogArticle | null> {
    const { data, error } = await db.from<BlogArticle>('blog_articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) return null
    return data as BlogArticle
  },

  async createArticle(article: Partial<BlogArticle>): Promise<BlogArticle | null> {
    const slug = article.slug || article.title?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || ''

    const { data, error } = await db.from<BlogArticle>('blog_articles')
      .insert({ ...article, slug } as any)

    if (error) {
      console.error('Create article error:', error.message)
      return null
    }
    return Array.isArray(data) ? data[0] : data as BlogArticle
  },
}

// ============================================
// AI GENERATION SERVICE
// ============================================
export const aiGenerationService = {
  async logGeneration(params: {
    topic: string
    category: string
    title?: string
    content: string
    ai_provider: string
    model_used?: string
    generation_time_ms?: number
    status?: string
    error_message?: string
  }): Promise<void> {
    await db.from('generated_articles').insert(params as any)
  },

  async getHistory(limit = 20): Promise<GeneratedArticle[]> {
    const { data, error } = await db.from<GeneratedArticle>('generated_articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) return []
    return (data as GeneratedArticle[]) || []
  },
}

// ============================================
// CONTACT SERVICE
// ============================================
export const contactService = {
  async submitMessage(params: {
    name: string
    email: string
    service: string
    message: string
  }): Promise<{ success: boolean; error?: string }> {
    const { error } = await db.from('contact_messages').insert(params as any)
    
    if (error) {
      console.error('Contact submit error:', error.message)
      return { success: false, error: error.message }
    }
    return { success: true }
  },
}

// ============================================
// NEWSLETTER SERVICE
// ============================================
export const newsletterService = {
  async subscribe(email: string, name?: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await db.from('newsletter_subscribers')
      .upsert({ email, name, is_active: true } as any)

    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },
}

// ============================================
// ANALYTICS SERVICE
// ============================================
export const analyticsService = {
  async trackPageView(page: string, metadata?: Record<string, unknown>): Promise<void> {
    await db.from('site_analytics').insert({
      page,
      event_type: 'page_view',
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      metadata: metadata || {},
    } as any)
  },

  async trackEvent(eventType: string, page: string, metadata?: Record<string, unknown>): Promise<void> {
    await db.from('site_analytics').insert({
      page,
      event_type: eventType,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      metadata: metadata || {},
    } as any)
  },
}

// ============================================
// DATABASE INITIALIZATION
// ============================================
export async function initializeDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    // Try to query blog_articles to see if table exists
    const { error } = await db.from('blog_articles').select('id').limit(1)
    
    if (error) {
      // Table doesn't exist, need to create it
      console.log('Database tables not found. Schema needs to be applied via InsForge CLI or dashboard.')
      return { 
        success: false, 
        message: 'Las tablas de la base de datos aún no existen. Ejecutá el schema SQL desde el dashboard de InsForge o con el CLI.' 
      }
    }
    
    return { success: true, message: 'Base de datos conectada correctamente' }
  } catch (err) {
    return { 
      success: false, 
      message: 'Error de conexión con la base de datos' 
    }
  }
}

// ============================================
// HELPERS
// ============================================
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('techbridge_session_id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    sessionStorage.setItem('techbridge_session_id', sessionId)
  }
  return sessionId
}
