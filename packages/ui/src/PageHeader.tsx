import React from 'react'

interface PageHeaderProps {
  title: React.ReactNode
  description?: React.ReactNode
  /** Optional right-aligned actions (buttons, links). */
  actions?: React.ReactNode
  className?: string
}

/** Standard dashboard page heading: title + optional description and actions. */
export function PageHeader({ title, description, actions, className = '' }: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
        {description && <p className="text-slate-400 mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  )
}
