# 🚀 TechBridge - Plataforma de Consultoría Tecnológica con IA

<div align="center">

![TechBridge](https://img.shields.io/badge/TechBridge-Consultoría%20IA-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6)
![InsForge](https://img.shields.io/badge/Backend-InsForge-10b981)
![Vite](https://img.shields.io/badge/Vite-6.4-646cff)

**Tu puente hacia el futuro tecnológico**

Aplicación web completa para consultoría tecnológica con integración de IA (Gemini + Groq), blog automatizado, y backend en InsForge.

[Demo](#-demo) • [Deploy](#-deploy) • [Documentación](#-documentación)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Deploy](#-deploy)
- [Uso](#-uso)
- [APIs de IA](#-apis-de-ia)
- [Base de Datos](#-base-de-datos)
- [Documentación](#-documentación)

---

## ✨ Características

### 🎯 Para el Negocio
- **Landing Page Profesional**: Diseño moderno y responsive
- **Servicios Detallados**: 6 servicios de consultoría tecnológica
- **Planes y Precios**: 3 planes (Starter, Business, Premium)
- **Testimonios**: Casos de éxito con métricas
- **FAQ Interactivo**: Preguntas frecuentes con acordeón

### 🤖 Agente de IA
- **Multi-Modelo**: Gemini 3.6 Flash + Groq Compound
- **Generación de Contenido**: Artículos de blog automáticos
- **Configuración de API Keys**: Panel para gestionar claves
- **Verificación de Disponibilidad**: Estado en tiempo real
- **Historial de Generaciones**: Log completo en base de datos

### 📝 Blog Automatizado
- **Artículos Generados por IA**: Contenido fresco automáticamente
- **Categorías y Tags**: Organización por temas
- **Lectura Completa**: Vista detallada de artículos
- **SEO Optimizado**: Estructura amigable para buscadores

### 🗄️ Backend Completo
- **Base de Datos PostgreSQL**: 6 tablas optimizadas
- **API REST**: Endpoints para todas las operaciones
- **Row Level Security**: Políticas de acceso granulares
- **Analytics**: Tracking de eventos y page views
- **Contact Forms**: Gestión de mensajes de contacto

---

## 🛠️ Tecnologías

### Frontend
- **React 18.3** - Framework UI
- **TypeScript 5.6** - Tipado estático
- **Vite 6.4** - Build tool ultrarrápido
- **Tailwind CSS 4** - Estilos utility-first
- **Lucide React** - Iconos modernos

### Backend
- **InsForge** - Plataforma backend completa
- **PostgreSQL** - Base de datos relacional
- **REST API** - Endpoints PostgREST-compatible
- **Row Level Security** - Seguridad a nivel de fila

### Integraciones de IA
- **Google Gemini 3.6 Flash** - Generación de contenido
- **Groq Compound** - Inferencia ultra-rápida
- **groq-sdk** - SDK oficial de Groq

### Deploy
- **InsForge Sites** - Hosting en Vercel
- **CLI de InsForge** - Automatización de deploys

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Landing │  │   Blog   │  │ AI Agent │              │
│  │  Page    │  │  System  │  │  Panel   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              InsForge Backend (REST API)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Database │  │   Auth   │  │ Storage  │              │
│  │PostgreSQL│  │   (RLS)  │  │  (S3)    │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 External AI APIs                         │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ Google Gemini    │  │     Groq         │            │
│  │ 3.6 Flash        │  │   Compound       │            │
│  └──────────────────┘  └──────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ y npm
- Cuenta en InsForge
- API Keys de Gemini y/o Groq (opcional)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd techbridge
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🚀 Deploy

### Deploy Completo (Recomendado)

Ejecuta el script de deploy automático:

```bash
node scripts/deploy.js
```

Este script hará todo automáticamente:
- ✅ Login en InsForge
- ✅ Linkeo del proyecto
- ✅ Configuración de variables de entorno
- ✅ Inicialización de base de datos
- ✅ Build de la aplicación
- ✅ Deploy a InsForge Sites

### Deploy Manual

Si prefieres hacerlo paso a paso:

```bash
# 1. Login
npx @insforge/cli login --user-api-key uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU

# 2. Link project
npx @insforge/cli link --project-id b52410db-f5e7-4809-b433-53cb0c93da09

# 3. Set environment variables
npx @insforge/cli deployments env set VITE_INSFORGE_URL https://uagk9992.us-east.insforge.app
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU

# 4. Initialize database
node scripts/init-database.js

# 5. Build
npm run build

# 6. Deploy
npx @insforge/cli deployments deploy .
```

### URLs Post-Deploy

- **Aplicación**: `https://uagk9992.insforge.site`
- **Dashboard**: `https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09`

---

## 💻 Uso

### Configuración de APIs de IA

1. Abre la aplicación en el navegador
2. Navega a la sección "Agente IA"
3. Haz clic en "API Keys"
4. Ingresa tus claves:
   - **Gemini**: Obtén en [Google AI Studio](https://aistudio.google.com/apikey)
   - **Groq**: Obtén en [Groq Console](https://console.groq.com/keys)
5. Haz clic en "Verificar" para comprobar la conexión

### Generación de Artículos

1. Selecciona el modelo (Gemini o Groq)
2. Ingresa un tema o selecciona uno sugerido
3. Elige una categoría
4. Haz clic en "Generar Artículo"
5. El artículo se generará y mostrará en tiempo real

### Blog

- Los artículos generados se guardan automáticamente en la base de datos
- Puedes filtrar por categoría
- Cada artículo tiene su propia vista detallada
- Los artículos incluyen formato markdown renderizado

### Formulario de Contacto

- Los mensajes se guardan en la tabla `contact_messages`
- Incluye validación de campos
- Confirmación visual al enviar
- Los mensajes pueden ser gestionados desde el dashboard de InsForge

---

## 🤖 APIs de IA

### Google Gemini 3.6 Flash

**Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent`

**Características**:
- Excelente para contenido creativo
- Soporta contexto largo
- Rate limit generoso en plan gratuito
- API key gratuita

**Obtener API Key**: [Google AI Studio](https://aistudio.google.com/apikey)

### Groq Compound

**Endpoint**: `https://api.groq.com/openai/v1/chat/completions`

**Características**:
- Inferencia ultra-rápida (LPU)
- Excelente para razonamiento
- Compatible con formato OpenAI
- API key gratuita

**Obtener API Key**: [Groq Console](https://console.groq.com/keys)

---

## 🗄️ Base de Datos

### Tablas

| Tabla | Descripción |
|-------|-------------|
| `blog_articles` | Artículos del blog con SEO, categorías, tags |
| `generated_articles` | Log de artículos generados por IA |
| `contact_messages` | Mensajes del formulario de contacto |
| `newsletter_subscribers` | Suscriptores del newsletter |
| `ai_api_logs` | Log de uso de APIs de IA |
| `site_analytics` | Tracking de eventos y page views |

### Inicialización

```bash
# Usando el script
node scripts/init-database.js

# O manualmente desde el dashboard de InsForge
# Ejecutar: supabase/migrations/001_initial_schema.sql
```

### Consultas de Ejemplo

```typescript
import db from './services/insforgeClient'

// Obtener artículos publicados
const articles = await db.from('blog_articles')
  .select('*')
  .eq('is_published', true)
  .order('created_at', { ascending: false })

// Guardar mensaje de contacto
await db.from('contact_messages')
  .insert({ name: 'Juan', email: 'juan@example.com', message: 'Hola' })

// Log de generación IA
await db.from('generated_articles')
  .insert({ topic: 'AI Trends', content: '...', ai_provider: 'gemini' })
```

---

## 📚 Documentación

### Archivos de Documentación

- **`DEPLOY_GUIDE.md`** - Guía completa de deploy
- **`BACKEND.md`** - Documentación del backend
- **`AGENTS.md`** - Instrucciones para agentes de IA
- **`insforge.toml`** - Configuración de InsForge
- **`vercel.json`** - Configuración de Vercel

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build

# Base de datos
node scripts/init-database.js    # Inicializar BD

# Deploy
node scripts/deploy.js           # Deploy completo
./deploy.sh                      # Deploy con bash script
```

---

## 🔐 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- **API Keys** de IA almacenadas en localStorage del navegador
- **Admin Key** de InsForge para operaciones sensibles
- **Políticas de acceso** público para lecturas e inserciones básicas
- **Variables de entorno** para configuración sensible

---

## 📊 Estructura del Proyecto

```
techbridge/
├── src/
│   ├── components/         # Componentes React
│   │   ├── AIAgent.tsx    # Panel de agente IA
│   │   ├── ApiConfig.tsx  # Configuración de APIs
│   │   ├── Blog.tsx       # Listado de blog
│   │   ├── BlogPost.tsx   # Vista de artículo
│   │   ├── Contact.tsx    # Formulario de contacto
│   │   ├── DatabaseSetup.tsx      # Estado de BD
│   │   └── DatabaseInitializer.tsx # Auto-init BD
│   ├── services/          # Servicios backend
│   │   ├── insforge.ts    # Config InsForge
│   │   ├── insforgeClient.ts # Cliente REST
│   │   ├── backend.ts     # Lógica de negocio
│   │   └── aiService.ts   # Integración IA
│   ├── hooks/             # Custom hooks
│   │   └── useDatabaseInit.ts
│   └── App.tsx           # Componente principal
├── scripts/
│   ├── init-database.js   # Script de inicialización BD
│   └── deploy.js          # Script de deploy completo
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Schema SQL
├── insforge.toml          # Config InsForge
├── vercel.json            # Config Vercel
├── .env.example           # Variables de entorno ejemplo
├── DEPLOY_GUIDE.md        # Guía de deploy
├── BACKEND.md             # Documentación backend
├── AGENTS.md              # Instrucciones agentes
└── README.md              # Este archivo
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 📞 Soporte

- **Documentación de InsForge**: https://docs.insforge.dev
- **Dashboard del Proyecto**: https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09
- **Issues**: Reporta problemas en el repositorio

---

## 🎉 Créditos

Desarrollado con ❤️ para TechBridge - Consultoría Tecnológica

**Tecnologías Clave**:
- React + TypeScript + Vite
- InsForge Backend
- Google Gemini + Groq AI
- Tailwind CSS

---

<div align="center">

**¿Listo para transformar tu negocio con IA?**

[Comenzar Ahora](#-instalación) • [Ver Demo](#-uso) • [Documentación](#-documentación)

</div>
