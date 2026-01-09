import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/SettingsForm'
import Link from 'next/link'

async function getUserProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await getUserProfile(user.id)

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[var(--color-border-light)]">
        <div className="max-w-2xl mx-auto flex items-center gap-6">
          <Link 
            href="/dashboard" 
            className="text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← Back
          </Link>
          <h1 className="font-serif text-xl text-[var(--color-ink)]">
            Settings
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Account Section */}
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-widest mb-4">
              Account
            </h2>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-ink-muted)]">Email</p>
                  <p className="text-[var(--color-ink)]">{user.email}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section>
            <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-widest mb-4">
              Preferences
            </h2>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
              <SettingsForm 
                userId={user.id}
                initialProfile={profile}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
