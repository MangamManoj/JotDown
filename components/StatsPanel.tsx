'use client'

import { useState } from 'react'
import { BarChart3, BookOpen, Calendar, PenLine, X, Sparkles, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface StatsPanelProps {
  stats: {
    totalEntries: number
    thisMonth: number
    totalWords: number
  }
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Hover Trigger - Left Edge */}
      <div 
        className="fixed left-0 top-0 h-full w-3 z-40 group"
        onMouseEnter={() => setIsOpen(true)}
      >
        {/* Visual indicator */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-[var(--color-border)] rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Stats Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-[var(--color-surface)] border-r border-[var(--color-border)] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-lg text-[var(--color-ink)]">Your Journey</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="space-y-6 flex-1">
            <div className="space-y-4">
              <StatItem
                icon={<BookOpen className="w-4 h-4" />}
                label="Total Entries"
                value={stats.totalEntries}
              />
              <StatItem
                icon={<Calendar className="w-4 h-4" />}
                label="This Month"
                value={stats.thisMonth}
              />
              <StatItem
                icon={<PenLine className="w-4 h-4" />}
                label="Words Written"
                value={stats.totalWords.toLocaleString()}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--color-border-light)]" />

            {/* AI Coming Soon - Subtle */}
            <div className="bg-[var(--color-accent-soft)] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)] mb-1">
                    AI Insights
                  </p>
                  <p className="text-xs text-[var(--color-ink-light)] leading-relaxed">
                    Pattern recognition, mood tracking, and personalized prompts. Coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 pb-4 border-t border-[var(--color-border-light)] pt-4">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:bg-[var(--color-border-light)] rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-error)] hover:bg-[var(--color-border-light)] rounded-lg transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>

          {/* Footer hint */}
          <p className="text-xs text-[var(--color-ink-muted)] pt-4 border-t border-[var(--color-border-light)]">
            Hover the left edge anytime to access this panel.
          </p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/5 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

function StatItem({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode
  label: string
  value: string | number 
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[var(--color-border-light)] flex items-center justify-center text-[var(--color-ink-light)]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[var(--color-ink-muted)] uppercase tracking-wide">
          {label}
        </p>
        <p className="text-lg font-medium text-[var(--color-ink)]">
          {value}
        </p>
      </div>
    </div>
  )
}
