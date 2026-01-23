/**
 * Email-Service für SEPA-Formular
 * 
 * Dieser Service simuliert das Versenden von E-Mails.
 * In der Produktion sollte er mit einem echten Backend verbunden werden
 * (z.B. Node.js mit Nodemailer, AWS SES, SendGrid, etc.)
 * 
 * DSGVO-konform:
 * - Der Verein erhält die vollständige IBAN im PDF
 * - Das Mitglied erhält eine Bestätigung mit maskierter IBAN
 * 
 * SICHERHEIT:
 * - Input-Validierung vor Verarbeitung
 * - Sanitization gegen XSS
 * - Rate Limiting sollte im Backend implementiert werden
 */

// Email-Empfänger des Fördervereins
const VEREIN_EMAIL = 'grundschuleludweiler@schule.saarland'

/**
 * Validiert eine deutsche IBAN
 * @param {string} iban - Die zu validierende IBAN
 * @returns {boolean} - true wenn gültig
 */
export function validateIBAN(iban) {
  if (!iban) return false
  
  // Entferne Leerzeichen und konvertiere zu Großbuchstaben
  const cleanIban = iban.replace(/\s/g, '').toUpperCase()
  
  // Deutsche IBAN: DE + 2 Prüfziffern + 8 Bankleitzahl + 10 Kontonummer = 22 Zeichen
  if (!/^DE\d{20}$/.test(cleanIban)) {
    return false
  }
  
  // IBAN-Prüfsummen-Validierung (ISO 7064 Mod 97-10)
  const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4)
  const numericIban = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString())
  
  // Modulo 97 Berechnung für große Zahlen
  let remainder = numericIban
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9)
    remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(9)
  }
  
  return parseInt(remainder, 10) % 97 === 1
}

/**
 * Validiert eine E-Mail-Adresse
 * @param {string} email - Die zu validierende E-Mail
 * @returns {boolean} - true wenn gültig
 */
export function validateEmail(email) {
  if (!email) return false
  // RFC 5322 konformer Regex (vereinfacht)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Sanitiert User-Input gegen XSS
 * @param {string} input - Der zu sanitierende String
 * @returns {string} - Sanitierter String
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return ''
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Validiert PLZ (deutsche Postleitzahl)
 * @param {string} plz - Die zu validierende PLZ
 * @returns {boolean} - true wenn gültig
 */
export function validatePLZ(plz) {
  if (!plz) return false
  return /^\d{5}$/.test(plz.trim())
}

/**
 * Maskiert eine IBAN für DSGVO-konforme Bestätigungsmails
 * z.B.: DE89 1234 5678 9012 3456 78 → DE** **** **** **** **56 78
 */
export function maskIBAN(iban) {
  if (!iban) return ''
  
  // Entferne alle Leerzeichen für die Verarbeitung
  const cleanIban = iban.replace(/\s/g, '')
  
  if (cleanIban.length < 8) return iban
  
  // Zeige nur Länderkürzel und die letzten 4 Ziffern
  const countryCode = cleanIban.substring(0, 2)
  const lastFour = cleanIban.slice(-4)
  const maskedMiddle = '*'.repeat(cleanIban.length - 6)
  
  // Formatiere mit Leerzeichen alle 4 Zeichen
  const masked = countryCode + maskedMiddle + lastFour
  return masked.replace(/(.{4})/g, '$1 ').trim()
}

/**
 * Formatiert das Datum im deutschen Format
 */
export function formatDate(date = new Date()) {
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Erstellt das PDF-Dokument als Base64 (simuliert)
 * In der Produktion: Verwende jsPDF oder pdf-lib
 */
export function generatePDFBase64(formData, maskSensitiveData = false) {
  // Simuliert PDF-Generierung
  // In der Produktion: Verwende eine PDF-Library
  const data = {
    ...formData,
    iban: maskSensitiveData ? maskIBAN(formData.iban) : formData.iban,
    generatedAt: formatDate()
  }
  
  return btoa(JSON.stringify(data)) // Base64-kodierte Daten (Platzhalter)
}

/**
 * Erstellt den Email-Inhalt für das Mitglied (mit maskierter IBAN)
 */
export function createMemberEmailContent(formData) {
  const maskedIban = maskIBAN(formData.iban)
  
  return {
    subject: `Willkommen beim Förderverein der Grundschule Ludweiler! 🎉`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #00BCD4; font-size: 24px; margin-bottom: 8px;">
            Herzlich Willkommen! 🎉
          </h1>
          <p style="color: #666; font-size: 16px;">
            Förderverein der Grundschule Ludweiler-Lauterbach e.V.
          </p>
        </div>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 16px;">
            Hallo ${formData.vorname}! 👋
          </h2>
          <p style="color: #444; line-height: 1.6;">
            Vielen Dank für Deine Mitgliedschaft im Förderverein! Wir freuen uns sehr, 
            dass Du unsere Schulkinder unterstützt.
          </p>
        </div>
        
        <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #333; font-size: 16px; margin-bottom: 16px;">
            📋 Deine Mitgliedsdaten
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 500;">${formData.vorname} ${formData.nachname}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Mitgliedsbeitrag:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 500;">${formData.beitrag} € / Jahr</td>
            </tr>
            ${formData.zusatzSpende > 0 ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Zusatzspende:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 500;">${formData.zusatzSpende} € / Jahr</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #92400e; font-size: 16px; margin-bottom: 16px;">
            🔐 SEPA-Lastschrift
          </h3>
          <p style="color: #78350f; line-height: 1.6; margin-bottom: 12px;">
            Du hast uns ein SEPA-Lastschriftmandat erteilt. Zur Sicherheit zeigen wir 
            Dir hier nur eine gekürzte Version Deiner IBAN:
          </p>
          <div style="background: #fff; padding: 12px; border-radius: 8px; font-family: monospace; color: #333; text-align: center; font-size: 16px;">
            ${maskedIban}
          </div>
          <p style="color: #78350f; font-size: 13px; margin-top: 12px;">
            Die vollständige IBAN ist sicher bei uns gespeichert.
          </p>
        </div>
        
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #166534; font-size: 16px; margin-bottom: 8px;">
            ✅ Nächste Schritte
          </h3>
          <p style="color: #166534; line-height: 1.6;">
            Der jährliche Beitrag wird einmal pro Schuljahr von Deinem Konto abgebucht. 
            Im Anhang findest Du eine Bestätigung Deiner Anmeldung als PDF.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
          <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
            Vielen Dank für Deine Unterstützung! 💚
          </p>
          <p style="color: #999; font-size: 12px;">
            Förderverein der Grundschule Ludweiler-Lauterbach e.V.<br>
            Fragen? Schreib uns an: ${VEREIN_EMAIL}
          </p>
        </div>
      </div>
    `,
    text: `
Herzlich Willkommen beim Förderverein der Grundschule Ludweiler-Lauterbach e.V.!

Hallo ${formData.vorname}!

Vielen Dank für Deine Mitgliedschaft im Förderverein! Wir freuen uns sehr, dass Du unsere Schulkinder unterstützt.

Deine Mitgliedsdaten:
- Name: ${formData.vorname} ${formData.nachname}
- Mitgliedsbeitrag: ${formData.beitrag} € / Jahr
${formData.zusatzSpende > 0 ? `- Zusatzspende: ${formData.zusatzSpende} € / Jahr` : ''}

SEPA-Lastschrift:
Du hast uns ein SEPA-Lastschriftmandat erteilt. Deine gekürzte IBAN: ${maskedIban}

Der jährliche Beitrag wird einmal pro Schuljahr von Deinem Konto abgebucht.

Vielen Dank für Deine Unterstützung!

Förderverein der Grundschule Ludweiler-Lauterbach e.V.
Fragen? Schreib uns an: ${VEREIN_EMAIL}
    `
  }
}

/**
 * Erstellt den Email-Inhalt für den Verein (mit vollständiger IBAN)
 */
export function createVereinEmailContent(formData) {
  return {
    subject: `Neue Mitgliedsanmeldung: ${formData.vorname} ${formData.nachname}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #00BCD4; color: white; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="font-size: 20px; margin: 0;">
            📬 Neue Mitgliedsanmeldung
          </h1>
        </div>
        
        <div style="background: #fff; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px; padding: 24px;">
          <p style="color: #444; line-height: 1.6; margin-bottom: 24px;">
            Es ist eine neue Mitgliedsanmeldung über die Website eingegangen:
          </p>
          
          <h3 style="color: #333; font-size: 16px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
            👤 Persönliche Daten
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 500;">${formData.vorname} ${formData.nachname}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Adresse:</td>
              <td style="padding: 8px 0; color: #333;">${formData.strasse}, ${formData.plz} ${formData.ort}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">E-Mail:</td>
              <td style="padding: 8px 0; color: #333;"><a href="mailto:${formData.email}">${formData.email}</a></td>
            </tr>
            ${formData.telefon ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Telefon:</td>
              <td style="padding: 8px 0; color: #333;">${formData.telefon}</td>
            </tr>
            ` : ''}
            ${formData.kindName ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Kind:</td>
              <td style="padding: 8px 0; color: #333;">${formData.kindName}${formData.kindKlasse ? ` (Klasse ${formData.kindKlasse})` : ''}</td>
            </tr>
            ` : ''}
          </table>
          
          <h3 style="color: #333; font-size: 16px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
            💳 Bankverbindung (SEPA-Mandat)
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #fef3c7; padding: 12px; border-radius: 8px;">
            <tr>
              <td style="padding: 8px 12px; color: #666; width: 140px;">Kontoinhaber:</td>
              <td style="padding: 8px 12px; color: #333; font-weight: 500;">${formData.kontoinhaber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #666;">IBAN:</td>
              <td style="padding: 8px 12px; color: #333; font-weight: 600; font-family: monospace;">${formData.iban}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #666;">BIC:</td>
              <td style="padding: 8px 12px; color: #333; font-family: monospace;">${formData.bic || 'Nicht angegeben'}</td>
            </tr>
          </table>
          
          <h3 style="color: #333; font-size: 16px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
            💰 Beitrag
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Mitgliedsbeitrag:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 600; font-size: 18px;">${formData.beitrag} € / Jahr</td>
            </tr>
            ${formData.zusatzSpende > 0 ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Zusatzspende:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 500;">${formData.zusatzSpende} € / Jahr</td>
            </tr>
            ` : ''}
            <tr style="background: #f0fdf4;">
              <td style="padding: 12px 0; color: #166534; font-weight: 600;">Gesamt:</td>
              <td style="padding: 12px 0; color: #166534; font-weight: 700; font-size: 20px;">${formData.beitrag + (formData.zusatzSpende || 0)} € / Jahr</td>
            </tr>
          </table>
          
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="color: #0369a1; font-size: 14px; margin: 0;">
              ℹ️ Im Anhang befindet sich das vollständige PDF mit allen Daten und dem SEPA-Mandat.
            </p>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 24px; text-align: center;">
            Anmeldung eingegangen am: ${formatDate()}
          </p>
        </div>
      </div>
    `,
    text: `
NEUE MITGLIEDSANMELDUNG
======================

Name: ${formData.vorname} ${formData.nachname}
Adresse: ${formData.strasse}, ${formData.plz} ${formData.ort}
E-Mail: ${formData.email}
${formData.telefon ? `Telefon: ${formData.telefon}` : ''}
${formData.kindName ? `Kind: ${formData.kindName}${formData.kindKlasse ? ` (Klasse ${formData.kindKlasse})` : ''}` : ''}

BANKVERBINDUNG (SEPA-MANDAT)
---------------------------
Kontoinhaber: ${formData.kontoinhaber}
IBAN: ${formData.iban}
BIC: ${formData.bic || 'Nicht angegeben'}

BEITRAG
-------
Mitgliedsbeitrag: ${formData.beitrag} € / Jahr
${formData.zusatzSpende > 0 ? `Zusatzspende: ${formData.zusatzSpende} € / Jahr` : ''}
Gesamt: ${formData.beitrag + (formData.zusatzSpende || 0)} € / Jahr

Anmeldung eingegangen am: ${formatDate()}
    `
  }
}

/**
 * Sendet die Emails (simuliert für Frontend-only)
 * 
 * HINWEIS: In der Produktion sollte dies über ein sicheres Backend erfolgen!
 * Optionen:
 * 1. Node.js Backend mit Nodemailer
 * 2. Serverless Function (AWS Lambda, Vercel, Netlify)
 * 3. Email-Service API (SendGrid, Mailgun, AWS SES)
 */
export async function sendFormSubmissionEmails(formData) {
  // Erstelle Email-Inhalte
  const memberEmail = createMemberEmailContent(formData)
  const vereinEmail = createVereinEmailContent(formData)
  
  // Generiere PDFs
  const memberPDF = generatePDFBase64(formData, true) // Mit maskierter IBAN
  const vereinPDF = generatePDFBase64(formData, false) // Mit vollständiger IBAN
  
  // In der Produktion: API-Call zum Backend
  // Für Demo: Zeige was gesendet würde
  console.log('=== EMAIL SERVICE ===')
  console.log('Email an Mitglied:', formData.email)
  console.log('Betreff:', memberEmail.subject)
  console.log('IBAN (maskiert):', maskIBAN(formData.iban))
  console.log('')
  console.log('Email an Verein:', VEREIN_EMAIL)
  console.log('Betreff:', vereinEmail.subject)
  console.log('IBAN (vollständig):', formData.iban)
  console.log('=====================')
  
  // Simuliere API-Aufruf
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        memberEmailSent: true,
        vereinEmailSent: true,
        message: 'Emails wurden erfolgreich versendet'
      })
    }, 1000)
  })
}

/**
 * Backend-Beispiel für Node.js mit Nodemailer
 * Kopiere diesen Code in eine separate Backend-Datei
 */
export const backendExample = `
// backend/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendMembershipEmails(formData) {
  // Email an Mitglied (mit maskierter IBAN im PDF)
  await transporter.sendMail({
    from: '"Förderverein GS Ludweiler" <noreply@foerderverein.de>',
    to: formData.email,
    subject: 'Willkommen beim Förderverein!',
    html: memberEmailHtml,
    attachments: [{
      filename: 'Mitgliedsbestaetigung.pdf',
      content: memberPdfBuffer // PDF mit maskierter IBAN
    }]
  });

  // Email an Verein (mit vollständiger IBAN im PDF)
  await transporter.sendMail({
    from: '"Förderverein Website" <noreply@foerderverein.de>',
    to: 'grundschuleludweiler@schule.saarland',
    subject: 'Neue Mitgliedsanmeldung: ' + formData.vorname + ' ' + formData.nachname,
    html: vereinEmailHtml,
    attachments: [{
      filename: 'Mitgliedsantrag.pdf',
      content: vereinPdfBuffer // PDF mit vollständiger IBAN
    }]
  });
}
`

export default {
  maskIBAN,
  formatDate,
  generatePDFBase64,
  createMemberEmailContent,
  createVereinEmailContent,
  sendFormSubmissionEmails,
  VEREIN_EMAIL
}
