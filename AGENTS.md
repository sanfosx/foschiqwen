# InsForge Agent Instructions

## Project Overview

This is a TechBridge application deployed on InsForge. The project uses:
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: InsForge (PostgreSQL + REST API)
- **AI Integration**: Google Gemini (gemini-3.6-flash) + Groq (groq/compound)
- **Deployment**: InsForge Sites (Vercel-powered)

## Backend Infrastructure

### Database
- **Provider**: PostgreSQL via InsForge
- **Connection**: `postgresql://postgres:***@uagk9992.us-east.database.insforge.app:5432/insforge?sslmode=require`
- **REST API**: `https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app/rest/v1`
- **Admin Key**: `uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU`

### Tables
1. `blog_articles` - Blog posts with SEO, categories, tags
2. `generated_articles` - AI generation logs
3. `contact_messages` - Contact form submissions
4. `newsletter_subscribers` - Newsletter subscribers
5. `ai_api_logs` - AI API usage tracking
6. `site_analytics` - Page views and events

### Services (src/services/)
- `insforge.ts` - InsForge client configuration
- `insforgeClient.ts` - REST client (PostgREST-compatible)
- `backend.ts` - Business logic services
- `aiService.ts` - Gemini & Groq API integration

## CLI Commands

### Authentication
```bash
npx @insforge/cli login --user-api-key uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU
```

### Project Linking
```bash
npx @insforge/cli link --project-id b52410db-f5e7-4809-b433-53cb0c93da09
```

### Database Operations
```bash
# Push schema changes
npx @insforge/cli db push

# Run migrations
npx @insforge/cli db migrate

# Execute raw SQL
npx @insforge/cli db query "SELECT * FROM blog_articles LIMIT 5"
```

### Deployment
```bash
# Set environment variables
npx @insforge/cli deployments env set VITE_INSFORGE_URL https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU

# Deploy
npx @insforge/cli deployments deploy .

# List deployments
npx @insforge/cli deployments list

# Check deployment status
npx @insforge/cli deployments status <deployment-id>
```

### Edge Functions
```bash
# Create function
npx @insforge/cli functions create my-function

# Deploy function
npx @insforge/cli functions deploy my-function

# List functions
npx @insforge/cli functions list
```

## Code Patterns

### Querying the Database

```typescript
import db from './services/insforgeClient'

// Select with filters
const { data, error } = await db.from('blog_articles')
  .select('*')
  .eq('is_published', true)
  .order('created_at', { ascending: false })
  .limit(10)

// Insert
const { data, error } = await db.from('contact_messages')
  .insert({ name: 'John', email: 'john@example.com', message: 'Hello' })

// Update
const { data, error } = await db.from('blog_articles')
  .update({ views: 100 })
  .eq('id', 'article-id')

// Delete
const { error } = await db.from('blog_articles')
  .delete()
  .eq('id', 'article-id')
```

### Using Backend Services

```typescript
import { blogService, contactService, aiGenerationService } from './services/backend'

// Blog operations
const articles = await blogService.getArticles('Inteligencia Artificial')
const article = await blogService.getArticleBySlug('my-article')
await blogService.createArticle({ title: 'New Post', content: '...' })

// Contact form
await contactService.submitMessage({
  name: 'John',
  email: 'john@example.com',
  service: 'consultoria',
  message: 'Need help with AI'
})

// AI generation logging
await aiGenerationService.logGeneration({
  topic: 'AI trends',
  category: 'Inteligencia Artificial',
  content: '...',
  ai_provider: 'gemini',
  model_used: 'gemini-3.6-flash',
  status: 'completed'
})
```

### AI Integration

```typescript
import { generateContent, getBlogGenerationPrompt } from './services/aiService'

// Generate with Gemini
const content = await generateContent({
  prompt: 'Write about AI trends',
  provider: 'gemini',
  temperature: 0.8,
  maxTokens: 4096
})

// Generate with Groq
const content = await generateContent({
  prompt: 'Write about AI trends',
  provider: 'groq',
  temperature: 0.8,
  maxTokens: 4096
})
```

## Environment Variables

| Variable | Description | Value |
|----------|-------------|-------|
| `VITE_INSFORGE_URL` | InsForge project URL | `https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app` |
| `VITE_INSFORGE_ANON_KEY` | InsForge API key | `uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU` |

**Note**: Gemini and Groq API keys are stored in browser localStorage, not as environment variables.

## File Structure

```
src/
├── components/         # React components
│   ├── AIAgent.tsx    # AI content generation interface
│   ├── ApiConfig.tsx  # API key configuration
│   ├── Blog.tsx       # Blog listing
│   ├── BlogPost.tsx   # Individual blog post
│   ├── Contact.tsx    # Contact form
│   ├── DatabaseSetup.tsx      # DB status panel
│   └── DatabaseInitializer.tsx # Auto DB init
├── services/          # Backend services
│   ├── insforge.ts    # InsForge config
│   ├── insforgeClient.ts # REST client
│   ├── backend.ts     # Business logic
│   └── aiService.ts   # AI integration
├── hooks/             # Custom React hooks
│   └── useDatabaseInit.ts
└── App.tsx           # Main app component

supabase/
└── migrations/
    └── 001_initial_schema.sql  # Database schema
```

## Important Notes

1. **Database Schema**: Run `supabase/migrations/001_initial_schema.sql` to create tables
2. **Row Level Security**: Enabled on all tables with public read/insert policies
3. **API Keys**: Gemini and Groq keys stored in localStorage (user-side)
4. **Build**: Uses Vite, output in `dist/` directory
5. **Deploy**: Via InsForge CLI (`npx @insforge/cli deployments deploy .`)

## Troubleshooting

### Database Connection Issues
- Verify the database URL is correct
- Check that the schema has been applied
- Ensure RLS policies are configured

### Deploy Failures
- Run `npm run build` locally first
- Check environment variables are set
- Review deployment logs: `npx @insforge/cli deployments logs <id>`

### AI Generation Errors
- Verify API keys are configured in the frontend
- Check API availability status in the UI
- Review error messages in the console
