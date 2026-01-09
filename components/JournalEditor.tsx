'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import { useEffect, useState, useCallback } from 'react'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  Bold, 
  Italic, 
  Palette, 
  Highlighter, 
  Type,
  Check,
  ArrowLeft,
  X
} from 'lucide-react'
import Link from 'next/link'

interface JournalEntry {
  id?: string
  title?: string | null
  content: string
  content_plain: string
  entry_date: string
  word_count: number
}

interface JournalEditorProps {
  initialEntry: JournalEntry | null
  entryDate: string
  userId: string
}

// Refined, sophisticated colors
const COLORS = [
  { name: 'Ink', value: '#1C1917' },
  { name: 'Blue', value: '#1E40AF' },
  { name: 'Green', value: '#065F46' },
  { name: 'Purple', value: '#5B21B6' },
]

// Subtle, sophisticated highlights
const HIGHLIGHTS = [
  { name: 'Yellow', value: '#FEF9C3' },
  { name: 'Sky', value: '#E0F2FE' },
  { name: 'Mint', value: '#D1FAE5' },
  { name: 'Lavender', value: '#E9D5FF' },
]

// Font options
const FONTS = [
  { name: 'Serif', value: 'Merriweather, Georgia, serif' },
  { name: 'Sans', value: 'Inter, system-ui, sans-serif' },
]

export default function JournalEditor({ initialEntry, entryDate, userId }: JournalEditorProps) {
  const [saving, setSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [entryId, setEntryId] = useState<string | undefined>(initialEntry?.id)
  const router = useRouter()
  const supabase = createClient()

  // Check for quick draft from dashboard
  useEffect(() => {
    const quickDraft = sessionStorage.getItem('quickDraft')
    if (quickDraft && !initialEntry?.content) {
      sessionStorage.removeItem('quickDraft')
    }
  }, [initialEntry])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
    ],
    content: initialEntry?.content || '',
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      const words = text.trim().split(/\s+/).filter(word => word.length > 0)
      setWordCount(words.length)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px]',
      },
    },
    onCreate: ({ editor }) => {
      // Load quick draft if exists
      const quickDraft = sessionStorage.getItem('quickDraft')
      if (quickDraft && !initialEntry?.content) {
        editor.commands.setContent(`<p>${quickDraft}</p>`)
        sessionStorage.removeItem('quickDraft')
      }
    },
  })

  // Auto-save function
  const saveEntry = useCallback(async () => {
    if (!editor) return

    const content = editor.getHTML()
    const contentPlain = editor.getText()
    const words = contentPlain.trim().split(/\s+/).filter(word => word.length > 0)
    const wordCount = words.length

    if (wordCount === 0) return

    setSaving(true)

    try {
      const entryData = {
        user_id: userId,
        title: null,
        content,
        content_plain: contentPlain,
        entry_date: entryDate,
        word_count: wordCount,
        updated_at: new Date().toISOString(),
      }

      if (entryId) {
        const { error } = await supabase
          .from('journal_entries')
          .update(entryData)
          .eq('id', entryId)

        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('journal_entries')
          .insert(entryData)
          .select('id')
          .single()

        if (error) throw error
        
        if (data?.id) {
          setEntryId(data.id)
        }
      }

      setLastSaved(new Date())
    } catch (error) {
      console.error('Error saving entry:', error)
    } finally {
      setSaving(false)
    }
  }, [editor, userId, entryDate, entryId, supabase])

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!editor) return

    const interval = setInterval(() => {
      if (editor.getText().trim().length > 0) {
        saveEntry()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [editor, saveEntry])

  // Save on unmount
  useEffect(() => {
    return () => {
      if (editor && editor.getText().trim().length > 0) {
        saveEntry()
      }
    }
  }, [editor, saveEntry])

  if (!editor) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)] flex items-center justify-center">
        <p className="text-[var(--color-ink-muted)]">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* Clean Header */}
      <header className="border-b border-[var(--color-border-light)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <span className="text-sm text-[var(--color-ink-muted)]">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
              {lastSaved && (
                <span className="flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)]">
                  <Check className="w-3.5 h-3.5 text-[var(--color-success)]" />
                  Saved
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Date Header */}
        <div className="mb-10">
          <p className="text-xs text-[var(--color-ink-muted)] uppercase tracking-[0.15em] mb-2">
            {format(new Date(entryDate), 'EEEE')}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-ink)] font-medium">
            {format(new Date(entryDate), 'MMMM d, yyyy')}
          </h1>
        </div>

        {/* Editor Card - Clean & Spacious */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 px-6 py-3 border-b border-[var(--color-border-light)] bg-[var(--color-paper)]">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold (⌘B)"
            >
              <Bold className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic (⌘I)"
            >
              <Italic className="w-4 h-4" />
            </ToolbarButton>

            <Divider />

            {/* Color Picker */}
            <DropdownButton icon={<Palette className="w-4 h-4" />} title="Text Color">
              <div className="p-3">
                <p className="text-xs text-[var(--color-ink-muted)] mb-2 px-1">Text Color</p>
                <div className="flex gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => editor.chain().focus().setColor(color.value).run()}
                      className="w-7 h-7 rounded-md border-2 border-[var(--color-border)] hover:scale-110 hover:border-[var(--color-accent)] transition-all"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </DropdownButton>

            {/* Highlight with Remove Option */}
            <DropdownButton icon={<Highlighter className="w-4 h-4" />} title="Highlight">
              <div className="p-3">
                <p className="text-xs text-[var(--color-ink-muted)] mb-2 px-1">Highlight</p>
                <div className="flex gap-2 mb-3">
                  {HIGHLIGHTS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => editor.chain().focus().toggleHighlight({ color: color.value }).run()}
                      className="w-7 h-7 rounded-md border-2 border-[var(--color-border)] hover:scale-110 hover:border-[var(--color-accent)] transition-all"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <button
                  onClick={() => editor.chain().focus().unsetHighlight().run()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:bg-[var(--color-border-light)] rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                  Remove Highlight
                </button>
              </div>
            </DropdownButton>

            <Divider />

            {/* Font Family */}
            <DropdownButton icon={<Type className="w-4 h-4" />} title="Font Style">
              <div className="p-2 min-w-[140px]">
                {FONTS.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => editor.chain().focus().setFontFamily(font.value).run()}
                    className="block w-full text-left px-3 py-2.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-border-light)] rounded transition-colors"
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </DropdownButton>

            {/* Auto-save indicator */}
            <div className="ml-auto text-xs text-[var(--color-ink-muted)] hidden md:block">
              Auto-saves every 30s
            </div>
          </div>

          {/* Editor Content - Maximum Focus */}
          <div className="p-8 md:p-12 bg-white dark:bg-[var(--color-surface)]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Subtle Footer Note */}
        <p className="text-center text-xs text-[var(--color-ink-muted)] mt-6 italic">
          Your thoughts are private and secure.
        </p>
      </main>
    </div>
  )
}

// Toolbar components
function ToolbarButton({ 
  children, 
  onClick, 
  isActive, 
  title 
}: { 
  children: React.ReactNode
  onClick: () => void
  isActive?: boolean
  title: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-md transition-all ${
        isActive 
          ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]' 
          : 'text-[var(--color-ink-light)] hover:bg-[var(--color-border-light)] hover:text-[var(--color-ink)]'
      }`}
    >
      {children}
    </button>
  )
}

function DropdownButton({ 
  icon, 
  children,
  title 
}: { 
  icon: React.ReactNode
  children: React.ReactNode
  title: string
}) {
  return (
    <div className="relative group">
      <button 
        className="p-2 rounded-md text-[var(--color-ink-light)] hover:bg-[var(--color-border-light)] hover:text-[var(--color-ink)] transition-colors"
        title={title}
      >
        {icon}
      </button>
      <div className="absolute top-full left-0 mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg hidden group-hover:block z-20">
        {children}
      </div>
    </div>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-[var(--color-border)] mx-1" />
}
