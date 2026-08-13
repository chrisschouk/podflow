import React from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: React.ReactNode
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

/**
 * Expandable FAQ list built on native <details>/<summary> — no JS state,
 * keyboard accessible out of the box.
 */
export function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl open:border-white/20 transition-colors"
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-semibold text-white">{item.question}</span>
            <ChevronDown
              className="w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-6 pb-6 text-slate-300 leading-relaxed">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
