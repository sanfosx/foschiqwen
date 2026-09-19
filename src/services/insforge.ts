import { createClient } from '@insforge/sdk'

// InsForge Backend Configuration
// Project ID: b52410db-f5e7-4809-b433-53cb0c93da09
// Database: postgresql://postgres:***@uagk9992.us-east.database.insforge.app:5432/insforge

const INSFORGE_PROJECT_ID = 'b52410db-f5e7-4809-b433-53cb0c93da09'
const INSFORGE_BASE_URL = `https://${INSFORGE_PROJECT_ID}.insforge.app`

// Admin API Key (from user-provided credentials)
const INSFORGE_ADMIN_KEY = 'uak_Os6Sgh5_gXLyi_gKCp2S73JYe2TVI83wtm85fVzINdU'

// Create the InsForge client
const insforge = createClient({
  baseUrl: INSFORGE_BASE_URL,
  anonKey: INSFORGE_ADMIN_KEY,
})

export { insforge, INSFORGE_BASE_URL, INSFORGE_ADMIN_KEY, INSFORGE_PROJECT_ID }
export default insforge
