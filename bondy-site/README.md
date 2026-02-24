# Bondy — New Site

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Vercel

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
```bash
cp .env.local.example .env.local
```

### 3. Create Supabase table
In your Supabase project, run this SQL to create the contact leads table:

```sql
CREATE TABLE contact_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  role text,
  service text,
  message text NOT NULL,
  source text DEFAULT 'new-website'
);
```

### 4. Run locally
```bash
npm run dev
```
→ Open http://localhost:3000

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Connect to Vercel → Import project
3. Add environment variables in Vercel dashboard
4. Deploy → automatic on every push to `main`

### Subdomain setup
In your DNS provider, add a CNAME record:
```
Name: newbondy
Target: cname.vercel-dns.com
```

Then in Vercel → Settings → Domains → add `newbondy.wearebondy.com`

---

## Project Structure

```
app/
  page.tsx          → Homepage
  method/page.tsx   → The Bondy Method™
  services/page.tsx → Services (Hunting, Pipeline, Embedded)
  thinking/page.tsx → Blog/articles index
  contact/page.tsx  → Contact form
  api/contact/route.ts → Form API → Supabase

components/
  Nav.tsx
  Footer.tsx
```

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, stats, services overview, method teaser |
| `/method` | The Bondy Method™ — 5-step framework |
| `/services` | Services detail — Hunting, Pipeline, Embedded |
| `/thinking` | Blog index — articles, frameworks, market intel |
| `/contact` | Contact form → Supabase `contact_leads` table |
