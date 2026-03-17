import { create } from 'zustand'

type Theme = 'light' | 'dark'

type UiState = {
  theme: Theme
  toggleTheme(): void
  setTheme(theme: Theme): void
}

const THEME_KEY = 'etw.theme'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

function initTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY)
  const theme = saved === 'dark' ? 'dark' : 'light'
  applyTheme(theme)
  return theme
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: initTheme(),
  toggleTheme() {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem(THEME_KEY, next)
    applyTheme(next)
    set({ theme: next })
  },
  setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme)
    applyTheme(theme)
    set({ theme })
  },
}))

