import { useState, useRef, useCallback, useEffect } from 'react'
import {
  X, FileText, Download, CheckCircle, AlertCircle, Loader2, Mail,
  Upload, CreditCard, Banknote, Shield, Copy, Check, Trash2,
  ChevronLeft, CloudUpload, File as FileIcon, Building2
} from 'lucide-react'
import {
  sendFormSubmissionEmails, maskIBAN, validateIBAN,
  validateEmail, validatePLZ, sanitizeInput
} from '../services/emailService'
import {
  generateBeitrittsPDF, generateSEPAMandatPDF, downloadPDF, VEREINSKONTO
} from '../services/pdfService'

// ── Datei-Upload-Bereich ─────────────────────────────────────────────────────
function FileUploadArea({ onFileSelect, uploadedFile, onRemove }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef(null)

  const validate = useCallback((file) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowed.includes(file.type)) {
      alert('Nur PDF, JPG oder PNG erlaubt.')
      return false
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Datei zu groß – Maximum 10 MB.')
      return false
    }
    return true
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && validate(file)) onFileSelect(file)
  }, [validate, onFileSelect])

  const fmtSize = (b) =>
    b < 1024 ? `${b} B` :
    b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` :
    `${(b / (1024 * 1024)).toFixed(1)} MB`

  if (uploadedFile) {
    return (
      <div className="flex items-center gap-3 p-4 bg-success-50 border border-success-200 rounded-xl">
        <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileIcon className="w-5 h-5 text-success-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-success-800 truncate text-sm">{uploadedFile.name}</p>
          <p className="text-xs text-success-600">{fmtSize(uploadedFile.size)}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-success-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Datei entfernen"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-all ${
        isDragOver
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
    >
      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <CloudUpload className="w-6 h-6 text-primary-600" />
      </div>
      <p className="font-medium text-gray-700 mb-1">
        Datei hier ablegen oder{' '}
        <span className="text-primary-600 underline">auswählen</span>
      </p>
      <p className="text-xs text-gray-400">PDF, JPG oder PNG · Max. 10 MB</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => {
          const file = e.target.files[0]
          if (file && validate(file)) onFileSelect(file)
          e.target.value = ''
        }}
        className="hidden"
      />
    </div>
  )
}

// ── Kopierbares Feld ─────────────────────────────────────────────────────────
function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)
  const doCopy = () => {
    navigator.clipboard.writeText(value).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex items-center justify-between py-2.5 px-3 bg-white rounded-lg border border-gray-200">
      <div>
        <span className="text-xs text-gray-500 block">{label}</span>
        <span className="font-mono font-medium text-gray-900 text-sm">{value}</span>
      </div>
      <button
        type="button"
        onClick={doCopy}
        className="ml-3 p-1.5 rounded text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors flex-shrink-0"
        title="Kopieren"
      >
        {copied ? <Check className="w-4 h-4 text-success-600" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  )
}

// ── Fehler-Inline ────────────────────────────────────────────────────────────
function FieldError({ msg }) {
  if (!msg) return null
  return (
    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {msg}
    </p>
  )
}

// ── Fortschrittsanzeige ──────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Beitrittserklärung' },
  { id: 2, label: 'Zahlungsart' },
  { id: 3, label: 'Abschluss' },
]

function ProgressBar({ current, paymentMethod }) {
  return (
    <div className="flex items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
      {STEPS.map((step, i) => {
        const done   = current > step.id
        const active = current === step.id
        const label  = step.id === 3 && paymentMethod === 'sepa'
          ? 'SEPA-Mandat'
          : step.id === 3 && paymentMethod === 'transfer'
          ? 'Überweisung'
          : step.label
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center gap-2 ${active || done ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                done   ? 'bg-primary-600 text-white' :
                active ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                         'bg-gray-200 text-gray-500'
              }`}>
                {done ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-1 mx-3 rounded ${done ? 'bg-primary-600' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Fehler-Zusammenfassung neben Buttons ────────────────────────────────────
function ErrorSummary({ errors }) {
  const count = Object.values(errors).filter(Boolean).length
  if (count === 0) return null
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>
        {count === 1
          ? 'Bitte korrigieren Sie das markierte Feld.'
          : `Bitte korrigieren Sie die ${count} markierten Felder.`}
      </span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Haupt-Komponente
// ═══════════════════════════════════════════════════════════════════════════════
const defaultFormData = {
  vorname: '', nachname: '', strasse: '', hausnummer: '',
  plz: '', ort: '', email: '', telefon: '',
  beitrag: '13', customBeitrag: '', spende: '',
  kontoinhaber: '', sepaStrasse: '', sepaHausnummer: '',
  sepaPlz: '', sepaOrt: '', iban: '', bic: '', kreditinstitut: '',
  satzungAkzeptiert: false, datenschutzAkzeptiert: false, sepaEinwilligung: false,
}

export default function SEPAFormModal({ isOpen, onClose, initialData = {} }) {

  // ── Schritte & Zahlungsart ─────────────────────────────────────────────
  const [currentStep,    setCurrentStep]    = useState(1)
  const [paymentMethod,  setPaymentMethod]  = useState(null)
  const [submitted,      setSubmitted]      = useState(false)

  // ── Formulardaten ──────────────────────────────────────────────────────
  const [formData, setFormData] = useState({ ...defaultFormData })
  const [errors, setErrors] = useState({})

  // ── Upload & Download ──────────────────────────────────────────────────
  const [uploadedFile,  setUploadedFile]  = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [pdfDownloaded, setPdfDownloaded] = useState(false)

  // ── SEPA-Mandat Bestätigung ────────────────────────────────────────────
  const [mandatAck, setMandatAck] = useState(false)

  // ── Senden ────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailStatus,  setEmailStatus]  = useState(null)

  // ── Reset & pre-fill when modal opens ─────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...defaultFormData, ...initialData })
      setCurrentStep(1)
      setPaymentMethod(null)
      setSubmitted(false)
      setErrors({})
      setUploadedFile(null)
      setPdfDownloaded(false)
      setMandatAck(false)
      setEmailStatus(null)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handler ────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const beitragValue = formData.beitrag === 'other'
    ? (parseInt(formData.customBeitrag) || 13)
    : (parseInt(formData.beitrag)       || 13)

  const prepareEmailData = () => ({
    vorname:       sanitizeInput(formData.vorname),
    nachname:      sanitizeInput(formData.nachname),
    strasse:       sanitizeInput(`${formData.strasse} ${formData.hausnummer}`.trim()),
    plz:           sanitizeInput(formData.plz),
    ort:           sanitizeInput(formData.ort),
    email:         formData.email.trim().toLowerCase(),
    telefon:       sanitizeInput(formData.telefon),
    beitrag:       Math.max(13, beitragValue),
    zusatzSpende:  Math.max(0, parseInt(formData.spende) || 0),
    kontoinhaber:  sanitizeInput(formData.kontoinhaber),
    iban:          formData.iban.replace(/\s/g, '').toUpperCase(),
    bic:           sanitizeInput(formData.bic).toUpperCase(),
    kreditinstitut: sanitizeInput(formData.kreditinstitut),
  })

  const validateStep1 = () => {
    const e = {}
    if (!formData.vorname.trim())  e.vorname  = 'Bitte Vornamen eingeben'
    if (!formData.nachname.trim()) e.nachname = 'Bitte Nachnamen eingeben'
    if (!formData.strasse.trim())  e.strasse  = 'Bitte Straße eingeben'
    if (!formData.plz.trim() || !validatePLZ(formData.plz))
      e.plz = 'Bitte gültige 5-stellige PLZ eingeben'
    if (!formData.ort.trim()) e.ort = 'Bitte Ort eingeben'
    if (!formData.email.trim())
      e.email = 'E-Mail ist erforderlich (für die Bestätigungsmail)'
    else if (!validateEmail(formData.email))
      e.email = 'Bitte gültige E-Mail-Adresse eingeben'
    if (!formData.satzungAkzeptiert)
      e.satzungAkzeptiert = 'Bitte Satzung akzeptieren'
    if (!formData.datenschutzAkzeptiert)
      e.datenschutzAkzeptiert = 'Bitte Datenschutzerklärung akzeptieren'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateSEPA = () => {
    const e = {}
    if (!formData.kontoinhaber.trim())
      e.kontoinhaber = 'Bitte Kontoinhaber eingeben'
    if (!formData.iban.trim() || !validateIBAN(formData.iban))
      e.iban = 'Bitte gültige deutsche IBAN eingeben (DE + 20 Ziffern)'
    if (!formData.kreditinstitut.trim())
      e.kreditinstitut = 'Bitte Kreditinstitut eingeben'
    if (!formData.sepaEinwilligung)
      e.sepaEinwilligung = 'Bitte SEPA-Einwilligung erteilen'
    if (!mandatAck)
      e.mandatAck = 'Bitte bestätigen Sie den Hinweis zum SEPA-Mandat'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goNext = () => {
    if (currentStep === 1 && validateStep1()) { setCurrentStep(2); setErrors({}) }
    else if (currentStep === 2 && paymentMethod) { setCurrentStep(3); setErrors({}) }
  }
  const goBack = () => {
    if (currentStep > 1) { setCurrentStep(currentStep - 1); setErrors({}) }
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      const fname = `${formData.nachname}_${formData.vorname}`
      let doc
      if (paymentMethod === 'sepa') {
        doc = generateSEPAMandatPDF(formData)
        downloadPDF(doc, `SEPA-Mandat_${fname}.pdf`)
      } else {
        doc = generateBeitrittsPDF(formData)
        downloadPDF(doc, `Mitgliedsantrag_${fname}.pdf`)
      }
      await sendFormSubmissionEmails(prepareEmailData(), paymentMethod)
      setPdfDownloaded(true)
    } catch (err) {
      console.error('PDF-Fehler:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSubmitTransfer = async () => {
    setIsSubmitting(true)
    try {
      if (!pdfDownloaded) await handleDownloadPDF()
      setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitSEPA = async (e) => {
    e.preventDefault()
    if (!validateSEPA()) return
    setIsSubmitting(true)
    setEmailStatus(null)
    try {
      if (!pdfDownloaded) {
        const doc = generateSEPAMandatPDF(formData)
        downloadPDF(doc, `SEPA-Mandat_${formData.nachname}_${formData.vorname}.pdf`)
        setPdfDownloaded(true)
      }
      const result = await sendFormSubmissionEmails(prepareEmailData(), 'sepa')
      if (result.success) {
        setEmailStatus({ success: true, maskedIban: maskIBAN(formData.iban) })
        setSubmitted(true)
      } else {
        setEmailStatus({ success: false, message: 'E-Mail-Versand fehlgeschlagen. Bitte erneut versuchen.' })
      }
    } catch {
      setEmailStatus({ success: false, message: 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      vorname: '', nachname: '', strasse: '', hausnummer: '',
      plz: '', ort: '', email: '', telefon: '',
      beitrag: '13', customBeitrag: '', spende: '',
      kontoinhaber: '', sepaStrasse: '', sepaHausnummer: '',
      sepaPlz: '', sepaOrt: '', iban: '', bic: '', kreditinstitut: '',
      satzungAkzeptiert: false, datenschutzAkzeptiert: false, sepaEinwilligung: false,
    })
    setCurrentStep(1); setPaymentMethod(null); setSubmitted(false)
    setErrors({}); setEmailStatus(null); setUploadedFile(null)
    setPdfDownloaded(false); setMandatAck(false); setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" aria-hidden="true" />
              </div>
              <div>
                <h2 id="modal-title" className="text-xl font-bold text-gray-900">Mitgliedsantrag</h2>
                <p className="text-sm text-gray-500">Förderverein der Grundschule Ludweiler-Lauterbach</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fortschrittsbalken */}
          {!submitted && <ProgressBar current={currentStep} paymentMethod={paymentMethod} />}

          {/* Inhalt */}
          <div className="p-6 max-h-[68vh] overflow-y-auto">

            {/* ── Erfolgsmeldung ── */}
            {submitted && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-9 h-9 text-success-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {paymentMethod === 'sepa' ? 'SEPA-Mandat eingereicht!' : 'Antrag übermittelt!'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {paymentMethod === 'sepa'
                    ? 'Ihr Mitgliedsantrag & SEPA-Mandat wurden erfolgreich übermittelt.'
                    : 'Ihr Mitgliedsantrag wurde erfolgreich übermittelt.'}
                </p>

                {formData.email && (
                  <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-4 text-left">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-primary-800">Bestätigungsmail versendet</p>
                        <p className="text-sm text-primary-700 mt-0.5">
                          An <strong>{formData.email}</strong> wurde eine Bestätigung geschickt.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'sepa' && emailStatus?.maskedIban && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-left">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-amber-800">SEPA-Mandat gespeichert</p>
                        <code className="block mt-1 text-amber-900 font-mono text-sm bg-white px-3 py-1.5 rounded">
                          {emailStatus.maskedIban}
                        </code>
                        <p className="text-xs text-amber-600 mt-1">
                          Der Beitrag wird erst eingezogen, wenn ein gültiges, unterschriebenes Mandat vorliegt.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-4 text-left">
                    <div className="flex items-start gap-3">
                      <Banknote className="w-5 h-5 text-cyan-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-cyan-800">Bitte überweisen Sie den Mitgliedsbeitrag</p>
                        <p className="text-xs text-cyan-700 mt-1 font-mono">
                          IBAN: {VEREINSKONTO.iban}<br />
                          Verwendungszweck: Mitgliedsbeitrag {formData.vorname} {formData.nachname}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {uploadedFile && (
                  <div className="bg-success-50 border border-success-200 rounded-xl p-4 mb-4 text-left">
                    <div className="flex items-center gap-3">
                      <FileIcon className="w-5 h-5 text-success-600 flex-shrink-0" />
                      <p className="text-sm text-success-800">
                        Dokument hochgeladen: <strong>{uploadedFile.name}</strong>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                  <button onClick={resetForm} className="btn-outline btn-sm">Weiteres Mitglied anmelden</button>
                  <button onClick={onClose}   className="btn-primary   btn-sm">Schließen</button>
                </div>
              </div>
            )}

            {/* ── Schritt 1: Beitrittserklärung ── */}
            {!submitted && currentStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); goNext() }} noValidate>
                <div className="space-y-5">

                  <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 text-sm text-primary-800">
                    <strong>Familienmitgliedschaft</strong> – Mindestbeitrag <strong>13 € / Jahr</strong>.
                    Nach oben keine Begrenzung, Spenden willkommen.
                  </div>

                  {/* Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      ['vorname',  'Vorname',  'Max',         true],
                      ['nachname', 'Nachname', 'Mustermann',  true],
                    ].map(([name, label, ph]) => (
                      <div key={name}>
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                          {label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text" id={name} name={name}
                          value={formData[name]} onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                          placeholder={ph}
                        />
                        <FieldError msg={errors[name]} />
                      </div>
                    ))}
                  </div>

                  {/* Adresse */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="strasse" className="block text-sm font-medium text-gray-700 mb-1">
                        Straße <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" id="strasse" name="strasse"
                        value={formData.strasse} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.strasse ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="Musterstraße"
                      />
                      <FieldError msg={errors.strasse} />
                    </div>
                    <div>
                      <label htmlFor="hausnummer" className="block text-sm font-medium text-gray-700 mb-1">Hausnr.</label>
                      <input
                        type="text" id="hausnummer" name="hausnummer"
                        value={formData.hausnummer} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="12a"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="plz" className="block text-sm font-medium text-gray-700 mb-1">
                        PLZ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" id="plz" name="plz"
                        value={formData.plz} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.plz ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="66333"
                      />
                      <FieldError msg={errors.plz} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-1">
                        Ort <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" id="ort" name="ort"
                        value={formData.ort} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.ort ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="Völklingen-Ludweiler"
                      />
                      <FieldError msg={errors.ort} />
                    </div>
                  </div>

                  {/* Kontakt */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-Mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="ihre@email.de"
                      />
                      <FieldError msg={errors.email} />
                    </div>
                    <div>
                      <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <input
                        type="tel" id="telefon" name="telefon"
                        value={formData.telefon} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="06898 / 12345"
                      />
                    </div>
                  </div>

                  {/* Jahresbeitrag */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jahresbeitrag <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {['13', '20', '30', '50'].map(amt => (
                        <button
                          key={amt} type="button"
                          onClick={() => setFormData(p => ({ ...p, beitrag: amt, customBeitrag: '' }))}
                          className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                            formData.beitrag === amt && !formData.customBeitrag
                              ? 'bg-primary-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {amt} €
                        </button>
                      ))}
                      <div className="relative">
                        <input
                          type="number" name="customBeitrag"
                          value={formData.customBeitrag}
                          onChange={(e) => setFormData(p => ({ ...p, customBeitrag: e.target.value, beitrag: 'other' }))}
                          className="w-32 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Andere" min="13"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">€</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Mindestbeitrag: 13 € / Jahr</p>
                  </div>

                  {/* Einmalige Spende */}
                  <div>
                    <label htmlFor="spende" className="block text-sm font-medium text-gray-700 mb-1">
                      Einmalige Spende (optional)
                    </label>
                    <div className="relative w-40">
                      <input
                        type="number" id="spende" name="spende"
                        value={formData.spende} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0" min="0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">€</span>
                    </div>
                  </div>

                  {/* Checkboxen */}
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${errors.satzungAkzeptiert ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="checkbox" name="satzungAkzeptiert"
                        checked={formData.satzungAkzeptiert} onChange={handleChange}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">
                        Ich erkenne die{' '}
                        <a href="/satzung.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          Satzung des Vereins
                        </a>
                        {' '}in der jeweils gültigen Fassung an. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <FieldError msg={errors.satzungAkzeptiert} />

                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${errors.datenschutzAkzeptiert ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="checkbox" name="datenschutzAkzeptiert"
                        checked={formData.datenschutzAkzeptiert} onChange={handleChange}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">
                        Ich habe die{' '}
                        <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          Datenschutzerklärung
                        </a>
                        {' '}gelesen und akzeptiere diese. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <FieldError msg={errors.datenschutzAkzeptiert} />
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <ErrorSummary errors={errors} />
                  <div className="flex justify-end pt-5 border-t border-gray-100">
                    <button type="submit" className="btn-primary inline-flex items-center gap-2">
                      Weiter zur Zahlungsart
                      <CreditCard className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* ── Schritt 2: Zahlungsart wählen ── */}
            {!submitted && currentStep === 2 && (
              <div>
                <p className="text-gray-600 mb-6 text-center">
                  Wie möchten Sie Ihren Mitgliedsbeitrag bezahlen?
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {/* SEPA-Karte */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sepa')}
                    className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all text-center ${
                      paymentMethod === 'sepa'
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    {paymentMethod === 'sepa' && (
                      <span className="absolute top-3 right-3 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                      Empfohlen
                    </span>
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mt-2">
                      <CreditCard className="w-7 h-7 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">SEPA-Lastschrift</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Automatischer jährlicher Einzug – bequem und sicher.
                      </p>
                    </div>
                  </button>

                  {/* Überweisung-Karte */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all text-center ${
                      paymentMethod === 'transfer'
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    {paymentMethod === 'transfer' && (
                      <span className="absolute top-3 right-3 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                    <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mt-2">
                      <Banknote className="w-7 h-7 text-cyan-700" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Selbstüberweisung</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Sie überweisen den Beitrag manuell an den Verein.
                      </p>
                    </div>
                  </button>
                </div>

                {!paymentMethod && (
                  <p className="text-center text-sm text-gray-400 mb-4">Bitte wählen Sie eine Zahlungsart.</p>
                )}

                <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                  <button type="button" onClick={goBack} className="btn-ghost inline-flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Zurück
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!paymentMethod}
                    className="btn-primary inline-flex items-center gap-2 disabled:opacity-40"
                  >
                    Weiter <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Schritt 3a: Selbstüberweisung ── */}
            {!submitted && currentStep === 3 && paymentMethod === 'transfer' && (
              <div className="space-y-6">

                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                  <p className="text-sm text-cyan-800 font-medium">
                    Bitte überweisen Sie den Mitgliedsbeitrag ({beitragValue} €/Jahr) an folgende Bankverbindung:
                  </p>
                </div>

                {/* Vereinskonto */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-gray-900">Vereinskonto</span>
                  </div>
                  <CopyField label="IBAN"           value={VEREINSKONTO.iban} />
                  <CopyField label="BIC"            value={VEREINSKONTO.bic} />
                  <CopyField label="Kreditinstitut" value={VEREINSKONTO.bank} />
                  <div className="pt-2">
                    <CopyField
                      label="Verwendungszweck"
                      value={`Mitgliedsbeitrag ${formData.vorname} ${formData.nachname}`}
                    />
                  </div>
                </div>

                {/* PDF herunterladen */}
                <div className="rounded-xl border border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary-600" />
                    Mitgliedsantrag als PDF herunterladen
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Laden Sie den Antrag herunter, unterschreiben Sie ihn (handschriftlich oder digital am
                    Handy / Laptop) und laden Sie ihn anschließend unten hoch.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    {isDownloading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Wird erstellt…</>
                    ) : pdfDownloaded ? (
                      <><CheckCircle className="w-4 h-4" /> Erneut herunterladen</>
                    ) : (
                      <><Download className="w-4 h-4" /> PDF herunterladen</>
                    )}
                  </button>
                  {pdfDownloaded && (
                    <div className="mt-3 flex items-center gap-2 text-success-700 text-sm">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      PDF heruntergeladen – Bestätigungsmail wurde versendet.
                    </div>
                  )}
                </div>

                {/* Upload */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-primary-600" />
                    Unterschriebenes Dokument hochladen
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Laden Sie das unterschriebene Formular hier hoch (PDF, JPG oder PNG).
                  </p>
                  <FileUploadArea
                    uploadedFile={uploadedFile}
                    onFileSelect={setUploadedFile}
                    onRemove={() => setUploadedFile(null)}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Alternativ per E-Mail an{' '}
                    <a href="mailto:grundschuleludweiler@schule.saarland" className="text-primary-600 hover:underline">
                      grundschuleludweiler@schule.saarland
                    </a>
                    {' '}oder über das Schulsekretariat einreichen.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                  <button type="button" onClick={goBack} className="btn-ghost inline-flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Zurück
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitTransfer}
                    disabled={isSubmitting}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Wird übermittelt…</>
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Antrag abschließen</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── Schritt 3b: SEPA-Mandat ── */}
            {!submitted && currentStep === 3 && paymentMethod === 'sepa' && (
              <form onSubmit={handleSubmitSEPA} noValidate>
                <div className="space-y-5">

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
                    <p className="font-semibold mb-1">SEPA-Basis-Lastschriftmandat</p>
                    <p>
                      Ich/Wir ermächtige(n) den Förderverein der Grundschule Ludweiler/Lauterbach e. V.
                      Zahlungen von meinem/unserem Konto mittels Lastschrift einzuziehen.
                      Zugleich weise(n) ich/wir mein/unser Kreditinstitut an, die gezogenen Lastschriften einzulösen.
                    </p>
                    <p className="mt-2 text-gray-500 italic">
                      Ich kann innerhalb von acht Wochen ab dem Belastungsdatum die Erstattung des Betrags verlangen.
                    </p>
                  </div>

                  {/* Kontoinhaber */}
                  <div>
                    <label htmlFor="kontoinhaber" className="block text-sm font-medium text-gray-700 mb-1">
                      Kontoinhaber <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" id="kontoinhaber" name="kontoinhaber"
                      value={formData.kontoinhaber} onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.kontoinhaber ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      placeholder="Vorname Nachname"
                    />
                    <FieldError msg={errors.kontoinhaber} />
                  </div>

                  {/* Abweichende Adresse */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="sepaStrasse" className="block text-sm font-medium text-gray-700 mb-1">
                        Straße (falls abweichend)
                      </label>
                      <input
                        type="text" id="sepaStrasse" name="sepaStrasse"
                        value={formData.sepaStrasse} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.strasse || 'Straße'}
                      />
                    </div>
                    <div>
                      <label htmlFor="sepaHausnummer" className="block text-sm font-medium text-gray-700 mb-1">Hausnr.</label>
                      <input
                        type="text" id="sepaHausnummer" name="sepaHausnummer"
                        value={formData.sepaHausnummer} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.hausnummer || 'Nr.'}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="sepaPlz" className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
                      <input
                        type="text" id="sepaPlz" name="sepaPlz"
                        value={formData.sepaPlz} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.plz || 'PLZ'}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="sepaOrt" className="block text-sm font-medium text-gray-700 mb-1">Ort</label>
                      <input
                        type="text" id="sepaOrt" name="sepaOrt"
                        value={formData.sepaOrt} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.ort || 'Ort'}
                      />
                    </div>
                  </div>

                  {/* Bankdaten */}
                  <div>
                    <label htmlFor="kreditinstitut" className="block text-sm font-medium text-gray-700 mb-1">
                      Kreditinstitut <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" id="kreditinstitut" name="kreditinstitut"
                      value={formData.kreditinstitut} onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.kreditinstitut ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      placeholder="z.B. Sparkasse Saarbrücken"
                    />
                    <FieldError msg={errors.kreditinstitut} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="iban" className="block text-sm font-medium text-gray-700 mb-1">
                        IBAN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" id="iban" name="iban"
                        value={formData.iban} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono ${errors.iban ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="DE12 3456 7890 1234 5678 90"
                      />
                      <FieldError msg={errors.iban} />
                    </div>
                    <div>
                      <label htmlFor="bic" className="block text-sm font-medium text-gray-700 mb-1">BIC (optional)</label>
                      <input
                        type="text" id="bic" name="bic"
                        value={formData.bic} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                        placeholder="SAKSDE55XXX"
                      />
                    </div>
                  </div>

                  {/* SEPA-Einwilligung */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${errors.sepaEinwilligung ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                      type="checkbox" name="sepaEinwilligung"
                      checked={formData.sepaEinwilligung} onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700">
                      Ich erteile hiermit das SEPA-Lastschriftmandat für den jährlichen Einzug des Mitgliedsbeitrags.{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <FieldError msg={errors.sepaEinwilligung} />

                  {/* ── Info-Block: SEPA-Mandat einreichen ── */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <h4 className="font-bold text-amber-900">SEPA-Mandat einreichen</h4>
                    </div>
                    <p className="text-amber-800">
                      Sie können das unterschriebene Mandat auf einem der folgenden Wege einreichen:
                    </p>

                    {/* PDF herunterladen */}
                    <div className="bg-white rounded-lg p-3 border border-amber-200">
                      <p className="font-semibold text-gray-800 mb-2">SEPA-Mandat als PDF herunterladen</p>
                      <p className="text-gray-500 text-xs mb-3">
                        Laden Sie das PDF herunter, unterschreiben Sie es digital (Handy / Tablet / Laptop) oder
                        drucken und unterschreiben Sie es handschriftlich.
                      </p>
                      <button
                        type="button"
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="btn-secondary btn-sm inline-flex items-center gap-2"
                      >
                        {isDownloading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Wird erstellt…</>
                        ) : pdfDownloaded ? (
                          <><CheckCircle className="w-4 h-4" /> Erneut herunterladen</>
                        ) : (
                          <><Download className="w-4 h-4" /> SEPA-Mandat herunterladen</>
                        )}
                      </button>
                      {pdfDownloaded && (
                        <p className="mt-2 text-xs text-success-700 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          PDF heruntergeladen – Bestätigungsmail wurde versandt.
                        </p>
                      )}
                    </div>

                    {/* Einreichungswege */}
                    <div className="space-y-2.5 text-amber-800">
                      <div>
                        <p className="font-semibold text-amber-900 mb-0.5">① Direkt online hochladen</p>
                        <p className="text-xs">
                          Laden Sie das unterschriebene SEPA-Mandat unten hoch.
                          Erlaubte Formate: PDF, JPG oder PNG.
                          Achten Sie darauf, dass alle Angaben gut lesbar und die Unterschrift vollständig sichtbar sind.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-amber-900 mb-0.5">② Per E-Mail</p>
                        <p className="text-xs">
                          Senden Sie das unterschriebene Mandat an:{' '}
                          <a href="mailto:grundschuleludweiler@schule.saarland" className="text-primary-700 hover:underline font-mono">
                            grundschuleludweiler@schule.saarland
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-amber-900 mb-0.5">③ Als Ausdruck</p>
                        <p className="text-xs">
                          Über das Sekretariat der Grundschule oder direkt beim Vorstand des Fördervereins.
                        </p>
                      </div>
                    </div>

                    {/* Wichtiger Hinweis */}
                    <div className="bg-amber-100 rounded-lg p-3 border border-amber-300 space-y-1.5">
                      <p className="font-bold text-amber-900 text-xs">Wichtiger Hinweis</p>
                      <p className="text-xs text-amber-800">
                        Der Mitgliedsbeitrag wird erst eingezogen, wenn dem Förderverein ein gültiges und
                        unterschriebenes SEPA-Basis-Lastschriftmandat vorliegt.
                      </p>
                      <p className="text-xs text-amber-800">
                        Mit dem SEPA-Mandat ermächtigen Sie den Förderverein, den Mitgliedsbeitrag von Ihrem
                        Konto einzuziehen. Sie können innerhalb von acht Wochen ab dem Belastungsdatum die
                        Erstattung des belasteten Betrages verlangen.
                      </p>
                      <p className="text-xs text-amber-800">
                        Der Online-Mitgliedsantrag wird an den Vorstand übermittelt. Die Mitgliedschaft
                        wird nach Prüfung und Bestätigung durch den Vorstand wirksam.
                      </p>
                    </div>
                  </div>

                  {/* Upload-Bereich */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary-600" />
                      Unterschriebenes SEPA-Mandat hochladen
                    </h4>
                    <FileUploadArea
                      uploadedFile={uploadedFile}
                      onFileSelect={setUploadedFile}
                      onRemove={() => setUploadedFile(null)}
                    />
                  </div>

                  {/* Pflicht-Checkbox */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${errors.mandatAck ? 'border-red-300 bg-red-50' : 'border-amber-300 bg-amber-50 hover:bg-amber-100'}`}>
                    <input
                      type="checkbox"
                      checked={mandatAck}
                      onChange={(e) => {
                        setMandatAck(e.target.checked)
                        if (errors.mandatAck) setErrors(p => ({ ...p, mandatAck: null }))
                      }}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs text-amber-900 leading-relaxed">
                      Ich habe zur Kenntnis genommen, dass für den Einzug des Mitgliedsbeitrags ein
                      unterschriebenes SEPA-Basis-Lastschriftmandat erforderlich ist. Ich kann das SEPA-Mandat
                      digital unterschreiben oder ausdrucken und handschriftlich unterschreiben.
                      Das unterschriebene Mandat kann ich direkt online hochladen, per E-Mail an den Verein
                      senden oder als Ausdruck einreichen.{' '}
                      <span className="text-red-600 font-semibold">*</span>
                    </span>
                  </label>
                  <FieldError msg={errors.mandatAck} />

                  {emailStatus && !emailStatus.success && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{emailStatus.message}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <ErrorSummary errors={errors} />
                  <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                  <button type="button" onClick={goBack} disabled={isSubmitting} className="btn-ghost inline-flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Zurück
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary inline-flex items-center gap-2">
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Wird übermittelt…</>
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Beitritt abschließen</>
                    )}
                  </button>
                </div>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
