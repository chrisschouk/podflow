import React from 'react'

interface SectionLabelProps {
  children: React.ReactNode
  /** Brand-tinted rather than muted grey. */
  accent?: boolean
  className?: string
}

/** Small uppercase tracked label used above sections and inside cards. */
export function SectionLabel({ children, accent = false, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-wider ${
        accent ? 'text-brand-400' : 'text-slate-400'
      } ${className}`}
    >
      {children}
    </span>
  )
}
