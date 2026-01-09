'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check } from 'lucide-react'

interface UserProfile {
  id?: string
  username?: string | null
  preferred_background?: string
  theme?: string
}

interface SettingsFormProps {
  userId: string
  initialProfile: UserProfile | null
}

const BACKGROUNDS = [
  { value: 'default', label: 'Default', description: 'Clean, minimal background' },
  { value: 'mountain', label: 'Mountain', description: 'Cool blues and grays' },
  { value: 'forest', label: 'Forest', description: 'Natural greens and earth tones' },
  { value: 'ocean', label: 'Ocean', description: 'Calm blues and teals' },
  { value: 'sunset', label: 'Sunset', description: 'Warm oranges and ambers' },
]

export default function SettingsForm({ userId, initialProfile }: SettingsFormProps) {
  const [preferredBackground, setPreferredBackground] = useState(
    initialProfile?.preferred_background || 'default'
  )
  const [theme, setTheme] = useState(initialProfile?.theme || 'light')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)

    try {
      const profileData = {
        user_id: userId,
        preferred_background: preferredBackground,
        theme: theme,
      }

      if (initialProfile?.id) {
        const { error } = await supabase
          .from('user_profiles')
          .update(profileData)
          .eq('id', initialProfile.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('user_profiles')
          .insert(profileData)

        if (error) throw error
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      
      // Apply theme immediately
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    // Apply initial theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Theme */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-3">
          Theme
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
              theme === 'light'
                ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                : 'border-[var(--color-border)] text-[var(--color-ink-light)] hover:border-[var(--color-ink-muted)]'
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                : 'border-[var(--color-border)] text-[var(--color-ink-light)] hover:border-[var(--color-ink-muted)]'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Background */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-3">
          Editor Background
        </label>
        <div className="space-y-2">
          {BACKGROUNDS.map((bg) => (
            <button
              key={bg.value}
              type="button"
              onClick={() => setPreferredBackground(bg.value)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                preferredBackground === bg.value
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-ink-muted)]'
              }`}
            >
              <div>
                <p className={`text-sm font-medium ${
                  preferredBackground === bg.value 
                    ? 'text-[var(--color-accent)]' 
                    : 'text-[var(--color-ink)]'
                }`}>
                  {bg.label}
                </p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  {bg.description}
                </p>
              </div>
              {preferredBackground === bg.value && (
                <Check className="w-4 h-4 text-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-light)]">
        {success && (
          <span className="flex items-center gap-2 text-sm text-[var(--color-success)]">
            <Check className="w-4 h-4" />
            Saved
          </span>
        )}
        {!success && <span />}
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
