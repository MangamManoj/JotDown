import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sparkles } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <span className="text-xl font-serif font-semibold text-[var(--color-ink)]">
          JotDown
        </span>
        <Link
          href="/login"
          className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
        >
          Sign in
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-ink)] leading-tight mb-6">
          Declutter your mind.<br />
          <span className="text-[var(--color-accent)]">Gain clarity.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--color-ink-light)] max-w-xl mx-auto mb-10 leading-relaxed">
          A quiet space for your thoughts. Write freely, reflect deeply, 
          and watch your clarity grow—one entry at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Start writing — it&apos;s free
          </Link>
        </div>

        <p className="text-xs text-[var(--color-ink-muted)] mt-6">
          No credit card required. Your thoughts stay private.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-xs mx-auto border-t border-[var(--color-border)]" />

      {/* Features - Understated */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <Feature
            title="Distraction-free"
            description="A minimalist editor with just enough. Bold, italic, highlights—nothing more. Your thoughts deserve focus."
          />
          <Feature
            title="Beautifully calm"
            description="Nature-inspired backgrounds create a peaceful space. Choose mountain, forest, or ocean as your writing companion."
          />
          <Feature
            title="Your journey, visible"
            description="Every entry timestamped. Look back and see your growth. Track progress without the pressure."
          />
        </div>
      </section>

      {/* AI Section - Subtle, Refined */}
      <section className="px-6 py-24 border-t border-[var(--color-border-light)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-[var(--color-accent)] mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-widest">Coming Soon</span>
          </div>
          
          <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-ink)] mb-4">
            Intelligent insights
          </h2>
          
          <p className="text-[var(--color-ink-light)] mb-8 leading-relaxed">
            AI-powered pattern recognition, mood tracking, and personalized prompts. 
            Understand yourself better through your own words.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-[var(--color-ink-muted)]">
            <span className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full">
              Smart summaries
            </span>
            <span className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full">
              Mood trends
            </span>
            <span className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full">
              Pattern discovery
            </span>
            <span className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full">
              Personal prompts
            </span>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 py-24 border-t border-[var(--color-border-light)] bg-[var(--color-surface)]">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-serif text-xl md:text-2xl text-[var(--color-ink)] italic leading-relaxed mb-4">
            &quot;The journal is a vehicle for my sense of self. It represents 
            me as emotionally and spiritually independent.&quot;
          </blockquote>
          <cite className="text-sm text-[var(--color-ink-muted)] not-italic">
            — Susan Sontag
          </cite>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-ink)] mb-4">
          Ready to begin?
        </h2>
        <p className="text-[var(--color-ink-light)] mb-8">
          Your sanctuary for reflection awaits.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Create your journal
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[var(--color-border-light)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-ink-muted)]">
          <span className="font-serif">JotDown</span>
          <p>© {new Date().getFullYear()} · Your thoughts, your space.</p>
        </div>
      </footer>
    </main>
  )
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center md:text-left">
      <h3 className="font-serif text-lg text-[var(--color-ink)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-ink-light)] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
