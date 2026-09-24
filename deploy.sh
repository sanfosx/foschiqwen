#!/bin/bash

# TechBridge - Deploy Script para InsForge
# Este script prepara y despliega la aplicación en InsForge

set -e  # Detener en caso de error

echo "🚀 TechBridge - Deploy a InsForge"
echo "=================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Variables
PROJECT_ID="b52410db-f5e7-4809-b433-53cb0c93da09"
APP_KEY="uagk9992"
REGION="us-east"
API_KEY="ik_fae6dd2d7b6ebc86d421ef50e499969b"
ANON_KEY="anon_7fc28fe2db8b48d19e385ae3639ac4436ba8901b5ce000e9f1b3682d3b0344ad"
INSFORGE_URL="https://${APP_KEY}.${REGION}.insforge.app"
SITE_URL="https://${APP_KEY}.insforge.site"
DASHBOARD_URL="https://insforge.dev/dashboard/project/${PROJECT_ID}"

# Paso 1: Verificar que el CLI de InsForge esté instalado
echo -e "${BLUE}📦 Paso 1: Verificando InsForge CLI...${NC}"
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ Error: npx no está instalado. Instala Node.js primero.${NC}"
    exit 1
fi

# Paso 2: Login con InsForge
echo -e "${BLUE}🔐 Paso 2: Iniciando sesión en InsForge...${NC}"
npx @insforge/cli login --user-api-key "$API_KEY"
echo -e "${GREEN}✅ Login exitoso${NC}"
echo ""

# Paso 3: Linkear el proyecto
echo -e "${BLUE}🔗 Paso 3: Linkeando proyecto...${NC}"
npx @insforge/cli link --project-id "$PROJECT_ID"
echo -e "${GREEN}✅ Proyecto linkeado${NC}"
echo ""

# Paso 4: Configurar variables de entorno
echo -e "${BLUE}⚙️  Paso 4: Configurando variables de entorno...${NC}"
npx @insforge/cli deployments env set VITE_INSFORGE_URL "$INSFORGE_URL"
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY "$API_KEY"
echo -e "${GREEN}✅ Variables configuradas${NC}"
echo ""

# Paso 5: Build de la aplicación
echo -e "${BLUE}🔨 Paso 5: Construyendo la aplicación...${NC}"
npm run build
echo -e "${GREEN}✅ Build completado${NC}"
echo ""

# Paso 6: Deploy a InsForge
echo -e "${BLUE}🚀 Paso 6: Desplegando a InsForge...${NC}"
npx @insforge/cli deployments deploy .
echo -e "${GREEN}✅ Deploy iniciado${NC}"
echo ""

# Paso 7: Verificar estado del deploy
echo -e "${BLUE}📊 Paso 7: Verificando estado del deploy...${NC}"
npx @insforge/cli deployments list
echo ""

echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}✅ Deploy completado exitosamente!${NC}"
echo -e "${GREEN}==================================${NC}"
echo ""
echo -e "${BLUE}🌐 Tu aplicación estará disponible en:${NC}"
echo -e "   ${YELLOW}${SITE_URL}${NC}"
echo ""
echo -e "${BLUE}📊 Dashboard de InsForge:${NC}"
echo -e "   ${YELLOW}${DASHBOARD_URL}${NC}"
echo ""
echo -e "${BLUE}📝 Próximos pasos:${NC}"
echo "   1. Verifica el estado del deploy: npx @insforge/cli deployments list"
echo "   2. Configura un dominio personalizado en el dashboard de InsForge"
echo "   3. Ejecuta las migraciones de base de datos si no lo has hecho"
echo ""
