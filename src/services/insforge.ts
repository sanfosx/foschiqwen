import { createClient } from '@insforge/sdk'

// InsForge Backend Configuration
// Project ID: b52410db-f5e7-4809-b433-53cb0c93da09
// Database: postgresql://postgres:***@uagk9992.us-east.database.insforge.app:5432/insforge
// URL Format: https://{app_key}.{region}.insforge.app

const INSFORGE_PROJECT_ID = 'b52410db-f5e7-4809-b433-53cb0c93da09'
const INSFORGE_APP_KEY = 'uagk9992'
const INSFORGE_REGION = 'us-east'
const INSFORGE_BASE_URL = `https://${INSFORGE_APP_KEY}.${INSFORGE_REGION}.insforge.app`
const INSFORGE_SITE_URL = 'https://uagk9992.insforge.site'
const INSFORGE_DASHBOARD_URL = 'https://insforge.dev/dashboard/project/b52410db-f5e7-4809-b433-53cb0c93da09'

// API Keys (from user-provided credentials)
const INSFORGE_API_KEY = 'ik_fae6dd2d7b6ebc86d421ef50e499969b'
const INSFORGE_ANON_KEY = 'anon_7fc28fe2db8b48d19e385ae3639ac4436ba8901b5ce000e9f1b3682d3b0344ad'

// Create the InsForge client
const insforge = createClient({
  baseUrl: INSFORGE_BASE_URL,
  anonKey: INSFORGE_ANON_KEY,
})

export { 
  insforge, 
  INSFORGE_BASE_URL, 
  INSFORGE_API_KEY, 
  INSFORGE_ANON_KEY,
  INSFORGE_PROJECT_ID, 
  INSFORGE_APP_KEY,
  INSFORGE_REGION,
  INSFORGE_SITE_URL,
  INSFORGE_DASHBOARD_URL
}
export default insforge
