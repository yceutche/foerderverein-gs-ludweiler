import { User, Phone, Mail, Send } from 'lucide-react'

export default function Kontakt() {
  return (
    <section
      id="kontakt"
      className="section bg-white scroll-mt-header"
      aria-labelledby="kontakt-heading"
    >
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 id="kontakt-heading" className="heading-2 mb-4">
              Kontakt
            </h2>
          </div>

          {/* Contact Card */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact Info */}
            <div className="card-bordered p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ansprechpartnerin</p>
                  <p className="text-xl font-semibold text-gray-900">
                    Frau Patrizia Sarda-Seewald
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+4968983903780"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Phone className="w-5 h-5 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="font-semibold text-gray-900">06898/3903780</p>
                  </div>
                </a>

                <a
                  href="mailto:grundschuleludweiler@schule.saarland"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Mail className="w-5 h-5 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-Mail</p>
                    <p className="font-semibold text-gray-900 break-all">
                      grundschuleludweiler@schule.saarland
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-6">
                <a
                  href="mailto:grundschuleludweiler@schule.saarland"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  E-Mail schreiben
                </a>
                <p className="mt-3 microcopy text-center">
                  Antwort in der Regel zeitnah (ehrenamtlich).
                </p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="card-bordered p-8">
              <h3 className="heading-3 mb-6">Schnellkontakt</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    placeholder="Euer Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    placeholder="eure@email.de"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Betreff
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    required
                  >
                    <option value="">Bitte auswählen...</option>
                    <option value="mitgliedschaft">Frage zur Mitgliedschaft</option>
                    <option value="spende">Frage zu Spenden</option>
                    <option value="mitmachen">Ich möchte mitmachen</option>
                    <option value="projekt">Projektvorschlag</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none"
                    placeholder="Eure Nachricht an uns..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" aria-hidden="true" />
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
