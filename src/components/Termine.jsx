import { Calendar, Sun, Snowflake, Flower2, TreePine, PartyPopper, Flag } from 'lucide-react'

const feiertage = [
  { name: 'Tag der Deutschen Einheit', datum: '3. Oktober 2025', wochentag: 'Freitag', vergangen: true },
  { name: 'Allerheiligen', datum: '1. November 2025', wochentag: 'Samstag', vergangen: true },
  { name: '1. Weihnachtstag', datum: '25. Dezember 2025', wochentag: 'Donnerstag', vergangen: true },
  { name: '2. Weihnachtstag', datum: '26. Dezember 2025', wochentag: 'Freitag', vergangen: true },
  { name: 'Neujahr', datum: '1. Januar 2026', wochentag: 'Donnerstag', vergangen: true },
  { name: 'Karfreitag', datum: '3. April 2026', wochentag: 'Freitag', vergangen: true },
  { name: 'Ostermontag', datum: '6. April 2026', wochentag: 'Montag', vergangen: true },
  { name: 'Tag der Arbeit', datum: '1. Mai 2026', wochentag: 'Freitag', vergangen: false },
  { name: 'Christi Himmelfahrt', datum: '14. Mai 2026', wochentag: 'Donnerstag', vergangen: false },
  { name: 'Pfingstmontag', datum: '25. Mai 2026', wochentag: 'Montag', vergangen: false },
  { name: 'Fronleichnam', datum: '4. Juni 2026', wochentag: 'Donnerstag', vergangen: false },
]

const schulferien = [
  { 
    name: 'Herbstferien', 
    zeitraum: '13. – 24. Oktober 2025', 
    icon: TreePine, 
    farbe: 'bg-orange-100 text-orange-700 border-orange-200',
    vergangen: true 
  },
  { 
    name: 'Weihnachtsferien', 
    zeitraum: '22. Dezember 2025 – 2. Januar 2026', 
    icon: Snowflake, 
    farbe: 'bg-blue-100 text-blue-700 border-blue-200',
    vergangen: true 
  },
  { 
    name: 'Fastnachtsferien', 
    zeitraum: '16. – 20. Februar 2026', 
    icon: PartyPopper, 
    farbe: 'bg-purple-100 text-purple-700 border-purple-200',
    vergangen: true 
  },
  { 
    name: 'Osterferien', 
    zeitraum: '7. – 17. April 2026', 
    icon: Flower2, 
    farbe: 'bg-pink-100 text-pink-700 border-pink-200',
    vergangen: true 
  },
  { 
    name: 'Sommerferien', 
    zeitraum: '29. Juni – 7. August 2026', 
    icon: Sun, 
    farbe: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    vergangen: false 
  },
]

export default function Termine() {
  // Filter: Zeige nur zukünftige Feiertage
  const kommendeFeiertage = feiertage.filter(f => !f.vergangen)
  const kommendeFerien = schulferien.filter(f => !f.vergangen)

  return (
    <section id="termine" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Schuljahr 2025/2026
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Termine & Ferien
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Alle wichtigen Termine im Überblick – plant schon mal vor!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Schulferien Card */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sun className="w-5 h-5" />
                Schulferien
              </h3>
              <p className="text-primary-100 text-sm">Saarland 2025/2026</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {schulferien.map((ferien) => {
                  const Icon = ferien.icon
                  return (
                    <li 
                      key={ferien.name}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        ferien.vergangen 
                          ? 'bg-gray-50 border-gray-200 opacity-60' 
                          : `${ferien.farbe} hover:shadow-md`
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${ferien.vergangen ? 'bg-gray-200' : 'bg-white/50'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className={`font-semibold block ${ferien.vergangen ? 'line-through' : ''}`}>
                          {ferien.name}
                        </span>
                        <span className="text-sm opacity-80">{ferien.zeitraum}</span>
                      </div>
                      {!ferien.vergangen && (
                        <span className="text-xs font-medium bg-white/70 px-2 py-1 rounded-full">
                          Bald
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Feiertage Card */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Flag className="w-5 h-5" />
                Kommende Feiertage
              </h3>
              <p className="text-accent-100 text-sm">Schulfreie Tage</p>
            </div>
            <div className="p-6">
              {kommendeFeiertage.length > 0 ? (
                <ul className="space-y-2">
                  {kommendeFeiertage.map((feiertag, index) => (
                    <li 
                      key={feiertag.name}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                        index === 0 
                          ? 'bg-accent-50 border border-accent-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-accent-500' : 'bg-gray-300'}`} />
                        <div>
                          <span className="font-medium text-gray-900 block">{feiertag.name}</span>
                          <span className="text-sm text-gray-500">{feiertag.wochentag}</span>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${index === 0 ? 'text-accent-600' : 'text-gray-600'}`}>
                        {feiertag.datum.replace(' 2026', '').replace(' 2025', '')}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Alle Feiertage dieses Schuljahres sind vorbei.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Nächster Termin Highlight */}
        {kommendeFerien.length > 0 && (
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 rounded-2xl p-1">
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Nächste Ferien</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {kommendeFerien[0].name}
                </p>
                <p className="text-lg text-primary-600 font-medium">
                  {kommendeFerien[0].zeitraum}
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  🎉 Bald ist es soweit – Countdown läuft!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Alle Angaben ohne Gewähr. Quelle: Ministerium für Bildung und Kultur Saarland.
        </p>
      </div>
    </section>
  )
}
