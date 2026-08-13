import React from 'react'

type GradientButtonProps =
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)

/** Primary CTA: animated brand gradient with glow. Renders <a> when href is given. */
export function GradientButton(props: GradientButtonProps) {
  if (props.href !== undefined) {
    const { className = '', children, ...rest } = props
    return (
      <a className={`btn-gradient btn-shimmer inline-block ${className}`} {...rest}>
        {children}
      </a>
    )
  }
  const { className = '', children, ...rest } = props
  return (
    <button className={`btn-gradient btn-shimmer ${className}`} {...rest}>
      {children}
    </button>
  )
}
