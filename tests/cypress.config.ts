import { defineConfig } from 'cypress'

export default defineConfig({
  downloadsFolder: 'tests/downloads',
  fileServerFolder: 'tests/',
  fixturesFolder: 'tests/fixtures',
  screenshotsFolder: 'tests/screenshots',
  supportFolder: 'tests/support',
  videosFolder: 'tests/videos',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.test.ts',
    supportFile: 'tests/support.ts',
  },
})
