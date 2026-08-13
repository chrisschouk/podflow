import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

interface StatCardProps {
  icon: LucideIcon
  label: React.ReactNode
  value: React.ReactNode
  /** Optional "/limit" suffix, e.g. usage out of a cap. */
  limit?: React.ReactNode
  /** Tailwind background class for the icon chip, e.g. "bg-brand-500/20". */
  iconClassName?: string
  className?: string
}

/** A single metric tile: icon chip + label + value. */
export function StatCard({
  icon: Icon,
  label,
  value,
  limit,
  iconClassName = 'bg-brand-500/20 text-brand-400',
  className = '',
}: StatCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconClassName}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-slate-100">
            {value}
            {limit != null && <span className="text-sm font-normal text-slate-500">/{limit}</span>}
          </p>
        </div>
      </div>
    </Card>
  )
}
