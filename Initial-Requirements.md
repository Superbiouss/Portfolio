```text
You are an elite senior full-stack engineer, product designer, and system architect.

Your task is to help me build a modern multipage developer portfolio website that is production-grade, recruiter-friendly, client-friendly, CMS-powered, scalable, visually premium, and deployable on Vercel.

This portfolio is NOT a simple static portfolio.
It should function as:

1. Personal developer brand website
2. Technical project showcase
3. Resume companion
4. Freelance/client landing page
5. Case-study platform
6. CMS-powered full-stack product

The final product should look like a polished SaaS application and demonstrate senior-level engineering thinking.

==================================================
PRIMARY GOALS
==================================================

The portfolio must help me:

- Showcase projects deeply
- Showcase certifications and digital badges
- Showcase technical skills
- Showcase leadership/activities
- Showcase resume and achievements
- Present detailed engineering case studies
- Allow me to update content dynamically through a secure admin dashboard
- Use this portfolio itself as a major project on my resume

The portfolio should impress:
- Recruiters
- Freelance clients
- Startup founders
- Technical interviewers

==================================================
TECH STACK
==================================================

Build using:

Frontend:
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- Framer Motion

Backend:
- Supabase

Use Supabase for:
- PostgreSQL database
- Authentication
- Storage
- Realtime features

Deployment:
- Vercel

==================================================
IMPORTANT ARCHITECTURE REQUIREMENTS
==================================================

The project MUST be structured as a full-stack CMS-powered application.

The public website should fetch all content dynamically from Supabase.

I should NEVER need to edit hardcoded content manually after deployment.

Everything should be manageable through a protected admin dashboard.

==================================================
CORE WEBSITE STRUCTURE
==================================================

Create a multipage website with the following routes:

/
Home page

/about
About page

/projects
Projects listing page

/projects/[slug]
Dynamic detailed case-study pages

/certificates
Certificates & digital badges

/skills
Skills & technologies

/resume
Interactive resume page

/contact
Contact page

/admin
Protected admin dashboard

/admin/projects
Manage projects

/admin/certificates
Manage certificates

/admin/skills
Manage skills

/admin/profile
Manage profile data

/admin/blog
(Optional blog management)

==================================================
DESIGN DIRECTION
==================================================

The design should feel like:

- Modern SaaS product
- Minimal but premium
- Technical but clean
- Professional and elegant
- Engineering-focused
- High-end developer portfolio

Avoid:
- Generic student portfolio styles
- Excessive animations
- Overly flashy effects
- Hacker-style green terminal spam
- Heavy clutter

Use:
- Strong typography hierarchy
- Clean spacing
- Glassmorphism subtly if needed
- Smooth microinteractions
- Dark/light mode
- Monospace accents for technical labels
- Modern grid layouts
- High readability
- Excellent mobile responsiveness

The site should feel similar in quality to:
- Linear
- Vercel
- Stripe
- Raycast
- Modern SaaS dashboards

==================================================
HOME PAGE REQUIREMENTS
==================================================

The homepage should contain:

1. Hero Section
- Name
- Developer title
- One-line value proposition
- CTA buttons:
  - View Projects
  - Download Resume
  - Hire Me
- Social links:
  - GitHub
  - LinkedIn
  - Email

2. Quick Stats Strip
Examples:
- Number of projects
- Certificates
- Technologies
- Leadership positions

3. Featured Projects Preview
Display top 3–4 projects dynamically from database.

Each card should include:
- Thumbnail
- Title
- Description
- Tech stack
- Category
- View Case Study button

4. Skills Preview

5. Certificates Preview

6. Leadership/Activities Preview

7. CTA Section

==================================================
ABOUT PAGE REQUIREMENTS
==================================================

The About page should include:

- Professional introduction
- Developer journey timeline
- Leadership experience
- Technical interests
- Current focus
- Career goals
- Personal philosophy
- Activities and achievements

==================================================
PROJECTS PAGE REQUIREMENTS
==================================================

Create a professional projects grid.

Each project should support:

- Thumbnail
- Title
- Slug
- Description
- Long description
- Tech stack
- Category
- Status
- GitHub link
- Live demo link
- Documentation link
- Screenshots gallery
- Featured flag
- Timeline
- Role
- Challenges
- Outcomes
- Future improvements

Projects should be filterable by:
- AI
- SaaS
- Automation
- Full Stack
- Mobile
- UI/UX

==================================================
DYNAMIC PROJECT CASE STUDY PAGES
==================================================

Each project page should be extremely detailed.

Structure:

1. Hero Section
- Project title
- Tagline
- Tech stack
- Status
- Role
- Timeline
- CTA buttons

2. Problem Statement

3. Research & Planning

4. Architecture Section
Include architecture diagrams.

5. Tech Stack Breakdown
Explain WHY technologies were chosen.

6. Features Section

7. Screenshots/Gallery

8. Challenges Faced

9. Key Learnings

10. Outcomes & Results

11. Future Improvements

12. Related Projects

These pages should feel like professional engineering case studies.

==================================================
CERTIFICATES PAGE REQUIREMENTS
==================================================

The certificates page should support:

- Search
- Filters
- Categories
- Verification links
- Badge images

Each certificate should contain:
- Title
- Issuer
- Date
- Credential ID
- Verification URL
- Skills gained
- Badge image

==================================================
SKILLS PAGE REQUIREMENTS
==================================================

Group skills professionally.

Examples:
- Frontend
- Backend
- AI & Automation
- Database
- Cloud
- DevOps
- UI/UX

Each skill should support:
- Name
- Icon
- Proficiency
- Years of experience
- Related projects

==================================================
RESUME PAGE REQUIREMENTS
==================================================

Create:
- Interactive resume page
- Download PDF functionality

Sections:
- Education
- Experience
- Projects
- Skills
- Certifications
- Leadership

==================================================
CONTACT PAGE REQUIREMENTS
==================================================

Include:
- Contact form
- Email
- LinkedIn
- GitHub
- Social links

Optional:
- Calendly integration

==================================================
ADMIN DASHBOARD REQUIREMENTS
==================================================

The admin dashboard should feel like a modern SaaS admin panel.

Requirements:
- Protected routes
- Supabase Auth
- Role-based protection
- CRUD operations
- File uploads
- Image uploads
- Markdown editor
- Rich text support
- Form validation
- Toast notifications
- Loading states
- Error handling

Dashboard Features:

Projects Management
- Create/edit/delete projects
- Upload screenshots
- Upload thumbnails
- Add tags/categories

Certificates Management
- Upload certificates
- Add verification links
- Upload badge images

Skills Management
- Add/edit/remove skills

Profile Management
- Edit bio
- Update social links
- Update hero section

Analytics
- Page views
- Resume downloads
- Most viewed projects

==================================================
DATABASE DESIGN
==================================================

Design a scalable PostgreSQL schema in Supabase.

Include tables for:
- profiles
- projects
- project_images
- certificates
- skills
- categories
- experiences
- social_links
- blog_posts
- analytics

Include:
- Proper relationships
- Foreign keys
- Slugs
- Timestamps
- Indexing
- Row-level security policies

==================================================
SEO REQUIREMENTS
==================================================

Implement:
- Dynamic metadata
- Open Graph tags
- Twitter cards
- Structured data
- Sitemap
- Robots.txt
- Canonical URLs

==================================================
PERFORMANCE REQUIREMENTS
==================================================

Target:
- Lighthouse 95+
- Fast loading
- Image optimization
- Responsive design
- Accessibility best practices

==================================================
ANIMATIONS
==================================================

Use Framer Motion subtly.

Examples:
- Page transitions
- Card hover effects
- Fade-ins
- Smooth scrolling

Avoid excessive motion.

==================================================
CODING REQUIREMENTS
==================================================

Code must be:
- Production-grade
- Scalable
- Modular
- Clean architecture
- Reusable
- Well-typed
- Well-commented

Use:
- Server Components where appropriate
- API routes
- Proper folder structure
- Reusable UI components
- Custom hooks
- Utility functions

==================================================
DELIVERABLES
==================================================

Generate:

1. Full project architecture
2. Folder structure
3. Database schema
4. Supabase setup
5. Authentication flow
6. UI component structure
7. Reusable components
8. Admin dashboard system
9. Dynamic routing
10. Example pages
11. SEO implementation
12. Deployment instructions
13. Environment variable setup
14. Production best practices

Guide the implementation step-by-step like a senior engineering mentor.

Do not generate toy examples.
Generate real-world production-quality architecture and code.
```
