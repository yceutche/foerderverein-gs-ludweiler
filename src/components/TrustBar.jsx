import { MapPin, Heart, GraduationCap, Eye } from 'lucide-react'

const trustItems = [
  {
    icon: MapPin,
    label: 'Lokal in Ludweiler',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Heart,
    label: 'Ehrenamtlich organisiert',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
  },
  {
    icon: GraduationCap,
    label: 'Für alle Klassen',
    color: 'text-success-600',
    bgColor: 'bg-success-100',
  },
  {
    icon: Eye,
    label: 'Transparente Projekte & Aktionen',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
]

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100" aria-label="Vertrauensmerkmale">
      <div className="container-wide py-8">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
          {trustItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-4 py-2"
            >
              <div className={`flex-shrink-0 w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} aria-hidden="true" />
              </div>
              <span className="font-medium text-gray-700">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
