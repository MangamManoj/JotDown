import { signup } from '../actions'
import Link from 'next/link'

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
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
              Start your journal
            </h1>
            <p className="text-[var(--color-ink-light)]">
              Create your space for clarity
            </p>
          </div>

          {/* Form */}
          <form action={signup} className="space-y-5">
            {searchParams.error && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {searchParams.error}
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
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)] transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-[var(--color-ink)] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)] transition-all"
                placeholder="Choose a password"
              />
              <p className="mt-2 text-xs text-[var(--color-ink-muted)]">
                At least 6 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create account
            </button>
          </form>

          {/* Privacy note */}
          <p className="mt-6 text-center text-xs text-[var(--color-ink-muted)] leading-relaxed">
            By signing up, you agree to our commitment to your privacy.
            Your journal entries are encrypted and yours alone.
          </p>

          {/* Divider */}
          <div className="my-8 border-t border-[var(--color-border)]" />

          {/* Sign in link */}
          <p className="text-center text-[var(--color-ink-light)]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[var(--color-accent)] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-[var(--color-ink-muted)]">
        Free to use. No credit card required.
      </footer>
    </div>
  )
}
