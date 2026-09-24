# 🔧 Guía de Diagnóstico de Conexión a Base de Datos

## ❌ Problema Actual

Estás recibiendo un error **404** al intentar conectar con la base de datos de InsForge. Esto indica que la URL de la API REST no es correcta.

## 🎯 Solución: Script de Diagnóstico

He creado un script que prueba automáticamente diferentes formatos de URL para encontrar el correcto.

### 📝 Paso 1: Ejecutar el Script de Diagnóstico

```bash
node scripts/test-api-url.js
```

Este script probará automáticamente los siguientes formatos:
1. `https://uagk9992.insforge.app`
2. `https://api.uagk9992.insforge.app`
3. `https://uagk9992.us-east.insforge.app`
4. `https://api.uagk9992.us-east.insforge.app`
5. `https://uagk9992.api.insforge.app`
6. `https://rest.uagk9992.insforge.app`

### 📊 Paso 2: Interpretar los Resultados

#### ✅ Si el script encuentra una URL válida:

El script te mostrará:
```
✅ URL CORRECTA ENCONTRADA!
URL: https://[url-correcta].insforge.app
```

**Acción:** Actualiza todos los archivos de configuración con esa URL.

#### ❌ Si ninguna URL funciona:

El script te mostrará todos los intentos fallidos. En este caso:

1. **Verifica tu App Key** en el dashboard de InsForge:
   - Ve a: https://insforge.dev/dashboard/project/b52410db-f5e7-4809-b433-53cb0c93da09
   - Busca la sección "API Configuration" o "Connection Details"
   - Copia la URL exacta de la API REST

2. **Revisa la documentación oficial**:
   - https://docs.insforge.dev
   - Busca la sección de "Database" o "REST API"

3. **Contacta al soporte de InsForge**:
   - Pregunta específicamente: "¿Cuál es la URL de la API REST para mi proyecto?"

## 🔍 Métodos Alternativos de Diagnóstico

### Método 1: Desde el Dashboard de InsForge

1. Ve a tu proyecto: https://insforge.dev/dashboard/project/b52410db-f5e7-4809-b433-53cb0c93da09
2. Navega a la sección "Database" o "API"
3. Busca la URL de conexión o endpoint de la API REST
4. Copia esa URL exacta

### Método 2: Usando el CLI de InsForge

```bash
# Ver información del proyecto
npx @insforge/cli current

# Ver configuración del proyecto
npx @insforge/cli config
```

### Método 3: Prueba Manual con cURL

```bash
# Reemplaza [URL] con la URL que quieres probar
curl -X GET "[URL]/rest/v1/blog_articles?select=id&limit=1" \
  -H "Authorization: Bearer uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU" \
  -H "apikey: uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU" \
  -H "Content-Type: application/json"
```

## 📝 Archivos que Necesitan la URL Correcta

Una vez que encuentres la URL correcta, actualiza estos archivos:

### Código Fuente
- `src/services/insforge.ts` - Línea 11: `INSFORGE_BASE_URL`

### Scripts
- `scripts/init-database.js` - Línea 10: `INSFORGE_URL`
- `scripts/deploy.js` - Línea 12: `INSFORGE_URL`
- `deploy.sh` - Línea 15: `INSFORGE_URL`

### Configuración
- `insforge.toml` - Sección `[deployment.env]`: `VITE_INSFORGE_URL`
- `vercel.json` - Sección `build.env` y `env`: `VITE_INSFORGE_URL`
- `.env.example` - Línea 3: `VITE_INSFORGE_URL`

### Documentación
- `README.md`
- `DEPLOY_GUIDE.md`
- `BACKEND.md`
- `AGENTS.md`
- `TROUBLESHOOTING.md`

## 🎯 Información de tu Base de Datos

Según los datos que proporcionaste:

```
HOST: uagk9992.us-east.database.insforge.app
DATABASE: insforge
USER: postgres
PORT: 5432
PASSWORD: 7d792d53790355e52a5ce6e64a4fce67
SSL: require
```

**Connection String:**
```
postgresql://postgres:7d792d53790355e52a5ce6e64a4fce67@uagk9992.us-east.database.insforge.app:5432/insforge?sslmode=require
```

**Nota:** Esta es la URL de conexión directa a PostgreSQL, NO la URL de la API REST.

## 🚀 Próximos Pasos

1. **Ejecuta el script de diagnóstico**:
   ```bash
   node scripts/test-api-url.js
   ```

2. **Si encuentra una URL válida**:
   - Actualiza todos los archivos mencionados arriba
   - Reconstruye el proyecto: `npm run build`
   - Recarga la aplicación

3. **Si no encuentra una URL válida**:
   - Ve al dashboard de InsForge
   - Busca la URL exacta de la API REST
   - Actualiza manualmente todos los archivos
   - Reconstruye y recarga

## 💡 Consejos Adicionales

- La URL de la API REST es diferente de la URL del sitio desplegado
- La URL de la API REST es diferente de la URL de conexión directa a PostgreSQL
- InsForge puede usar diferentes formatos de URL dependiendo de la región o configuración
- Si nada funciona, contacta al soporte de InsForge con tu Project ID: `b52410db-f5e7-4809-b433-53cb0c93da09`

## 📞 Soporte

Si después de seguir esta guía aún tienes problemas:

1. **Documentación de InsForge**: https://docs.insforge.dev
2. **Dashboard del Proyecto**: https://insforge.dev/dashboard/project/b52410db-f5e7-4809-b433-53cb0c93da09
3. **Soporte de InsForge**: Busca la opción de contacto en el dashboard
