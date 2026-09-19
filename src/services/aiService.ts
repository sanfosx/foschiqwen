// AI Service - Gemini & Groq API Integration

import Groq from 'groq-sdk'

export type AIProvider = 'gemini' | 'groq'

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
const GROQ_KEY_STORAGE = 'techbridge_groq_api_key'

export function getGeminiApiKey(): string {
  return localStorage.getItem(GEMINI_KEY_STORAGE) || ''
}

export function getGroqApiKey(): string {
  return localStorage.getItem(GROQ_KEY_STORAGE) || ''
}

export function setGeminiApiKey(key: string): void {
  localStorage.setItem(GEMINI_KEY_STORAGE, key)
}

export function setGroqApiKey(key: string): void {
  localStorage.setItem(GROQ_KEY_STORAGE, key)
}

export function removeGeminiApiKey(): void {
  localStorage.removeItem(GEMINI_KEY_STORAGE)
}

export function removeGroqApiKey(): void {
  localStorage.removeItem(GROQ_KEY_STORAGE)
}

// Check API availability
export async function checkGeminiAvailability(): Promise<{ available: boolean; error: string | null }> {
  const apiKey = getGeminiApiKey()
  if (!apiKey) {
    return { available: false, error: 'API Key no configurada' }
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
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

export async function checkGroqAvailability(): Promise<{ available: boolean; error: string | null }> {
  const apiKey = getGroqApiKey()
  if (!apiKey) {
    return { available: false, error: 'API Key no configurada' }
  }

  try {
    const groq = new Groq({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    await groq.chat.completions.create({
      model: 'groq/compound',
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 5,
    })

    return { available: true, error: null }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Error de conexión'
    // Check if it's an auth error vs other error
    if (errorMsg.includes('API key') || errorMsg.includes('401') || errorMsg.includes('authentication')) {
      return { available: false, error: 'API Key inválida' }
    }
    // If we got a response (even an error about content), the API is reachable
    if (errorMsg.includes('400') || errorMsg.includes('content')) {
      return { available: true, error: null }
    }
    return { available: false, error: errorMsg }
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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
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

// Generate content with Groq
async function generateWithGroq(params: GenerateContentParams): Promise<string> {
  const apiKey = getGroqApiKey()
  if (!apiKey) throw new Error('API Key de Groq no configurada')

  const groq = new Groq({
    apiKey,
    dangerouslyAllowBrowser: true,
  })

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = []

  if (params.systemPrompt) {
    messages.push({ role: 'system' as const, content: params.systemPrompt })
  }
  messages.push({ role: 'user' as const, content: params.prompt })

  const completion = await groq.chat.completions.create({
    model: 'groq/compound',
    messages: messages as any,
    temperature: params.temperature ?? 0.8,
    max_tokens: params.maxTokens ?? 4096,
  })

  const text = completion.choices[0]?.message?.content
  if (!text) throw new Error('Respuesta vacía de Groq')
  return text
}

// Main generate function
export async function generateContent(params: GenerateContentParams): Promise<string> {
  if (params.provider === 'gemini') {
    return generateWithGemini(params)
  } else {
    return generateWithGroq(params)
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
