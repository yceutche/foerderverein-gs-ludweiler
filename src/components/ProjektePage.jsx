import { ArrowLeft, ExternalLink, Users, BookOpen, Cpu, Lightbulb, CheckCircle, TrendingUp, Building2, Calendar, Euro, MapPin, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const lernziele = [
  {
    icon: Cpu,
    title: 'IT-Grundlagen entdecken',
    text: 'Kinder lernen spielerisch, wie das Internet, Computernetzwerke und Betriebssysteme funktionieren – anhand greifbarer Alltagsbeispiele.',
  },
  {
    icon: Lightbulb,
    title: 'Künstliche Intelligenz verstehen',
    text: 'Was steckt hinter KI? Die Kinder lernen, was KI kann, wie sie entscheidet und welche Auswirkungen sie auf unsere Gesellschaft hat.',
  },
  {
    icon: BookOpen,
    title: 'Programmierung erleben',
    text: 'Mit kindgerechten Lernumgebungen wie Scratch und Calliope schreiben die Schüler*innen erste eigene Programme.',
  },
  {
    icon: Users,
    title: 'Teamarbeit & Kreativität',
    text: 'Rollenspiele, Brettspiele und Projektarbeiten stärken Teamgeist und fördern selbständiges Problemlösen.',
  },
]

const fakten = [
  {
    icon: Building2,
    label: 'Bildungspartner',
    value: 'ING-DiBa AG, Frankfurt',
  },
  {
    icon: Euro,
    label: 'Materialförderung',
    value: 'ca. 900 € (Materialien durch ING übernommen)',
  },
  {
    icon: Calendar,
    label: 'Projektstart',
    value: 'Schuljahr 2025',
  },
  {
    icon: Users,
    label: 'Lehrkräfte',
    value: 'Frau Otting & Frau Schurich',
  },
  {
    icon: User,
    label: 'Initiator & Ansprechpartner',
    value: 'Yannick Ceutché (ING-DiBa)',
  },
  {
    icon: MapPin,
    label: 'Standort',
    value: 'Ludweiler (Ausweitung auf Lauterbach geplant)',
  },
]

const timeline = [
  {
    phase: 'Mai 2025',
    title: 'Erstes Treffen & Projektvorstellung',
    text: 'Yannick Ceutché stellt der Grundschule Ludweiler die Wissensfabrik-Programme vor. Frau Otting und Frau Schurich zeigen großes Interesse – insbesondere an IT2School.',
    done: true,
  },
  {
    phase: 'Sommer 2025',
    title: 'Bewerbung & Bildungspartnerschaft',
    text: 'Die Schule bewirbt sich für eine Bildungspartnerschaft mit der Wissensfabrik, koordiniert durch die ING-DiBa als Unternehmenspartner.',
    done: true,
  },
  {
    phase: 'Schuljahr 2025/26',
    title: 'AG startet – Materialien im Einsatz',
    text: 'Die Materialien werden aktiv in der Robotik-/IT-AG eingesetzt. Die Kinder nehmen die Inhalte sehr gut an. Die AG wächst dank geteilter Leitung.',
    done: true,
  },
  {
    phase: 'Geplant',
    title: 'Ausweitung auf Standort Lauterbach',
    text: 'Der Förderverein prüft eine finanzielle Unterstützung, um das Angebot perspektivisch auch auf den Standort Lauterbach auszuweiten.',
    done: false,
  },
]

export default function ProjektePage() {
  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">

      {/* ── Breadcrumb / Back ────────────────────────────────────────── */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="container-wide py-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>

      {/* ── Page Hero ────────────────────────────────────────────────── */}
      <section className="section bg-gradient-to-b from-primary-50 to-white">
        <div className="container-wide text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-primary-200 rounded-full shadow-sm mb-6">
            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Aktive Projekte des Fördervereins</span>
          </div>
          <h1 className="heading-1 mb-4">Unsere Projekte</h1>
          <p className="text-lg text-gray-600">
            Der Förderverein der Grundschule Ludweiler unterstützt nicht nur mit Spenden –
            wir bringen auch Bildungspartnerschaften und Innovationsprojekte an die Schule.
          </p>
        </div>
      </section>

      {/* ── IT2School – Projekt-Feature ───────────────────────────────── */}
      <section className="section-tight bg-white">
        <div className="container-wide">

          {/* Project header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-100 text-success-700 text-sm font-semibold rounded-full">
              <span className="w-1.5 h-1.5 bg-success-500 rounded-full" />
              Aktiv
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
              Bildungspartnerschaft
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-100 text-accent-700 text-sm font-semibold rounded-full">
              MINT · IT · KI
            </span>
          </div>

          <h2 className="heading-2 mb-3 max-w-3xl">
            IT2School &amp; Künstliche Intelligenz –{' '}
            <span className="text-gradient">Gemeinsam IT entdecken</span>
          </h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl">
            Ein bundesweites Bildungsprogramm der Wissensfabrik – ermöglicht durch unsere
            Bildungspartnerschaft mit der <strong className="text-gray-700">ING-DiBa AG</strong>.
          </p>

          {/* Two-column layout: image + facts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-14">

            {/* Left: Image + description */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-medium aspect-video">
                <img
                  src={`${import.meta.env.BASE_URL}images/projekte/it2school-kids-1.jpg`}
                  alt="Schüler*innen beim IT2School-Projekt – Informatik und KI spielerisch entdecken"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium drop-shadow">
                    IT2School der Wissensfabrik – praxisnahes Lernen für Grundschulkinder
                  </p>
                </div>
              </div>

              <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
                <p>
                  Überall in unserem Alltag begegnen wir Informationstechnologie und Künstlicher
                  Intelligenz – beim Online-Einkauf, bei Sprachassistenten oder im Straßenverkehr.
                  Aber wer versteht die Technik dahinter? <strong>IT2School</strong> macht genau
                  das möglich: Schüler*innen blicken hinter die Kulissen der digitalen Welt.
                </p>
                <p>
                  An der <strong>Grundschule Ludweiler</strong> setzen Frau Otting und Frau Schurich
                  die Materialien bereits erfolgreich in der AG ein. Die Kinder arbeiten begeistert
                  damit und die Inhalte werden sehr gut angenommen. Dank der geteilten AG-Leitung
                  konnte eine größere Gruppe von Kindern aufgenommen werden.
                </p>
                <p>
                  Die Materialien im Wert von <strong>ca. 900 €</strong> wurden durch unseren
                  Bildungspartner, die <strong>ING-DiBa AG</strong>, vollständig finanziert.
                  Initiiert und koordiniert wurde die Partnerschaft durch <strong>Yannick Ceutché</strong>,
                  Mitarbeiter der ING und engagierter Förderer unserer Schule.
                </p>
              </div>
            </div>

            {/* Right: Key facts */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Projektdaten auf einen Blick</h3>
              <div className="grid gap-3">
                {fakten.map((fakt, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex-shrink-0 w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                      <fakt.icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        {fakt.label}
                      </p>
                      <p className="text-sm font-medium text-gray-800">{fakt.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wissensfabrik logo area */}
              <div className="mt-6 p-5 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-100">
                <p className="text-sm font-semibold text-gray-700 mb-1">Programm der</p>
                <p className="text-xl font-bold text-primary-700 mb-3">Wissensfabrik</p>
                <p className="text-sm text-gray-600 mb-4">
                  Bundesweites MINT-Bildungsprogramm – jede 10. allgemeinbildende Schule in
                  Deutschland setzt bereits Wissensfabrik-Projekte um.
                </p>
                <a
                  href="https://www.wissensfabrik.de/it2school/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Mehr über IT2School
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Was Kinder lernen ────────────────────────────────────── */}
          <div className="mb-14">
            <h3 className="heading-3 mb-2 text-center">Was die Kinder lernen</h3>
            <p className="text-center text-gray-500 mb-8">
              IT2School verbindet Informatik und Künstliche Intelligenz mit spielerischen
              Methoden – entwickelt von Universitäten und erprobt in der Praxis.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {lernziele.map((ziel, i) => (
                <div key={i} className="card-bordered p-6 hover:border-primary-200 transition-colors">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <ziel.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{ziel.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{ziel.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Projektverlauf / Timeline ────────────────────────────── */}
          <div className="mb-14">
            <h3 className="heading-3 mb-2">Projektverlauf</h3>
            <p className="text-gray-500 mb-8">Von der ersten Idee bis zur laufenden AG und darüber hinaus.</p>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary-100 hidden sm:block" />
              <div className="space-y-6">
                {timeline.map((step, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step.done
                        ? 'bg-success-500'
                        : 'bg-primary-100 border-2 border-primary-300'
                    }`}>
                      {step.done
                        ? <CheckCircle className="w-5 h-5 text-white" />
                        : <TrendingUp className="w-5 h-5 text-primary-500" />
                      }
                    </div>
                    <div className="flex-1 pb-2">
                      <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <h4 className="font-semibold text-gray-900 mt-0.5 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bilder-Galerie ───────────────────────────────────────── */}
          <div className="mb-14">
            <h3 className="heading-3 mb-6">Eindrücke aus dem Projekt</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-soft aspect-video">
                <img
                  src={`${import.meta.env.BASE_URL}images/projekte/it2school-kids-1.jpg`}
                  alt="Schüler*innen beim IT2School-Projekt"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-soft aspect-video">
                <img
                  src={`${import.meta.env.BASE_URL}images/projekte/it2school-cover.jpg`}
                  alt="IT2School – Gemeinsam IT entdecken, Unterrichtsmaterialien"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Sie möchten dieses Projekt unterstützen?
            </h3>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Als Mitglied oder Förderer des Vereins tragen Sie direkt dazu bei, dass Projekte
              wie IT2School an unserer Schule wachsen und gedeihen können.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/#mitglied-werden"
                className="btn bg-white text-primary-700 hover:bg-primary-50 shadow-md"
              >
                Mitglied werden
              </Link>
              <a
                href="https://www.wissensfabrik.de/it2school/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-white/50 text-white hover:bg-white/10"
              >
                IT2School auf wissensfabrik.de
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
