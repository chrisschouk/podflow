'use client'

import React from 'react'
import { useInView } from './useInView'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  /** Use 'stagger' for grid children that should animate in sequence */
  animation?: 'slide' | 'stagger'
  /** Delay in ms before animation starts */
  delay?: number
}

export function AnimatedSection({
  children,
  className = '',
  animation = 'slide',
  delay = 0,
}: AnimatedSectionProps): React.JSX.Element {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const baseClass = animation === 'stagger' ? 'stagger-grid' : 'animate-slide-in'
  const viewClass = inView ? 'in-view' : ''

  return (
    <div
      ref={ref}
      className={`${baseClass} ${viewClass} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

/** Wrapper for individual elements within a stagger grid. */
export function AnimatedItem({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}): React.JSX.Element {
  return (
    <div className={className} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
