'use client'

import React, { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'

interface CrossSellProps {
  badge: string
  headline: string
  subtext: string
  cta: string
  href: string
  /** Leading icon for the badge row */
  badgeIcon?: React.ReactNode
  /** Leading icon inside the CTA pill */
  ctaIcon?: React.ReactNode
  onDismiss?: () => void
  className?: string
}

/**
 * Dismissible cross-sell banner pointing at another TAP product
 * (e.g. newsjack → Total Audio Promo Intel). Indigo/violet treatment is
 * deliberately distinct from the host product's brand accent.
 */
export function CrossSell({
  badge,
  headline,
  subtext,
  cta,
  href,
  badgeIcon,
  ctaIcon,
  onDismiss,
  className = '',
}: CrossSellProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className={`relative rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 p-6 ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-2xl" />

      <button
        onClick={() => {
          setDismissed(true)
          onDismiss?.()
        }}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-400">
          {badgeIcon}
          {badge}
        </div>

        <h4 className="text-lg font-semibold text-white leading-snug pr-8">{headline}</h4>

        <p className="text-sm text-slate-400 leading-relaxed">{subtext}</p>

        <a
          href={href}
          className="inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-full hover:from-indigo-400 hover:to-violet-400 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25"
        >
          {ctaIcon}
          {cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
