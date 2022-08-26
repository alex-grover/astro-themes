# 🚀 astro-themes [![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/alex-grover/astro-themes/ci/main)](https://github.com/alex-grover/astro-themes/actions?query=branch%3Amain) [![npm](https://img.shields.io/npm/v/astro-themes)](https://www.npmjs.com/package/astro-themes)

Easy dark mode for Astro websites. Add themes in 2 lines of code! Zero dependencies, supports SSR, and works with any
framework or UI.

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
    <button
      onclick="() => dispatchEvent(new CustomEvent('set-theme', { detail: 'light' }))"
    >
      Light
    </button>
    <button
      onclick="() => dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))"
    >
      Dark
    </button>
  </body>
</html>
```

### Usage

`astro-themes` gives you the ability to get and set the theme, with builtin browser standards. No polluting the global
scope or any other hacks! These methods will work without a framework, or from within your React/Svelte/Vue/etc
components.

Set the theme:

```ts
dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))
```

Get the current theme:

```ts
document.documentElement.attributes.getNamedItem('data-theme').value // 'light' | 'dark'
```

Set a default theme (only applied if the browser doesn't specify a preference for dark mode):

```astro
<Themes defaultTheme="dark" />
```

## What does it do?

- Provides ability to get and set the theme from any framework, or none at all
  - Set theme by dispatching a custom browser event on the
    window: `dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))`
  - Get current theme: `document.documentElement.attributes.getNamedItem('data-theme').value`
- Sets `data-theme` attribute on the `html` element, so you can implement dark mode in CSS
- Sets `color-scheme` CSS attribute on the `html` element, so the browser renders built in elements appropriately
- Reads user theme preference on page load
  - From `localStorage`, if they've set it in the past
  - From `prefers-color-scheme: dark`, if supported
  - Falls back to the `defaultTheme` option, or `light` if not specified
- Synchronizes setting across tabs
- Responds to changes in OS preference (for example, the OS automatically switching to dark mode in the evening)

### Possible future enhancements

Ideas, bug reports, or questions are welcomed! Please don't hesitate to [open an issue](https://github.com/alex-grover/astro-themes/issues/new).

- Allow customizing attribute name, or using a class (helpful for Tailwind compatibility)
- Minify script

This component was inspired by the excellent [`next-themes`](https://github.com/pacocoursey/next-themes).
