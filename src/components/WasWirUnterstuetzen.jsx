import {
  Package,
  Cookie,
  Croissant,
  Award,
  Bus,
  Camera,
  BookOpen,
  ArrowRight,
} from 'lucide-react'

const supportItems = [
  {
    icon: Package,
    title: 'Spielkisten für die 1. Klassen',
    description: 'Gemeinschaftsspiele zum Schulbeginn',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: Cookie,
    title: 'Weckmänner für alle Kinder',
    description: 'Nikolaustag-Tradition',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    icon: Croissant,
    title: 'Frühstück zum Tag der deutsch-französischen Freundschaft',
    description: 'Galettes des rois & frisches Baguette',
    color: 'bg-success-100 text-success-600',
  },
  {
    icon: Award,
    title: 'Buchgutscheine',
    description: 'Für Sieger*innen des Schullesewettbewerbs',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: Bus,
    title: 'Buskosten',
    description: 'Für verschiedene Veranstaltungen',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    icon: Camera,
    title: 'Klassenfotos',
    description: 'In Klasse 1 und 4',
    color: 'bg-success-100 text-success-600',
  },
  {
    icon: BookOpen,
    title: 'Bücher für die Schulbibliothek',
    description: 'Regelmäßige Erweiterung',
    color: 'bg-primary-100 text-primary-600',
  },
]

export default function WasWirUnterstuetzen() {
  return (
    <section
      id="was-wir-foerdern"
      className="section bg-gradient-section scroll-mt-header"
      aria-labelledby="was-wir-foerdern-heading"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="was-wir-foerdern-heading" className="heading-2 mb-4">
            Was eure Unterstützung möglich macht
          </h2>
          <p className="text-lg text-gray-600">
            Mit euren Beiträgen finanzieren wir Dinge, die den Schulalltag bereichern –
            von Gemeinschaftsaktionen bis zu Materialien.
          </p>
        </div>

        {/* Support Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-12">
          {supportItems.map((item, index) => (
            <article
              key={index}
              className="card-bordered p-6 hover:border-primary-200 transition-colors group"
            >
              <div
                className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </article>
          ))}
        </div>

        {/* Mini CTA */}
        <div className="text-center">
          <a
            href="#mitglied-werden"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Mitglied werden ab 13 €/Jahr
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
          <p className="mt-3 microcopy">
            Jeder Beitrag hilft – nach oben gibt es keine Grenzen.
          </p>
        </div>
      </div>
    </section>
  )
}
