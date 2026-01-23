import { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'
import { useSEPAForm } from '../App'

const navItems = [
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Was wir fördern', href: '#was-wir-unterstuetzen' },
  { label: 'Mitmachen', href: '#mitmachen' },
  { label: 'Termine', href: '#termine' },
  { label: 'Spenden', href: '#spenden' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { openSepaForm } = useSEPAForm()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Hauptnavigation">
          {/* Logo - NEU: Verwendet jetzt das Bild */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Zur Startseite">
            <img 
              src="/logo.png" 
              alt="Förderverein der Grundschule Ludweiler-Lauterbach Logo" 
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />
            <div className="hidden sm:block">
              <span className="block text-sm md:text-base font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                Förderverein
              </span>
              <span className="block text-xs md:text-sm text-gray-500">
                GS Ludweiler
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#spenden"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Spenden
            </a>
            <button 
              onClick={openSepaForm}
              className="btn-primary text-sm"
            >
              Mitglied werden
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <hr className="my-2 border-gray-100" />
              <div className="px-4 pt-2 flex flex-col gap-2">
                <a
                  href="#spenden"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-outline w-full text-center inline-flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Spenden
                </a>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false)
                    openSepaForm()
                  }}
                  className="btn-primary w-full"
                >
                  Mitglied werden
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Microcopy under header */}
      <div
        className={`hidden md:block text-center py-1 text-xs text-gray-500 transition-all duration-300 ${
          isScrolled ? 'opacity-0 h-0' : 'opacity-100 bg-primary-50/50'
        }`}
      >
        Schon ab 13 € pro Jahr (Familienmitgliedschaft).
      </div>
    </header>
  )
}
