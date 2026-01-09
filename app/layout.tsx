import type { Metadata } from "next";
import "./globals.css";
import { createClient } from '@/lib/supabase/server'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: "JotDown - Declutter Your Mind, Gain Clarity, Make Progress",
  description: "Transform your thoughts into clarity with JotDown, a minimalist journaling app. Write freely against nature-inspired backgrounds with AI-powered insights coming soon. Your personal sanctuary for reflection and growth.",
  keywords: "journaling, mindfulness, mental clarity, personal growth, diary, self-reflection, AI journaling, digital journal, minimalist app",
  authors: [{ name: "JotDown" }],
  creator: "JotDown",
  publisher: "JotDown",
  openGraph: {
    title: "JotDown - Declutter Your Mind, Gain Clarity, Make Progress",
    description: "Your personal sanctuary for reflection and growth. Write freely with nature-inspired backgrounds and AI-powered insights.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JotDown - Declutter Your Mind, Gain Clarity, Make Progress",
    description: "Transform your thoughts into clarity with JotDown's minimalist journaling experience.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user's theme preference
  let theme = 'light'
  if (user) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('theme')
      .eq('user_id', user.id)
      .single()
    
    if (profile?.theme) {
      theme = profile.theme
    }
  }

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <body>
        <ThemeProvider userId={user?.id} />
        {children}
      </body>
    </html>
  );
}
