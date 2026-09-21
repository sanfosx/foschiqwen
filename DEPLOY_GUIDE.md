# 🚀 Guía de Deploy - TechBridge en InsForge

## Resumen Rápido

Tu aplicación TechBridge está lista para ser desplegada en InsForge. Este documento te guiará paso a paso para completar el deploy.

## 📋 Requisitos Previos

- ✅ Node.js instalado (v18 o superior)
- ✅ npm instalado
- ✅ Proyecto linkeado con InsForge (ya configurado)
- ✅ Base de datos inicializada (schema ejecutado)

## 🎯 Métodos de Deploy

### Método 1: Deploy Automático (Recomendado)

Ejecuta el script de deploy automático:

```bash
chmod +x deploy.sh
./deploy.sh
```

Este script hará todo automáticamente:
- Login en InsForge
- Linkeo del proyecto
- Configuración de variables de entorno
- Build de la aplicación
- Deploy a InsForge

### Método 2: Deploy Manual (Paso a Paso)

#### Paso 1: Login en InsForge

```bash
npx @insforge/cli login --user-api-key uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU
```

#### Paso 2: Linkear el Proyecto

```bash
npx @insforge/cli link --project-id b52410db-f5e7-4809-b433-53cb0c93da09
```

#### Paso 3: Configurar Variables de Entorno

```bash
# URL de tu proyecto InsForge (formato: https://{app_key}.{region}.insforge.app)
npx @insforge/cli deployments env set VITE_INSFORGE_URL https://uagk9992.us-east.insforge.app

# API Key para autenticación
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU
```

#### Paso 4: Build de la Aplicación

```bash
npm run build
```

#### Paso 5: Deploy a InsForge

```bash
npx @insforge/cli deployments deploy .
```

#### Paso 6: Verificar el Deploy

```bash
npx @insforge/cli deployments list
```

## 🌐 URLs de tu Aplicación

Después del deploy, tu aplicación estará disponible en:

- **URL Principal**: `https://uagk9992.insforge.site`
- **Dashboard**: `https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09`

## 🔧 Configuración Adicional

### Dominio Personalizado

Si quieres usar tu propio dominio:

1. Ve al [Dashboard de InsForge](https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09)
2. Navega a **Sites** → **Domains**
3. Agrega tu dominio (ej: `techbridge.com`)
4. Configura los registros DNS según las instrucciones

### Variables de Entorno Adicionales

Si necesitas agregar más variables:

```bash
# Ejemplo: API Keys de Gemini y Groq
npx @insforge/cli deployments env set VITE_GEMINI_API_KEY tu_gemini_key
npx @insforge/cli deployments env set VITE_GROQ_API_KEY tu_groq_key
```

**Nota**: Las API keys de IA se manejan desde el frontend (localStorage), pero puedes configurarlas como variables de entorno si lo prefieres.

## 📊 Monitoreo del Deploy

### Ver Estado del Deploy

```bash
npx @insforge/cli deployments list
```

### Ver Logs del Deploy

```bash
npx @insforge/cli deployments logs <deployment-id>
```

### Cancelar un Deploy en Progreso

```bash
npx @insforge/cli deployments cancel <deployment-id>
```

## 🔄 Actualizaciones

Para actualizar tu aplicación después de cambios:

```bash
# 1. Hacer cambios en el código
# 2. Build
npm run build
# 3. Deploy
npx @insforge/cli deployments deploy .
```

## 🐛 Solución de Problemas

### Error: "Deployment failed"

**Causa**: Error en el build o configuración incorrecta

**Solución**:
```bash
# Verifica que el build funcione localmente
npm run build

# Revisa los logs del deploy
npx @insforge/cli deployments logs <deployment-id>
```

### Error: "Environment variables not set"

**Causa**: Variables de entorno faltantes

**Solución**:
```bash
# Lista las variables configuradas
npx @insforge/cli deployments env list

# Configura las variables faltantes
npx @insforge/cli deployments env set VITE_INSFORGE_URL https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU
```

### Error: "Database connection failed"

**Causa**: Base de datos no inicializada

**Solución**:
1. Ve al [Dashboard de InsForge](https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09/database)
2. Ejecuta el SQL de `supabase/migrations/001_initial_schema.sql`
3. O usa el CLI:
```bash
npx @insforge/cli db push
```

## 📚 Recursos Adicionales

- [Documentación de InsForge Sites](https://docs.insforge.dev/core-concepts/sites/overview)
- [Documentación de Deployments](https://docs.insforge.dev/core-concepts/deployments/overview)
- [Dashboard de tu Proyecto](https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09)

## ✅ Checklist Pre-Deploy

Antes de hacer deploy, verifica:

- [ ] Base de datos inicializada (tablas creadas)
- [ ] Variables de entorno configuradas
- [ ] Build funciona localmente (`npm run build`)
- [ ] API keys de Gemini/Grok configuradas (o configurables desde el frontend)
- [ ] Proyecto linkeado con InsForge
- [ ] Script de deploy ejecutable (`chmod +x deploy.sh`)

## 🎉 ¡Listo para Deploy!

Una vez que completes estos pasos, tu aplicación TechBridge estará en producción y accesible desde cualquier lugar del mundo.

**URL esperada**: `https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.site`

---

**¿Necesitas ayuda?** Revisa la documentación de InsForge o contacta al soporte.
