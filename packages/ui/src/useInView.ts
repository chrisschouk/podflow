'use client'

import { useEffect, useRef, useState } from 'react'

/** Options for the useInView hook. All fields are optional. */
interface UseInViewOptions {
  /**
   * Fraction of the element that must be visible before the hook fires.
   * Accepts a single number or an array (see IntersectionObserver docs). Default 0.1.
   */
  threshold?: number | number[]
  /** Root margin passed to IntersectionObserver. Default '0px'. */
  rootMargin?: string
  /**
   * When true (default), the observer disconnects after the element first enters the
   * viewport so the in-view state is permanent. Set to false to track enter/exit
   * continuously.
   */
  triggerOnce?: boolean
}

/**
 * Observes the returned ref and flips to true once it enters the viewport.
 *
 * Accessibility: when the user has requested reduced motion via the OS preference,
 * inView is set to true immediately so elements are never hidden by JS state while
 * CSS already makes them visible.
 *
 * Falls back to inView=true when IntersectionObserver is unavailable (SSR).
 */
export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    // Respect prefers-reduced-motion: skip the animation trigger for users who
    // opted out of motion at the OS level.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, inView]
}
