import { test, expect } from '@playwright/test'

test.describe('Flash of Unstyled Content (FOUC)', () => {
  test('should be dark theme IMMEDIATELY as text is rendered', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' })

    // throttle getting slow.js so that it doesn't immediately load
    await page.route('/slow.js', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 5_000))
      await route.continue()
    })

    // also don't wait for the page to load!
    await page.goto('/slow', {
      // "commit" = consider operation to be finished when network response is
      // received and the document started loading.
      waitUntil: 'commit',
    })

    // wait for the text to be in the body
    await expect(
      page.getByText('I am text that appears in the body.')
    ).toBeVisible()

    // now we should be able to immediately get the html element ...
    const html = page.locator('html')

    // ... and use a NON-retrying assertion to immediately assert. Once we
    // have the html element we do NOT want to wait for data-theme to be
    // available. It should be on the html element by the time we get here
    // because the body text is already there!
    expect(await html.getAttribute('data-theme')).toBe('dark')
  })
})
