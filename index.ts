export { default } from './Themes.astro'
export * from './Themes.astro'

import { Theme } from './Themes.astro'

declare global {
  interface Window {
    theme: {
      get: () => {
        setting: Theme | null
        theme: Theme
      }
      set: (theme: Theme) => void
    }
  }
}
