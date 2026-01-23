import { useState, useEffect } from 'react'
import { UserPlus, X } from 'lucide-react'
import { useSEPAForm } from '../App'

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { openSepaForm } = useSEPAForm()

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 300) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-strong safe-area-bottom"
      role="complementary"
      aria-label="Schnellzugriff Mitgliedschaft"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={openSepaForm}
          className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" aria-hidden="true" />
          Mitglied werden
        </button>
        <button
          onClick={handleDismiss}
          className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Hinweis schließen"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-2 text-center microcopy">
        Schon ab 13 € pro Jahr (Familienmitgliedschaft)
      </p>
    </div>
  )
}
