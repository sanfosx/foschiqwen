#!/usr/bin/env node

/**
 * TechBridge - Complete Deploy Script
 * 
 * This script handles the complete deployment process to InsForge:
 * 1. Initialize database (if needed)
 * 2. Build the application
 * 3. Deploy to InsForge Sites
 * 
 * Usage: node scripts/deploy.js
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const PROJECT_ID = 'b52410db-f5e7-4809-b433-53cb0c93da09'
const APP_KEY = 'uagk9992'
const REGION = 'us-east'
const API_KEY = 'uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU'
const INSFORGE_URL = `https://api.${APP_KEY}.insforge.app`

console.log('🚀 TechBridge - Complete Deploy Script')
console.log('======================================')
console.log('')

// Helper function to run commands
function runCommand(command, options = {}) {
  try {
    console.log(`   Running: ${command}`)
    execSync(command, { stdio: 'inherit', ...options })
    return true
  } catch (error) {
    console.error(`   ❌ Command failed: ${command}`)
    return false
  }
}

// Step 1: Check if InsForge CLI is available
console.log('📦 Step 1: Checking InsForge CLI...')
if (!runCommand('npx @insforge/cli --version', { stdio: 'pipe' })) {
  console.log('   Installing InsForge CLI...')
  runCommand('npm install -g @insforge/cli')
}
console.log('   ✅ InsForge CLI ready')
console.log('')

// Step 2: Login to InsForge
console.log('🔐 Step 2: Logging in to InsForge...')
runCommand(`npx @insforge/cli login --user-api-key ${API_KEY}`)
console.log('   ✅ Logged in successfully')
console.log('')

// Step 3: Link project
console.log('🔗 Step 3: Linking project...')
runCommand(`npx @insforge/cli link --project-id ${PROJECT_ID}`)
console.log('   ✅ Project linked')
console.log('')

// Step 4: Set environment variables
console.log('⚙️  Step 4: Setting environment variables...')
runCommand(`npx @insforge/cli deployments env set VITE_INSFORGE_URL ${INSFORGE_URL}`)
runCommand(`npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY ${API_KEY}`)
console.log('   ✅ Environment variables set')
console.log('')

// Step 5: Initialize database
console.log('🗄️  Step 5: Initializing database...')
console.log('   Running database initialization script...')
runCommand('node scripts/init-database.js')
console.log('')

// Step 6: Build the application
console.log('🔨 Step 6: Building application...')
if (!runCommand('npm run build')) {
  console.error('   ❌ Build failed!')
  process.exit(1)
}
console.log('   ✅ Build successful')
console.log('')

// Step 7: Deploy to InsForge
console.log('🚀 Step 7: Deploying to InsForge...')
runCommand('npx @insforge/cli deployments deploy .')
console.log('')

// Step 8: Check deployment status
console.log('📊 Step 8: Checking deployment status...')
runCommand('npx @insforge/cli deployments list')
console.log('')

// Final summary
console.log('======================================')
console.log('✅ Deploy complete!')
console.log('======================================')
console.log('')
console.log('🌐 Your application URLs:')
console.log(`   Main: https://${APP_KEY}.insforge.site`)
console.log(`   Dashboard: https://app.insforge.dev/project/${PROJECT_ID}`)
console.log('')
console.log('📝 Next steps:')
console.log('   1. Check the deployment status in the InsForge dashboard')
console.log('   2. Configure a custom domain if needed')
console.log('   3. Test all features of your application')
console.log('   4. Configure API keys for Gemini and Groq in the frontend')
console.log('')
