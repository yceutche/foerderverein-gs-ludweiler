import { FlaskConical } from 'lucide-react'

export default function DevBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-lg">
      <FlaskConical className="w-4 h-4 shrink-0" />
      <span className="text-sm font-medium text-center">
        Testversion – Nur für interne Vorschau.
      </span>
    </div>
  )
}
