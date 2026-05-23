import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import PasswordGate from './PasswordGate'

function VorstandContent() {
  const docUrl = `${import.meta.env.BASE_URL}docs/hosting-vergleich.html`

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Website
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-gray-800">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold">
              Hosting-Entscheidungsanalyse — Förderverein GS Ludweiler
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={docUrl}
            download="hosting-vergleich-foerderverein-ludweiler.html"
            className="flex items-center gap-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Herunterladen
          </a>
          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Neues Fenster
          </a>
        </div>
      </div>

      {/* Document iframe */}
      <iframe
        src={docUrl}
        title="Hosting-Entscheidungsanalyse Förderverein Grundschule Ludweiler-Lauterbach"
        className="flex-1 w-full border-0"
        style={{ height: 'calc(100vh - 49px)' }}
      />
    </div>
  )
}

export default function VorstandPage() {
  return (
    <PasswordGate>
      <VorstandContent />
    </PasswordGate>
  )
}
