import { test, expect } from '@playwright/test'

test.describe('<Themes />', () => {
  test('sets attributes and style on the html element', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() =>
      document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' })),
    )

    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(html).toHaveAttribute('data-theme-preference', 'dark')
    await expect(html).toHaveCSS('color-scheme', 'dark')

    await page.evaluate(() =>
      document.dispatchEvent(new CustomEvent('set-theme', { detail: 'light' })),
    )

    await expect(html).toHaveAttribute('data-theme', 'light')
    await expect(html).toHaveAttribute('data-theme-preference', 'light')
    await expect(html).toHaveCSS('color-scheme', 'light')
  })

  test('allows users to get theme and preference', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'light')
    await expect(html).toHaveAttribute('data-theme-preference', '')

    await page.evaluate(() =>
      document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' })),
    )

    const theme = await page.evaluate(
      () =>
        document.documentElement.attributes.getNamedItem('data-theme')?.value,
    )

    await expect(theme).toBe('dark')

    const preference = await page.evaluate(
      () =>
        document.documentElement.attributes.getNamedItem(
          'data-theme-preference',
        )?.value,
    )

    await expect(preference).toBe('dark')
  })

  test('persists on refresh', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() =>
      document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' })),
    )

    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(html).toHaveAttribute('data-theme-preference', 'dark')
    await expect(html).toHaveCSS('color-scheme', 'dark')

    await page.reload()

    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(html).toHaveAttribute('data-theme-preference', 'dark')
    await expect(html).toHaveCSS('color-scheme', 'dark')
  })

  test('respects browser preferences', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })

    await page.goto('/')

    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(html).toHaveAttribute('data-theme-preference', '')
    await expect(html).toHaveCSS('color-scheme', 'dark')
  })

  test('responds to changes from localStorage', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'light')
    await expect(html).toHaveAttribute('data-theme-preference', '')
    await expect(html).toHaveCSS('color-scheme', 'light')

    // StorageEvents don't fire if you set localStorage from the same page, so
    // send an event manually
    await page.evaluate(() =>
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'theme',
          oldValue: null,
          newValue: 'dark',
        }),
      ),
    )

    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(html).toHaveAttribute('data-theme-preference', 'dark')
    await expect(html).toHaveCSS('color-scheme', 'dark')
  })

  test('responds to changes in browser preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })

    await page.goto('/')

    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(html).toHaveAttribute('data-theme-preference', '')
    await expect(html).toHaveCSS('color-scheme', 'dark')

    await page.emulateMedia({ colorScheme: 'light' })

    await expect(html).toHaveAttribute('data-theme', 'light')
    await expect(html).toHaveAttribute('data-theme-preference', '')
    await expect(html).toHaveCSS('color-scheme', 'light')
  })
})
