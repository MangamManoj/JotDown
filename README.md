# JotDown

A minimalist journaling webapp designed to help users declutter their minds, gain clarity, and make progress in life.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase/schema.sql`
   - Copy your project URL and anon key from Settings → API

3. Set up environment variables:
   - Create `.env.local` file in the root directory
   - Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Install Tiptap dependencies (if not already installed):
```bash
npm install
```

5. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Rich Text Editor**: Tiptap
- **Backend**: Supabase (Auth + Database)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Vercel (recommended)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, signup, etc.)
│   ├── dashboard/         # Main dashboard
│   ├── journal/           # Journal editor pages
│   ├── entries/           # List of all entries
│   └── settings/          # User settings
├── components/            # React components
│   ├── JournalEditor.tsx # Main rich text editor
│   └── ...
├── lib/                   # Utility functions and Supabase client
│   ├── supabase/         # Supabase client configurations
│   └── utils.ts          # Helper functions
├── supabase/             # Database schema
│   └── schema.sql        # SQL schema for Supabase
└── intent.md             # Project intent and specifications
```

## Features

### MVP Features (Implemented)
- ✅ User authentication (signup, login, password reset)
- ✅ Minimalist rich text editor with essential formatting
- ✅ Auto-save functionality
- ✅ Word count tracking
- ✅ Date-based journal organization
- ✅ Entry management (create, edit, delete)
- ✅ Dashboard with statistics
- ✅ Dark/light theme support
- ✅ Settings page

### Future Features (Post-MVP)
- AI Chat Assistant for insights
- Export functionality (PDF, Markdown)
- Tags and categories
- Reminders and prompts
- Nature background images in editor

## License

Private - All rights reserved
