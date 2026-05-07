import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Impressum() {
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

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Impressum</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Förderverein der Grundschule Ludweiler/Lauterbach – Standort Ludweiler e. V.<br />
              <span className="text-amber-600 text-sm">[Straße und Hausnummer bitte ergänzen]</span><br />
              66333 Völklingen (Ortsteil Ludweiler)<br />
              Saarland, Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Vertreten durch</h2>
            <p>
              Patrizia Sarda-Seewald (1. Vorsitzende)<br />
              Stephanie Höhn<br />
              Tamara Junker
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Kontakt</h2>
            <p>
              Telefon: <a href="tel:+4968983903780" className="text-primary-600 hover:underline">06898 / 3903780</a><br />
              E-Mail: <a href="mailto:grundschuleludweiler@schule.saarland" className="text-primary-600 hover:underline">grundschuleludweiler@schule.saarland</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Vereinsregister</h2>
            <p>
              Eingetragen im Vereinsregister beim Amtsgericht Saarbrücken<br />
              Registernummer: <span className="text-amber-600 text-sm">[Vereinsregister-Nummer bitte ergänzen]</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
