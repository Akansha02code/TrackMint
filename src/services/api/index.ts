import type { Api } from './types'
import { localApi } from './local'
import { supabaseApi } from './supabase'

let cached: Api | null = null

export function getApi(): Api {
  if (cached) return cached
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  cached = url && key ? supabaseApi({ url, anonKey: key }) : localApi()
  return cached
}

