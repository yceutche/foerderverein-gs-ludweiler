import { PartyPopper, Sparkles, ArrowRight } from 'lucide-react'

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

export default function WirOrganisieren() {
  return (
    <section
      id="ueber-uns"
      className="section bg-white scroll-mt-header"
      aria-labelledby="wir-organisieren-heading"
    >
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 id="wir-organisieren-heading" className="heading-2 mb-4">
              Gemeinsamkeit gehört dazu
            </h2>
            <p className="text-lg text-gray-600">
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
