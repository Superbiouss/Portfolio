# Strict Neo-Brutalist Personal Portfolio & CMS

[![CI Status](https://img.shields.io/badge/CI-Active-brightgreen?style=flat-square)](file:///c:/Users/Raj/Documents/GitHub/Portfolio/.github/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-DFE104?style=flat-square)](file:///c:/Users/Raj/Documents/GitHub/Portfolio/LICENSE)

A high-performance, responsive personal portfolio website and Content Management System (CMS) featuring a bold, custom **Strict Neo-Brutalist** design. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Supabase (PostgreSQL + Auth)**.

---

## 🌟 Key Highlights

- **Strict Neo-Brutalist Design System**: Solid dark backgrounds (`#09090B`), sharp borders, flat depth (no blurs or drop-shadows), acid yellow accents, and kinetic typography. Designed with strict anti-patterns in mind. Refer to [Theme.md](file:///c:/Users/Raj/Documents/GitHub/Portfolio/Theme.md).
- **Integrated Admin Dashboard (`/admin`)**: A fully secured CMS for CRUD management of experiences, projects, skills, certificates, and digital badges.
- **Robust Database Fallback**: Out-of-the-box resilience. If Supabase is down or unconfigured, the application automatically switches to curated, local mock data to prevent blanks.
- **⌘K Command Palette**: An integrated, globally accessible keyboard-driven search menu powered by `cmdk` for seamless navigation.
- **Secure Server Actions**: Next.js Server Actions with built-in auth verification guards (`verifyAuth`) and Zod schema validation.
- **Automated CI Workflow**: Automated pipeline checks via GitHub Actions for TypeScript type-checking, code linting, and production builds.

---

## 🛠 Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router, Server Actions, React Server Components) |
| **Styling & UI** | Tailwind CSS v4, Lucide React Icons, React Fast Marquee |
| **Animations** | Framer Motion (page transitions and interactive hover effects) |
| **Database & Auth** | Supabase (PostgreSQL database, Row Level Security, Auth Session cookies) |
| **Validation** | Zod (strict validation of form inputs before DB operations) |
| **CI/CD & Lints** | GitHub Actions, ESLint, Prettier, EditorConfig |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Supabase Account**: A Supabase project initialized with tables

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Superbiouss/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### 3. Database Initialization
This project uses Supabase for database storage. Set up the schema:
1. Navigate to the SQL Editor in your Supabase dashboard.
2. Open [supabase/schema.sql](file:///c:/Users/Raj/Documents/GitHub/Portfolio/supabase/schema.sql) in this repo.
3. Copy the contents, paste them into the Supabase SQL editor, and click **Run**.
4. Enable Row Level Security (RLS) policies on tables as shown in the script.

### 4. Environment Configuration
Create a `.env.local` file in the root directory (you can copy `.env.local.example` if it exists):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anonymous-key
```

### 5. Running the Application
```bash
# Run the local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Repository Structure

```
Portfolio/
├── .github/                      # GitHub Actions & issue/PR templates
│   ├── workflows/ci.yml          # Continuous Integration workflow
│   ├── ISSUE_TEMPLATE/           # Issue templates (Bug / Feature request)
│   └── PULL_REQUEST_TEMPLATE.md  # Standard Pull Request checklist
├── src/
│   ├── app/                      # Next.js App Router folders & pages
│   │   ├── admin/                # Secure admin panel views
│   │   ├── actions/              # Next.js Server Actions (CRUD)
│   │   ├── components/           # Common components (layout, UI elements)
│   │   └── globals.css           # Global Tailwind design tokens
│   ├── components/               # Shareable Layout and UI elements
│   ├── lib/                      # Supabase client factories and validation schemas
│   └── middleware.ts             # Auth check middleware for /admin routes
├── supabase/
│   └── schema.sql                # Database initialization script
├── .editorconfig                 # IDE style rules
├── .prettierrc.json              # Prettier format rules
├── eslint.config.mjs             # ESLint config rules
├── DEVELOPER.md                  # Developer guidelines
├── Theme.md                      # Detailed Design Tokens & Rules
└── LICENSE                       # MIT License
```

For a comprehensive explanation of file responsibilities and API architectures, please refer to [DEVELOPER.md](file:///c:/Users/Raj/Documents/GitHub/Portfolio/DEVELOPER.md).

---

## 🧑‍💻 Contributing & Code Style

We welcome improvements and contributions!
- Commit messages **must** follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g. `feat(projects): add image upload`).
- Code must comply with formatting and design standards (`npm run lint` and `npx tsc --noEmit` must pass cleanly).

Please read the full [CONTRIBUTING.md](file:///c:/Users/Raj/Documents/GitHub/Portfolio/CONTRIBUTING.md) guide before submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](file:///c:/Users/Raj/Documents/GitHub/Portfolio/LICENSE) file for details.
