import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000/foerderverein-gs-ludweiler/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Dev server is already running via npm run dev
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/foerderverein-gs-ludweiler/',
    reuseExistingServer: true,
    timeout: 30000,
  },
})
