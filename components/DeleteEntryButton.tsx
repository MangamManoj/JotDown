'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Trash2, X } from 'lucide-react'

interface DeleteEntryButtonProps {
  entryId: string
  entryDate: string
}

export default function DeleteEntryButton({ entryId, entryDate }: DeleteEntryButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({ is_deleted: true })
        .eq('id', entryId)

      if (error) {
        console.error('Delete error:', error)
        throw error
      }

      setShowConfirm(false)
      router.push('/dashboard')
      setTimeout(() => router.refresh(), 100)
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-error)] transition-colors"
        title="Delete entry"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif text-lg text-[var(--color-ink)]">
                Delete this entry?
              </h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                disabled={deleting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-[var(--color-ink-light)] mb-6">
              This will permanently delete your entry from {entryDate}. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm bg-[var(--color-error)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
