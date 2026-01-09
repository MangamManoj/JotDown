import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import DeleteEntryButton from '@/components/DeleteEntryButton'

async function getJournalEntries(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_entries')
    .select('id, title, entry_date, word_count, created_at')
    .eq('user_id', userId)
    .eq('is_deleted', false)
    .order('entry_date', { ascending: false })

  if (error) {
    console.error('Error fetching entries:', error)
    return []
  }

  return data || []
}

export default async function EntriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const entries = await getJournalEntries(user.id)

  // Group entries by month/year
  const groupedEntries = entries.reduce((acc, entry) => {
    const monthYear = format(new Date(entry.entry_date), 'MMMM yyyy')
    if (!acc[monthYear]) {
      acc[monthYear] = []
    }
    acc[monthYear].push(entry)
    return acc
  }, {} as Record<string, typeof entries>)

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[var(--color-border-light)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
            >
              ← Back
            </Link>
            <h1 className="font-serif text-xl text-[var(--color-ink)]">
              Archive
            </h1>
          </div>
          <p className="text-sm text-[var(--color-ink-muted)]">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {entries.length === 0 ? (
            <div className="text-center py-24">
              <h2 className="font-serif text-2xl text-[var(--color-ink)] mb-3">
                No entries yet
              </h2>
              <p className="text-[var(--color-ink-light)] mb-6">
                Your journal is waiting for its first words.
              </p>
              <Link
                href={`/journal/${format(new Date(), 'yyyy-MM-dd')}`}
                className="inline-block px-6 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Start writing
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedEntries).map(([monthYear, monthEntries]) => (
                <section key={monthYear}>
                  <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-widest mb-4">
                    {monthYear}
                  </h2>
                  <div className="space-y-1">
                    {monthEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="group flex items-center justify-between py-4 px-4 -mx-4 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                      >
                        <Link
                          href={`/journal/${entry.entry_date}`}
                          className="flex-1 flex items-center gap-6"
                        >
                          <span className="text-sm text-[var(--color-ink-muted)] w-16 flex-shrink-0">
                            {format(new Date(entry.entry_date), 'MMM d')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                              {entry.title || format(new Date(entry.entry_date), 'EEEE')}
                            </h3>
                          </div>
                          <span className="text-xs text-[var(--color-ink-muted)] flex-shrink-0">
                            {entry.word_count || 0} words
                          </span>
                        </Link>
                        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DeleteEntryButton entryId={entry.id!} entryDate={entry.entry_date} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
