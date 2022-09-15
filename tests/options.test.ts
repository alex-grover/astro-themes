import { test, expect } from '@playwright/test'

test.describe('<Themes /> options', () => {
  test("allows setting default theme if browser doesn't specify preference", async ({
    page,
  }) => {
    await page.goto('/options')

    const html = page.locator('html')

    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(html).toHaveCSS('color-scheme', 'dark')
  })
})
