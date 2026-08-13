import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface ActionTileProps {
  icon: LucideIcon
  title: React.ReactNode
  subtitle?: React.ReactNode
  /** When set, the tile renders as a link. */
  href?: string
  onClick?: () => void
  className?: string
}

const TILE =
  'flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-brand-500/50 hover:bg-white/10 transition-colors text-left w-full'

/** Icon + title + subtitle tile for quick actions. Renders <a>, <button> or a
 * static <div> depending on which handler is supplied. */
export function ActionTile({ icon: Icon, title, subtitle, href, onClick, className = '' }: ActionTileProps) {
  const inner = (
    <>
      <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-brand-400" />
      </div>
      <div>
        <p className="font-medium text-slate-100">{title}</p>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
    </>
  )
  const classes = `${TILE} ${className}`
  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    )
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {inner}
      </button>
    )
  }
  return <div className={classes}>{inner}</div>
}
