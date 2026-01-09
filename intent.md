# JotDown - Intent Document

## Problem Statement

Modern life is cluttered with information overload, constant distractions, and the overwhelming fear of the unknown. People struggle with:
- **Mental Clutter**: Thoughts, worries, and ideas scattered without organization
- **Lack of Clarity**: Difficulty processing emotions, decisions, and life events
- **Decision Paralysis**: Too many choices and tools leading to cognitive overload
- **Lost Progress**: Inability to track personal growth and reflect on past experiences
- **Stress and Anxiety**: The fear of the unknown without a structured way to process it

## Solution

JotDown is a minimalist journaling webapp designed to help users declutter their minds, gain clarity, and make progress in life. By providing a distraction-free writing environment with carefully curated minimal tools, users can focus on the act of journaling itself rather than getting lost in formatting options.

### Core Philosophy
- **Minimalism First**: Reduce cognitive load by limiting choices
- **Nature-Inspired**: Calming scenic backgrounds to create a peaceful writing environment
- **Progress Tracking**: Date-based organization to see growth over time
- **Future Intelligence**: AI-powered insights (post-MVP) to help users understand patterns and get actionable advice

## Features

### MVP Features

1. **Minimalist Rich Text Editor**
   - Essential formatting only:
     - 4 carefully chosen font colors (for emphasis, not distraction)
     - Text highlighting (limited palette)
     - Handful of curated fonts (2-3 options max)
     - Bold and Italics
     - Clean, distraction-free interface
   - Auto-save functionality
   - Word count indicator

2. **Beautiful Nature Backgrounds**
   - Scenic backgrounds from nature (mountains, forests, oceans, sunsets)
   - Subtle, non-distracting visuals
   - Option to change background (limited selection to avoid decision fatigue)
   - Dark/light mode support

3. **Date-Based Journal Organization**
   - Automatic date tagging for each journal entry
   - Calendar view to navigate entries
   - Chronological list view
   - Search functionality (basic - by date and keywords)
   - User-friendly, uncluttered navigation

4. **User Authentication**
   - Secure sign-up and login
   - Session management
   - Private journals (each user's data is isolated)

5. **Entry Management**
   - Create new journal entries
   - Edit existing entries
   - Delete entries (with confirmation)
   - View entry history

### Upcoming Features (Post-MVP)

#### 🤖 AI-Powered Insights (Coming Soon)
1. **AI Journal Assistant**
   - **Smart Summarization**: Automatically summarize long journal entries into key insights
   - **Pattern Recognition**: Identify recurring themes, emotions, and topics across entries
   - **Mood Analysis**: Track emotional patterns and mood trends over time
   - **Actionable Insights**: Generate personalized recommendations based on journal content
   - **Conversational Interface**: Chat with your journal - ask questions like "What was I worried about last month?" or "Show me entries about gratitude"
   - **Reflection Prompts**: AI-generated prompts based on your writing patterns
   - **Goal Tracking**: Help identify and track progress toward personal goals mentioned in journals
   - **Sentiment Analysis**: Visual representation of emotional journey over time

2. **Export Functionality**
   - Export journals as PDF (beautifully formatted)
   - Export as markdown/text
   - Backup and restore
   - Print-friendly layouts

3. **Tags and Categories**
   - Organize entries by custom tags
   - Filter by categories
   - Smart tag suggestions based on content

4. **Reminders and Prompts**
   - Daily journaling reminders (customizable)
   - Thought-provoking prompts
   - Gratitude prompts
   - AI-generated personalized prompts

## UI/UX Design System

### Design Philosophy
- **Minimalism with Impact**: Clean, uncluttered interfaces that feel premium and intentional
- **Nature-Inspired Aesthetics**: Organic shapes, natural color palettes, and calming visuals
- **Focus-Driven**: Every element serves a purpose; nothing is decorative
- **Emotional Connection**: Design that feels warm, inviting, and safe for personal reflection
- **Progressive Disclosure**: Show only what's needed, when it's needed

### Color Schema

#### Light Mode Palette
- **Primary Background**: `#FAF9F6` (Warm off-white, paper-like)
- **Secondary Background**: `#FFFFFF` (Pure white for cards/containers)
- **Primary Text**: `#1A1A1A` (Deep charcoal, high contrast)
- **Secondary Text**: `#6B7280` (Soft gray for less important text)
- **Accent Primary**: `#4F46E5` (Indigo - calm, trustworthy)
- **Accent Secondary**: `#10B981` (Emerald green - growth, nature)
- **Accent Tertiary**: `#F59E0B` (Amber - warmth, energy)
- **Accent Quaternary**: `#EF4444` (Red - emphasis, important notes)
- **Border/Divider**: `#E5E7EB` (Light gray, subtle separation)
- **Highlight Background**: `#FEF3C7` (Soft yellow highlight)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Blue)

#### Dark Mode Palette
- **Primary Background**: `#0F172A` (Deep slate, night sky)
- **Secondary Background**: `#1E293B` (Slate for cards/containers)
- **Primary Text**: `#F8FAFC` (Off-white, comfortable reading)
- **Secondary Text**: `#94A3B8` (Muted blue-gray)
- **Accent Primary**: `#6366F1` (Brighter indigo for dark mode)
- **Accent Secondary**: `#34D399` (Brighter emerald)
- **Accent Tertiary**: `#FBBF24` (Brighter amber)
- **Accent Quaternary**: `#F87171` (Softer red for dark mode)
- **Border/Divider**: `#334155` (Dark slate border)
- **Highlight Background**: `#78350F` (Dark amber highlight)
- **Success**: `#34D399` (Bright green)
- **Warning**: `#FBBF24` (Bright amber)
- **Error**: `#F87171` (Soft red)
- **Info**: `#60A5FA` (Bright blue)

#### Nature Background Overlay
- All nature backgrounds use a subtle overlay (20-30% opacity) to ensure text readability
- Overlay color: Light mode - `rgba(250, 249, 246, 0.85)`, Dark mode - `rgba(15, 23, 42, 0.75)`

### Typography

#### Font Families
- **Primary Font**: Inter or System UI (Clean, modern, highly readable)
- **Editor Font**: Georgia or Merriweather (Serif for journal writing, feels more personal)
- **Monospace**: JetBrains Mono (For code snippets if needed, minimal use)

#### Type Scale
- **Hero/Display**: 48px (3rem) - Landing page headlines
- **H1**: 36px (2.25rem) - Page titles
- **H2**: 30px (1.875rem) - Section headers
- **H3**: 24px (1.5rem) - Subsection headers
- **H4**: 20px (1.25rem) - Card titles
- **Body Large**: 18px (1.125rem) - Important body text
- **Body**: 16px (1rem) - Default body text
- **Body Small**: 14px (0.875rem) - Secondary text, captions
- **Caption**: 12px (0.75rem) - Labels, metadata

#### Font Weights
- **Light**: 300 (Rare use, for large display text)
- **Regular**: 400 (Default body text)
- **Medium**: 500 (Emphasis, buttons)
- **Semibold**: 600 (Headings, important labels)
- **Bold**: 700 (Strong emphasis, rarely used)

### UI Components

#### 1. Navigation Bar
- **Style**: Minimal, floating or fixed top
- **Height**: 64px
- **Background**: Semi-transparent with backdrop blur (glassmorphism)
- **Elements**: Logo (left), User menu (right), Theme toggle
- **Behavior**: Auto-hide on scroll down, show on scroll up (journal page)

#### 2. Journal Editor
- **Layout**: Full-screen or centered container (max-width: 900px)
- **Background**: Nature image with overlay
- **Editor Container**: 
  - Rounded corners: 12px
  - Padding: 48px (desktop), 24px (mobile)
  - Subtle shadow for depth
  - Semi-transparent background for text area
- **Toolbar**: 
  - Floating toolbar (appears on text selection)
  - Minimal icons, clear labels
  - Smooth fade-in animation
  - 4 color options in circular buttons
  - Font selector (dropdown, 2-3 options)
- **Text Area**:
  - Line height: 1.8 (comfortable reading)
  - Font size: 18px (body large)
  - Focus state: Subtle border glow
  - Placeholder: Gentle, inspiring text

#### 3. Buttons
- **Primary Button**:
  - Background: Accent primary color
  - Text: White
  - Padding: 12px 24px
  - Border radius: 8px
  - Hover: Slight scale (1.02) and shadow
  - Transition: 200ms ease
- **Secondary Button**:
  - Background: Transparent
  - Border: 1px solid border color
  - Text: Primary text color
  - Same padding and radius as primary
- **Icon Button**:
  - Circular or square (40px)
  - Transparent background
  - Icon only, no text
  - Hover: Background color appears

#### 4. Cards
- **Journal Entry Card**:
  - Background: Secondary background color
  - Border radius: 12px
  - Padding: 20px
  - Shadow: Subtle (0 2px 8px rgba(0,0,0,0.08))
  - Hover: Slight lift (translateY -2px) and stronger shadow
  - Border: 1px solid border color (optional)
- **Date Badge**: 
  - Small pill-shaped badge
  - Accent color background
  - White text
  - Padding: 4px 12px

#### 5. Calendar View
- **Grid Layout**: 7 columns (days of week)
- **Day Cell**:
  - Square or rounded rectangle
  - Hover: Accent color border
  - Active/Selected: Accent background
  - Has Entry: Small dot indicator
- **Month Navigation**: 
  - Arrow buttons (left/right)
  - Current month display (centered)
  - Smooth transitions

#### 6. Input Fields
- **Text Input**:
  - Border: 1px solid border color
  - Border radius: 8px
  - Padding: 12px 16px
  - Focus: Border color changes to accent, subtle glow
  - Placeholder: Secondary text color
- **Textarea**: Same as input, but resizable

#### 7. Modal/Dialog
- **Overlay**: Dark backdrop (rgba(0,0,0,0.5)) with blur
- **Container**: 
  - Centered on screen
  - Max-width: 500px
  - Background: Secondary background
  - Border radius: 16px
  - Padding: 32px
  - Shadow: Large, soft shadow
- **Animation**: Fade in + scale up (0.95 to 1.0)

#### 8. Toast Notifications
- **Position**: Top-right or bottom-right
- **Style**: 
  - Rounded corners: 8px
  - Padding: 16px 20px
  - Shadow: Medium shadow
  - Icon + message
- **Animation**: Slide in from right, fade out
- **Duration**: 3-5 seconds

### Layout Principles

#### Spacing System (8px base unit)
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)

#### Grid System
- **Container Max Width**: 1280px (desktop)
- **Content Width**: 900px (journal editor)
- **Sidebar Width**: 280px (if needed)
- **Gutters**: 24px (desktop), 16px (tablet), 12px (mobile)

#### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

### Visual Hierarchy

1. **Primary Actions**: Large, prominent, accent color
2. **Secondary Actions**: Medium size, outlined or subtle
3. **Tertiary Actions**: Small, text-based, minimal styling
4. **Content**: Clear typography hierarchy, adequate spacing
5. **Navigation**: Always accessible but not distracting

### Micro-Interactions & Animations

#### Principles
- **Purposeful**: Every animation serves a function
- **Subtle**: Never distracting from content
- **Smooth**: 60fps, use CSS transforms and opacity
- **Fast**: Most animations 200-300ms

#### Specific Animations
- **Page Transitions**: Fade (200ms)
- **Button Hover**: Scale 1.02 + shadow increase (200ms)
- **Card Hover**: TranslateY -2px + shadow (200ms)
- **Modal Open**: Fade + scale 0.95→1.0 (300ms)
- **Toast**: Slide in from right (300ms)
- **Loading**: Skeleton screens or subtle pulse
- **Auto-save Indicator**: Fade in/out (150ms)
- **Text Selection**: Toolbar slides up smoothly (200ms)

### Nature Backgrounds

#### Background Options (6-8 curated options)
1. **Mountain Sunrise**: Warm oranges and pinks
2. **Forest Path**: Deep greens, dappled light
3. **Ocean Waves**: Calming blues and teals
4. **Desert Dunes**: Warm beiges and golds
5. **Mountain Lake**: Crisp blues and whites
6. **Autumn Forest**: Rich oranges and reds
7. **Misty Mountains**: Soft grays and blues
8. **Beach Sunset**: Warm purples and oranges

#### Background Implementation
- High-quality, royalty-free images
- Subtle overlay for text readability
- Blur option for extra focus
- Parallax effect (optional, subtle)
- Smooth transitions when changing backgrounds

### Accessibility

- **WCAG 2.1 AA Compliance**: Minimum standard
- **Color Contrast**: All text meets 4.5:1 ratio (body), 3:1 (large text)
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **Focus Indicators**: Clear, visible focus states
- **Font Scaling**: Respects user's browser font size preferences
- **Reduced Motion**: Respects `prefers-reduced-motion`

### Responsive Design

#### Mobile (< 640px)
- Single column layout
- Stacked navigation
- Full-width editor
- Touch-friendly buttons (min 44px)
- Simplified toolbar
- Bottom sheet for modals

#### Tablet (640px - 1024px)
- Two-column layout (optional)
- Sidebar can collapse
- Medium-sized editor
- Touch and mouse support

#### Desktop (> 1024px)
- Full feature set
- Multi-column layouts
- Hover states active
- Keyboard shortcuts
- Larger editor width

### Component States

#### Interactive States
- **Default**: Base styling
- **Hover**: Subtle elevation, color change
- **Active/Pressed**: Slight scale down (0.98)
- **Focus**: Border/outline highlight
- **Disabled**: Reduced opacity (0.5), no interaction
- **Loading**: Skeleton or spinner

#### Editor States
- **Empty**: Placeholder text, subtle CTA
- **Writing**: Auto-save indicator, word count
- **Saved**: Brief confirmation (checkmark)
- **Error**: Red border, error message
- **Syncing**: Subtle loading indicator

### Design Tokens (Implementation Reference)

```css
/* Colors */
--color-primary-bg: #FAF9F6;
--color-primary-text: #1A1A1A;
--color-accent-primary: #4F46E5;
--color-accent-secondary: #10B981;

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;

/* Typography */
--font-primary: 'Inter', system-ui;
--font-editor: 'Georgia', serif;
--font-size-body: 16px;
--line-height-body: 1.8;

/* Borders */
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 12px;
--border-radius-xl: 16px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router) - for SSR, routing, and optimal performance
- **UI Library**: React 18+
- **Styling**: Tailwind CSS - for rapid, responsive design
- **Rich Text Editor**: Tiptap or Slate.js - lightweight, customizable editor
- **Icons**: Lucide React or Heroicons
- **Date Handling**: date-fns
- **State Management**: React Context API / Zustand (if needed)

### Backend
- **Backend as a Service**: Supabase
  - Authentication (Supabase Auth)
  - Database (PostgreSQL)
  - Real-time subscriptions (for future features)
  - Storage (for future image uploads)

### Deployment
- **Frontend**: Vercel
- **Database**: Supabase (hosted PostgreSQL)
- **Environment Variables**: Vercel environment variables for Supabase keys

### Development Tools
- **Language**: TypeScript
- **Package Manager**: npm or pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git

## Database Schema

### Tables

#### 1. `users` (Supabase Auth - managed automatically)
- `id` (UUID, Primary Key) - Auto-generated by Supabase
- `email` (String, Unique)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### 2. `user_profiles` (Custom table)
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users.id, Unique)
- `username` (String, Optional)
- `preferred_background` (String, Default: 'default')
- `theme` (String, Default: 'light') - 'light' or 'dark'
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### 3. `journal_entries`
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users.id)
- `title` (String, Optional) - Auto-generated from date or user-defined
- `content` (Text) - Rich text content (JSON or HTML)
- `content_plain` (Text) - Plain text version for search
- `entry_date` (Date) - The date the entry is for (not necessarily created_at)
- `word_count` (Integer, Default: 0)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)
- `is_deleted` (Boolean, Default: false) - Soft delete

#### 4. `entry_metadata` (Optional - for future features)
- `id` (UUID, Primary Key)
- `entry_id` (UUID, Foreign Key → journal_entries.id)
- `mood` (String, Optional)
- `tags` (String Array, Optional)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Indexes
- `journal_entries.user_id` - For fast user queries
- `journal_entries.entry_date` - For date-based queries
- `journal_entries.created_at` - For chronological sorting
- `journal_entries.user_id + entry_date` - Composite index for unique date per user

### Row Level Security (RLS) Policies
- Users can only read/write their own journal entries
- Users can only read/update their own profile
- Public access disabled for all tables

## Routes/Pages

### Public Routes
- `/` - Landing page (marketing/homepage)
- `/login` - User login
- `/signup` - User registration
- `/forgot-password` - Password reset

### Protected Routes (Require Authentication)
- `/dashboard` - Main dashboard/calendar view
- `/journal` - Journal writing interface (main app)
- `/journal/[date]` - View/edit specific journal entry by date
- `/journal/new` - Create new journal entry
- `/entries` - List view of all entries
- `/settings` - User settings (background preference, theme, etc.)

### API Routes (Next.js API Routes)
- `/api/auth/callback` - Supabase auth callback
- `/api/entries` - CRUD operations for journal entries
  - `GET /api/entries` - Get all entries for user
  - `GET /api/entries/[id]` - Get specific entry
  - `POST /api/entries` - Create new entry
  - `PUT /api/entries/[id]` - Update entry
  - `DELETE /api/entries/[id]` - Soft delete entry
- `/api/profile` - User profile management
  - `GET /api/profile` - Get user profile
  - `PUT /api/profile` - Update user profile

## User Flow

1. **Onboarding**
   - User visits landing page
   - Signs up or logs in
   - Redirected to dashboard

2. **Journaling**
   - User clicks "New Entry" or selects a date
   - Opens journal editor with nature background
   - Writes with minimal formatting tools
   - Auto-saves periodically
   - Saves entry (linked to date)

3. **Reviewing**
   - User navigates calendar or list view
   - Selects past entry to view/edit
   - Can search entries

4. **Settings**
   - User can change background preference
   - Toggle dark/light mode
   - Update profile

## Success Metrics (Future)

- Daily Active Users (DAU)
- Journal entries created per user
- Average session duration
- User retention rate
- Word count per entry (engagement metric)

## Security Considerations

- All data encrypted in transit (HTTPS)
- Row Level Security (RLS) on all tables
- Secure authentication via Supabase Auth
- Input sanitization for rich text content
- Rate limiting on API routes
- Environment variables for sensitive keys

## Deployment Checklist

- [ ] Set up Supabase project
- [ ] Configure database schema and RLS policies
- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)
- [ ] Set up error tracking (optional)

---

**Project Name**: JotDown  
**Tagline**: "Declutter your mind, gain clarity, make progress"  
**Version**: MVP 1.0
