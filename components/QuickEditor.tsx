'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

interface QuickEditorProps {
  todayEntry: {
    id: string
    content_plain?: string
  } | null | undefined
  today: string
  userId: string
}

export default function QuickEditor({ todayEntry, today, userId }: QuickEditorProps) {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`
    }
  }, [text])

  const handleContinue = () => {
    // Navigate to the full editor with the text
    if (text.trim()) {
      // Store in sessionStorage to pass to editor
      sessionStorage.setItem('quickDraft', text)
    }
    router.push(`/journal/${today}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Cmd/Ctrl + Enter to continue
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleContinue()
    }
  }

  // If there's already an entry for today, show a different UI
  if (todayEntry) {
    return (
      <div className="animate-fade-in">
        <a
          href={`/journal/${today}`}
          className="group block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-accent)] hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-[var(--color-ink-muted)] uppercase tracking-widest mb-1">
                Today's Entry
              </p>
              <p className="text-[var(--color-ink)] font-serif text-lg">
                Continue writing...
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all" />
          </div>
          {todayEntry.content_plain && (
            <p className="text-[var(--color-ink-light)] text-sm line-clamp-2 italic">
              "{todayEntry.content_plain.slice(0, 150)}..."
            </p>
          )}
        </a>
      </div>
    )
  }

  return (
    <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
      <div 
        className={`bg-[var(--color-surface)] border rounded-xl transition-all duration-200 ${
          isFocused 
            ? 'border-[var(--color-accent)] shadow-lg ring-4 ring-[var(--color-accent-soft)]' 
            : 'border-[var(--color-border)] hover:border-[var(--color-ink-muted)]'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Start writing..."
          className="w-full p-6 bg-transparent font-serif text-lg text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] resize-none focus:outline-none min-h-[120px]"
          style={{ lineHeight: '1.8' }}
        />
        
        {/* Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border-light)]">
          <p className="text-xs text-[var(--color-ink-muted)]">
            {text.length > 0 
              ? `${text.trim().split(/\s+/).filter(w => w.length > 0).length} words`
              : 'Press ⌘+Enter to continue'
            }
          </p>
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {text.trim() ? 'Continue' : 'Open Editor'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-[var(--color-ink-muted)] mt-4">
        Write freely. Auto-saves when you continue.
      </p>
    </div>
  )
}
