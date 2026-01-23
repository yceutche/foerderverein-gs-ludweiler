import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Was kostet die Mitgliedschaft?',
    answer:
      'Der jährliche Mindestbeitrag beträgt 13 €. Ihr könnt auch einen höheren Beitrag wählen.',
  },
  {
    question: 'Ist die Mitgliedschaft für eine Person oder die ganze Familie?',
    answer: 'Es handelt sich um eine Familienmitgliedschaft.',
  },
  {
    question: 'Wie wird der Beitrag bezahlt?',
    answer:
      'Der Beitrag ist ein Jahresbeitrag und wird über ein SEPA-Lastschriftmandat eingezogen.',
  },
  {
    question: 'Kann ich auch spenden, ohne Mitglied zu werden?',
    answer: 'Ja – einmalige Spenden sind jederzeit willkommen.',
  },
  {
    question: 'Welche Aktionen unterstützt der Förderverein konkret?',
    answer:
      'Zum Beispiel Spielkisten für die 1. Klassen, Nikolausaktion, Bücher/Buchgutscheine, Buskosten, Klassenfotos, Schulbibliothek sowie Abschlussfeier & Adventsbegegnung.',
  },
]

function FAQItem({ question, answer, isOpen, onToggle, id }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-answer-${id}`}
        role="region"
        aria-labelledby={`faq-question-${id}`}
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 pr-10">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      className="section bg-gradient-section scroll-mt-header"
      aria-labelledby="faq-heading"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="heading-2 mb-4">
            Häufige Fragen (FAQ)
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              id={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Noch Fragen? Wir helfen gerne weiter.
          </p>
          <a href="#kontakt" className="btn-ghost">
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  )
}
