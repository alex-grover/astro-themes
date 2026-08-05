

# 🚀 astro-themes [![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/alex-grover/astro-themes/ci.yml?branch=main)](https://github.com/alex-grover/astro-themes/actions/workflows/ci.yml?query=branch%3Amain) [![npm](https://img.shields.io/npm/v/astro-themes)](https://www.npmjs.com/package/astro-themes)

Modo oscuro sencillo para sitios web de Astro. ¡Agrega temas en 2 líneas de código! Cero dependencias, compatible con SSR y funciona con cualquier framework o interfaz de usuario.

## Instalación

```sh
npm install --save-dev astro-themes
```

## Uso

Agrega el componente `<Themes />` en tu aplicación. Funciona mejor en un componente de layout centralizado, para que se comparta en todas partes.

![code sample adding Themes component in document head](https://user-images.githubusercontent.com/3088615/187366957-fd3b3ef6-c3a8-4524-a898-49be189e1a73.png)

### Uso

`astro-themes` te permite obtener y establecer el tema, utilizando estándares nativos del navegador. ¡Sin contaminar el ámbito global ni recurrir a hacks! Estos métodos funcionarán sin un framework, o desde dentro de tus componentes de React/Svelte/Vue/etc.

Establecer el tema:

```ts
document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' })) // o pasa `null` para borrar la configuración guardada
```

Obtener el tema actual resuelto y la preferencia de tema:

```ts
document.documentElement.attributes.getNamedItem('data-theme')?.value // 'light' | 'dark'
document.documentElement.attributes.getNamedItem('data-theme-preference')?.value // 'light' | 'dark' | ''
```

Establecer un tema predeterminado (solo se aplica si el navegador no especifica una preferencia para el modo oscuro):

```astro
<Themes defaultTheme="dark" />
```

#### Compatibilidad con Tailwind

Por defecto, Tailwind espera `class="dark"` en el elemento `html` en lugar de `data-theme`. Para asegurar que las clases `dark:` funcionen correctamente, puedes configurar tu selector de modo oscuro como se describe [aquí](https://tailwindcss.com/docs/dark-mode#customizing-the-selector).

## ¿Qué hace?

- Proporciona la capacidad de obtener y establecer el tema desde cualquier framework, o sin ninguno
  - Establecer el tema mediante el despacho de un evento personalizado del navegador: `document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))`
  - Obtener el tema actual: `document.documentElement.attributes.getNamedItem('data-theme')?.value`
- Establece el atributo `data-theme` en el elemento `html`, para que puedas implementar el modo oscuro en CSS
- Establece el atributo CSS `color-scheme` en el elemento `html`, para que el navegador renderice los elementos nativos apropiadamente
- Lee la preferencia de tema del usuario al cargar la página
  - Desde `localStorage`, si lo configuró en el pasado
  - Desde `prefers-color-scheme: dark`, si es compatible
  - Recurre a la opción `defaultTheme`, o a `light` si no se especifica
- Sincroniza la configuración entre pestañas
- Responde a los cambios en la preferencia del sistema operativo (por ejemplo, el SO cambia automáticamente al modo oscuro por la noche)

## Ejecutar el ejemplo localmente

```sh
gh repo clone alex-grover/astro-themes
cd astro-themes
npm install
npm link
npm link astro-themes
npm run example
```

## Comentarios

¡Las ideas, reportes de errores o preguntas son bienvenidas! No dudes en [abrir un issue](https://github.com/alex-grover/astro-themes/issues/new).

Este componente fue inspirado por el excelente [`next-themes`](https://github.com/pacocoursey/next-themes).
