export { default } from './Themes.astro'
export * from './Themes.astro'

import { Theme } from './Themes.astro'

declare global {
  interface Window {
    getTheme: () => Theme | null
    setTheme: (theme: Theme) => void
  }
}
