import { useState } from 'react'
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

function VorstandContent() {
  const [view, setView] = useState('full')
  const docUrl =
    view === 'full'
      ? `${import.meta.env.BASE_URL}docs/hosting-vergleich.html`
      : `${import.meta.env.BASE_URL}docs/hosting-vergleich-kurzfassung.html`
  const downloadName =
    view === 'full'
      ? 'hosting-vergleich-foerderverein-ludweiler.html'
      : 'hosting-vergleich-kurzfassung-foerderverein-ludweiler.html'

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
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setView('full')}
              className={`px-3 py-1 rounded-md transition-colors ${
                view === 'full' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Vollversion
            </button>
            <button
              type="button"
              onClick={() => setView('short')}
              className={`px-3 py-1 rounded-md transition-colors ${
                view === 'short' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Kurzfassung
            </button>
          </div>
          <a
            href={docUrl}
            download={downloadName}
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
  return <VorstandContent />
}
