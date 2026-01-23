import { useState } from 'react'
import { UserPlus, Heart, HandHelping, Copy, Check, ArrowRight, FileText, CreditCard, Building2 } from 'lucide-react'
import { useSEPAForm } from '../App'

const contributionAmounts = [13, 20, 30]

export default function SoKoenntIhrHelfen() {
  const [selectedAmount, setSelectedAmount] = useState(13)
  const [customAmount, setCustomAmount] = useState('')
  const [additionalDonation, setAdditionalDonation] = useState(false)
  const [copiedField, setCopiedField] = useState(null)
  const [donationMethod, setDonationMethod] = useState('bank') // 'bank' or 'paypal'
  const { openSepaForm } = useSEPAForm()

  const bankDetails = {
    empfaenger: 'Förderverein GS Ludweiler-Lauterbach e.V.',
    iban: 'DE89 5905 0101 0006 7732 53',
    bic: 'SAKSDE55XXX',
    bank: 'Sparkasse Saarbrücken',
  }

  const paypalEmail = 'foerderverein-gs-ludweiler@email.de' // PayPal email - anpassen!

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <section
      id="mitmachen"
      className="section bg-gradient-section scroll-mt-header"
      aria-labelledby="so-koennt-ihr-helfen-heading"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="so-koennt-ihr-helfen-heading" className="heading-2 mb-4">
            So könnt ihr in 2 Minuten unterstützen
          </h2>
        </div>

        {/* Three Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Mitglied werden */}
          <article
            id="mitglied-werden"
            className="card p-6 md:p-8 border-2 border-primary-200 relative scroll-mt-header"
          >
            <div className="absolute -top-3 left-6">
              <span className="badge-primary">Beliebt</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-primary-600" aria-hidden="true" />
              </div>
              <h3 className="heading-3">Mitglied werden</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Schon mit einem kleinen Jahresbeitrag unterstützt ihr alle Kinder am Standort Ludweiler.
            </p>
            <div className="bg-success-50 border border-success-200 rounded-xl p-4 mb-6">
              <p className="font-semibold text-success-800">
                Mindestbeitrag: 13 € / Jahr
              </p>
              <p className="text-sm text-success-700">Familienmitgliedschaft</p>
            </div>

            {/* Amount Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Beitrag auswählen:
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {contributionAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount('')
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {amount} €
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Wunschbetrag"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(0)
                  }}
                  className="w-28 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="13"
                  aria-label="Eigenen Beitrag eingeben"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={additionalDonation}
                  onChange={(e) => setAdditionalDonation(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                Ich möchte zusätzlich einmalig spenden (optional)
              </label>
            </div>

            <button 
              onClick={openSepaForm}
              className="btn-primary w-full mb-3 inline-flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" aria-hidden="true" />
              Beitritt starten
            </button>
            <p className="microcopy text-center">
              Beitrittserklärung + SEPA-Mandat – online oder als PDF.
            </p>
          </article>

          {/* Card 2: Spenden */}
          <article
            id="spenden"
            className="card p-6 md:p-8 scroll-mt-header"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent-600" aria-hidden="true" />
              </div>
              <h3 className="heading-3">Spenden</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Einmalig oder zusätzlich zur Mitgliedschaft – jede Spende fließt in konkrete Projekte.
            </p>

            {/* Payment Method Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setDonationMethod('bank')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  donationMethod === 'bank'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Building2 className="w-4 h-4" aria-hidden="true" />
                Überweisung
              </button>
              <button
                onClick={() => setDonationMethod('paypal')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  donationMethod === 'paypal'
                    ? 'bg-[#0070ba] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CreditCard className="w-4 h-4" aria-hidden="true" />
                PayPal
              </button>
            </div>

            {donationMethod === 'bank' ? (
              <>
                {/* SEPA Bank Details */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary-600" aria-hidden="true" />
                    SEPA-Überweisung
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500 block">Empfänger</span>
                        <span className="font-medium text-gray-800 text-sm">{bankDetails.empfaenger}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bankDetails.empfaenger, 'empfaenger')}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        aria-label="Empfänger kopieren"
                      >
                        {copiedField === 'empfaenger' ? (
                          <Check className="w-4 h-4 text-success-600" aria-hidden="true" />
                        ) : (
                          <Copy className="w-4 h-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200">
                      <div>
                        <span className="text-xs text-gray-500 block">IBAN</span>
                        <span className="font-mono font-semibold text-gray-900">{bankDetails.iban}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bankDetails.iban.replace(/\s/g, ''), 'iban')}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        aria-label="IBAN kopieren"
                      >
                        {copiedField === 'iban' ? (
                          <Check className="w-4 h-4 text-success-600" aria-hidden="true" />
                        ) : (
                          <Copy className="w-4 h-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500 block">BIC</span>
                        <span className="font-mono font-medium text-gray-800">{bankDetails.bic}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bankDetails.bic, 'bic')}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        aria-label="BIC kopieren"
                      >
                        {copiedField === 'bic' ? (
                          <Check className="w-4 h-4 text-success-600" aria-hidden="true" />
                        ) : (
                          <Copy className="w-4 h-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500 block">Bank</span>
                        <span className="font-medium text-gray-800 text-sm">{bankDetails.bank}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 border border-primary-100 rounded-lg p-3 mb-4">
                  <p className="text-sm text-primary-800">
                    <strong>Verwendungszweck:</strong> Spende – Name (optional)
                  </p>
                </div>

                <p className="microcopy text-center mb-4">
                  Einfach per Online-Banking überweisen – IBAN kopieren und los!
                </p>
              </>
            ) : (
              <>
                {/* PayPal */}
                <div className="bg-[#f5f7fa] rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#003087" aria-hidden="true">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.654h6.207c2.048 0 3.478.456 4.25 1.355.726.847.947 1.99.66 3.398-.007.039-.018.077-.024.116-.009.046-.017.092-.027.137-.295 1.498-.96 2.773-1.978 3.792-1.147 1.147-2.732 1.73-4.707 1.73H7.942l-.866 7.743zm4.67-11.906c-.097.54-.314.957-.643 1.235-.375.319-.854.479-1.424.479H8.534l.552-4.936h1.17c.686 0 1.169.146 1.433.433.262.286.345.733.247 1.329l-.19 1.46z"/>
                      <path d="M23.178 7.39c0 .033-.003.066-.005.099l-.003.024c-.326 2.131-1.439 3.818-3.306 5.017-1.713 1.1-3.972 1.658-6.716 1.658h-.64l-.751 4.773a.639.639 0 0 1-.631.532H8.09l-.077.686a.641.641 0 0 0 .633.74h3.607a.772.772 0 0 0 .762-.654l.031-.166.601-3.81.039-.21a.772.772 0 0 1 .762-.654h.48c3.107 0 5.541-.796 7.031-2.504 1.286-1.475 1.792-3.467 1.517-5.949a4.368 4.368 0 0 0-.298-1.582z" fill="#0070ba"/>
                    </svg>
                    <span className="font-semibold text-[#003087]">PayPal</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Schnell und sicher mit PayPal spenden
                  </p>
                  <a
                    href={`https://www.paypal.com/donate?business=${encodeURIComponent(paypalEmail)}&currency_code=EUR&item_name=${encodeURIComponent('Spende Förderverein GS Ludweiler')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0070ba] hover:bg-[#003087] text-white font-semibold rounded-xl transition-colors"
                  >
                    <CreditCard className="w-5 h-5" aria-hidden="true" />
                    Mit PayPal spenden
                  </a>
                </div>
                <p className="microcopy text-center mb-4">
                  Du wirst zu PayPal weitergeleitet.
                </p>
              </>
            )}

            <p className="microcopy text-center">
              Jede Spende hilft – auch einmalig. ❤️
            </p>
          </article>

          {/* Card 3: Mitmachen */}
          <article className="card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                <HandHelping className="w-6 h-6 text-success-600" aria-hidden="true" />
              </div>
              <h3 className="heading-3">Mitmachen</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Zeit, Ideen oder Unterstützung bei Aktionen – wir freuen uns über Hilfe.
            </p>

            {/* Volunteer Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-success-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Flexibel helfen</p>
                  <p className="text-sm text-gray-500">Auch kleine Hilfe zählt (30–60 Minuten)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-success-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Ideen einbringen</p>
                  <p className="text-sm text-gray-500">Eure Vorschläge sind willkommen</p>
                </div>
              </div>
            </div>

            <a
              href="#kontakt"
              className="btn-outline w-full inline-flex items-center justify-center gap-2 group"
            >
              Mitmachformular öffnen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <p className="mt-3 microcopy text-center">
              Auch kleine Hilfe zählt.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
