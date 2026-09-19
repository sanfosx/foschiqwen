import { INSFORGE_BASE_URL, INSFORGE_ADMIN_KEY } from './insforge'

// ============================================
// InsForge REST API Client (PostgREST-compatible)
// ============================================

const REST_URL = `${INSFORGE_BASE_URL}/rest/v1`

interface QueryParams {
  select?: string
  eq?: Record<string, string | boolean | number>
  order?: { column: string; ascending: boolean }
  limit?: number
  single?: boolean
}

async function request<T>(
  table: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: unknown,
  params?: QueryParams
): Promise<{ data: T | T[] | null; error: { message: string; code: string } | null }> {
  try {
    let url = `${REST_URL}/${table}`

    // Build query string
    const queryParams: string[] = []
    
    if (params?.select) {
      queryParams.push(`select=${params.select}`)
    } else {
      queryParams.push('select=*')
    }

    if (params?.eq) {
      Object.entries(params.eq).forEach(([key, value]) => {
        queryParams.push(`${key}=eq.${value}`)
      })
    }

    if (params?.order) {
      queryParams.push(`order=${params.order.column}.${params.order.ascending ? 'asc' : 'desc'}`)
    }

    if (params?.limit) {
      queryParams.push(`limit=${params.limit}`)
    }

    if (params?.single) {
      queryParams.push('limit=1')
    }

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&')
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${INSFORGE_ADMIN_KEY}`,
      'apikey': INSFORGE_ADMIN_KEY,
    }

    if (params?.single) {
      headers['Accept'] = 'application/vnd.pgrst.object+json'
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        data: null,
        error: {
          message: errorData?.message || `HTTP ${response.status}`,
          code: String(response.status),
        },
      }
    }

    const data = await response.json()
    return { data: data as T | T[], error: null }
  } catch (err) {
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : 'Network error',
        code: 'NETWORK_ERROR',
      },
    }
  }
}

// ============================================
// Query Builder (Supabase-like API)
// ============================================
class QueryBuilder<T> {
  private _table: string
  private _params: QueryParams = {}
  private _body: unknown = undefined
  private _method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET'

  constructor(table: string) {
    this._table = table
  }

  select(columns = '*'): QueryBuilder<T> {
    this._params.select = columns
    this._method = 'GET'
    return this
  }

  eq(column: string, value: string | boolean | number): QueryBuilder<T> {
    if (!this._params.eq) this._params.eq = {}
    this._params.eq[column] = value
    return this
  }

  order(column: string, options?: { ascending?: boolean }): QueryBuilder<T> {
    this._params.order = { column, ascending: options?.ascending ?? true }
    return this
  }

  limit(count: number): QueryBuilder<T> {
    this._params.limit = count
    return this
  }

  single(): QueryBuilder<T> {
    this._params.single = true
    return this
  }

  insert(data: Partial<T> | Partial<T>[]): QueryBuilder<T> {
    this._method = 'POST'
    this._body = data
    return this
  }

  update(data: Partial<T>): QueryBuilder<T> {
    this._method = 'PATCH'
    this._body = data
    return this
  }

  delete(): QueryBuilder<T> {
    this._method = 'DELETE'
    return this
  }

  upsert(data: Partial<T>): QueryBuilder<T> {
    this._method = 'POST'
    this._body = data
    // PostgREST upsert uses Prefer: resolution=merge-duplicates
    return this
  }

  async then(resolve: (value: { data: T | T[] | null; error: { message: string; code: string } | null }) => void): Promise<void> {
    const result = await request<T>(this._table, this._method, this._body, this._params)
    resolve(result)
  }
}

// ============================================
// Database Client
// ============================================
export const db = {
  from<T = Record<string, unknown>>(table: string): QueryBuilder<T> {
    return new QueryBuilder<T>(table)
  },

  // Raw SQL execution (admin only)
  async rpc(fnName: string, params?: Record<string, unknown>): Promise<{ data: unknown; error: { message: string } | null }> {
    try {
      const url = `${REST_URL}/rpc/${fnName}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${INSFORGE_ADMIN_KEY}`,
          'apikey': INSFORGE_ADMIN_KEY,
        },
        body: JSON.stringify(params || {}),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return { data: null, error: { message: errorData?.message || `HTTP ${response.status}` } }
      }

      const data = await response.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: err instanceof Error ? err.message : 'Network error' } }
    }
  },

  // Execute raw SQL (admin only, strict mode)
  async sql(query: string): Promise<{ data: unknown; error: { message: string } | null }> {
    try {
      const url = `${INSFORGE_BASE_URL}/admin/v1/database/query`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${INSFORGE_ADMIN_KEY}`,
          'apikey': INSFORGE_ADMIN_KEY,
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return { data: null, error: { message: errorData?.message || `HTTP ${response.status}` } }
      }

      const data = await response.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: err instanceof Error ? err.message : 'Network error' } }
    }
  },
}

export default db
