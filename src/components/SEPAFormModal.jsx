import { useState } from 'react'
import { X, FileText, Download, CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react'
import { sendFormSubmissionEmails, maskIBAN } from '../services/emailService'

export default function SEPAFormModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailStatus, setEmailStatus] = useState(null)
  const [formData, setFormData] = useState({
    // Beitrittserklärung
    vorname: '',
    nachname: '',
    strasse: '',
    hausnummer: '',
    plz: '',
    ort: '',
    email: '',
    telefon: '',
    beitrag: '13',
    customBeitrag: '',
    spende: '',
    
    // SEPA-Mandat
    kontoinhaber: '',
    sepaStrasse: '',
    sepaHausnummer: '',
    sepaPlz: '',
    sepaOrt: '',
    iban: '',
    bic: '',
    kreditinstitut: '',
    
    // Checkboxes
    satzungAkzeptiert: false,
    datenschutzAkzeptiert: false,
    sepaEinwilligung: false,
  })
  
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.vorname.trim()) newErrors.vorname = 'Bitte Vornamen eingeben'
    if (!formData.nachname.trim()) newErrors.nachname = 'Bitte Nachnamen eingeben'
    if (!formData.strasse.trim()) newErrors.strasse = 'Bitte Straße eingeben'
    if (!formData.plz.trim()) newErrors.plz = 'Bitte PLZ eingeben'
    if (!formData.ort.trim()) newErrors.ort = 'Bitte Ort eingeben'
    if (!formData.satzungAkzeptiert) newErrors.satzungAkzeptiert = 'Bitte Satzung akzeptieren'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.kontoinhaber.trim()) newErrors.kontoinhaber = 'Bitte Kontoinhaber eingeben'
    if (!formData.iban.trim()) newErrors.iban = 'Bitte IBAN eingeben'
    if (!formData.kreditinstitut.trim()) newErrors.kreditinstitut = 'Bitte Kreditinstitut eingeben'
    if (!formData.sepaEinwilligung) newErrors.sepaEinwilligung = 'Bitte SEPA-Einwilligung erteilen'
    if (!formData.datenschutzAkzeptiert) newErrors.datenschutzAkzeptiert = 'Bitte Datenschutz akzeptieren'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep2()) {
      setIsSubmitting(true)
      setEmailStatus(null)
      
      try {
        // Prepare data for email service
        const emailData = {
          vorname: formData.vorname,
          nachname: formData.nachname,
          strasse: `${formData.strasse} ${formData.hausnummer}`.trim(),
          plz: formData.plz,
          ort: formData.ort,
          email: formData.email,
          telefon: formData.telefon,
          beitrag: parseInt(formData.beitrag === 'other' ? formData.customBeitrag : formData.beitrag),
          zusatzSpende: formData.spende ? parseInt(formData.spende) : 0,
          kontoinhaber: formData.kontoinhaber,
          iban: formData.iban.replace(/\s/g, ''),
          bic: formData.bic,
          kreditinstitut: formData.kreditinstitut,
        }
        
        // Send emails
        const result = await sendFormSubmissionEmails(emailData)
        
        if (result.success) {
          setEmailStatus({
            success: true,
            maskedIban: maskIBAN(formData.iban)
          })
          setSubmitted(true)
        } else {
          setEmailStatus({
            success: false,
            message: 'E-Mail-Versand fehlgeschlagen. Bitte versuche es erneut.'
          })
        }
      } catch (error) {
        console.error('Submit error:', error)
        setEmailStatus({
          success: false,
          message: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      vorname: '',
      nachname: '',
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      email: '',
      telefon: '',
      beitrag: '13',
      customBeitrag: '',
      spende: '',
      kontoinhaber: '',
      sepaStrasse: '',
      sepaHausnummer: '',
      sepaPlz: '',
      sepaOrt: '',
      iban: '',
      bic: '',
      kreditinstitut: '',
      satzungAkzeptiert: false,
      datenschutzAkzeptiert: false,
      sepaEinwilligung: false,
    })
    setCurrentStep(1)
    setSubmitted(false)
    setErrors({})
    setEmailStatus(null)
    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="sepa-form-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" aria-hidden="true" />
              </div>
              <div>
                <h2 id="sepa-form-title" className="text-xl font-bold text-gray-900">
                  Beitrittserklärung & SEPA-Mandat
                </h2>
                <p className="text-sm text-gray-500">
                  Förderverein der Grundschule Ludweiler-Lauterbach
                </p>
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

          {/* Progress Steps */}
          {!submitted && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                  }`}>
                    1
                  </div>
                  <span className="font-medium hidden sm:inline">Beitrittserklärung</span>
                </div>
                <div className={`flex-1 h-1 mx-4 rounded ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} />
                <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                  }`}>
                    2
                  </div>
                  <span className="font-medium hidden sm:inline">SEPA-Mandat</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {submitted ? (
              /* Success Message */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Vielen Dank für Deinen Beitritt! 🎉
                </h3>
                <p className="text-gray-600 mb-4">
                  Deine Beitrittserklärung wurde erfolgreich übermittelt.
                </p>
                
                {/* Email Confirmation */}
                <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-4 text-left">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary-800 mb-1">
                        Bestätigung versendet
                      </h4>
                      <p className="text-sm text-primary-700">
                        Eine Bestätigung wurde an <strong>{formData.email}</strong> gesendet.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* IBAN Info (masked for security) */}
                {emailStatus?.maskedIban && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🔐</span>
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-1">
                          SEPA-Mandat erteilt
                        </h4>
                        <p className="text-sm text-amber-700 mb-2">
                          Deine IBAN (zur Sicherheit gekürzt):
                        </p>
                        <code className="bg-white px-3 py-2 rounded-lg text-amber-900 font-mono text-sm block">
                          {emailStatus.maskedIban}
                        </code>
                        <p className="text-xs text-amber-600 mt-2">
                          Die vollständige IBAN ist sicher beim Förderverein gespeichert.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetForm}
                    className="btn-outline"
                  >
                    Weitere Anmeldung
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Schließen
                  </button>
                </div>
              </div>
            ) : currentStep === 1 ? (
              /* Step 1: Beitrittserklärung */
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <div className="space-y-6">
                  {/* Info Box */}
                  <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
                    <p className="text-sm text-primary-800">
                      <strong>Hinweis:</strong> Die Mitgliedschaft ist eine <strong>Familienmitgliedschaft</strong>. 
                      Der Mindestbeitrag beträgt <strong>13 € pro Jahr</strong>. 
                      Nach oben gibt es keine Grenzen – auch einmalige Spenden sind willkommen.
                    </p>
                  </div>

                  {/* Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vorname" className="block text-sm font-medium text-gray-700 mb-1">
                        Vorname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="vorname"
                        name="vorname"
                        value={formData.vorname}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${
                          errors.vorname ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Max"
                      />
                      {errors.vorname && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.vorname}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="nachname" className="block text-sm font-medium text-gray-700 mb-1">
                        Nachname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nachname"
                        name="nachname"
                        value={formData.nachname}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${
                          errors.nachname ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Mustermann"
                      />
                      {errors.nachname && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.nachname}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="strasse" className="block text-sm font-medium text-gray-700 mb-1">
                        Straße <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="strasse"
                        name="strasse"
                        value={formData.strasse}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${
                          errors.strasse ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Musterstraße"
                      />
                      {errors.strasse && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.strasse}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="hausnummer" className="block text-sm font-medium text-gray-700 mb-1">
                        Hausnr.
                      </label>
                      <input
                        type="text"
                        id="hausnummer"
                        name="hausnummer"
                        value={formData.hausnummer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
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
                        type="text"
                        id="plz"
                        name="plz"
                        value={formData.plz}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${
                          errors.plz ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="66333"
                      />
                      {errors.plz && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.plz}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-1">
                        Ort <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="ort"
                        name="ort"
                        value={formData.ort}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${
                          errors.ort ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Völklingen-Ludweiler"
                      />
                      {errors.ort && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.ort}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                        placeholder="ihre@email.de"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="telefon"
                        name="telefon"
                        value={formData.telefon}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                        placeholder="06898/1234567"
                      />
                    </div>
                  </div>

                  {/* Beitrag */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Jahresbeitrag <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['13', '20', '30', '50'].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, beitrag: amount, customBeitrag: '' }))
                          }}
                          className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                            formData.beitrag === amount && !formData.customBeitrag
                              ? 'bg-primary-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {amount} €
                        </button>
                      ))}
                      <div className="relative">
                        <input
                          type="number"
                          name="customBeitrag"
                          value={formData.customBeitrag}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, customBeitrag: e.target.value, beitrag: '' }))
                          }}
                          className="w-32 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Andere"
                          min="13"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Mindestbeitrag: 13 € / Jahr</p>
                  </div>

                  {/* Optional Spende */}
                  <div>
                    <label htmlFor="spende" className="block text-sm font-medium text-gray-700 mb-1">
                      Einmalige Spende (optional)
                    </label>
                    <div className="relative w-40">
                      <input
                        type="number"
                        id="spende"
                        name="spende"
                        value={formData.spende}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    </div>
                  </div>

                  {/* Satzung Checkbox */}
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      errors.satzungAkzeptiert ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        name="satzungAkzeptiert"
                        checked={formData.satzungAkzeptiert}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                      />
                      <span className="text-sm text-gray-700">
                        Mit meiner Unterschrift erkenne ich die <a href="/satzung.pdf" target="_blank" className="text-primary-600 hover:underline">Satzung des Vereins</a> in der jeweils gültigen Fassung an. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.satzungAkzeptiert && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.satzungAkzeptiert}
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                  <a
                    href="/beitrittserklaerung.pdf"
                    download
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    PDF herunterladen
                  </a>
                  <button type="submit" className="btn-primary">
                    Weiter zu SEPA-Mandat
                  </button>
                </div>
              </form>
            ) : (
              /* Step 2: SEPA-Mandat */
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* SEPA Info */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">SEPA-Basis-Lastschriftmandat</h3>
                    <p className="text-sm text-gray-600">
                      Ich/Wir ermächtige(n) den Förderverein der Grundschule Ludweiler/Lauterbach 
                      Standort Ludweiler e. V. Zahlungen von meinem/unserem Konto mittels Lastschrift 
                      einzuziehen. Zugleich weise(n) ich/wir mein/unser Kreditinstitut an, die vom 
                      Verein auf mein/unser Konto gezogenen Lastschriften einzulösen.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>Hinweis:</strong> Ich kann/Wir können innerhalb von acht Wochen, 
                      beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrags verlangen.
                    </p>
                  </div>

                  {/* Kontoinhaber */}
                  <div>
                    <label htmlFor="kontoinhaber" className="block text-sm font-medium text-gray-700 mb-1">
                      Kontoinhaber/Zahlungspflichtiger <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="kontoinhaber"
                      name="kontoinhaber"
                      value={formData.kontoinhaber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${
                        errors.kontoinhaber ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Vorname Nachname"
                    />
                    {errors.kontoinhaber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.kontoinhaber}
                      </p>
                    )}
                  </div>

                  {/* SEPA Address (if different) */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="sepaStrasse" className="block text-sm font-medium text-gray-700 mb-1">
                        Straße (falls abweichend)
                      </label>
                      <input
                        type="text"
                        id="sepaStrasse"
                        name="sepaStrasse"
                        value={formData.sepaStrasse}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.strasse || 'Straße'}
                      />
                    </div>
                    <div>
                      <label htmlFor="sepaHausnummer" className="block text-sm font-medium text-gray-700 mb-1">
                        Hausnr.
                      </label>
                      <input
                        type="text"
                        id="sepaHausnummer"
                        name="sepaHausnummer"
                        value={formData.sepaHausnummer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.hausnummer || 'Nr.'}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="sepaPlz" className="block text-sm font-medium text-gray-700 mb-1">
                        PLZ
                      </label>
                      <input
                        type="text"
                        id="sepaPlz"
                        name="sepaPlz"
                        value={formData.sepaPlz}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.plz || 'PLZ'}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="sepaOrt" className="block text-sm font-medium text-gray-700 mb-1">
                        Ort
                      </label>
                      <input
                        type="text"
                        id="sepaOrt"
                        name="sepaOrt"
                        value={formData.sepaOrt}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={formData.ort || 'Ort'}
                      />
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div>
                    <label htmlFor="kreditinstitut" className="block text-sm font-medium text-gray-700 mb-1">
                      Kreditinstitut <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="kreditinstitut"
                      name="kreditinstitut"
                      value={formData.kreditinstitut}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow ${
                        errors.kreditinstitut ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="z.B. Sparkasse Saarbrücken"
                    />
                    {errors.kreditinstitut && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.kreditinstitut}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="iban" className="block text-sm font-medium text-gray-700 mb-1">
                        IBAN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="iban"
                        name="iban"
                        value={formData.iban}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow font-mono ${
                          errors.iban ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="DE12 3456 7890 1234 5678 90"
                      />
                      {errors.iban && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.iban}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bic" className="block text-sm font-medium text-gray-700 mb-1">
                        BIC (optional)
                      </label>
                      <input
                        type="text"
                        id="bic"
                        name="bic"
                        value={formData.bic}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                        placeholder="SAKSDE55XXX"
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      errors.sepaEinwilligung ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        name="sepaEinwilligung"
                        checked={formData.sepaEinwilligung}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                      />
                      <span className="text-sm text-gray-700">
                        Ich erteile hiermit das SEPA-Lastschriftmandat für den jährlichen Einzug des Mitgliedsbeitrags. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.sepaEinwilligung && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.sepaEinwilligung}
                      </p>
                    )}

                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      errors.datenschutzAkzeptiert ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        name="datenschutzAkzeptiert"
                        checked={formData.datenschutzAkzeptiert}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                      />
                      <span className="text-sm text-gray-700">
                        Ich habe die <a href="/datenschutz" target="_blank" className="text-primary-600 hover:underline">Datenschutzerklärung</a> gelesen und akzeptiere diese. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.datenschutzAkzeptiert && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.datenschutzAkzeptiert}
                      </p>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {emailStatus && !emailStatus.success && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">{emailStatus.message}</span>
                    </div>
                  </div>
                )}

                {/* Step 2 Actions */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-ghost"
                    disabled={isSubmitting}
                  >
                    Zurück
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary inline-flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      'Beitritt abschließen'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
