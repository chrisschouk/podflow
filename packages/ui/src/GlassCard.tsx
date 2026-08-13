import React from 'react'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/** Frosted glass card with hover lift — the TAP house card style. */
export function GlassCard({ children, className = '', ...rest }: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`} {...rest}>
      {children}
    </div>
  )
}
