import React from 'react'

export interface TapBannerProps {
  className?: string
}

/** Standard Total Audio Promo family banner rendered at the top of TAP applications. */
export function TapBanner({ className = '' }: TapBannerProps) {
  return (
    <div className={`tap-banner ${className}`}>
      <div className="tap-banner-content">
        <span className="tap-banner-badge">Total Audio Promo</span>
        <span>Part of the Total Audio Promo Suite</span>
      </div>
    </div>
  )
}
