import { PartyPopper, Sparkles, ArrowRight, Users, Music, Award, BookOpen, ShieldCheck } from 'lucide-react'

const events = [
  {
    icon: PartyPopper,
    title: 'Abschlussfeier der vierten Klassen',
    description: 'Ein unvergesslicher Abschied für unsere Großen',
  },
  {
    icon: Sparkles,
    title: 'Adventsbegegnung',
    description: 'Gemeinsames Feiern in der Vorweihnachtszeit',
  },
]

const zweckItems = [
  {
    icon: BookOpen,
    title: 'Bildung & Erziehung',
    description: 'Förderung von Kinder- und Jugendbildung sowie Erziehung an unserer Schule',
  },
  {
    icon: Music,
    title: 'Projekte & Kultur',
    description: 'Sportliche, musische und kulturelle Schulprojekte – wir machen sie möglich',
  },
  {
    icon: Users,
    title: 'Elternhaus & Schule',
    description: 'Wir stärken die Zusammenarbeit zwischen Familien und Lehrkräften',
  },
  {
    icon: Award,
    title: 'Auszeichnungen',
    description: 'Anerkennung besonderer schulischer, sportlicher und sozialer Leistungen',
  },
]

export default function WirOrganisieren() {
  return (
    <section
      id="ueber-uns"
      className="section bg-white scroll-mt-header"
      aria-labelledby="wir-organisieren-heading"
    >
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">

          {/* Über uns Intro */}
          <div className="text-center mb-10">
            <h2 id="wir-organisieren-heading" className="heading-2 mb-4">
              Wer wir sind
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wir sind der <strong>Förderverein der Grundschule Ludweiler-Lauterbach e.V.</strong> –
              ein eingetragener gemeinnütziger Verein mit Sitz in 66333 Völklingen-Ludweiler.
              Unser Ziel: die Bildung, Erziehung und Gemeinschaft unserer Kinder direkt vor Ort stärken.
            </p>
          </div>

          {/* Trust-Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-sm text-primary-700">
              <ShieldCheck className="w-4 h-4 text-primary-600" aria-hidden="true" />
              Selbstlos tätig · Gemeinnützig anerkannt · VR 837 · Amtsgericht Saarbrücken
            </div>
          </div>

          {/* Satzungszweck – 4 Säulen */}
          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {zweckItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-14" />

          {/* Gemeinsamkeit – Events */}
          <div className="text-center mb-10">
            <h3 className="heading-3 mb-3">Gemeinsamkeit gehört dazu</h3>
            <p className="text-gray-600">
              Neben finanzieller Unterstützung helfen wir auch organisatorisch –
              damit Erlebnisse bleiben.
            </p>
          </div>

          {/* Events Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {events.map((event, index) => (
              <article
                key={index}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8 border border-primary-100"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-soft flex items-center justify-center mb-6">
                    <event.icon className="w-7 h-7 text-primary-600" aria-hidden="true" />
                  </div>
                  <h3 className="heading-3 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
                {/* Decorative element */}
                <div
                  className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/50 rounded-full blur-2xl"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#mitmachen"
              className="btn-outline inline-flex items-center gap-2 group"
            >
              Ich möchte mithelfen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
