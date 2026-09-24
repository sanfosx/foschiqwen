#!/usr/bin/env node

/**
 * Script de diagnóstico para encontrar la URL correcta de la API de InsForge
 * 
 * Uso: node scripts/test-api-url.js
 */

const APP_KEY = 'uagk9992'
const ADMIN_KEY = 'uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU'

// Posibles formatos de URL
const possibleUrls = [
  `https://${APP_KEY}.insforge.app`,
  `https://api.${APP_KEY}.insforge.app`,
  `https://${APP_KEY}.us-east.insforge.app`,
  `https://api.${APP_KEY}.us-east.insforge.app`,
  `https://${APP_KEY}.api.insforge.app`,
  `https://rest.${APP_KEY}.insforge.app`,
]

async function testUrl(url) {
  try {
    console.log(`\n🔍 Probando: ${url}`)
    
    const response = await fetch(`${url}/rest/v1/blog_articles?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ADMIN_KEY}`,
        'apikey': ADMIN_KEY,
        'Content-Type': 'application/json',
      },
    })

    console.log(`   Status: ${response.status} ${response.statusText}`)

    if (response.ok) {
      const data = await response.json()
      console.log(`   ✅ ¡ÉXITO! Datos recibidos:`, data)
      return { url, success: true, data }
    } else {
      const errorText = await response.text()
      console.log(`   ❌ Error: ${errorText.substring(0, 200)}`)
      return { url, success: false, error: errorText }
    }
  } catch (error) {
    console.log(`   ❌ Error de conexión: ${error.message}`)
    return { url, success: false, error: error.message }
  }
}

async function main() {
  console.log('🚀 Diagnóstico de URL de API InsForge')
  console.log('======================================')
  console.log(`App Key: ${APP_KEY}`)
  console.log(`Probando ${possibleUrls.length} posibles formatos de URL...\n`)

  const results = []

  for (const url of possibleUrls) {
    const result = await testUrl(url)
    results.push(result)
    
    // Si encontramos una URL que funciona, podemos detenernos
    if (result.success) {
      console.log('\n' + '='.repeat(50))
      console.log('✅ URL CORRECTA ENCONTRADA!')
      console.log('='.repeat(50))
      console.log(`\nURL: ${result.url}`)
      console.log(`\nActualiza tus archivos de configuración con esta URL:`)
      console.log(`- src/services/insforge.ts`)
      console.log(`- scripts/init-database.js`)
      console.log(`- scripts/deploy.js`)
      console.log(`- deploy.sh`)
      console.log(`- insforge.toml`)
      console.log(`- vercel.json`)
      console.log(`- .env.example`)
      return
    }
    
    // Pausa breve entre requests
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n' + '='.repeat(50))
  console.log('❌ No se encontró una URL válida')
  console.log('='.repeat(50))
  console.log('\nResultados:')
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.url} - ${result.success ? '✅' : '❌'}`)
  })
  
  console.log('\n💡 Sugerencias:')
  console.log('1. Verifica tu App Key en el dashboard de InsForge')
  console.log('2. Revisa la documentación oficial de InsForge')
  console.log('3. Contacta al soporte de InsForge para obtener la URL correcta')
  console.log('4. Verifica que tu API Key tenga los permisos correctos')
}

main().catch(console.error)
