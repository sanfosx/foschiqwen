# TechBridge Backend - InsForge

Backend completo integrado con InsForge para la plataforma de consultoría tecnológica.

## 📊 Arquitectura

```
Frontend (React/Vite)
    ↓
InsForge REST API (PostgREST)
    ↓
PostgreSQL Database
```

## 🔧 Configuración

### Project Details
- **Project ID:** `b52410db-f5e7-4809-b433-53cb0c93da09`
- **Base URL:** `https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app`
- **Database:** PostgreSQL en `uagk9992.us-east.database.insforge.app:5432`

### Instalación

1. **Instalar el CLI de InsForge:**
```bash
npm install -g @insforge/cli
```

2. **Login:**
```bash
npx @insforge/cli login --user-api-key uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU
```

3. **Linkear proyecto:**
```bash
npx @insforge/cli link --project-id b52410db-f5e7-4809-b433-53cb0c93da09
```

4. **Ejecutar el schema SQL:**
```bash
# Opción 1: Desde el dashboard de InsForge
# Ir a: https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09/database
# Ejecutar el SQL de: supabase/migrations/001_initial_schema.sql

# Opción 2: Con el CLI
npx @insforge/cli db push
```

## 🗄️ Tablas de la Base de Datos

### `blog_articles`
Artículos del blog generados por IA o manualmente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| title | TEXT | Título del artículo |
| slug | TEXT | URL amigable (único) |
| excerpt | TEXT | Resumen corto |
| content | TEXT | Contenido completo (markdown) |
| category | TEXT | Categoría |
| tags | TEXT[] | Array de tags |
| image_emoji | TEXT | Emoji representativo |
| read_time | TEXT | Tiempo de lectura estimado |
| author | TEXT | Autor |
| ai_provider | TEXT | Proveedor de IA usado |
| is_published | BOOLEAN | Estado de publicación |
| views | INTEGER | Contador de vistas |
| created_at | TIMESTAMPTZ | Fecha de creación |
| updated_at | TIMESTAMPTZ | Fecha de actualización |

### `generated_articles`
Log de artículos generados por IA.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| topic | TEXT | Tema solicitado |
| category | TEXT | Categoría |
| title | TEXT | Título generado |
| content | TEXT | Contenido generado |
| ai_provider | TEXT | gemini o groq |
| model_used | TEXT | Modelo específico |
| tokens_used | INTEGER | Tokens consumidos |
| generation_time_ms | INTEGER | Tiempo de generación |
| status | TEXT | completed o error |
| error_message | TEXT | Mensaje de error si aplica |
| created_at | TIMESTAMPTZ | Fecha de generación |

### `contact_messages`
Mensajes del formulario de contacto.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| name | TEXT | Nombre del contacto |
| email | TEXT | Email del contacto |
| service | TEXT | Servicio de interés |
| message | TEXT | Mensaje |
| status | TEXT | new, in_progress, responded |
| responded | BOOLEAN | Si fue respondido |
| created_at | TIMESTAMPTZ | Fecha de envío |
| updated_at | TIMESTAMPTZ | Fecha de actualización |

### `newsletter_subscribers`
Suscriptores del newsletter.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| email | TEXT | Email (único) |
| name | TEXT | Nombre |
| is_active | BOOLEAN | Estado de suscripción |
| subscribed_at | TIMESTAMPTZ | Fecha de suscripción |
| unsubscribed_at | TIMESTAMPTZ | Fecha de baja |

### `ai_api_logs`
Log de llamadas a APIs de IA.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| provider | TEXT | gemini o groq |
| model | TEXT | Modelo usado |
| endpoint | TEXT | Endpoint llamado |
| request_type | TEXT | Tipo de request |
| tokens_input | INTEGER | Tokens de entrada |
| tokens_output | INTEGER | Tokens de salida |
| success | BOOLEAN | Si fue exitoso |
| error_message | TEXT | Error si aplica |
| response_time_ms | INTEGER | Tiempo de respuesta |
| created_at | TIMESTAMPTZ | Fecha |

### `site_analytics`
Analíticas del sitio.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| page | TEXT | Página visitada |
| event_type | TEXT | Tipo de evento |
| session_id | TEXT | ID de sesión |
| user_agent | TEXT | User agent |
| referrer | TEXT | Referer |
| metadata | JSONB | Metadata adicional |
| created_at | TIMESTAMPTZ | Fecha |

## 📁 Estructura de Archivos

```
src/
├── services/
│   ├── insforge.ts          # Configuración del cliente InsForge
│   ├── insforgeClient.ts    # Cliente REST personalizado
│   ├── backend.ts           # Servicios de backend (blog, contact, etc.)
│   └── aiService.ts         # Integración con APIs de IA
├── components/
│   ├── DatabaseSetup.tsx     # Panel de estado de BD
│   ├── DatabaseInitializer.tsx # Auto-inicialización
│   └── ...
└── hooks/
    └── useDatabaseInit.ts   # Hook de inicialización

supabase/
└── migrations/
    └── 001_initial_schema.sql  # Schema completo
```

## 🔌 Servicios Disponibles

### Blog Service
```typescript
import { blogService } from './services/backend'

// Obtener artículos
const articles = await blogService.getArticles(category?)

// Obtener artículo por slug
const article = await blogService.getArticleBySlug(slug)

// Crear artículo
const newArticle = await blogService.createArticle({ title, content, ... })
```

### Contact Service
```typescript
import { contactService } from './services/backend'

// Enviar mensaje de contacto
const result = await contactService.submitMessage({
  name, email, service, message
})
```

### AI Generation Service
```typescript
import { aiGenerationService } from './services/backend'

// Log de generación
await aiGenerationService.logGeneration({
  topic, category, content, ai_provider, ...
})

// Historial de generaciones
const history = await aiGenerationService.getHistory(limit)
```

### Analytics Service
```typescript
import { analyticsService } from './services/backend'

// Track page view
await analyticsService.trackPageView('/blog', { articleId: '...' })

// Track event
await analyticsService.trackEvent('article_read', '/blog', { ... })
```

## 🔐 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- Políticas de acceso público para lectura de blog y envío de contactos
- Acceso completo solo con admin key
- API keys almacenadas en localStorage del navegador

## 🚀 Deployment

El frontend se puede deployar en cualquier hosting estático (Vercel, Netlify, etc.).

```bash
npm run build
# Subir la carpeta dist/ a tu hosting
```

## 📝 Notas

- El schema SQL se ejecuta automáticamente al cargar la app si las tablas no existen
- Si hay error de permisos, ejecutar el SQL manualmente desde el dashboard
- Las API keys de Gemini y Groq se guardan en el navegador del usuario
- El backend es completamente funcional una vez inicializada la BD

## 🔗 Links Útiles

- [Dashboard de InsForge](https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09)
- [Documentación de InsForge](https://docs.insforge.dev)
- [API REST Reference](https://docs.insforge.dev/sdks/rest/overview)
- [Database Overview](https://docs.insforge.dev/core-concepts/database/overview)
