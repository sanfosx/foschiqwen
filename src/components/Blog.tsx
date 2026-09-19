import { useState } from 'react'
import { Calendar, Clock, User, Tag, ArrowRight, Sparkles, Bot } from 'lucide-react'
import BlogPost from './BlogPost'

interface BlogArticle {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  date: string
  image: string
  tags: string[]
}

const articles: BlogArticle[] = [
  {
    id: 1,
    title: 'Cómo un Chatbot con IA puede Aumentar tus Ventas un 40%',
    excerpt: 'Descubrí cómo los agentes de IA están transformando la atención al cliente y generando más ventas de forma automática.',
    content: `# Cómo un Chatbot con IA puede Aumentar tus Ventas un 40%

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
Un chatbot bien entrenado puede:
- Recomendar productos
- Resolver dudas de compra
- Guiar al cliente hasta el checkout
- Recuperar carritos abandonados

### 3. Ahorro de Tiempo
Lo que antes te tomaba horas respondiendo mensajes, ahora lo hace la IA en segundos.

## Casos Reales

**Tienda de ropa online:**
- Antes: 2 horas/día respondiendo WhatsApp
- Después: Chatbot atiende el 80% de consultas
- Resultado: +35% en ventas, 2 horas libres por día

**Estudio de diseño:**
- Antes: Perdía clientes por no responder rápido
- Después: Chatbot agenda reuniones automáticamente
- Resultado: +40% en conversiones

## ¿Cómo Empezar?

1. **Identificá las consultas más frecuentes** de tus clientes
2. **Elegí la plataforma** (WhatsApp Business API, web, Instagram)
3. **Entrená al chatbot** con tu información
4. **Probá y ajustá** durante las primeras semanas
5. **Medí resultados** y escalá

## Conclusión

Un chatbot con IA no es un gasto, es una inversión. Si te ahorra 2 horas diarias y aumenta tus ventas un 40%, se paga solo en semanas.

¿Querés saber cómo implementar uno en tu negocio? Hablemos.`,
    category: 'Inteligencia Artificial',
    readTime: '5 min',
    date: '2024-01-15',
    image: '🤖',
    tags: ['IA', 'Chatbots', 'Ventas', 'Automatización'],
  },
  {
    id: 2,
    title: '5 Automatizaciones que Todo Pequeño Negocio Necesita',
    excerpt: 'Dejá de perder tiempo en tareas repetitivas. Estas automatizaciones te van a cambiar la vida.',
    content: `# 5 Automatizaciones que Todo Pequeño Negocio Necesita

Si todavía estás haciendo tareas manuales repetitivas, estás perdiendo tiempo y dinero. Acá te muestro 5 automatizaciones esenciales que todo negocio debería tener.

## 1. Automatización de Facturación

**El problema:** Crear facturas manualmente, enviarlas por email, controlar pagos.

**La solución:** Un sistema que:
- Genera facturas automáticamente
- Las envía por email/WhatsApp
- Te avisa cuando hay pagos pendientes
- Concilia con tu banco

**Resultado:** 3 horas/semana ahorradas, 0 errores.

## 2. Respuestas Automáticas en WhatsApp

**El problema:** Responder siempre lo mismo a los clientes.

**La solución:** Un chatbot que:
- Responde preguntas frecuentes
- Envía catálogos
- Agenda reuniones
- Pasa a humano cuando es necesario

**Resultado:** Respuesta instantánea 24/7, clientes más felices.

## 3. Gestión de Inventario Inteligente

**El problema:** No saber qué tenés, qué se está por acabar, qué vender más.

**La solución:** Un sistema que:
- Te avisa cuando el stock está bajo
- Predice qué vas a necesitar
- Genera órdenes de compra automáticas
- Te muestra qué productos vender más

**Resultado:** Menos quiebre de stock, más ventas.

## 4. Seguimiento Automático de Clientes

**El problema:** Olvidarte de hacer seguimiento, perder ventas.

**La solución:** Un sistema que:
- Envía recordatorios automáticos
- Pide feedback después de la compra
- Reactiva clientes inactivos
- Celebra cumpleaños

**Resultado:** +25% en recompra, clientes más fieles.

## 5. Reportes Automáticos

**El problema:** No saber cómo va tu negocio porque no tenés tiempo de armar reportes.

**La solución:** Un dashboard que:
- Se actualiza en tiempo real
- Te envía un resumen diario/semanal
- Te muestra métricas clave
- Te alerta de problemas

**Resultado:** Decisiones basadas en datos, no en intuición.

## ¿Cómo Implementar Todo Esto?

No necesitás hacerlo todo de una vez. Empezá por lo más urgente:

1. **Semana 1:** Automatizá respuestas en WhatsApp
2. **Semana 2:** Automatizá facturación
3. **Semana 3:** Implementá seguimiento de clientes
4. **Semana 4:** Sumá reportes automáticos

## Herramientas Recomendadas

- **WhatsApp Business API** + Chatbot
- **Make/Zapier** para conectar herramientas
- **Notion/Airtable** para gestión
- **Google Sheets** + Scripts para reportes simples

## Conclusión

La automatización no es para grandes empresas. Es para cualquier negocio que quiera crecer sin trabajar más horas.

¿Necesitás ayuda para implementar alguna de estas automatizaciones? Escribime.`,
    category: 'Automatización',
    readTime: '7 min',
    date: '2024-01-10',
    image: '⚡',
    tags: ['Automatización', 'Productividad', 'Negocios', 'Herramientas'],
  },
  {
    id: 3,
    title: 'Tu Primera Página Web: Guía Completa para Principiantes',
    excerpt: 'Todo lo que necesitás saber para tener tu página web profesional, sin complicaciones.',
    content: `# Tu Primera Página Web: Guía Completa para Principiantes

Tener una página web ya no es opcional. Es tu vidriera digital, tu carta de presentación 24/7. Pero, ¿por dónde empezar si no sabés nada de tecnología?

## ¿Por Qué Necesitás una Página Web?

- **Credibilidad:** Un negocio sin web parece menos profesional
- **Visibilidad:** Te encuentran en Google
- **Control:** No dependés de redes sociales
- **Ventas:** Podés vender directamente
- **Información:** Tus clientes encuentran lo que necesitan

## Tipos de Páginas Web

### 1. Landing Page
- Una sola página
- Objetivo específico (vender, captar leads)
- Ideal para empezar

### 2. Sitio Web Corporativo
- Varias páginas (Inicio, Servicios, Contacto)
- Presentación completa de tu negocio
- Profesional y completo

### 3. Tienda Online (E-commerce)
- Catálogo de productos
- Carrito de compras
- Pasarela de pagos
- Para vender directamente

## ¿Qué Necesitás para Empezar?

### Contenido
- **Texto:** Quién sos, qué hacés, por qué elegirte
- **Imágenes:** Fotos de calidad de tu negocio/productos
- **Logo:** Tu marca visual
- **Datos de contacto:** Email, teléfono, redes

### Diseño
- **Colores:** Que representen tu marca
- **Tipografía:** Legible y profesional
- **Estructura:** Información organizada

### Técnico
- **Dominio:** Tu nombre (ej: tunegocio.com)
- **Hosting:** Donde se aloja tu web
- **Certificado SSL:** Para seguridad (https)

## Pasos para Crear tu Web

### Paso 1: Definí el Objetivo
¿Qué querés lograr con tu web?
- ¿Vender productos?
- ¿Captar clientes?
- ¿Mostrar tu portfolio?
- ¿Dar información?

### Paso 2: Elegí la Plataforma
- **WordPress:** Flexible, pero requiere mantenimiento
- **Wix/Squarespace:** Fácil, pero limitado
- **Desarrollo a medida:** Profesional, pero más caro
- **Con un desarrollador:** La mejor opción para resultados profesionales

### Paso 3: Diseñá la Estructura
Páginas esenciales:
- **Inicio:** Tu propuesta de valor
- **Sobre mí/nosotros:** Tu historia
- **Servicios/Productos:** Qué ofrecés
- **Contacto:** Cómo comunicarse
- **Testimonios:** Prueba social

### Paso 4: Creá el Contenido
- Textos claros y directos
- Llamadas a la acción (CTA)
- Imágenes de calidad
- Información de contacto visible

### Paso 5: Optimizá para SEO
- Palabras clave en títulos
- Descripciones meta
- URLs amigables
- Velocidad de carga

### Paso 6: Probá y Lanzá
- Testeá en diferentes dispositivos
- Pedí feedback
- Corregí errores
- ¡Lanzá!

## Errores Comunes a Evitar

❌ **Demasiada información:** Menos es más
❌ **Diseño anticuado:** Invertí en algo profesional
❌ **Sin llamada a la acción:** Decile al visitante qué hacer
❌ **Lento:** Optimizá imágenes y código
❌ **No responsive:** Tiene que verse bien en celular

## ¿Cuánto Cuesta?

Depende de la complejidad:
- **Landing page simple:** $X - $X
- **Sitio corporativo:** $X - $X
- **Tienda online:** $X - $X
- **Desarrollo a medida:** $X - $X

*Los precios varían según funcionalidades y diseño.*

## Mantenimiento

Una web no es "crear y olvidar". Necesitás:
- Actualizar contenido regularmente
- Hacer backups
- Actualizar seguridad
- Medir resultados

## Conclusión

Tu página web es una inversión, no un gasto. Una buena web se paga sola con los clientes que te trae.

¿Listo para tener tu página web profesional? Hablemos.`,
    category: 'Desarrollo Web',
    readTime: '8 min',
    date: '2024-01-05',
    image: '🌐',
    tags: ['Web', 'Diseño', 'Principiantes', 'Negocios'],
  },
  {
    id: 4,
    title: 'IA para No-Tech: Cómo Usar ChatGPT en tu Negocio',
    excerpt: 'Aprendé a usar ChatGPT para ahorrar tiempo, crear contenido y tomar mejores decisiones en tu negocio.',
    content: `# IA para No-Tech: Cómo Usar ChatGPT en tu Negocio

ChatGPT no es solo para programadores. Es una herramienta poderosa que cualquier emprendedor puede usar para trabajar mejor. Acá te muestro cómo.

## ¿Qué es ChatGPT?

Es un asistente de IA que puede:
- Responder preguntas
- Escribir textos
- Analizar información
- Generar ideas
- Traducir idiomas
- Y mucho más

## 10 Formas de Usar ChatGPT en tu Negocio

### 1. Escribir Emails Profesionales
**Prompt:** "Escribí un email profesional para [situación]. Tono: [formal/cercano]. Longitud: [corta/media/larga]"

**Ejemplo:** Email para cobrar una factura atrasada, responder una queja, proponer un proyecto.

### 2. Crear Contenido para Redes
**Prompt:** "Creá 5 ideas de posts para Instagram sobre [tema]. Mi negocio es [descripción]. Objetivo: [vender/educar/entretener]"

**Resultado:** Ideas listas para publicar, con copy incluido.

### 3. Responder Consultas de Clientes
**Prompt:** "Un cliente me pregunta [pregunta]. Respondé de forma [profesional/amigable] en menos de 100 palabras."

**Ventaja:** Respuestas rápidas y consistentes.

### 4. Generar Ideas de Productos/Servicios
**Prompt:** "Mi negocio es [descripción]. Mis clientes son [descripción]. Sugerí 10 productos/servicios nuevos que podría ofrecer."

**Resultado:** Ideas innovadoras basadas en tu contexto.

### 5. Mejorar Textos
**Prompt:** "Mejorá este texto para que sea más [claro/profesional/persuasivo]: [tu texto]"

**Uso:** Descripciones de productos, páginas web, presentaciones.

### 6. Analizar Competencia
**Prompt:** "Analizá esta página web de mi competencia: [URL]. Decime qué hacen bien y qué puedo mejorar en la mía."

**Nota:** ChatGPT no puede acceder a URLs en tiempo real, pero podés copiar el contenido.

### 7. Crear Planes de Negocio
**Prompt:** "Ayudame a crear un plan de negocio para [idea]. Incluí: resumen ejecutivo, mercado objetivo, estrategia de marketing, proyecciones financieras."

**Resultado:** Estructura completa para tu proyecto.

### 8. Traducir Contenido
**Prompt:** "Traducí este texto al [idioma] manteniendo el tono [formal/informal]: [texto]"

**Uso:** Expandir tu negocio a otros mercados.

### 9. Resolver Problemas
**Prompt:** "Tengo este problema en mi negocio: [descripción]. Sugerí 5 soluciones posibles."

**Ventaja:** Perspectiva externa y objetiva.

### 10. Automatizar Tareas Repetitivas
**Prompt:** "Necesito hacer [tarea] todos los días. Sugerí una forma de automatizarlo o hacerlo más eficiente."

**Resultado:** Ideas para optimizar tu tiempo.

## Consejos para Mejores Resultados

### Sé Específico
❌ "Escribí un email"
✅ "Escribí un email de 150 palabras para cobrar una factura de $50.000 vencida hace 15 días. Tono profesional pero amigable."

### Dá Contexto
❌ "Sugerí ideas de negocio"
✅ "Soy diseñador gráfico en Buenos Aires. Tengo 5 años de experiencia. Sugerí 5 ideas de negocio que pueda empezar con $100.000."

### Iterá
Si la primera respuesta no es perfecta, pedí ajustes:
- "Hacelo más corto"
- "Cambiá el tono a más formal"
- "Agregá más ejemplos"

### Usá Ejemplos
"Seguí este formato: [ejemplo]. Ahora aplicalo a: [tu caso]"

## Limitaciones de ChatGPT

⚠️ **No siempre es preciso:** Verificá información importante
⚠️ **No tiene contexto de tu negocio:** Tenés que dárselo
⚠️ **Puede inventar datos:** Especialmente cifras y fechas
⚠️ **No reemplaza el criterio humano:** Es una herramienta, no un reemplazo

## Alternativas a ChatGPT

- **Claude AI:** Excelente para análisis y escritura larga
- **Google Bard:** Bueno para información actualizada
- **Perplexity:** Ideal para investigación
- **Copilot:** Integrado con Microsoft Office

## Conclusión

ChatGPT es como tener un asistente inteligente disponible 24/7. La clave está en saber cómo pedirle las cosas.

Empezá con tareas simples y vas a ver cómo te ahorra horas de trabajo.

¿Querés aprender a usar IA en tu negocio de forma más avanzada? Hablemos.`,
    category: 'Inteligencia Artificial',
    readTime: '10 min',
    date: '2024-01-01',
    image: '🧠',
    tags: ['ChatGPT', 'IA', 'Productividad', 'Negocios'],
  },
]

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogArticle | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')

  const categories = ['Todos', ...Array.from(new Set(articles.map(a => a.category)))]
  
  const filteredArticles = selectedCategory === 'Todos' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory)

  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
  }

  return (
    <section id="blog" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Generado por IA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Blog{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Tech
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Artículos generados por nuestro agente de IA sobre tecnología, negocios y automatización.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-gray-900/50 border border-gray-800 text-gray-400 hover:border-cyan-500/30 hover:text-cyan-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedPost(article)}
              className="group cursor-pointer bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/5"
            >
              {/* Image/Emoji Header */}
              <div className="h-48 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform">
                {article.image}
              </div>

              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                {/* Category */}
                <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-3">
                  {article.category}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm group-hover:gap-3 transition-all">
                  Leer más
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* AI Agent Info */}
        <div className="mt-16 p-6 bg-gradient-to-r from-cyan-500/5 to-blue-600/5 border border-gray-800 rounded-2xl text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-semibold">Agente IA de Contenido</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Este blog es generado automáticamente por nuestro agente de IA, entrenado con las últimas tendencias en tecnología, 
            negocios y automatización. Nuevo contenido cada semana.
          </p>
        </div>
      </div>
    </section>
  )
}
