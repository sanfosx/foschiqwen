import { useState, useEffect } from 'react'
import { initializeDatabase } from '../services/backend'

interface UseDatabaseInitReturn {
  initialized: boolean
  checking: boolean
  error: string | null
  retry: () => void
}

export function useDatabaseInit(): UseDatabaseInitReturn {
  const [initialized, setInitialized] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkDatabase = async () => {
    setChecking(true)
    setError(null)
    
    try {
      const result = await initializeDatabase()
      setInitialized(result.success)
      if (!result.success) {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    checkDatabase()
  }, [])

  return {
    initialized,
    checking,
    error,
    retry: checkDatabase,
  }
}
