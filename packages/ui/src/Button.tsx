import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

// Neutral variants get full box sizing. Primary uses the themeable btn-gradient
// utility, which owns its own padding/radius, so it only takes a text size.
const neutralSize: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
}
const primaryTextSize: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const variantBase: Record<Variant, string> = {
  primary: 'btn-gradient inline-flex items-center justify-center gap-2 font-medium',
  secondary:
    'inline-flex items-center justify-center gap-2 font-medium bg-white/10 hover:bg-white/20 text-white transition-colors',
  ghost:
    'inline-flex items-center justify-center gap-2 font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }
type ButtonAsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

/**
 * One button, three variants. Renders an <a> when `href` is given, otherwise a
 * <button>. Primary is the brand gradient; secondary/ghost are neutral. Purely
 * class-driven, so it is portable across the TAP products.
 */
export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = 'primary', size = 'md', className = '', children } = props
  const sizing = variant === 'primary' ? primaryTextSize[size] : neutralSize[size]
  const classes = `${variantBase[variant]} ${sizing} ${className}`.trim()

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  }
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
