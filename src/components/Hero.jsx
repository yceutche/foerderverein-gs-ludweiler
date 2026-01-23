import { BookOpen, Users, Heart, ArrowRight } from 'lucide-react'

const benefits = [
  {
    icon: BookOpen,
    text: 'Mehr Möglichkeiten im Schulalltag (Materialien, Bücher, Projekte)',
  },
  {
    icon: Users,
    text: 'Gemeinschaft stärken (Feste, Aktionen, Zusammenhalt)',
  },
  {
    icon: Heart,
    text: 'Schnelle Hilfe, die ankommt (unkompliziert & vor Ort)',
  },
]

export default function Hero() {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-600">
                Aktiv für unsere Kinder in Ludweiler
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="heading-1 mb-6 animate-slide-up">
              Gemeinsam machen wir Schule in Ludweiler{' '}
              <span className="text-gradient">noch besser.</span>
            </h1>

            {/* Subline */}
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-100">
              Der Förderverein unterstützt Projekte, Materialien und Aktionen an der
              Grundschule Ludweiler/Lauterbach – Standort Ludweiler.{' '}
              <strong className="text-gray-700">Direkt, lokal und für alle Kinder.</strong>
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-10 animate-slide-up animation-delay-200">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl text-left"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary-600" aria-hidden="true" />
                  </div>
                  <p className="text-sm md:text-base text-gray-700 font-medium">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-slide-up animation-delay-300">
              <a href="#mitglied-werden" className="btn-primary btn-lg w-full sm:w-auto">
                Mitglied werden
              </a>
              <a href="#spenden" className="btn-secondary btn-lg w-full sm:w-auto">
                Jetzt spenden
              </a>
            </div>

            {/* Tertiary Link */}
            <a
              href="#was-wir-foerdern"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors animate-slide-up animation-delay-400 group"
            >
              Was wir konkret unterstützen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>

            {/* Microcopy */}
            <p className="mt-8 microcopy animate-fade-in animation-delay-400">
              Mitgliedschaft ist eine Familienmitgliedschaft – ihr entscheidet selbst, wie ihr helfen möchtet.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
