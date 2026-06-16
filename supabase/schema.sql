-- ============================================================
-- Portfolio Database Schema
-- ============================================================

-- 1. Profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  hero_tagline TEXT,
  email TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  content TEXT,
  thumbnail_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  status TEXT DEFAULT 'completed',
  github_url TEXT,
  live_url TEXT,
  docs_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  timeline TEXT,
  role TEXT,
  challenges TEXT,
  outcomes TEXT,
  future_improvements TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Project Images
CREATE TABLE public.project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Skills
CREATE TABLE public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon_url TEXT,
  proficiency INTEGER DEFAULT 50,
  years_experience NUMERIC(3,1) DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Certificates
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE,
  credential_id TEXT,
  verification_url TEXT,
  badge_url TEXT,
  skills_gained TEXT[] DEFAULT '{}',
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Experiences
CREATE TABLE public.experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  type TEXT DEFAULT 'work',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Social Links
CREATE TABLE public.social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Analytics
CREATE TABLE public.analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  event_type TEXT DEFAULT 'page_view',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Contact Messages
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Badges (visual achievement badges from platforms like HackTheBox, Credly, etc.)
CREATE TABLE public.badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  badge_url TEXT,
  earned_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_featured ON public.projects(featured);
CREATE INDEX idx_projects_category ON public.projects(category_id);
CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_certificates_category ON public.certificates(category);
CREATE INDEX idx_badges_issuer ON public.badges(issuer);
CREATE INDEX idx_analytics_page ON public.analytics(page);
CREATE INDEX idx_analytics_created ON public.analytics(created_at);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public project_images are viewable by everyone" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public certificates are viewable by everyone" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public social_links are viewable by everyone" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public badges are viewable by everyone" ON public.badges FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Authenticated users can insert profiles" ON public.profiles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update profiles" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Authenticated users can manage projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage project_images" ON public.project_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage social_links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage badges" ON public.badges FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can insert analytics" ON public.analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view analytics" ON public.analytics FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view contact_messages" ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update contact_messages" ON public.contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================
-- Seed: Categories
-- ============================================================

INSERT INTO public.categories (name, slug) VALUES
  ('AI', 'ai'),
  ('SaaS', 'saas'),
  ('Automation', 'automation'),
  ('Full Stack', 'full-stack'),
  ('Mobile', 'mobile'),
  ('UI/UX', 'ui-ux');

-- ============================================================
-- Seed: Projects (6 projects, 3 featured)
-- ============================================================

INSERT INTO public.projects (title, slug, description, content, tech_stack, featured, status, role, timeline, github_url, live_url, sort_order) VALUES
(
  'LawLens AI',
  'lawlens-ai',
  'AI-powered legal document analysis platform with RAG-based chat, clause-level comparison, and intelligent document ingestion pipeline.',
  '## Problem Statement

Legal professionals spend countless hours manually reviewing contracts and identifying key clauses. LawLens AI automates this process using retrieval-augmented generation (RAG) to provide instant, accurate answers grounded in the actual document text.

## Architecture

The system uses a multi-stage pipeline:
1. **Document Ingestion** — PDF/DOCX files are chunked, embedded using OpenAI ada-002, and stored in a PostgreSQL vector database
2. **RAG Chat** — User queries are embedded and matched against document chunks using cosine similarity, then fed as context to GPT-4
3. **Clause Comparison** — Side-by-side diff view highlights differences between two document versions at the clause level

## Key Features

- Real-time streaming chat responses via Server-Sent Events
- Document upload with automatic chunking and embedding
- Multi-document comparison with clause-level highlighting
- Citation tracking — every AI response links back to source paragraphs
- Role-based access control for team collaboration

## Technical Challenges

The biggest challenge was handling large documents (100+ pages) without exceeding token limits. I implemented a sliding-window chunking strategy with 200-token overlap to maintain context across chunk boundaries. The vector search uses HNSW indexes for sub-50ms retrieval.

## Outcomes

- Reduced document review time by ~70% in user testing
- Achieved 94% accuracy on clause identification benchmarks
- Handles documents up to 500 pages with consistent performance',
  ARRAY['Next.js', 'Supabase', 'OpenAI', 'PostgreSQL', 'N8N', 'TypeScript'],
  true,
  'completed',
  'Full-Stack Developer',
  'Jan 2024 – Mar 2024',
  'https://github.com',
  'https://example.com',
  1
),
(
  'ArcStone Studios',
  'arcstone-studios',
  'Premium creative agency website featuring kinetic typography, parallax scroll effects, and a lead generation pipeline powered by N8N automation.',
  '## Problem Statement

ArcStone Studios needed a website that matched the energy of their creative work — bold, kinetic, and unforgettable. Traditional agency templates felt generic and lifeless.

## Design Philosophy

Every element moves. Marquees scroll endlessly, hero text scales with viewport width, cards flood with color on hover. The design uses a strict black-and-yellow palette with Space Grotesk typography for maximum visual impact.

## Key Features

- Viewport-width kinetic typography using clamp() for fluid scaling
- Infinite scrolling marquees for stats and testimonials
- Parallax scroll effects on hero sections
- Automated lead capture pipeline (form → N8N → CRM → email notification)
- SEO-optimized with dynamic sitemap and structured data

## Technical Implementation

Built with Next.js 14 App Router for SSR/SSG hybrid rendering. Framer Motion handles all animations with careful attention to `prefers-reduced-motion` for accessibility. The contact form feeds into an N8N workflow that creates CRM entries and sends Slack notifications.

## Results

- 40% increase in lead form submissions compared to previous site
- Lighthouse score: 98 Performance, 100 Accessibility
- Average session duration increased by 2.3x',
  ARRAY['Next.js', 'Framer Motion', 'Tailwind CSS', 'N8N', 'TypeScript'],
  true,
  'completed',
  'Lead Developer & Designer',
  'Nov 2023 – Jan 2024',
  'https://github.com',
  'https://example.com',
  2
),
(
  'Oxford School Portal',
  'oxford-school-portal',
  'Full-stack school management platform with admin dashboard, event calendar, document repository, and automated admission enquiry handling.',
  '## Problem Statement

Oxford English High School relied on manual processes for managing notices, events, gallery updates, and admission enquiries. The school needed a digital platform that non-technical staff could manage independently.

## Architecture

A Next.js application with Supabase backend providing:
- **Public Website** — School information, events, gallery, and admission form
- **Admin Dashboard** — Protected interface for managing all content
- **Automation** — WhatsApp integration for admission enquiries

## Key Features

- Dynamic event calendar with RSVP tracking
- Document repository with categorized downloads (circulars, forms, reports)
- Photo gallery with album management
- Admission enquiry form with automated WhatsApp notifications
- Notice board with publish/unpublish scheduling

## Admin Dashboard

The admin panel allows school staff to:
- Create, edit, and delete notices with rich text
- Manage events with date/time, location, and descriptions
- Upload and organize gallery photos into albums
- View and respond to admission enquiries
- Upload documents to categorized repositories

## Outcomes

- Eliminated 15+ hours/week of manual administrative work
- Admission enquiry response time reduced from 48hrs to 2hrs
- 100% of school notices now distributed digitally',
  ARRAY['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
  true,
  'completed',
  'Full-Stack Developer',
  'May 2024 – Jun 2024',
  'https://github.com',
  'https://example.com',
  3
),
(
  'TaskFlow',
  'taskflow',
  'Real-time collaborative task management SaaS with Kanban boards, team workspaces, and automated workflow triggers.',
  '## Overview

TaskFlow is a project management tool designed for small teams. It features real-time Kanban boards with drag-and-drop, team workspaces with role-based permissions, and automated triggers that fire when tasks change status.

## Key Features

- Real-time Kanban boards with optimistic UI updates
- Team workspaces with invite system
- Automated workflows (e.g., notify Slack when task moves to "Done")
- Time tracking per task
- Dashboard with team analytics

## Tech Stack

Built with Next.js, Supabase Realtime for live updates, and a custom drag-and-drop system using dnd-kit.',
  ARRAY['Next.js', 'Supabase', 'dnd-kit', 'TypeScript', 'Tailwind CSS'],
  false,
  'completed',
  'Solo Developer',
  'Aug 2023 – Oct 2023',
  'https://github.com',
  NULL,
  4
),
(
  'DevLog',
  'devlog',
  'A developer blogging platform with MDX support, code syntax highlighting, reading time estimates, and an RSS feed.',
  '## Overview

DevLog is a minimalist blogging platform built for developers. It supports MDX for rich content authoring, has automatic syntax highlighting for 50+ languages, and generates RSS feeds for subscribers.

## Key Features

- MDX-powered blog posts with custom components
- Automatic syntax highlighting with Shiki
- Reading time estimation
- Tag-based filtering and search
- RSS feed generation
- Dark mode with system preference detection',
  ARRAY['Next.js', 'MDX', 'Shiki', 'Tailwind CSS', 'TypeScript'],
  false,
  'in-progress',
  'Solo Developer',
  'Mar 2024 – Present',
  'https://github.com',
  NULL,
  5
),
(
  'FitTrack Mobile',
  'fittrack-mobile',
  'Cross-platform fitness tracking app with workout logging, progress charts, and personalized AI-generated training plans.',
  '## Overview

FitTrack is a React Native fitness app that tracks workouts, visualizes progress over time, and uses AI to generate personalized training plans based on user goals and history.

## Key Features

- Workout logging with exercise database
- Progress charts and personal records
- AI-generated weekly training plans
- Social features — share PRs with friends
- Offline-first architecture with sync',
  ARRAY['React Native', 'Expo', 'Supabase', 'OpenAI', 'TypeScript'],
  false,
  'completed',
  'Mobile Developer',
  'Jun 2023 – Aug 2023',
  'https://github.com',
  NULL,
  6
);

-- ============================================================
-- Seed: Skills (18 skills across 6 categories)
-- ============================================================

INSERT INTO public.skills (name, category, proficiency, years_experience, sort_order) VALUES
  ('React', 'Frontend', 90, 3.0, 1),
  ('Next.js', 'Frontend', 92, 2.5, 2),
  ('TypeScript', 'Frontend', 88, 2.5, 3),
  ('Tailwind CSS', 'Frontend', 95, 3.0, 4),
  ('Framer Motion', 'Frontend', 80, 1.5, 5),
  ('HTML / CSS', 'Frontend', 95, 4.0, 6),
  ('Node.js', 'Backend', 85, 2.5, 1),
  ('PostgreSQL', 'Backend', 82, 2.0, 2),
  ('Supabase', 'Backend', 90, 2.0, 3),
  ('REST APIs', 'Backend', 88, 2.5, 4),
  ('Express', 'Backend', 78, 2.0, 5),
  ('OpenAI API', 'AI & Automation', 80, 1.0, 1),
  ('RAG Pipelines', 'AI & Automation', 75, 1.0, 2),
  ('N8N', 'AI & Automation', 82, 1.5, 3),
  ('LangChain', 'AI & Automation', 70, 0.5, 4),
  ('Vercel', 'Cloud & DevOps', 90, 2.5, 1),
  ('Docker', 'Cloud & DevOps', 72, 1.0, 2),
  ('GitHub Actions', 'Cloud & DevOps', 78, 1.5, 3);

-- ============================================================
-- Seed: Certificates (4 certificates)
-- ============================================================

INSERT INTO public.certificates (title, issuer, issue_date, credential_id, verification_url, category, skills_gained, sort_order) VALUES
(
  'AWS Cloud Practitioner',
  'Amazon Web Services',
  '2024-03-15',
  'AWS-CP-2024-XXXXX',
  'https://aws.amazon.com/verification',
  'Cloud',
  ARRAY['AWS', 'Cloud Architecture', 'IAM', 'S3', 'EC2'],
  1
),
(
  'Meta Frontend Developer Professional Certificate',
  'Meta (Coursera)',
  '2023-11-20',
  'META-FE-2023-XXXXX',
  'https://coursera.org/verify',
  'Frontend',
  ARRAY['React', 'JavaScript', 'UI/UX', 'Testing', 'Version Control'],
  2
),
(
  'Google IT Automation with Python',
  'Google (Coursera)',
  '2023-08-10',
  'GOOG-ITA-2023-XXXXX',
  'https://coursera.org/verify',
  'Automation',
  ARRAY['Python', 'Automation', 'Git', 'Cloud', 'Debugging'],
  3
),
(
  'IBM Data Science Professional Certificate',
  'IBM (Coursera)',
  '2023-06-05',
  'IBM-DS-2023-XXXXX',
  'https://coursera.org/verify',
  'AI',
  ARRAY['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
  4
);

-- ============================================================
-- Seed: Experiences (4 entries — 2 work, 1 education, 1 leadership)
-- ============================================================

INSERT INTO public.experiences (title, organization, description, start_date, end_date, is_current, type, sort_order) VALUES
(
  'Full-Stack Developer',
  'Freelance',
  'Building production-grade web applications for clients using Next.js, Supabase, and AI integrations. Delivered 10+ projects including school management systems, legal tech platforms, and creative agency websites.',
  '2023-06-01',
  NULL,
  true,
  'work',
  1
),
(
  'Frontend Developer Intern',
  'Tech Startup',
  'Implemented responsive UI components and helped establish the company design system. Built reusable React component library used across 3 products. Improved page load times by 40% through code splitting and lazy loading.',
  '2022-09-01',
  '2023-05-31',
  false,
  'work',
  2
),
(
  'Bachelor of Technology — Computer Science',
  'University of Technology',
  'Focused on software engineering, data structures, algorithms, and web technologies. Graduated with distinction. Completed capstone project on AI-powered document analysis.',
  '2021-08-01',
  '2025-06-30',
  false,
  'education',
  3
),
(
  'Technical Lead — College Tech Club',
  'University Tech Society',
  'Led a team of 10 developers building open-source tools for the student community. Organized 5 hackathons with 200+ participants. Mentored junior developers on React and TypeScript best practices.',
  '2023-01-01',
  '2024-12-31',
  false,
  'leadership',
  4
);

-- ============================================================
-- Seed: Badges (visual achievement badges)
-- ============================================================

INSERT INTO public.badges (title, issuer, description, image_url, badge_url, earned_date, sort_order) VALUES
(
  'Academician',
  'Hack The Box Academy',
  'Earned for completing the Intro to Academy module — first stop in HTB Academy to become acquainted with the platform and its learning process.',
  'https://academy.hackthebox.com/storage/badges/academician.png',
  'https://academy.hackthebox.com/achievement/badge/fc087557-3885-11ee-acfc-bea50ffe6cb4',
  '2023-08-11',
  1
),
(
  'Humanoid',
  'Hack The Box Academy',
  'Earned for completing the Brief Intro to Hardware Attacks module — covering Bluetooth risks, Cryptanalysis Side-Channel Attacks, and vulnerabilities like Spectre and Meltdown.',
  'https://academy.hackthebox.com/storage/badges/a6fe6c6e23b919c7a41fa3ec144d3a82/logo.png',
  'https://academy.hackthebox.com/achievement/badge/f9883e20-3ad6-11ee-acfc-bea50ffe6cb4',
  '2023-08-14',
  2
),
(
  'Cyber Rookie 365',
  'Hack The Box Academy',
  'Milestone badge awarded after one year of continuous learning at HTB Academy.',
  'https://academy.hackthebox.com/storage/badges/60fc416b5eec425a6451aeb1e50d14e4/logo.png',
  'https://academy.hackthebox.com/achievement/badge/b8d8bc79-a333-11ef-864f-bea50ffe6cb4',
  '2024-11-15',
  3
),
(
  'Binary Duo Explorer',
  'Hack The Box Academy',
  'Milestone badge awarded after two years of continuous learning at HTB Academy.',
  'https://academy.hackthebox.com/storage/badges/0d982edba15037e6d52d54eaa7f0209a/logo.png',
  'https://academy.hackthebox.com/achievement/badge/c46e5729-775a-11f0-9254-bea50ffe6cb4',
  '2025-08-12',
  4
);
