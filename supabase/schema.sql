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

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_featured ON public.projects(featured);
CREATE INDEX idx_projects_category ON public.projects(category_id);
CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_certificates_category ON public.certificates(category);
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

-- Public read access
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public project_images are viewable by everyone" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public certificates are viewable by everyone" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public social_links are viewable by everyone" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

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
CREATE POLICY "Anyone can insert analytics" ON public.analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view analytics" ON public.analytics FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view contact_messages" ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update contact_messages" ON public.contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================
-- Seed default categories
-- ============================================================

INSERT INTO public.categories (name, slug) VALUES
  ('AI', 'ai'),
  ('SaaS', 'saas'),
  ('Automation', 'automation'),
  ('Full Stack', 'full-stack'),
  ('Mobile', 'mobile'),
  ('UI/UX', 'ui-ux');
