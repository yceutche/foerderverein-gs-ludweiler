import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Datenschutz() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <div className="container-wide max-w-3xl py-12 md:py-16">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-gray-500 mb-8">Stand: April 2026</p>

        <div className="space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Förderverein der Grundschule Ludweiler/Lauterbach – Standort Ludweiler e. V.<br />
              Vertreten durch: Patrizia Sarda-Seewald (1. Vorsitzende)<br />
              E-Mail: <a href="mailto:grundschuleludweiler@schule.saarland" className="text-primary-600 hover:underline">grundschuleludweiler@schule.saarland</a><br />
              Telefon: 06898 / 3903780
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p className="mb-3">
              Wir erheben personenbezogene Daten nur, wenn Sie uns diese im Rahmen der Nutzung dieser Website freiwillig mitteilen. Dies betrifft insbesondere:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Das <strong>Kontaktformular</strong>: Name und E-Mail-Adresse zur Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li>Das <strong>SEPA-Mitgliedsantrag-Formular</strong>: Name, Adresse, IBAN und weitere zur Mitgliedschaft erforderliche Angaben (Art. 6 Abs. 1 lit. b DSGVO)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Zweck der Datenverarbeitung</h2>
            <p>
              Die erhobenen Daten werden ausschließlich für die Bearbeitung Ihrer Anfrage bzw. die Verwaltung der Vereinsmitgliedschaft verwendet. Eine Weitergabe an Dritte erfolgt nicht, es sei denn, dies ist zur Vertragserfüllung erforderlich (z. B. Bankverbindung für SEPA-Lastschrift).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Speicherdauer</h2>
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen (z. B. steuerrechtliche Aufbewahrungsfristen von bis zu 10 Jahren).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Hosting & Technischer Betrieb</h2>
            <p className="mb-3">
              Diese Website wird gehostet bei:
            </p>
            <p className="mb-3">
              <strong>Cloudflare Pages</strong><br />
              Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA<br />
              Datenschutzerklärung: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">cloudflare.com/privacypolicy</a>
            </p>
            <p>
              Beim Aufruf der Website werden durch den Hosting-Anbieter automatisch Server-Logfiles erfasst (IP-Adresse, Browser, Betriebssystem, Uhrzeit). Diese Daten werden nicht mit anderen Daten zusammengeführt und dienen ausschließlich der technischen Sicherstellung des Betriebs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Schriftarten (Google Fonts)</h2>
            <p>
              Diese Website lädt Schriftarten von Google Fonts (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Dabei wird Ihre IP-Adresse an Google übermittelt. Die Einbindung erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen Darstellung). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies</h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies und keine Analyse-Tools. Es wird lediglich ein technisch notwendiger Session-Speicher (sessionStorage) verwendet, um den Zugangsstatus auf der Website zu speichern.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Ihre Rechte</h2>
            <p className="mb-3">Sie haben das Recht auf:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Auskunft</strong> (Art. 15 DSGVO) über Ihre bei uns gespeicherten Daten</li>
              <li><strong>Berichtigung</strong> (Art. 16 DSGVO) unrichtiger Daten</li>
              <li><strong>Löschung</strong> (Art. 17 DSGVO) Ihrer Daten</li>
              <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruch</strong> (Art. 21 DSGVO) gegen die Verarbeitung</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:grundschuleludweiler@schule.saarland" className="text-primary-600 hover:underline">grundschuleludweiler@schule.saarland</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Beschwerderecht</h2>
            <p>
              Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:<br /><br />
              Unabhängiges Datenschutzzentrum Saarland<br />
              Fritz-Dobisch-Straße 12, 66111 Saarbrücken<br />
              <a href="https://www.datenschutz.saarland.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.datenschutz.saarland.de</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
