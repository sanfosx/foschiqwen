# 🔧 Solución de Problemas - Error de Conexión a InsForge

## ❌ Error Original

```
Failed to load resource: net::ERR_NAME_NOT_RESOLVED
b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app/rest/v1/blog_articles
```

## 🔍 Causa del Problema

El formato de URL utilizado era incorrecto. Se estaba usando el **Project ID** completo como subdominio:

```
❌ https://b52410db-f5e7-4809-b433-53cb0c93da09.insforge.app
```

## ✅ Solución

Según la documentación oficial de InsForge, el formato correcto de URL es:

```
https://{app_key}.{region}.insforge.app
```

### Información Extraída de tu Conexión

De tu cadena de conexión de base de datos:
```
postgresql://postgres:***@uagk9992.us-east.database.insforge.app:5432/insforge
```

Se extrajo:
- **App Key**: `uagk9992`
- **Region**: `us-east`

### URL Correcta

```
✅ https://uagk9992.us-east.insforge.app
```

## 📝 Archivos Actualizados

Se han corregido las URLs en los siguientes archivos:

### Configuración
- ✅ `src/services/insforge.ts` - Cliente principal de InsForge
- ✅ `src/components/DatabaseSetup.tsx` - Panel de configuración
- ✅ `src/components/DatabaseInitializer.tsx` - Inicializador automático
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `insforge.toml` - Configuración de InsForge
- ✅ `.env.example` - Plantilla de variables de entorno

### Scripts
- ✅ `deploy.sh` - Script de deploy Bash
- ✅ `scripts/deploy.js` - Script de deploy Node.js
- ✅ `scripts/init-database.js` - Inicializador de base de datos

### Documentación
- ✅ `README.md` - Documentación principal
- ✅ `BACKEND.md` - Documentación del backend
- ✅ `AGENTS.md` - Instrucciones para agentes
- ✅ `DEPLOY_GUIDE.md` - Guía de deploy
- ✅ `QUICK_DEPLOY.md` - Guía rápida

## 🚀 Próximos Pasos

1. **Recompilar la aplicación**:
   ```bash
   npm run build
   ```

2. **Verificar la conexión**:
   - Abre la aplicación en el navegador
   - Ve a la sección "Base de Datos"
   - Deberías ver el estado de conexión correcto

3. **Inicializar la base de datos** (si no se ha hecho):
   ```bash
   node scripts/init-database.js
   ```

4. **Hacer deploy**:
   ```bash
   node scripts/deploy.js
   ```

## 📊 URLs Correctas

| Recurso | URL |
|---------|-----|
| **API Base** | `https://api.uagk9992.insforge.app` |
| **REST API** | `https://api.uagk9992.insforge.app/rest/v1` |
| **Admin API** | `https://api.uagk9992.insforge.app/admin/v1` |
| **Database** | `postgresql://postgres:***@uagk9992.us-east.database.insforge.app:5432/insforge` |
| **Dashboard** | `https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09` |
| **App Deploy** | `https://uagk9992.insforge.site` |

## ✅ Verificación

Para verificar que la conexión funciona correctamente:

1. Abre en el navegador: `https://api.uagk9992.insforge.app/health`
2. Deberías recibir una respuesta JSON del servidor
3. Si ves `ERR_NAME_NOT_RESOLVED` o `404`, prueba con diferentes formatos de URL

## 📌 Formato de URLs en InsForge

### URLs de API (Backend)
```
https://api.{app_key}.insforge.app
```
Ejemplo: `https://api.uagk9992.insforge.app`

Se usa para:
- REST API (`/rest/v1/...`)
- Admin API (`/admin/v1/...`)
- Base de datos
- Autenticación
- Storage

### URLs de Sitio Desplegado (Frontend)
```
https://{app_key}.insforge.site
```
Ejemplo: `https://uagk9992.insforge.site`

Se usa para:
- Aplicación web desplegada
- Sitios estáticos
- Frontend de la aplicación

**Nota:** Las URLs NO incluyen la región.

## 🔗 Recursos

- [Documentación de InsForge](https://docs.insforge.dev)
- [Dashboard del Proyecto](https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09)
- [Guía de Deploy](./DEPLOY_GUIDE.md)
