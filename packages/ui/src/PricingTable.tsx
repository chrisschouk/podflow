import React from 'react'
import { Check } from 'lucide-react'

export interface PricingTier {
  name: string
  /** Display price, e.g. "£9" — formatting is the product's call */
  price: string
  period?: string
  description?: string
  features: string[]
  cta: React.ReactNode
  /** Visually elevate this tier */
  highlighted?: boolean
  badge?: string
}

interface PricingTableProps {
  tiers: PricingTier[]
  className?: string
}

const gridCols: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
}

/** Marketing pricing grid in the TAP glass style. */
export function PricingTable({ tiers, className = '' }: PricingTableProps) {
  return (
    <div
      className={`grid grid-cols-1 ${gridCols[Math.min(tiers.length, 3)]} gap-8 max-w-5xl mx-auto ${className}`}
    >
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`glass-card p-8 flex flex-col ${
            tier.highlighted ? 'border-brand-500/50 shadow-glow relative' : ''
          }`}
        >
          {tier.badge && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-full">
              {tier.badge}
            </span>
          )}
          <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">{tier.price}</span>
            {tier.period && <span className="text-slate-400">{tier.period}</span>}
          </div>
          {tier.description && <p className="mt-2 text-sm text-slate-400">{tier.description}</p>}
          <ul className="mt-6 space-y-3 flex-1">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-brand-400" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8">{tier.cta}</div>
        </div>
      ))}
    </div>
  )
}
