import { Heart, UserPlus, HandHelping } from 'lucide-react'

export default function AbschlussCTA() {
  return (
    <section
      className="section bg-gradient-to-br from-primary-50 via-white to-accent-50"
      aria-labelledby="abschluss-cta-heading"
    >
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative element */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce-subtle" />
            <div className="w-3 h-3 bg-accent-400 rounded-full animate-bounce-subtle animation-delay-100" />
            <div className="w-3 h-3 bg-success-400 rounded-full animate-bounce-subtle animation-delay-200" />
          </div>

          {/* Headline */}
          <h2 id="abschluss-cta-heading" className="heading-2 mb-6">
            Unterstützt eure Kinder –{' '}
            <span className="text-gradient">direkt hier in Ludweiler.</span>
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="#mitglied-werden"
              className="btn-primary btn-lg w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" aria-hidden="true" />
              Mitglied werden
            </a>
            <a
              href="#spenden"
              className="btn-secondary btn-lg w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              Jetzt spenden
            </a>
            <a
              href="#mitmachen"
              className="btn-outline btn-lg w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <HandHelping className="w-5 h-5" aria-hidden="true" />
              Mitmachen
            </a>
          </div>

          {/* Microcopy */}
          <p className="microcopy text-base">
            Schon <strong className="text-gray-700">13 € pro Jahr</strong> machen einen Unterschied.
          </p>
        </div>
      </div>
    </section>
  )
}
