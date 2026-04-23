import { Heart, Mail, Phone, FileText, Shield, BookOpen } from 'lucide-react'

const footerLinks = {
  verein: [
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Projekte', href: '#was-wir-unterstuetzen' },
    { label: 'Mitmachen', href: '#mitmachen' },
  ],
  unterstuetzen: [
    { label: 'Mitglied werden', href: '#mitglied-werden' },
    { label: 'Spenden', href: '#spenden' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  rechtliches: [
    { label: 'Impressum', href: '/impressum', icon: FileText },
    { label: 'Datenschutz', href: '/datenschutz', icon: Shield },
    { label: 'Satzung (PDF)', href: '/satzung.pdf', icon: BookOpen },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="container-wide py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-3 mb-4 group">
              {/* NEU: Logo-Bild statt SVG */}
              <img 
                src="/logo.png" 
                alt="Förderverein Logo" 
                className="h-12 w-12 object-contain bg-white rounded-full p-1"
              />
              <div>
                <span className="block text-white font-bold group-hover:text-primary-400 transition-colors">
                  Förderverein
                </span>
                <span className="block text-sm text-gray-400">GS Ludweiler</span>
              </div>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              Gemeinsam für unsere Kinder – der Förderverein unterstützt Projekte, 
              Materialien und Aktionen an der Grundschule Ludweiler.
            </p>
          </div>

          {/* Verein Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Verein</h3>
            <ul className="space-y-2">
              {footerLinks.verein.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unterstützen Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Unterstützen</h3>
            <ul className="space-y-2">
              {footerLinks.unterstuetzen.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt & Rechtliches */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-400">
                <strong className="text-gray-300">Vorstand:</strong><br />
                Patricia Sarda-Seewald<br />
                Stephanie Höhn<br />
                Tamara Junker
              </p>
              <a
                href="tel:+4968983903780"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                06898 / 390 37 80
              </a>
              <a
                href="mailto:grundschuleludweiler@schule.saarland"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                grundschuleludweiler@schule.saarland
              </a>
            </div>

            <h4 className="text-white font-semibold mb-3 text-sm">Rechtliches</h4>
            <ul className="space-y-2">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <link.icon className="w-3 h-3" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Förderverein der Grundschule Ludweiler/Lauterbach – Standort Ludweiler e. V.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Mit <Heart className="w-4 h-4 text-red-500" aria-hidden="true" /> für unsere Kinder
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Designed und realisiert von{' '}
              <a 
                href="https://www.digital-ev.de/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
              >
                DiGiTal e.V.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
