import { redirect } from 'next/navigation'
import { format } from 'date-fns'

export default function NewJournalPage() {
  const today = format(new Date(), 'yyyy-MM-dd')
  redirect(`/journal/${today}`)
}
