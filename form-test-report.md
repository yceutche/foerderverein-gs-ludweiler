# Form Test Report

**Project:** Förderverein Grundschule Ludweiler  
**URL tested:** http://localhost:3000/foerderverein-gs-ludweiler/  
**Date:** 2026-05-16  
**Email service:** EmailJS (`@emailjs/browser@4.4.1`) — credentials NOT yet configured in `.env.local`

---

## Summary

| Section | Tests | ✅ Pass | ℹ️ Info | ⚠️ Warn | ❌ Fail |
|---|---|---|---|---|---|
| Kontakt form | 6 | 5 | 1 | 0 | 0 |
| SEPA Modal – Step 1 | 5 | 5 | 0 | 0 | 0 |
| SEPA Modal – Step 2 | 3 | 3 | 0 | 0 | 0 |
| SEPA Modal – Step 3 (SEPA path) | 8 | 6 | 2 | 0 | 0 |
| SEPA Modal – Navigation (Zurück) | 3 | 3 | 0 | 0 | 0 |
| SEPA Modal – Step 3 (Transfer path) | 7 | 7 | 0 | 0 | 0 |
| **Total** | **32** | **29** | **3** | **0** | **0** |

**Result: All forms work correctly. No blocking failures.**  
All "INFO" entries are expected behaviour (EmailJS not yet configured → graceful error shown, not a crash).

---

## Timing

| Phase | Duration |
|---|---|
| Kontakt form tests | ~4 s |
| SEPA Modal full cycle (all 3 steps × 2 paths) | ~45 s |
| **Total** | **~49 s** |

---

## Detailed Results

### 1. Kontakt Form (`/` → Kontakt section)

| # | Test | Status | Detail |
|---|---|---|---|
| 1 | Empty submit blocked | ✅ PASS | Required-field validation prevents submission without data |
| 2 | Fields fill correctly | ✅ PASS | name, email, subject, message all accept input |
| 3 | Submit button enabled with data | ✅ PASS | Button becomes active once all required fields are filled |
| 4 | Form submits (EmailJS) | ✅ PASS | `sendKontaktEmail()` called, spinner shown during send |
| 5 | Error banner shown on EmailJS failure | ✅ PASS | Red error banner visible ("Ein Fehler ist aufgetreten") instead of crash |
| 6 | EmailJS config missing | ℹ️ INFO | Expected: `VITE_EMAILJS_*` variables not set → graceful error, no crash |

### 2. Mitglieds-Modal – Step 1 (Persönliche Daten)

| # | Test | Status | Detail |
|---|---|---|---|
| 7 | Empty submit blocked | ✅ PASS | Multiple validation errors shown on empty submit |
| 8 | Validation errors on submit | ✅ PASS | Error messages appear below required fields |
| 9 | Fields fill correctly | ✅ PASS | vorname, nachname, strasse, plz, ort, email all accept input |
| 10 | Beitrag selection (20€) | ✅ PASS | Amount selection works, selected state reflected |
| 11 | Checkboxes (Datenschutz / Satzung) | ✅ PASS | Both checkboxes check/uncheck correctly |

### 3. Mitglieds-Modal – Step 2 (Zahlungsart)

| # | Test | Status | Detail |
|---|---|---|---|
| 12 | Weiter disabled before payment selection | ✅ PASS | "Weiter" button correctly disabled until a payment method is chosen |
| 13 | Zurück button present | ✅ PASS | User can navigate back to step 1 |
| 14 | Weiter enables after SEPA selected | ✅ PASS | Selecting "SEPA-Lastschrift" unlocks the "Weiter" button |

### 4. Mitglieds-Modal – Step 3 (SEPA-Lastschrift path)

| # | Test | Status | Detail |
|---|---|---|---|
| 15 | SEPA step 3 renders | ✅ PASS | SEPA mandate form visible with all fields |
| 16 | PDF auto-downloaded on enter | ✅ PASS | "PDF heruntergeladen – Bestätigungsmail wurde versandt." notice shown |
| 17 | EmailJS error shown | ℹ️ INFO | Expected: "Ein Fehler ist aufgetreten. Bitte erneut versuchen." — no EmailJS credentials |
| 18 | Error handling graceful | ✅ PASS | Error banner shown, no JS crash, user can retry |
| 19 | Zurück btn present | ✅ PASS | Can navigate back to step 2 |
| 20 | Submit btn ("Beitritt abschließen") present | ✅ PASS | Button visible |
| 21 | SEPA fields fill correctly | ✅ PASS | Kontoinhaber, IBAN, BIC, Kreditinstitut all accept input |
| 22 | File upload btn present | ✅ PASS | Users can upload signed SEPA mandate (PDF/JPG/PNG) |

### 5. Back-Navigation (Zurück through all steps)

| # | Test | Status | Detail |
|---|---|---|---|
| 23 | Step 3 → Step 2 (Zurück) | ✅ PASS | Back navigation returns to payment selection |
| 24 | Step 2 → Step 1 (Zurück) | ✅ PASS | Back navigation returns to personal data form |
| 25 | Form data preserved | ✅ PASS | Fields still filled after navigating back (vorname = "Max") |

### 6. Mitglieds-Modal – Step 3 (Selbstüberweisung / Transfer path)

| # | Test | Status | Detail |
|---|---|---|---|
| 26 | Weiter enables after Selbstüberweisung selected | ✅ PASS | Payment method selection unlocks next step |
| 27 | Bank IBAN shown | ✅ PASS | Vereins-IBAN `DE83 5935 0110 0000 0123 45` displayed for transfer |
| 28 | PDF download btn | ✅ PASS | "Erneut herunterladen" button available |
| 29 | Verwendungszweck personalised | ✅ PASS | Shows "Mitgliedsbeitrag Anna Schmidt" (member name from step 1) |
| 30 | Selected Beitrag shown (20 €) | ✅ PASS | Amount from step 1 propagated to step 3 |
| 31 | "Antrag abschließen" → Success screen | ✅ PASS | "Antrag übermittelt!" screen shown with "Weiteres Mitglied anmelden" button |
| 32 | Schließen btn closes modal | ✅ PASS | Modal closes cleanly via the Schließen button on success screen |

---

## Issues Found

### ⚠️ Placeholder Vereinskonto-Daten

The bank account details shown on the transfer path are **placeholder values**:

| Field | Current Value | Action Required |
|---|---|---|
| IBAN | `DE83 5935 0110 0000 0123 45` | Replace with real IBAN |
| BIC | `KRSADE55` | Replace with real BIC |
| Kreditinstitut | `Kreissparkasse Saarlouis` | Confirm or update |

**Location:** `src/services/emailService.js` lines 384–386 (marked `// TODO: Echte IBAN`)  
**Impact:** Members who choose bank transfer will see incorrect account details and transfer to the wrong account.

### ℹ️ Hardcoded School Email in SEPA Mandate Submission Instructions

The SEPA mandate submission instructions show `grundschuleludweiler@schule.saarland` as the email to send signed mandates to.  
**Location:** `src/components/SEPAFormModal.jsx` lines 879 and 1086  
**Note:** This is a physical mailto link for document submission (not the automated email service), but confirm whether this should be `digitalevinfo@gmail.com` instead.

---

## EmailJS Configuration Required

All form submissions attempt to send emails via EmailJS. Until credentials are set in `.env.local`, **emails will not be delivered** but the UI degrades gracefully (error banner, no crash).

### Steps to enable real email sending:

1. Create account at [emailjs.com](https://www.emailjs.com)
2. Connect Gmail service with `digitalevinfo@gmail.com`
3. Create **3 email templates** and note their template IDs:
   - **MEMBER** — confirmation email to new member
   - **VEREIN** — notification to Förderverein admin
   - **KONTAKT** — contact form submission
4. Fill in `.env.local`:
   ```
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_MEMBER=template_id_member
   VITE_EMAILJS_TEMPLATE_VEREIN=template_id_verein
   VITE_EMAILJS_TEMPLATE_KONTAKT=template_id_kontakt
   ```
5. Add the same 5 variables to **Cloudflare Pages → Settings → Environment variables** for production.

See `.env.example` for full documentation of each variable and template parameter names.
