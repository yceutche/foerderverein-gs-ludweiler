import { Target, Sparkles, Users, ArrowRight, Check } from 'lucide-react'

const transparencyPoints = [
  {
    icon: Target,
    text: 'Unterstützung fließt in Projekte, Materialien und Aktionen für die Kinder',
  },
  {
    icon: Sparkles,
    text: 'Finanzierung von Dingen, die den Schulalltag direkt verbessern',
  },
  {
    icon: Users,
    text: 'Entscheidungen im Verein werden gemeinsam abgestimmt',
  },
]

const vorstand = [
  'Patricia Sarda-Seewald',
  'Stephanie Höhn',
  'Tamara Junker',
]

export default function Transparenz() {
  return (
    <section
      className="section-tight bg-gradient-to-br from-primary-600 to-primary-800 text-white scroll-mt-header"
      aria-labelledby="transparenz-heading"
    >
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 id="transparenz-heading" className="heading-2 text-white mb-4">
              Wo eure Unterstützung ankommt
            </h2>
          </div>

          {/* Transparency Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {transparencyPoints.map((point, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <point.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <p className="text-white/90 font-medium">{point.text}</p>
              </div>
            ))}
          </div>

          {/* Board Members */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Vorstand des Fördervereins
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {vorstand.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full"
                >
                  <Check className="w-4 h-4 text-success-300" aria-hidden="true" />
                  <span className="text-white/90">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Link */}
          <div className="text-center">
            <a
              href="#ueber-uns"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors group"
            >
              Mehr über den Verein
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
