import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import JournalEditor from '@/components/JournalEditor'
import { format, parse } from 'date-fns'

async function getJournalEntry(userId: string, date: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .eq('entry_date', date)
    .eq('is_deleted', false)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching entry:', error)
  }

  return data || null
}

export default async function JournalPage({ params }: { params: { date: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Validate date format (YYYY-MM-DD)
  let entryDate: string
  try {
    if (params.date === 'new') {
      entryDate = format(new Date(), 'yyyy-MM-dd')
    } else {
      // Validate the date format
      const parsed = parse(params.date, 'yyyy-MM-dd', new Date())
      if (isNaN(parsed.getTime())) {
        redirect('/dashboard')
      }
      entryDate = params.date
    }
  } catch {
    redirect('/dashboard')
  }

  const entry = await getJournalEntry(user.id, entryDate)

  return (
    <JournalEditor 
      initialEntry={entry}
      entryDate={entryDate}
      userId={user.id}
    />
  )
}
