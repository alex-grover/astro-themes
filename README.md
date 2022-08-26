# astro-themes [![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/alex-grover/astro-themes/ci/main)](https://github.com/alex-grover/astro-themes/actions?query=branch%3Amain) [![npm](https://img.shields.io/npm/v/astro-themes)](https://www.npmjs.com/package/astro-themes)

Easy dark mode for Astro websites. Add themes in 2 lines of code! Zero dependencies, supports SSR, and
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
    <button onclick="theme.set('light')">Light</button>
    <button onclick="theme.set('dark')">Dark</button>
  </body>
</html>
```

### Configure

Set a default theme (only applied if the browser doesn't specify a preference for dark mode):

```astro
<Themes defaultTheme="dark" />
```

## What does it do?

- Loads user theme preference
  - From `localStorage`, if they've set it in the past
  - From `prefers-color-scheme: dark`, if supported
  - Falls back to the `defaultTheme` option, or `light` if not specified
- Sets `data-theme` attribute on the `html` element, so you can implement dark mode in CSS
- Sets `color-scheme` CSS attribute on the `html` element, so the browser renders built in elements appropriately
- Provides utilities to get and set the theme
  - Exposes `theme.get/set()` on the `window` object, for compatibility with any framework or none at all
- Synchronizes setting across tabs
- Responds to changes in OS preference (for example, automatically switching to dark mode at night)

### API

```ts
type Theme = 'light' | 'dark'

interface ThemeProps {
  defaultTheme?: Theme
}

interface exports {
  Themes: AstroComponent<ThemeProps>
  theme: {
    get: () => {
      setting: Theme | null // the user's setting, or `null` if not yet set
      theme: Theme // the actual resolved theme in use
    }
    set: (theme: Theme) => void
  }
}
```

### Possible future enhancements

Pull requests, issues, or ideas are welcomed!

- Allow customizing attribute name, or using a class (helpful for Tailwind compatibility)
- Allow disabling CSS transitions when switching themes for consistency

This component was inspired by the excellent [`next-themes`](https://github.com/pacocoursey/next-themes).
