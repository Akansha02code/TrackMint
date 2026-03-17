import { create } from 'zustand'
import { getApi } from '../services/api'
import type { AuthSession } from '../types/models'

type AuthState = {
  session: AuthSession | null
  loading: boolean
  error: string | null
  init(): Promise<void>
  signUp(input: { name: string; email: string; password: string }): Promise<AuthSession>
  signIn(input: { email: string; password: string }): Promise<AuthSession>
  signOut(): Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,
  error: null,
  async init() {
    set({ loading: true, error: null })
    try {
      const api = getApi()
      const session = await api.auth.getSession()
      set({ session, loading: false })
      api.auth.onAuthStateChange((s) => set({ session: s }))
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to init session.',
        loading: false,
      })
    }
  },
  async signUp(input) {
    set({ loading: true, error: null })
    try {
      const s = await getApi().auth.signUp(input)
      set({ session: s, loading: false })
      return s
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Sign up failed.'
      set({ error: msg, loading: false })
      throw new Error(msg)
    }
  },
  async signIn(input) {
    set({ loading: true, error: null })
    try {
      const s = await getApi().auth.signIn(input)
      set({ session: s, loading: false })
      return s
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Sign in failed.'
      set({ error: msg, loading: false })
      throw new Error(msg)
    }
  },
  async signOut() {
    set({ loading: true, error: null })
    try {
      await getApi().auth.signOut()
      set({ session: null, loading: false })
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Sign out failed.',
        loading: false,
      })
    }
  },
}))

// Eagerly init once in app runtime.
void useAuthStore.getState().init()
