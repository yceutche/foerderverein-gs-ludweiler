import { BookOpen, Puzzle, Calendar, ArrowRight, Lightbulb } from 'lucide-react'

const projects = [
  {
    icon: BookOpen,
    title: 'Neue Bücher für die Schulbibliothek',
    status: 'Laufend',
    statusColor: 'badge-success',
    description: 'Erweiterung des Leseangebots für alle Klassenstufen',
    progress: 65,
  },
  {
    icon: Puzzle,
    title: 'Spiel- & Pausenangebote',
    status: 'In Planung',
    statusColor: 'badge-primary',
    description: 'Neue Spielmöglichkeiten für die Pausenzeit',
    progress: 30,
  },
  {
    icon: Calendar,
    title: 'Unterstützung für Veranstaltungen',
    status: 'Aktiv',
    statusColor: 'badge-accent',
    description: 'Finanzierung von Schulfesten und Ausflügen',
    progress: 80,
  },
]

export default function AktuelleProjekte() {
  return (
    <section
      className="section bg-white scroll-mt-header"
      aria-labelledby="aktuelle-projekte-heading"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="aktuelle-projekte-heading" className="heading-2 mb-4">
            Aktuelle Projekte & nächste Ziele
          </h2>
          <p className="text-lg text-gray-600">
            Hier seht ihr, woran wir gerade arbeiten.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <article
              key={index}
              className="card-bordered p-6 hover:border-primary-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <project.icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <span className={project.statusColor}>{project.status}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{project.description}</p>
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fortschritt</span>
                  <span className="font-medium text-primary-600">{project.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                    role="progressbar"
                    aria-valuenow={project.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Projektfortschritt: ${project.progress}%`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-100">
            <div className="w-12 h-12 bg-white rounded-xl shadow-soft flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent-500" aria-hidden="true" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-gray-900 mb-1">Ihr habt eine Idee?</p>
              <p className="text-sm text-gray-600">Schreibt uns – wir prüfen das gemeinsam.</p>
            </div>
            <a
              href="#kontakt"
              className="btn-outline inline-flex items-center gap-2 group whitespace-nowrap"
            >
              Projekt vorschlagen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
