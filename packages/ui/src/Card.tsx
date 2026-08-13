import React from 'react'

type Padding = 'none' | 'sm' | 'md' | 'lg'

const paddingClass: Record<Padding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: Padding
  /** Adds a subtle brand-tinted left border for "featured" cards. */
  accent?: boolean
}

/**
 * The house surface for app content — frosted card, consistent radius and
 * border. Wraps the themeable `glass-card` utility so newsjack, spotcheck and
 * podflow share one card look and pick up their accent from `data-theme`.
 */
export function Card({ padding = 'md', accent = false, className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`glass-card ${paddingClass[padding]} ${accent ? 'border-brand-500/30' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
