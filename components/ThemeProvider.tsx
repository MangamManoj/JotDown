'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ThemeProvider({ userId }: { userId?: string }) {
  useEffect(() => {
    if (!userId) return

    const loadTheme = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('user_profiles')
        .select('theme')
        .eq('user_id', userId)
        .single()

      if (data?.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    loadTheme()
  }, [userId])

  return null
}
