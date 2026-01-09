import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import StatsPanel from '@/components/StatsPanel'
import QuickEditor from '@/components/QuickEditor'

async function getJournalEntries(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_entries')
    .select('id, title, entry_date, word_count, created_at, content_plain')
    .eq('user_id', userId)
    .eq('is_deleted', false)
    .order('entry_date', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching entries:', error)
    return []
  }

  return data || []
}

async function getStats(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_entries')
    .select('id, word_count, entry_date')
    .eq('user_id', userId)
    .eq('is_deleted', false)

  if (error) {
    console.error('Error fetching stats:', error)
    return { totalEntries: 0, thisMonth: 0, totalWords: 0 }
  }

  const entries = data || []
  const now = new Date()
  const thisMonth = entries.filter(e => {
    const entryDate = new Date(e.entry_date)
    return entryDate.getMonth() === now.getMonth() && 
           entryDate.getFullYear() === now.getFullYear()
  }).length

  return {
    totalEntries: entries.length,
    thisMonth,
    totalWords: entries.reduce((sum, e) => sum + (e.word_count || 0), 0)
  }
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const [entries, stats] = await Promise.all([
    getJournalEntries(user.id),
    getStats(user.id)
  ])
  
  const today = format(new Date(), 'yyyy-MM-dd')
  const todayEntry = entries.find(e => e.entry_date === today)

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* Stats Panel - Slides from left */}
      <StatsPanel stats={stats} />

      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* Minimal Header */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-[var(--color-border-light)]">
          <Link href="/" className="text-xl font-semibold text-[var(--color-ink)] font-serif tracking-tight">
            JotDown
          </Link>
          <Link
            href="/entries"
            className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
          >
            Archive
          </Link>
        </header>

        {/* Writing-First Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20">
          <div className="w-full max-w-2xl">
            {/* Date & Greeting */}
            <div className="text-center mb-12 animate-fade-in">
              <p className="text-[var(--color-ink-muted)] text-sm uppercase tracking-widest mb-2">
                {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-ink)] mb-3">
                {getGreeting()}.
              </h1>
              <p className="text-[var(--color-ink-light)] text-lg">
                {todayEntry 
                  ? "Continue where you left off, or start fresh."
                  : "What's on your mind today?"
                }
              </p>
            </div>

            {/* Quick Editor / Entry Point */}
            <QuickEditor 
              todayEntry={todayEntry} 
              today={today}
              userId={user.id}
            />

            {/* Recent Entries - Minimal */}
            {entries.length > 0 && (
              <div className="mt-16 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-widest">
                    Recent
                  </h2>
                  <Link 
                    href="/entries"
                    className="text-sm text-[var(--color-accent)] hover:underline"
                  >
                    Archive →
                  </Link>
                </div>
                <div className="space-y-1">
                  {entries.slice(0, 5).map((entry) => (
                    <Link
                      key={entry.id}
                      href={`/journal/${entry.entry_date}`}
                      className="group flex items-center justify-between py-3 px-4 -mx-4 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-[var(--color-ink-muted)] w-20">
                          {format(new Date(entry.entry_date), 'MMM d')}
                        </span>
                        <span className="text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors truncate max-w-xs">
                          {entry.title || format(new Date(entry.entry_date), 'EEEE')}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--color-ink-muted)]">
                        {entry.word_count || 0} words
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {entries.length === 0 && (
              <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <p className="text-[var(--color-ink-light)] italic">
                  "The journey of a thousand miles begins with a single step."
                </p>
                <p className="text-[var(--color-ink-muted)] text-sm mt-2">
                  — Lao Tzu
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Subtle Footer */}
        <footer className="px-6 py-4 text-center">
          <p className="text-xs text-[var(--color-ink-muted)]">
            Your thoughts are private and encrypted.
          </p>
        </footer>
      </div>
    </div>
  )
}
