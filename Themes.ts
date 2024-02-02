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

function getThemePreference(): Theme {
  return prefersDark.matches ? 'dark' : defaultTheme
}

function resolveTheme(setting?: Theme | null): Theme {
  const storageValue =
    setting !== undefined
      ? setting
      : (localStorage.getItem(STORAGE_KEY) as Theme)

  return storageValue ?? getThemePreference()
}

function writeTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
}

function handleStorageChange(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY) return
  writeTheme(resolveTheme(event.newValue as Theme))
}

function rewriteTheme(): void {
  writeTheme(resolveTheme())
}

function handleThemeChange(event: CustomEvent<Theme | null>): void {
  if (event.detail) {
    localStorage.setItem(STORAGE_KEY, event.detail)
    writeTheme(event.detail)
  } else {
    localStorage.removeItem(STORAGE_KEY)
    writeTheme(resolveTheme(event.detail))
  }
}

document.addEventListener('set-theme', handleThemeChange)
window.addEventListener('storage', handleStorageChange)
prefersDark.addEventListener('change', rewriteTheme)
document.addEventListener('astro:after-swap', rewriteTheme)
writeTheme(resolveTheme())
