/**
 * PDF-Service – erzeugt downloadbare A4-Formulare mit jsPDF
 *
 * Zwei Dokumente:
 *  - generateBeitrittsPDF   → Mitgliedsantrag + Überweisungsdetails
 *  - generateSEPAMandatPDF  → Mitgliedsantrag + SEPA-Basis-Lastschriftmandat
 *
 * TODO: Ersetzen Sie die Platzhalterdaten in VEREINSKONTO durch
 *       die echten Bankdaten des Fördervereins.
 */

import { jsPDF } from 'jspdf'
import { formatDate } from './emailService'

// ── Vereinskonto-Daten ──────────────────────────────────────────────────────
// TODO: Vor dem Go-Live durch echte Daten ersetzen!
export const VEREINSKONTO = {
  inhaber:      'Foerderverein der GS Ludweiler-Lauterbach e.V.',
  iban:         'DE83 5935 0110 0000 0123 45',   // TODO: Echte IBAN
  bic:          'KRSADE55',                       // TODO: Echter BIC
  bank:         'Kreissparkasse Saarlouis',        // TODO: Echte Bank
  glaeubigerId: 'DE98ZZZ09999999999',              // TODO: Echte Gläubiger-ID
}

// ── Layout-Konstanten ───────────────────────────────────────────────────────
const M          = 18          // left/right margin in mm
const PW         = 210         // A4 page width
const CW         = PW - 2 * M  // content width
const PRIMARY    = [0, 172, 193]
const DARK       = [30, 41, 59]
const GRAY       = [100, 116, 139]
const LIGHTGRAY  = [241, 245, 249]
const AMBER      = [251, 140, 0]

// ── Hilfs-Zeichner ──────────────────────────────────────────────────────────
function header(doc, subtitle) {
  doc.setFillColor(...PRIMARY)
  doc.rect(0, 0, PW, 30, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Foerderverein der Grundschule Ludweiler-Lauterbach e.V.',
    PW / 2, 12, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(subtitle, PW / 2, 22, { align: 'center' })
  return 36
}

function sectionTitle(doc, title, y) {
  doc.setFillColor(...LIGHTGRAY)
  doc.rect(M, y, CW, 7, 'F')
  doc.setTextColor(...PRIMARY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.text(title, M + 3, y + 5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...DARK)
  doc.setFontSize(9)
  return y + 11
}

function field(doc, label, value, y) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text(label, M, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...DARK)
  doc.text(value || '-', M + 48, y)
  return y + 5.5
}

function coloredBox(doc, y, h, fillRGB, strokeRGB) {
  doc.setFillColor(...fillRGB)
  if (strokeRGB) {
    doc.setDrawColor(...strokeRGB)
    doc.setLineWidth(0.3)
    doc.rect(M, y, CW, h, 'FD')
  } else {
    doc.rect(M, y, CW, h, 'F')
  }
}

function footer(doc) {
  const y = 282
  doc.setFillColor(...LIGHTGRAY)
  doc.rect(0, y, PW, 15, 'F')
  doc.setFontSize(7)
  doc.setTextColor(...GRAY)
  doc.text(
    'Foerderverein der Grundschule Ludweiler-Lauterbach e.V.  |  grundschuleludweiler@schule.saarland',
    PW / 2, y + 5, { align: 'center' })
  doc.text(
    'Der Online-Mitgliedsantrag wird nach Pruefung und Bestaetigung durch den Vorstand wirksam.',
    PW / 2, y + 10, { align: 'center' })
}

function beitragStr(formData) {
  const v = formData.beitrag === 'other'
    ? (parseInt(formData.customBeitrag) || 13)
    : (parseInt(formData.beitrag)       || 13)
  return v + ' EUR / Jahr'
}

// ── Gemeinsame Beitrittsdaten (Step 1-Daten) ────────────────────────────────
function drawPersonalSection(doc, formData, y) {
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text('Eingereicht am: ' + formatDate(), M, y)
  y += 8

  y = sectionTitle(doc, 'PERSOENLICHE DATEN', y)
  y = field(doc, 'Vorname:',    formData.vorname, y)
  y = field(doc, 'Nachname:',   formData.nachname, y)
  y = field(doc, 'Strasse/Nr.:', (formData.strasse + ' ' + (formData.hausnummer || '')).trim(), y)
  y = field(doc, 'PLZ / Ort:',  formData.plz + ' ' + formData.ort, y)
  if (formData.email)   y = field(doc, 'E-Mail:',   formData.email, y)
  if (formData.telefon) y = field(doc, 'Telefon:',  formData.telefon, y)
  y += 3

  y = sectionTitle(doc, 'MITGLIEDSBEITRAG', y)
  y = field(doc, 'Jahresbeitrag:', beitragStr(formData), y)
  if (formData.spende && parseInt(formData.spende) > 0)
    y = field(doc, 'Zusatzspende:', formData.spende + ' EUR (einmalig)', y)
  y += 3

  return y
}

// ── Beitrittserklärung + Überweisung ────────────────────────────────────────
export function generateBeitrittsPDF(formData) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  let y = header(doc, 'Beitrittserklaerung & Mitgliedsantrag (Ueberweisung)')

  y = drawPersonalSection(doc, formData, y)

  // Vereinskonto-Box
  y = sectionTitle(doc, 'BITTE UEBERWEISEN SIE AN DEN FOERDERVEREIN:', y)
  coloredBox(doc, y, 30, [232, 247, 250], PRIMARY)
  y += 4
  y = field(doc, 'Kontoinhaber:', VEREINSKONTO.inhaber, y)
  y = field(doc, 'IBAN:',         VEREINSKONTO.iban,    y)
  y = field(doc, 'BIC:',          VEREINSKONTO.bic,     y)
  y = field(doc, 'Kreditinstitut:', VEREINSKONTO.bank,  y)
  y += 3

  // Verwendungszweck
  coloredBox(doc, y, 9, [255, 249, 230], AMBER)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(100, 60, 0)
  doc.text('Verwendungszweck:', M + 3, y + 6)
  doc.text('Mitgliedsbeitrag ' + formData.vorname + ' ' + formData.nachname, M + 52, y + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...DARK)
  y += 14

  // Erklärungstext
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  const decl = 'Mit meiner Unterschrift beantrage ich die Aufnahme als Mitglied und erkenne die Satzung des Vereins in der jeweils gueltigen Fassung an.'
  const splitDecl = doc.splitTextToSize(decl, CW)
  doc.text(splitDecl, M, y)
  y += splitDecl.length * 4 + 4

  // Unterschrift
  y = Math.max(y, 220)
  doc.setDrawColor(150, 150, 150)
  doc.setLineWidth(0.3)
  doc.line(M, y, M + 68, y)
  doc.line(M + 80, y, M + 160, y)
  doc.setFontSize(7)
  doc.setTextColor(...GRAY)
  doc.text('Ort, Datum', M + 15, y + 4)
  doc.text('Unterschrift Mitglied', M + 103, y + 4)

  footer(doc)
  return doc
}

// ── Beitrittserklärung + SEPA-Mandat ────────────────────────────────────────
export function generateSEPAMandatPDF(formData) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  let y = header(doc, 'Beitrittserklaerung & SEPA-Basis-Lastschriftmandat')

  y = drawPersonalSection(doc, formData, y)

  // SEPA-Abschnitt
  y = sectionTitle(doc, 'SEPA-BASIS-LASTSCHRIFTMANDAT', y)

  // Mandatsreferenz
  coloredBox(doc, y, 8, [232, 247, 250], PRIMARY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text('Mandatsreferenz:', M + 3, y + 5.5)
  doc.setTextColor(...DARK)
  const ref = 'FVGSL-' + formatDate().replace(/\./g, '') + '-' +
    (formData.nachname || '').toUpperCase().substring(0, 4)
  doc.text(ref, M + 52, y + 5.5)
  doc.setFont('helvetica', 'normal')
  y += 12

  y = field(doc, 'Glaeubiger:',    VEREINSKONTO.inhaber,      y)
  y = field(doc, 'Glaeubiger-ID:', VEREINSKONTO.glaeubigerId, y)
  y += 2

  const kontoinhaber = formData.kontoinhaber || (formData.vorname + ' ' + formData.nachname)
  const sepaStr = ((formData.sepaStrasse || formData.strasse) + ' ' +
    (formData.sepaHausnummer || formData.hausnummer || '')).trim()
  const sepaPlzOrt = (formData.sepaPlz || formData.plz) + ' ' + (formData.sepaOrt || formData.ort)

  y = field(doc, 'Kontoinhaber:',   kontoinhaber.trim(), y)
  y = field(doc, 'Adresse:',        sepaStr,            y)
  y = field(doc, 'PLZ / Ort:',      sepaPlzOrt.trim(),  y)
  y = field(doc, 'IBAN:',           formData.iban,       y)
  y = field(doc, 'BIC:',            formData.bic || '-', y)
  y = field(doc, 'Kreditinstitut:', formData.kreditinstitut, y)
  y += 3

  // SEPA-Text-Box
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(203, 213, 225)
  doc.setLineWidth(0.3)
  const sepaText =
    'Ich/Wir ermachtige(n) den Foerderverein der Grundschule Ludweiler/Lauterbach Standort ' +
    'Ludweiler e. V. Zahlungen von meinem/unserem Konto mittels Lastschrift einzuziehen. ' +
    'Zugleich weise(n) ich/wir mein/unser Kreditinstitut an, die vom Verein auf mein/unser ' +
    'Konto gezogenen Lastschriften einzuloesen. Hinweis: Ich kann innerhalb von acht Wochen, ' +
    'beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrags verlangen.'
  const splitSepa = doc.splitTextToSize(sepaText, CW - 8)
  const boxH = splitSepa.length * 4 + 6
  doc.rect(M, y, CW, boxH, 'FD')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text(splitSepa, M + 4, y + 5)
  doc.setTextColor(...DARK)
  y += boxH + 6

  // Unterschrift
  y = Math.max(y, 218)
  doc.setDrawColor(150, 150, 150)
  doc.setLineWidth(0.3)
  doc.line(M, y, M + 68, y)
  doc.line(M + 80, y, M + 160, y)
  doc.setFontSize(7)
  doc.setTextColor(...GRAY)
  doc.text('Ort, Datum', M + 15, y + 4)
  doc.text('Unterschrift Kontoinhaber', M + 103, y + 4)

  footer(doc)
  return doc
}

export function downloadPDF(doc, filename) {
  doc.save(filename)
}
