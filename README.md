# 🚀 astro-themes [![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/alex-grover/astro-themes/ci/main)](https://github.com/alex-grover/astro-themes/actions?query=branch%3Amain) [![npm](https://img.shields.io/npm/v/astro-themes)](https://www.npmjs.com/package/astro-themes)

Easy dark mode for Astro websites. Add themes in 2 lines of code! Zero dependencies, supports SSR, and works with any
framework or UI.

## Install

```sh
npm install --save-dev astro-themes
```

## Use

Add the `<Themes />` component in your app. Works best in a centralized layout component, so it's shared everywhere.

![code sample adding Themes component in document head](https://user-images.githubusercontent.com/3088615/187366957-fd3b3ef6-c3a8-4524-a898-49be189e1a73.png)

### Usage

`astro-themes` gives you the ability to get and set the theme, with builtin browser standards. No polluting the global
scope or any other hacks! These methods will work without a framework, or from within your React/Svelte/Vue/etc
components.

Set the theme:

```ts
document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' })) // or pass `null` to clear the saved setting
```

Get the current theme:

```ts
document.documentElement.attributes.getNamedItem('data-theme')?.value // 'light' | 'dark'
```

Set a default theme (only applied if the browser doesn't specify a preference for dark mode):

```astro
<Themes defaultTheme="dark" />
```

#### Compatibility with Tailwind

Tailwind expects `class="dark"` on the `html` element rather than `data-theme`. To ensure that `dark:` classes work correctly, you can configure your dark mode selector as described [here](https://tailwindcss.com/docs/dark-mode#customizing-the-class-name).

## What does it do?

- Provides ability to get and set the theme from any framework, or none at all
  - Set theme by dispatching a custom browser event: `document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))`
  - Get current theme: `document.documentElement.attributes.getNamedItem('data-theme')?.value`
- Sets `data-theme` attribute on the `html` element, so you can implement dark mode in CSS
- Sets `color-scheme` CSS attribute on the `html` element, so the browser renders built in elements appropriately
- Reads user theme preference on page load
  - From `localStorage`, if they've set it in the past
  - From `prefers-color-scheme: dark`, if supported
  - Falls back to the `defaultTheme` option, or `light` if not specified
- Synchronizes setting across tabs
- Responds to changes in OS preference (for example, the OS automatically switching to dark mode in the evening)

## Run example locally

```sh
gh repo clone alex-grover/astro-themes
cd astro-themes
npm install
npm link
npm link astro-themes
npm run example
```

## Feedback

Ideas, bug reports, or questions are welcomed! Please don't hesitate to [open an issue](https://github.com/alex-grover/astro-themes/issues/new).

This component was inspired by the excellent [`next-themes`](https://github.com/pacocoursey/next-themes).
