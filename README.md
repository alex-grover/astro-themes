# astro-themes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Simple theme utility for Astro-based websites. Add dark mode in 2 lines of code! Zero dependencies, supports SSR, and
works with any framework or UI.

## Install

```sh
npm install --save-dev astro-themes
```

## Use

Add the `<Themes />` component in your app. Works best in a centralized layout component, so it's shared everywhere.

```astro
---
import Themes from 'astro-themes'
---

<html>
  <head>
    <Themes />
    <style>
      html {
        --background-color: white;
        --text-color: black;

        color: var(--text-color);
        background-color: var(--background-color);
      }

      [data-theme='dark'] {
        --background-color: black;
        --text-color: white;
      }
    </style>
  </head>
  <body>
    <button onclick="setTheme('light')">Light</button>
    <button onclick="setTheme('dark')">Dark</button>
  </body>
</html>
```

### Configure

Set a default theme (only applied if the user doesn't have a preference):

```astro
<Themes defaultTheme="dark" />
```

## What does it do?

- Loads user theme preference
  - From `localStorage`, if they've set it in the past
  - From `prefers-color-scheme`, if supported
  - Falls back to the `defaultTheme` option, or `light` if not specified
- Sets `data-theme` attribute on the `html` element, so you can implement dark mode in CSS
- Sets `color-scheme` CSS attribute on the `html` element, so the browser renders built in elements appropriately
- Provides utilities to get and set the theme
  - Exposes `getTheme()` and `setTheme()` on the `window` object, for compatibility with any framework or none at all
- Synchronizes setting across tabs

### API

```tsx
type Theme = 'light' | 'dark'

interface ThemeProps {
  defaultTheme?: Theme
}

interface exports {
  Themes: AstroComponent<ThemeProps>
  getTheme: () => {
    setting: Theme | null // the user's setting, or `null` if not yet set
    theme: Theme // the actual resolved theme in use
  }
  setTheme: (theme: Theme) => void
}
```

### Possible future enhancements

Pull requests, issues, or ideas are welcomed!

- Allow customizing list of themes beyond `light | dark`
- Allow customizing attribute name, or using a class (helpful for Tailwind compatibility)
- Allow disabling CSS transitions when switching themes for consistency

This component was inspired by the excellent [`next-themes`](https://github.com/pacocoursey/next-themes).
