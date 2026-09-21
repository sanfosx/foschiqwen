# 🚀 DEPLOY RÁPIDO - TechBridge en InsForge

## ⚡ Deploy en 3 Pasos

### Opción 1: Script Automático (Recomendado)

```bash
node scripts/deploy.js
```

Este script hace TODO automáticamente:
- ✅ Login en InsForge
- ✅ Configuración del proyecto
- ✅ Variables de entorno
- ✅ Inicialización de base de datos
- ✅ Build de la aplicación
- ✅ Deploy a producción

### Opción 2: Deploy Manual

```bash
# 1. Login
npx @insforge/cli login --user-api-key uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU

# 2. Link project
npx @insforge/cli link --project-id b52410db-f5e7-4809-b433-53cb0c93da09

# 3. Deploy
npx @insforge/cli deployments deploy .
```

## 🌐 URLs de tu Aplicación

Después del deploy:

- **Aplicación**: `https://uagk9992.us-east.insforge.site`
- **Dashboard**: `https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09`

## 📋 Checklist Pre-Deploy

Antes de hacer deploy, asegúrate de:

- [ ] Tener Node.js 18+ instalado
- [ ] Haber ejecutado `npm install`
- [ ] Tener las API keys de Gemini/Grok (opcional, se pueden configurar después)
- [ ] Haber probado la app localmente con `npm run dev`

## 🔧 Configuración Post-Deploy

### 1. Inicializar Base de Datos

Si el script automático no lo hizo:

```bash
node scripts/init-database.js
```

O manualmente desde el dashboard de InsForge:
- Ve a: https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09/database
- Ejecuta el SQL de: `supabase/migrations/001_initial_schema.sql`

### 2. Configurar API Keys de IA

Desde la aplicación web:
1. Navega a la sección "Agente IA"
2. Haz clic en "API Keys"
3. Ingresa tus claves:
   - **Gemini**: https://aistudio.google.com/apikey
   - **Groq**: https://console.groq.com/keys

### 3. Verificar el Deploy

```bash
npx @insforge/cli deployments list
```

## 🐛 Solución de Problemas

### Error: "Deployment failed"

```bash
# Verifica que el build funcione
npm run build

# Revisa los logs
npx @insforge/cli deployments logs <deployment-id>
```

### Error: "Database connection failed"

```bash
# Inicializa la base de datos
node scripts/init-database.js
```

### Error: "Environment variables not set"

```bash
# Configura las variables
npx @insforge/cli deployments env set VITE_INSFORGE_URL https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU
```

## 📚 Documentación Completa

- **README.md** - Documentación principal del proyecto
- **DEPLOY_GUIDE.md** - Guía detallada de deploy
- **BACKEND.md** - Documentación del backend
- **AGENTS.md** - Instrucciones para agentes de IA

## 🎯 Próximos Pasos

1. ✅ Hacer deploy con `node scripts/deploy.js`
2. ✅ Verificar que la app esté en línea
3. ✅ Configurar API keys de IA
4. ✅ Probar la generación de artículos
5. ✅ Personalizar el contenido si es necesario
6. ✅ Configurar dominio personalizado (opcional)

## 💡 Tips

- El deploy tarda aproximadamente 2-5 minutos
- Puedes hacer re-deploys con el mismo comando
- Los cambios en el código requieren un nuevo build y deploy
- Las API keys de IA se guardan en el navegador del usuario

---

**¿Necesitas ayuda?** Revisa la documentación completa en `DEPLOY_GUIDE.md`
