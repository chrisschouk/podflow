'use client'

import React, { useState } from 'react'
import { Loader2, Mail } from 'lucide-react'

interface LeadCaptureFormProps {
  /** POST target; receives JSON {email, source} */
  endpoint: string
  /** Identifier for which magnet/page drove the signup */
  source: string
  buttonLabel?: string
  placeholder?: string
  successMessage?: string
  className?: string
}

/** Email capture form posting to a lead-capture endpoint. */
export function LeadCaptureForm({
  endpoint,
  source,
  buttonLabel = 'Send it to me',
  placeholder = 'you@example.com',
  successMessage = 'Check your inbox — it’s on the way.',
  className = '',
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setError(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Something went wrong — try again.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong — try again.')
    }
  }

  if (status === 'success') {
    return <p className={`text-emerald-400 font-medium ${className}`}>{successMessage}</p>
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gradient px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
        {buttonLabel}
      </button>
      {status === 'error' && error && (
        <p className="text-sm text-red-400 sm:basis-full">{error}</p>
      )}
    </form>
  )
}
