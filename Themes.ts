export type Theme = 'light' | 'dark'

declare const defaultTheme: Theme

declare global {
  interface DocumentEventMap {
    'set-theme': CustomEvent<Theme | null>
  }
}

export interface Props {
  defaultTheme?: Theme
}

const STORAGE_KEY = 'theme'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function getSystemPreference(): Theme {
  return prefersDark.matches ? 'dark' : defaultTheme
}

function getThemePreference(): Theme | null {
  return localStorage.getItem(STORAGE_KEY) as Theme | null
}

function resolveTheme(setting?: Theme | null): Theme {
  const storageValue = setting !== undefined ? setting : getThemePreference()

  return storageValue ?? getSystemPreference()
}

function writeTheme(theme: Theme, preference?: Theme | null): void {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.setAttribute(
    'data-theme-preference',
    preference ?? '',
  )
  document.documentElement.style.colorScheme = theme
}

function handleStorageChange(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY) return
  const newPreference = event.newValue as Theme
  writeTheme(resolveTheme(newPreference), newPreference)
}

function rewriteTheme(): void {
  writeTheme(resolveTheme())
}

function handleThemeChange(event: CustomEvent<Theme | null>): void {
  if (event.detail) {
    localStorage.setItem(STORAGE_KEY, event.detail)
    writeTheme(event.detail, event.detail)
  } else {
    localStorage.removeItem(STORAGE_KEY)
    writeTheme(resolveTheme(event.detail), null)
  }
}

document.addEventListener('set-theme', handleThemeChange)
window.addEventListener('storage', handleStorageChange)
prefersDark.addEventListener('change', rewriteTheme)
document.addEventListener('astro:after-swap', rewriteTheme)
writeTheme(resolveTheme(), getThemePreference())
