import { test, expect } from '@playwright/test'

const BASE = '/'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Navigate to main page and scroll to the Kontakt section */
async function gotoKontakt(page) {
  await page.goto(BASE)
  await page.waitForSelector('main')
  await page.locator('nav').getByRole('link', { name: 'Kontakt' }).click()
  await page.waitForFunction(
    () => {
      const el = document.getElementById('kontakt')
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top < window.innerHeight
    },
    { timeout: 5000 }
  )
}

/** Open the "Mitglied werden" modal from the desktop header CTA */
async function openMemberModal(page) {
  await page.goto(BASE)
  await page.waitForSelector('main')
  await page.locator('header').getByRole('button', { name: 'Mitglied werden' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
}

/** Fill all required Step 1 fields in the membership modal with valid data */
async function fillStep1(page) {
  const dialog = page.getByRole('dialog')
  await dialog.locator('input[name="vorname"]').fill('Max')
  await dialog.locator('input[name="nachname"]').fill('Mustermann')
  await dialog.locator('input[name="strasse"]').fill('Hauptstraße')
  await dialog.locator('input[name="hausnummer"]').fill('12')
  await dialog.locator('input[name="plz"]').fill('66117')
  await dialog.locator('input[name="ort"]').fill('Saarbrücken')
  await dialog.locator('input[name="email"]').fill('test@example.de')
  // Accept both checkboxes
  await dialog.locator('input[name="satzungAkzeptiert"]').check()
  await dialog.locator('input[name="datenschutzAkzeptiert"]').check()
}

/** Navigate to step 2 (Zahlungsart) */
async function goToStep2(page) {
  await openMemberModal(page)
  await fillStep1(page)
  await page.getByRole('dialog').getByRole('button', { name: 'Weiter zur Zahlungsart' }).click()
  await expect(page.getByRole('dialog').locator('text=Wie möchten Sie Ihren Mitgliedsbeitrag bezahlen?')).toBeVisible()
}

/** Navigate to step 3 with SEPA payment */
async function goToStep3SEPA(page) {
  await goToStep2(page)
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: /SEPA-Lastschrift/ }).click()
  await dialog.getByRole('button', { name: 'Weiter' }).click()
  await expect(dialog.locator('input[name="iban"]')).toBeVisible()
}

// ─── Kontakt Form ────────────────────────────────────────────────────────────

test.describe('Kontakt form', () => {
  test('renders all required fields', async ({ page }) => {
    await gotoKontakt(page)
    const form = page.locator('form').filter({ hasText: 'Nachricht' })
    await expect(form.locator('#name')).toBeVisible()
    await expect(form.locator('#email')).toBeVisible()
    await expect(form.locator('#subject')).toBeVisible()
    await expect(form.locator('#message')).toBeVisible()
    await expect(form.getByRole('button', { name: /senden/i })).toBeVisible()
  })

  test('subject select contains expected options', async ({ page }) => {
    await gotoKontakt(page)
    const select = page.locator('#subject')
    await expect(select.locator('option[value="mitgliedschaft"]')).toHaveText('Frage zur Mitgliedschaft')
    await expect(select.locator('option[value="spende"]')).toHaveText('Frage zu Spenden')
    await expect(select.locator('option[value="mitmachen"]')).toHaveText('Ich möchte mitmachen')
  })

  test('empty submit is blocked by HTML5 required validation', async ({ page }) => {
    await gotoKontakt(page)
    const submitBtn = page.locator('form').filter({ hasText: 'Nachricht' }).getByRole('button', { name: /senden/i })
    await submitBtn.click()
    // Form should NOT show the success state – still shows the form
    await expect(page.locator('text=Nachricht gesendet')).not.toBeVisible()
    // The name input should be invalid (focused by browser)
    const nameInput = page.locator('#name')
    const validity = await nameInput.evaluate((el) => el.validity.valid)
    expect(validity).toBe(false)
  })

  test('fields accept and display typed values', async ({ page }) => {
    await gotoKontakt(page)
    await page.locator('#name').fill('Erika Musterfrau')
    await page.locator('#email').fill('erika@test.de')
    await page.locator('#subject').selectOption('spende')
    await page.locator('#message').fill('Ich habe eine Frage zu Spenden.')
    await expect(page.locator('#name')).toHaveValue('Erika Musterfrau')
    await expect(page.locator('#email')).toHaveValue('erika@test.de')
    await expect(page.locator('#subject')).toHaveValue('spende')
    await expect(page.locator('#message')).toHaveValue('Ich habe eine Frage zu Spenden.')
  })

  test('filled form triggers loading state on submit', async ({ page }) => {
    await gotoKontakt(page)
    await page.locator('#name').fill('Test Nutzer')
    await page.locator('#email').fill('test@test.de')
    await page.locator('#subject').selectOption('sonstiges')
    await page.locator('#message').fill('Test Nachricht für E2E-Test.')
    const submitBtn = page.locator('form').filter({ hasText: 'Nachricht' }).getByRole('button', { name: /senden/i })
    await submitBtn.click()
    // Either loading or success/error state appears – in either case the form reacted
    await expect(
      page.locator('text=Wird gesendet').or(page.locator('text=Nachricht gesendet')).or(page.locator('text=fehlgeschlagen'))
    ).toBeVisible({ timeout: 5000 })
  })
})

// ─── Membership Modal (SEPAFormModal) ────────────────────────────────────────

test.describe('Membership modal – open & close', () => {
  test('opens when clicking "Mitglied werden"', async ({ page }) => {
    await openMemberModal(page)
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.locator('#modal-title')).toHaveText('Mitgliedsantrag')
  })

  test('progress bar starts at step 1', async ({ page }) => {
    await openMemberModal(page)
    // Step 1 indicator is active (has ring / bg-primary-600)
    await expect(page.getByRole('dialog').locator('text=Beitrittserklärung')).toBeVisible()
  })

  test('closes when clicking the X button', async ({ page }) => {
    await openMemberModal(page)
    await page.getByRole('dialog').getByRole('button', { name: 'Schließen' }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('closes when clicking the backdrop', async ({ page }) => {
    await openMemberModal(page)
    // Click the fixed backdrop (outside the modal card)
    await page.mouse.click(10, 10)
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})

test.describe('Membership modal – Step 1 (Beitrittserklärung)', () => {
  test.beforeEach(async ({ page }) => {
    await openMemberModal(page)
  })

  test('shows all required personal data fields', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await expect(dialog.locator('input[name="vorname"]')).toBeVisible()
    await expect(dialog.locator('input[name="nachname"]')).toBeVisible()
    await expect(dialog.locator('input[name="strasse"]')).toBeVisible()
    await expect(dialog.locator('input[name="hausnummer"]')).toBeVisible()
    await expect(dialog.locator('input[name="plz"]')).toBeVisible()
    await expect(dialog.locator('input[name="ort"]')).toBeVisible()
    await expect(dialog.locator('input[name="email"]')).toBeVisible()
    await expect(dialog.locator('input[name="satzungAkzeptiert"]')).toBeVisible()
    await expect(dialog.locator('input[name="datenschutzAkzeptiert"]')).toBeVisible()
  })

  test('clicking Weiter without data shows validation errors', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: /weiter/i }).click()
    // Multiple error messages should appear
    await expect(dialog.locator('text=Bitte Vornamen eingeben')).toBeVisible()
    await expect(dialog.locator('text=Bitte Nachnamen eingeben')).toBeVisible()
    await expect(dialog.locator('text=Bitte Straße eingeben')).toBeVisible()
    await expect(dialog.locator('text=Bitte Satzung akzeptieren')).toBeVisible()
    await expect(dialog.locator('text=Bitte Datenschutzerklärung akzeptieren')).toBeVisible()
  })

  test('shows error count summary when multiple fields missing', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: /weiter/i }).click()
    // ErrorSummary shows "Bitte korrigieren Sie die X markierten Felder."
    await expect(dialog.locator('text=/Bitte korrigieren Sie die \\d+ markierten Felder/')).toBeVisible()
  })

  test('invalid email shows specific email error', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.locator('input[name="email"]').fill('kein-email')
    await dialog.getByRole('button', { name: /weiter/i }).click()
    await expect(dialog.locator('text=Bitte gültige E-Mail-Adresse eingeben')).toBeVisible()
  })

  test('invalid PLZ shows specific PLZ error', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.locator('input[name="plz"]').fill('123')
    await dialog.getByRole('button', { name: /weiter/i }).click()
    await expect(dialog.locator('text=Bitte gültige 5-stellige PLZ eingeben')).toBeVisible()
  })

  test('valid step 1 data advances to step 2', async ({ page }) => {
    await fillStep1(page)
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: 'Weiter zur Zahlungsart' }).click()
    // Step 2 content: payment method selection
    await expect(dialog.locator('text=Wie möchten Sie Ihren Mitgliedsbeitrag bezahlen?')).toBeVisible()
  })

  test('beitrag amount defaults to 13 €', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    // Beitrag is a custom button (not a radio input); 13 € is the default selection
    const beitragBtn = dialog.getByRole('button', { name: '13 €' })
    await expect(beitragBtn).toBeVisible()
    await expect(beitragBtn).toHaveClass(/bg-primary-600/)
  })
})

test.describe('Membership modal – Step 2 (Zahlungsart)', () => {
  test.beforeEach(async ({ page }) => {
    await goToStep2(page)
  })

  test('shows both payment options', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await expect(dialog.getByRole('button', { name: /SEPA-Lastschrift/ })).toBeVisible()
    await expect(dialog.getByRole('button', { name: /Selbstüberweisung/ })).toBeVisible()
  })

  test('Zurück returns to step 1', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: /zurück/i }).click()
    await expect(dialog.locator('input[name="vorname"]')).toBeVisible()
  })

  test('selecting SEPA and clicking Weiter advances to step 3 (SEPA)', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: /SEPA-Lastschrift/ }).click()
    await dialog.getByRole('button', { name: 'Weiter' }).click()
    // Step 3 SEPA: IBAN field appears
    await expect(dialog.locator('input[name="iban"]')).toBeVisible()
  })

  test('selecting Überweisung and clicking Weiter advances to step 3 (transfer)', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: /Selbstüberweisung/ }).click()
    await dialog.getByRole('button', { name: 'Weiter' }).click()
    // Step 3 Transfer: shows Mitgliedsantrag PDF download
    await expect(dialog.locator('text=Mitgliedsantrag als PDF')).toBeVisible()
  })
})

test.describe('Membership modal – Step 3 SEPA', () => {
  test.beforeEach(async ({ page }) => {
    await goToStep3SEPA(page)
  })

  test('shows SEPA fields (IBAN, Kontoinhaber, Kreditinstitut)', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await expect(dialog.locator('input[name="iban"]')).toBeVisible()
    await expect(dialog.locator('input[name="kontoinhaber"]')).toBeVisible()
    await expect(dialog.locator('input[name="kreditinstitut"]')).toBeVisible()
    await expect(dialog.locator('input[name="sepaEinwilligung"]')).toBeVisible()
  })

  test('submitting empty SEPA form shows validation errors', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: /Beitritt abschließen/i }).click()
    await expect(dialog.locator('text=Bitte Kontoinhaber eingeben')).toBeVisible()
    await expect(dialog.locator('text=/Bitte gültige deutsche IBAN/')).toBeVisible()
  })

  test('invalid IBAN shows error message', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await dialog.locator('input[name="iban"]').fill('DE00000000000000000000')
    await dialog.locator('input[name="kontoinhaber"]').fill('Max Mustermann')
    await dialog.locator('input[name="kreditinstitut"]').fill('Sparkasse')
    await dialog.locator('input[name="sepaEinwilligung"]').check()
    await dialog.getByRole('button', { name: /Beitritt abschließen/i }).click()
    await expect(dialog.locator('text=/Bitte gültige deutsche IBAN/')).toBeVisible()
  })
})

// ─── PasswordGate (/vorstand) ────────────────────────────────────────────────

test.describe('PasswordGate (/vorstand)', () => {
  test('shows password form when not authenticated', async ({ page }) => {
    // Clear sessionStorage to ensure unauthenticated state
    await page.goto(BASE)
    await page.evaluate(() => sessionStorage.clear())
    await page.goto('vorstand')
    await expect(page.locator('text=Seite in Entwicklung')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Zugang erhalten' })).toBeVisible()
  })

  test('wrong password shows error state', async ({ page }) => {
    await page.goto(BASE)
    await page.evaluate(() => sessionStorage.clear())
    await page.goto('vorstand')
    await page.locator('input[type="password"]').fill('falschesPasswort')
    await page.keyboard.press('Enter')
    // Input should be cleared and show error styling (border-red)
    await expect(page.locator('input.border-red-400')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toHaveValue('')
  })

  test('password visibility toggle works', async ({ page }) => {
    await page.goto(BASE)
    await page.evaluate(() => sessionStorage.clear())
    await page.goto('vorstand')
    const input = page.locator('input[type="password"]')
    await input.fill('TestPasswort')
    // Click the eye icon to reveal password
    await page.locator('button[type="button"]').filter({ has: page.locator('svg') }).click()
    await expect(page.locator('input[type="text"]')).toHaveValue('TestPasswort')
  })
})
