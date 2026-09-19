import { Calendar, Clock, Tag, ArrowLeft, Share2, Bookmark, Sparkles } from 'lucide-react'

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

interface BlogPostProps {
  post: BlogArticle
  onBack: () => void
}

export default function BlogPost({ post, onBack }: BlogPostProps) {
  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl sm:text-4xl font-bold text-white mb-6">{line.slice(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-cyan-300 mt-6 mb-3">{line.slice(4)}</h3>
      }
      
      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-300 ml-6 mb-2 list-disc">
            {renderInlineFormatting(line.slice(2))}
          </li>
        )
      }
      
      // Bold text lines
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="text-white font-semibold mt-4 mb-2">{line.slice(2, -2)}</p>
      }
      
      // Regular paragraphs
      if (line.trim() === '') {
        return <br key={index} />
      }
      
      return <p key={index} className="text-gray-300 leading-relaxed mb-3">{renderInlineFormatting(line)}</p>
    })
  }

  // Handle inline formatting (bold, italic, code)
  const renderInlineFormatting = (text: string) => {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
      }
      // Italic
      const italicParts = part.split(/(\*[^*]+\*)/)
      return italicParts.map((ip, j) => {
        if (ip.startsWith('*') && ip.endsWith('*') && !ip.startsWith('**')) {
          return <em key={`${i}-${j}`} className="text-cyan-300">{ip.slice(1, -1)}</em>
        }
        return <span key={`${i}-${j}`}>{ip}</span>
      })
    })
  }

  return (
    <section className="py-24 relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver al blog
        </button>

        {/* Article Header */}
        <article className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div className="h-64 sm:h-80 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center text-9xl">
            {post.image}
          </div>

          <div className="p-6 sm:p-10">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} de lectura
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
            </div>

            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-purple-300 font-medium">Artículo generado por IA</span>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500 text-sm mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-800/50 text-gray-400 text-sm rounded-full border border-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share & Actions */}
            <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-sm">
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-sm">
                  <Bookmark className="w-4 h-4" />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-cyan-500/5 to-blue-600/5 border border-gray-800 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">¿Querés aprender más?</h3>
          <p className="text-gray-400 mb-4">Nuestro agente de IA genera nuevo contenido cada semana.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Ver todos los artículos
          </button>
        </div>
      </div>
    </section>
  )
}
