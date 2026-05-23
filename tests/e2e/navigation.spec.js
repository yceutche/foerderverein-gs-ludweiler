import { test, expect } from '@playwright/test'

const BASE = '/'

/** Wait until the element with given id is within the viewport */
async function waitForElementInViewport(page, id, timeout = 6000) {
  await page.waitForFunction(
    (elId) => {
      const el = document.getElementById(elId)
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top < window.innerHeight * 0.8
    },
    id,
    { timeout }
  )
}

test.describe('Menu navigation – scroll to sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await page.waitForSelector('main')
  })

  test('Über uns scrolls to #ueber-uns section', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Über uns' }).click()
    await waitForElementInViewport(page, 'ueber-uns')
    await expect(page.locator('#ueber-uns')).toBeInViewport()
  })

  test('Was wir fördern scrolls to #was-wir-foerdern section', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Was wir fördern' }).click()
    await waitForElementInViewport(page, 'was-wir-foerdern')
    await expect(page.locator('#was-wir-foerdern')).toBeInViewport()
  })

  test('Mitmachen scrolls to #mitmachen section', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Mitmachen' }).click()
    await waitForElementInViewport(page, 'mitmachen')
    await expect(page.locator('#mitmachen')).toBeInViewport()
  })

  test('Termine scrolls to #termine section', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Termine' }).click()
    await waitForElementInViewport(page, 'termine')
    await expect(page.locator('#termine')).toBeInViewport()
  })

  test('Spenden scrolls to #spenden section', async ({ page }) => {
    // Target the nav Spenden link (exact match, not the CTA button)
    await page.locator('nav').getByRole('link', { name: /^Spenden$/ }).first().click()
    await waitForElementInViewport(page, 'spenden')
    await expect(page.locator('#spenden')).toBeInViewport()
  })

  test('Kontakt scrolls to #kontakt section', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Kontakt' }).click()
    await waitForElementInViewport(page, 'kontakt')
    await expect(page.locator('#kontakt')).toBeInViewport()
  })
})

test.describe('Projekte page', () => {
  test('navigates to /projekte and starts at top of page', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForSelector('main')

    // Scroll down so we can verify the reset
    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForFunction(() => window.scrollY >= 700)

    // Navigate to Projekte
    await page.locator('nav').getByRole('link', { name: 'Projekte' }).click()
    await page.waitForURL('**/projekte')

    // ScrollToHash resets scroll to top – wait for it
    await page.waitForFunction(() => window.scrollY <= 10, { timeout: 4000 })

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThanOrEqual(10)
    await expect(page.locator('header')).toBeVisible()
  })

  test('navigating back from Projekte scrolls to section', async ({ page }) => {
    await page.goto('projekte')
    await page.waitForSelector('main')

    // Click Über uns – navigates to main page and scrolls
    await page.locator('nav').getByRole('link', { name: 'Über uns' }).click()
    await page.waitForURL(/.*#ueber-uns/)

    await waitForElementInViewport(page, 'ueber-uns')
    await expect(page.locator('#ueber-uns')).toBeInViewport()
  })
})

test.describe('Mobile menu navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('mobile menu opens and navigates to section', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForSelector('main')

    // Open mobile menu
    await page.click('button[aria-label="Menü öffnen"]')

    // The mobile slide-down menu container (lg:hidden div with nav links)
    const mobileMenu = page.locator('div[class*="lg:hidden"]').first()
    await expect(mobileMenu).toBeVisible()

    // Click Über uns inside the mobile menu
    await mobileMenu.getByRole('link', { name: 'Über uns' }).click()

    await waitForElementInViewport(page, 'ueber-uns')
    await expect(page.locator('#ueber-uns')).toBeInViewport()
  })
})
