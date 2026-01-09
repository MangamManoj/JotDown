'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setSuccess(true)
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)] flex flex-col">
        {/* Header */}
        <header className="px-6 py-4">
          <Link 
            href="/" 
            className="text-xl font-serif font-semibold text-[var(--color-ink)]"
          >
            JotDown
          </Link>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-[var(--color-accent-soft)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            
            <h1 className="font-serif text-2xl text-[var(--color-ink)] mb-3">
              Check your email
            </h1>
            <p className="text-[var(--color-ink-light)] mb-6">
              We&apos;ve sent a password reset link to<br />
              <strong className="text-[var(--color-ink)]">{email}</strong>
            </p>
            
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex flex-col">
      {/* Header */}
      <header className="px-6 py-4">
        <Link 
          href="/" 
          className="text-xl font-serif font-semibold text-[var(--color-ink)]"
        >
          JotDown
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-[var(--color-ink)] mb-2">
              Reset password
            </h1>
            <p className="text-[var(--color-ink-light)]">
              We&apos;ll send you a link to reset it
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleReset}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-[var(--color-ink)] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)] transition-all"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 border-t border-[var(--color-border)]" />

          {/* Back to login */}
          <p className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[var(--color-ink-light)] hover:text-[var(--color-accent)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
