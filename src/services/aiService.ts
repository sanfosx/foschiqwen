// AI Service - Gemini & Grok API Integration

export type AIProvider = 'gemini' | 'grok'

export interface AIProviderStatus {
  provider: AIProvider
  name: string
  available: boolean
  apiKeyConfigured: boolean
  lastChecked: Date | null
  error: string | null
  model: string
}

export interface GenerateContentParams {
  prompt: string
  systemPrompt?: string
  provider: AIProvider
  temperature?: number
  maxTokens?: number
}

// API Key Management
const GEMINI_KEY_STORAGE = 'techbridge_gemini_api_key'
const GROK_KEY_STORAGE = 'techbridge_grok_api_key'

export function getGeminiApiKey(): string {
  return localStorage.getItem(GEMINI_KEY_STORAGE) || ''
}

export function getGrokApiKey(): string {
  return localStorage.getItem(GROK_KEY_STORAGE) || ''
}

export function setGeminiApiKey(key: string): void {
  localStorage.setItem(GEMINI_KEY_STORAGE, key)
}

export function setGrokApiKey(key: string): void {
  localStorage.setItem(GROK_KEY_STORAGE, key)
}

export function removeGeminiApiKey(): void {
  localStorage.removeItem(GEMINI_KEY_STORAGE)
}

export function removeGrokApiKey(): void {
  localStorage.removeItem(GROK_KEY_STORAGE)
}

// Check API availability
export async function checkGeminiAvailability(): Promise<{ available: boolean; error: string | null }> {
  const apiKey = getGeminiApiKey()
  if (!apiKey) {
    return { available: false, error: 'API Key no configurada' }
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hi' }] }],
          generationConfig: { maxOutputTokens: 5 },
        }),
      }
    )

    if (response.ok) {
      return { available: true, error: null }
    }

    const errorData = await response.json()
    const errorMsg = errorData?.error?.message || `Error ${response.status}`
    return { available: false, error: errorMsg }
  } catch (err) {
    return { available: false, error: 'Error de conexión' }
  }
}

export async function checkGrokAvailability(): Promise<{ available: boolean; error: string | null }> {
  const apiKey = getGrokApiKey()
  if (!apiKey) {
    return { available: false, error: 'API Key no configurada' }
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-2-latest',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 5,
      }),
    })

    if (response.ok) {
      return { available: true, error: null }
    }

    const errorData = await response.json()
    const errorMsg = errorData?.error?.message || `Error ${response.status}`
    return { available: false, error: errorMsg }
  } catch (err) {
    return { available: false, error: 'Error de conexión' }
  }
}

// Generate content with Gemini
async function generateWithGemini(params: GenerateContentParams): Promise<string> {
  const apiKey = getGeminiApiKey()
  if (!apiKey) throw new Error('API Key de Gemini no configurada')

  const systemInstruction = params.systemPrompt
    ? {
        system_instruction: {
          parts: [{ text: params.systemPrompt }],
        },
      }
    : {}

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: params.prompt }] }],
        ...systemInstruction,
        generationConfig: {
          temperature: params.temperature ?? 0.8,
          maxOutputTokens: params.maxTokens ?? 4096,
        },
      }),
    }
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData?.error?.message || `Error de Gemini API: ${response.status}`)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Respuesta vacía de Gemini')
  return text
}

// Generate content with Grok
async function generateWithGrok(params: GenerateContentParams): Promise<string> {
  const apiKey = getGrokApiKey()
  if (!apiKey) throw new Error('API Key de Grok no configurada')

  const messages: Array<{ role: string; content: string }> = []
  
  if (params.systemPrompt) {
    messages.push({ role: 'system', content: params.systemPrompt })
  }
  messages.push({ role: 'user', content: params.prompt })

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'grok-2-latest',
      messages,
      temperature: params.temperature ?? 0.8,
      max_tokens: params.maxTokens ?? 4096,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData?.error?.message || `Error de Grok API: ${response.status}`)
  }

  const data = await response.json()
  const text = data?.choices?.[0]?.message?.content
  if (!text) throw new Error('Respuesta vacía de Grok')
  return text
}

// Main generate function
export async function generateContent(params: GenerateContentParams): Promise<string> {
  if (params.provider === 'gemini') {
    return generateWithGemini(params)
  } else {
    return generateWithGrok(params)
  }
}

// Blog article generation prompt
export function getBlogGenerationPrompt(topic: string, category: string): string {
  return `Eres un experto en tecnología, inteligencia artificial y negocios digitales. 
Genera un artículo de blog completo y profesional en español sobre el tema: "${topic}".

El artículo debe:
- Tener un título atractivo y claro
- Incluir al menos 3-4 subtítulos (##)
- Tener entre 800-1200 palabras
- Incluir ejemplos prácticos y casos de uso reales
- Ser accesible para personas no técnicas
- Incluir una conclusión con llamada a la acción
- Usar formato markdown
- Categoría: ${category}
- Estar orientado a emprendedores y pequeños negocios que quieren usar tecnología

Estructura sugerida:
# Título Principal
(Introducción breve)
## Subtítulo 1
## Subtítulo 2
## Subtítulo 3
## Conclusión

Genera el artículo completo ahora:`
}

export const BLOG_SYSTEM_PROMPT = `Sos un agente de IA especializado en generar contenido de blog para TechBridge, 
una consultora de tecnología que ayuda a personas y pequeños negocios a integrarse con nuevas tecnologías, 
IA y automatizaciones. Tu tono es cercano, profesional y accesible. Siempre escribís en español.`
