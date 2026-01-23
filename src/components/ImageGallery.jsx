import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const galleryImages = [
  {
    src: '/images/gallery/spielkisten.svg',
    alt: 'Kinder spielen mit den neuen Spielkisten zum Schulbeginn',
    caption: 'Spielkisten für unsere Erstklässler',
  },
  {
    src: '/images/gallery/adventsbegegnung.svg',
    alt: 'Familien bei der gemeinsamen Adventsbegegnung in der Schule',
    caption: 'Gemeinsam feiern – Adventsbegegnung',
  },
  {
    src: '/images/gallery/lesewettbewerb.svg',
    alt: 'Stolze Gewinner des Schullesewettbewerbs mit Buchgutscheinen',
    caption: 'Lesewettbewerb – Preisverleihung',
  },
  {
    src: '/images/gallery/abschlussfeier.svg',
    alt: 'Viertklässler bei ihrer Abschlussfeier',
    caption: 'Abschlussfeier der 4. Klassen',
  },
]

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Auto-rotation
  useEffect(() => {
    if (!isPlaying || isHovered || prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying, isHovered, prefersReducedMotion])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  return (
    <section 
      className="pt-20 md:pt-24"
      aria-label="Bildergalerie aus dem Schulleben"
    >
      {/* Hero Slider - Full Width */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image - Full Width Hero Style */}
        <div className="relative aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] overflow-hidden bg-gray-100">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              aria-hidden={index !== currentIndex}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
                <div className="container-wide">
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                    {image.caption}
                  </p>
                  <p className="text-sm md:text-base text-white/80 mt-2 max-w-xl">
                    Momente, die wir gemeinsam möglich machen – dank eurer Unterstützung.
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Play/Pause Button */}
          {!prefersReducedMotion && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isPlaying ? 'Automatische Wiedergabe pausieren' : 'Automatische Wiedergabe starten'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
          )}

          {/* Dots Navigation - Bottom Center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Bild auswählen">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Bild ${index + 1}: ${image.caption}`}
                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {isPlaying && !prefersReducedMotion && !isHovered && (
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <div className="h-1 bg-white/20">
                <div 
                  key={currentIndex}
                  className="h-full bg-white/80 animate-progress"
                  style={{ animationDuration: '5s' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}