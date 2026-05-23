import { FlaskConical, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DevBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-3 shadow-lg">
      <FlaskConical className="w-4 h-4 shrink-0" />
      <span className="text-sm font-medium text-center">
        Testversion – Nur für interne Vorschau.
      </span>
      <Link
        to="/vorstand"
        className="flex items-center gap-1 bg-white text-amber-700 text-xs font-bold px-3 py-1 rounded-full hover:bg-amber-50 transition-colors shrink-0"
      >
        Vorstand
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  )
}
