# Portfolio — Developer Reference

> A production-grade personal portfolio built with **Next.js 15 App Router**, **Supabase**, and a strict **Neo-Brutalist** design system.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Design System](#3-design-system)
4. [Layout Architecture](#4-layout-architecture)
5. [Public Pages](#5-public-pages)
6. [Admin Panel](#6-admin-panel)
7. [Server Actions](#7-server-actions)
8. [Database Schema](#8-database-schema)
9. [Authentication & Security](#9-authentication--security)
10. [UI Components](#10-ui-components)
11. [Environment Variables](#11-environment-variables)
12. [Running Locally](#12-running-locally)

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Animations | Framer Motion |
| Validation | Zod |
| Icons | Lucide React |
| Marquee | react-fast-marquee |
| Markdown | react-markdown + remark-gfm |
| Command Palette | cmdk |
| Deployment | Vercel (target) |

---

## 2. Project Structure

```
Portfolio/
├── middleware.ts               # Route protection (auth guard for /admin)
├── next.config.ts              # Image remote patterns (Supabase, Unsplash, HTB)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — TopBar, BottomNav, Footer
│   │   ├── page.tsx            # Home (Server Component — fetches featured projects)
│   │   ├── home-client.tsx     # Home (Client Component — hero, marquee, animations)
│   │   ├── loading.tsx         # Global skeleton loading state
│   │   ├── error.tsx           # Global error boundary
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── sitemap.ts          # Dynamic sitemap (includes project slugs)
│   │   ├── robots.ts           # robots.txt rules
│   │   ├── globals.css         # Design tokens, base styles, prose styles
│   │   │
│   │   ├── about/              # /about — bio + developer timeline
│   │   ├── projects/           # /projects — filterable card grid
│   │   │   └── [slug]/         # /projects/:slug — case study detail
│   │   ├── skills/             # /skills — grouped skills grid
│   │   ├── certificates/       # /certificates — certs + badges
│   │   ├── resume/             # /resume — interactive resume
│   │   ├── contact/            # /contact — contact form + info
│   │   ├── login/              # /login — Supabase Auth UI
│   │   │
│   │   ├── actions/            # Next.js Server Actions
│   │   │   ├── auth.ts         # login / logout
│   │   │   ├── projects.ts     # CRUD for projects
│   │   │   ├── skills.ts       # CRUD for skills
│   │   │   ├── certificates.ts # CRUD for certificates
│   │   │   ├── badges.ts       # CRUD for badges
│   │   │   ├── experiences.ts  # CRUD for experiences
│   │   │   ├── contact.ts      # Submit contact message + admin read/delete
│   │   │   └── profile.ts      # Upsert profile
│   │   │
│   │   └── admin/              # /admin — protected dashboard
│   │       ├── layout.tsx      # Admin sidebar layout
│   │       ├── page.tsx        # Dashboard with content counts
│   │       ├── projects/       # List / new / edit
│   │       ├── skills/
│   │       ├── certificates/
│   │       ├── badges/
│   │       ├── experiences/
│   │       ├── messages/
│   │       └── profile/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── top-bar.tsx     # Fixed top marquee (name + titles)
│   │   │   ├── bottom-nav.tsx  # Fixed bottom navigation bar
│   │   │   ├── footer.tsx      # Footer (inside scrollable zone)
│   │   │   └── navbar.tsx      # Legacy navbar (not rendered — kept for reference)
│   │   └── ui/
│   │       ├── badge.tsx       # Badge component (4 variants)
│   │       ├── button.tsx      # Button (primary / outline / ghost, CVA-powered)
│   │       ├── card.tsx        # Card + CardHeader/Title/Description/Content/Footer
│   │       ├── input.tsx       # Input + Textarea
│   │       ├── command-menu.tsx # ⌘K command palette
│   │       └── noise-texture.tsx # Fixed noise overlay (opacity 3%)
│   │
│   └── lib/
│       ├── auth.ts             # Shared verifyAuth() helper
│       ├── validations.ts      # Zod schemas for all entities
│       ├── utils.ts            # cn() utility (clsx + tailwind-merge)
│       └── supabase/
│           ├── server.ts       # createClient() for Server Components / Actions
│           └── client.ts       # createClient() for Client Components
```

---

## 3. Design System

### Philosophy — Neo-Brutalism
The entire design is **strictly brutalist**: sharp corners (0px border radius), thick `2px` borders, flat solid fills, and high-contrast hover states. No `rounded-*`, no `backdrop-blur`, no glassmorphism.

### Color Tokens (`globals.css`)

```css
--color-background:        #09090B   /* Near-black */
--color-foreground:        #FAFAFA   /* Off-white */
--color-muted:             #27272A   /* Dark zinc */
--color-muted-foreground:  #A1A1AA   /* Mid zinc */
--color-accent:            #DFE104   /* Acid Yellow — the ONLY accent */
--color-accent-foreground: #000000   /* Black on yellow */
--color-border:            #3F3F46   /* Zinc border */
```

### Border Radius Tokens
All set to `0px` — **no rounding anywhere**.

```css
--radius-sm: 0px;  --radius-md: 0px;
--radius-lg: 0px;  --radius-full: 0px;
```

### Typography
- **Font:** Space Grotesk (Google Fonts) — loaded via `next/font/google`
- **Headings:** `font-bold uppercase tracking-tighter`
- **Labels:** `text-xs font-bold uppercase tracking-widest`

### Hover Pattern
Cards fill to `bg-accent` (`#DFE104`) on hover with text inverting to `text-accent-foreground` (`#000`). This is the universal brutalist interaction.

### Prose (Markdown content)
Custom `.prose-kinetic` class in `globals.css` for project case study markdown content.

---

## 4. Layout Architecture

```
<body>                               ← flex-col, min-h-full
  <NoiseTexture />                   ← fixed, full-screen, opacity 3%
  <TopBar />                         ← FIXED top, h-10 (40px), z-50
  <div flex-col flex-1 pt-10 pb-16> ← THE SCROLLABLE ZONE
    <main flex-1>{children}</main>   ← page content
    <Footer />                       ← always above bottom bar
  </div>
  <BottomNav />                      ← FIXED bottom, h-16 (64px), z-50
  <CommandMenu />                    ← portal overlay, z-100
</body>
```

**Key rule:** `pt-10 pb-16` on the scrollable wrapper ensures content is **never hidden** behind either fixed bar. The footer lives inside this wrapper so it also clears the BottomNav.

### TopBar (`src/components/layout/top-bar.tsx`)
- Fixed, `z-50`, `h-10`, `bg-accent text-accent-foreground`
- Infinite marquee: `AAKASH YADAV ✦ FULL-STACK DEVELOPER ✦ ENGINEER ✦ PROBLEM SOLVER ✦ AVAILABLE FOR WORK ✦`

### BottomNav (`src/components/layout/bottom-nav.tsx`)
- Fixed, `z-50`, `h-16`, `bg-background border-t-2 border-border`
- **Left:** `PORTFOLIO` wordmark
- **Center:** `HOME · ABOUT · PROJECTS · SKILLS · CERTS · RESUME` — active page highlighted in `bg-accent` with small square indicator
- **Right:** `⌘K` search trigger + `HIRE ME` CTA
- Auto-hides on `/admin` routes

### Admin Layout (`src/app/admin/layout.tsx`)
Completely separate from the public layout. Has its own sidebar navigation and does NOT render TopBar / BottomNav / Footer.

---

## 5. Public Pages

Every public page follows this pattern:
- **`page.tsx`** — Async Server Component. Fetches data from Supabase. Has hardcoded fallback data for when Supabase is unavailable or empty.
- **`*-client.tsx`** — `"use client"` component. Receives data as props. Handles animations (Framer Motion) and interactivity.

| Route | Server Component | Client Component | Data Source |
|---|---|---|---|
| `/` | `page.tsx` | `home-client.tsx` | `projects` (featured), `profiles`, `skills`, `certificates` |
| `/about` | `about/page.tsx` | `about-client.tsx` | `profiles`, `experiences` |
| `/projects` | `projects/page.tsx` | `projects-client.tsx` | `projects` |
| `/projects/:slug` | `projects/[slug]/page.tsx` | — (SSR only) | `projects` (by slug) |
| `/skills` | `skills/page.tsx` | `skills-client.tsx` | `skills` |
| `/certificates` | `certificates/page.tsx` | `certificates-client.tsx` | `certificates`, `badges` |
| `/resume` | `resume/page.tsx` | — (SSR only) | `experiences`, `skills`, `profiles` |
| `/contact` | `contact/layout.tsx` (metadata) | `contact/page.tsx` | Server Action: `submitContactMessage` |

### Fallback Strategy
Every page wraps its Supabase calls in `try/catch`. If the DB is down or empty, curated hardcoded fallback data is shown so the portfolio is never blank.

---

## 6. Admin Panel

Protected by `middleware.ts`. Requires Supabase session cookie. Accessible only at `/admin/*`.

| Route | Purpose |
|---|---|
| `/admin` | Dashboard — live counts for all content types |
| `/admin/projects` | List + delete projects |
| `/admin/projects/new` | Create new project |
| `/admin/projects/[id]/edit` | Edit existing project |
| `/admin/skills` | Manage skills |
| `/admin/certificates` | Manage certificates |
| `/admin/badges` | Manage digital badges |
| `/admin/experiences` | Manage work/education/leadership entries |
| `/admin/messages` | View + manage contact form submissions |
| `/admin/profile` | Edit bio, tagline, social links, resume URL |

The admin sidebar is defined in `src/app/admin/layout.tsx` and includes a logout button that calls the `logout` Server Action inline.

---

## 7. Server Actions

All Server Actions live in `src/app/actions/`. Every mutating action (create/update/delete) begins with an auth guard.

### Auth Pattern (enforced on all mutations)

```ts
import { verifyAuth } from "@/lib/auth";

export async function createXxx(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase); // throws if not authenticated
  // ... rest of action
}
```

`verifyAuth` is defined in `src/lib/auth.ts`:
```ts
export async function verifyAuth(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
  return user;
}
```

### Validation Pattern (Zod)

```ts
import { projectSchema } from "@/lib/validations";

const parsed = projectSchema.parse({
  title: formData.get("title") as string,
  // ...
});
// parsed fields are now type-safe and validated
```

### Action Files Summary

| File | Actions |
|---|---|
| `auth.ts` | `login(formData)`, `logout()` |
| `projects.ts` | `createProject(fd)`, `updateProject(id, fd)`, `deleteProject(id)` |
| `skills.ts` | `createSkill(fd)`, `updateSkill(id, fd)`, `deleteSkill(id)` |
| `certificates.ts` | `createCertificate(fd)`, `updateCertificate(id, fd)`, `deleteCertificate(id)` |
| `badges.ts` | `createBadge(fd)`, `updateBadge(id, fd)`, `deleteBadge(id)` |
| `experiences.ts` | `createExperience(fd)`, `updateExperience(id, fd)`, `deleteExperience(id)` |
| `contact.ts` | `submitContactMessage(fd)`, `markMessageRead(id)`, `deleteMessage(id)` |
| `profile.ts` | `updateProfile(fd)` |

---

## 8. Database Schema

### `profiles`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | FK to `auth.users` |
| `full_name` | text | |
| `title` | text | Job title |
| `bio` | text | Used on Home + About |
| `hero_tagline` | text | Short punchline |
| `email` | text | |
| `github_url` | text | |
| `linkedin_url` | text | |
| `resume_url` | text | Link to PDF in Supabase Storage |

### `projects`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `title` | text | |
| `slug` | text | URL-safe unique identifier |
| `description` | text | Short summary |
| `content` | text | Markdown for case study |
| `tech_stack` | text[] | Array of tech names |
| `featured` | boolean | Shows on homepage |
| `thumbnail_url` | text | Supabase Storage URL |
| `status` | text | `completed` \| `in-progress` |
| `github_url` | text | |
| `live_url` | text | |
| `role` | text | Developer's role |
| `timeline` | text | e.g. "Jan 2024 – Mar 2024" |
| `sort_order` | int | Display ordering |

### `skills`
| Column | Type |
|---|---|
| `id` | uuid |
| `name` | text |
| `category` | text |
| `proficiency` | int (0–100) |
| `years_experience` | float |
| `sort_order` | int |

### `certificates`
| Column | Type |
|---|---|
| `id` | uuid |
| `title` | text |
| `issuer` | text |
| `issue_date` | date |
| `credential_id` | text |
| `verification_url` | text |
| `category` | text |
| `skills_gained` | text[] |

### `badges`
| Column | Type |
|---|---|
| `id` | uuid |
| `title` | text |
| `issuer` | text |
| `description` | text |
| `image_url` | text |
| `badge_url` | text |
| `earned_date` | date |

### `experiences`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `title` | text | Job title or degree |
| `organization` | text | Company or institution |
| `description` | text | |
| `start_date` | date | |
| `end_date` | date | null if current |
| `is_current` | boolean | |
| `type` | text | `work` \| `education` \| `leadership` |

### `contact_messages`
| Column | Type |
|---|---|
| `id` | uuid |
| `name` | text |
| `email` | text |
| `subject` | text |
| `message` | text |
| `read` | boolean |
| `created_at` | timestamptz |

---

## 9. Authentication & Security

### Two-Layer Auth

**Layer 1 — Middleware (`middleware.ts`)**
- Runs on every request to `/admin/*` and `/login`
- Reads Supabase session cookie via `@supabase/ssr`
- Redirects unauthenticated users to `/login`
- Redirects logged-in users away from `/login` → `/admin`

**Layer 2 — Server Action Guards**
- Every mutating Server Action calls `await verifyAuth(supabase)` at its first line
- This ensures mutations are impossible even if middleware is bypassed (e.g. direct API calls)

### Supabase Clients
Two separate factory functions:

```ts
// Server Components, Server Actions, Route Handlers
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient(); // reads cookies via next/headers

// Client Components (browser)
import { createClient } from "@/lib/supabase/client";
const supabase = createClient(); // uses env vars directly
```

---

## 10. UI Components

### `<Button>`
Built with `class-variance-authority` (CVA).

| Variant | Style |
|---|---|
| `primary` | `bg-accent text-accent-foreground` — acid yellow, scales on hover |
| `outline` | `border-2 border-border` — fills white on hover, text inverts |
| `ghost` | No border, text turns accent on hover |

Sizes: `sm` (h-10), `default` (h-14), `lg` (h-20), `icon` (h-10 w-10)

### `<Card>`
```tsx
<Card>               // bg-background border-2 border-border — fills accent on hover
  <CardContent />
  <CardTitle />
  <CardDescription />
  <CardFooter />
</Card>
```

### `<Badge>`

| Variant | Style |
|---|---|
| `default` | `border-2 border-border text-foreground` |
| `accent` | `border-accent text-accent bg-accent/10` |
| `muted` | `border-border text-muted-foreground` |
| `outline` | `border-2 border-border bg-transparent` |

### `<Input>` / `<Textarea>`
Borderless underline style: `border-0 border-b-2 border-border`. Turns to `border-accent` on focus.

### `<CommandMenu>`
Triggered by `⌘K` (or `Ctrl+K`). Global keyboard shortcut registered via `document.addEventListener`. Also triggered by the `⌘K` button in BottomNav. Navigates to all public pages.

---

## 11. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

No secret keys are needed for the public site. The anon key is safe to expose — Row Level Security (RLS) on Supabase tables enforces data access rules.

### Image Domains (`next.config.ts`)
Whitelisted for `next/image` optimization:
- `*.supabase.co` — project thumbnails and assets
- `images.unsplash.com` — stock photos
- `academy.hackthebox.com` — HackTheBox badge images

---

## 12. Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Start dev server
npm run dev
# → http://localhost:3000

# 4. Type check
npx tsc --noEmit

# 5. Build for production
npm run build
```

### Admin Access
1. Create a user in Supabase Auth dashboard (or run the `login` action)
2. Navigate to `http://localhost:3000/login`
3. Log in → redirected to `/admin`

### Without Supabase
The site works fully without a configured Supabase instance. All pages fall back to curated hardcoded demo data. The admin panel and contact form require Supabase.

---

## Key Conventions

- **"use client" only when needed** — interactive components (filters, forms, animations) are client; data fetching is server
- **Fallbacks everywhere** — every `try/catch` around Supabase has meaningful fallback data
- **Zod validates before DB** — no raw `formData.get()` values ever hit the database unvalidated
- **`revalidatePath` after mutations** — all Server Actions call `revalidatePath()` to purge Next.js cache
- **`redirect()` ends actions** — create/update actions always redirect after success, never return HTML
- **Admin hides global nav** — `BottomNav` checks `pathname.startsWith("/admin")` and returns `null`
