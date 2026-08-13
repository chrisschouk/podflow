import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  /** Optional call to action (a Button, link, etc.). */
  action?: React.ReactNode
  className?: string
}

/** Centred empty/placeholder state inside a card. */
export function EmptyState({ icon: Icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      {Icon && <Icon className="w-14 h-14 text-slate-500 mx-auto mb-4" />}
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      {description && <p className="text-slate-400 max-w-md mx-auto mb-6">{description}</p>}
      {action}
    </div>
  )
}
