export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          username: string | null
          preferred_background: string
          theme: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username?: string | null
          preferred_background?: string
          theme?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string | null
          preferred_background?: string
          theme?: string
          created_at?: string
          updated_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          title: string | null
          content: string
          content_plain: string
          entry_date: string
          word_count: number
          created_at: string
          updated_at: string
          is_deleted: boolean
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          content: string
          content_plain: string
          entry_date: string
          word_count?: number
          created_at?: string
          updated_at?: string
          is_deleted?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          content?: string
          content_plain?: string
          entry_date?: string
          word_count?: number
          created_at?: string
          updated_at?: string
          is_deleted?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
