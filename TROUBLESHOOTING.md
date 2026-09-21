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
| **API Base** | `https://uagk9992.us-east.insforge.app` |
| **REST API** | `https://uagk9992.us-east.insforge.app/rest/v1` |
| **Admin API** | `https://uagk9992.us-east.insforge.app/admin/v1` |
| **Database** | `postgresql://postgres:***@uagk9992.us-east.database.insforge.app:5432/insforge` |
| **Dashboard** | `https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09` |
| **App Deploy** | `https://uagk9992.us-east.insforge.site` |

## 🎯 Formato de URLs en InsForge

### Para APIs y Backend
```
https://{app_key}.{region}.insforge.app
```

### Para Database
```
postgresql://{user}:{password}@{app_key}.{region}.database.insforge.app:5432/{database}
```

### Para Sites (Frontend Deploy)
```
https://{app_key}.{region}.insforge.site
```

## ✅ Verificación

Para verificar que la conexión funciona correctamente:

1. Abre en el navegador: `https://uagk9992.us-east.insforge.app/health`
2. Deberías recibir una respuesta JSON del servidor
3. Si ves `ERR_NAME_NOT_RESOLVED`, verifica que el app_key y region sean correctos

## 🔗 Recursos

- [Documentación de InsForge](https://docs.insforge.dev)
- [Dashboard del Proyecto](https://app.insforge.dev/project/b52410db-f5e7-4809-b433-53cb0c93da09)
- [Guía de Deploy](./DEPLOY_GUIDE.md)
