# Pudugai Wellness Center (PWC) — Official Web Application

A modern, responsive, full-stack web application built for **Pudugai Wellness Center (PWC)**, a health, nutrition, and wellness coaching center located in Pudukkottai, Tamil Nadu, led by **Wellness Coach Thangapandian S**.

---

## 🌟 Key Features

### 1. Public Customer Experience
- **Home Page**: Brand hero, official PWC 3-leaf logo, core philosophy, coach profile preview, services overview, success stories preview, business journey highlights, and direct connect CTA.
- **About Us Page**: Center mission & vision, holistic approach pillars, verified biography of Coach Thangapandian S, **dynamic coach photograph loaded from Supabase**, and business milestones.
- **Services & Programs Page**: 18+ programs categorized across:
  1. *Weight Management* (Weight Loss, Weight Gain)
  2. *Health Screening* (BMI, BMR, Body Fat, Metabolic Age, Skeletal Muscle)
  3. *Special Programs* (Children's Health, Women's Health, Men's Health, Energy & Fitness, Eyes Health)
  4. *Nutrition Guidance* (Personalized Diet Plans, Healthy Habits)
  5. *Wellness Solutions* (Heart, Digestive, Bone & Joints, Skin & Hair, Immunity, Brain & Sleep)
  - Features real-time search, category filtering, and mandatory health disclaimers.
- **Client Success Stories Page**: Published authentic transformations rendered in the original language entered (Tamil Unicode or English) with duration, progress info, and clear results disclaimer.
- **Contact & Enquiry Page**: Direct Call (`94434 43261`), WhatsApp chat, Instagram link (`@coach_pandian`), Google Maps location and embedded map, exact Tamil and English address, and private enquiry form.

### 2. Protected Admin Dashboard (`/admin`)
- **Secure Authentication**: Supabase Auth integration with local demo preview fallback for development.
- **Dashboard Overview**: Live counts of total services, published programs, client stories, and customer enquiry tracking.
- **Service Management (`/admin/services`)**: Full CRUD (create, edit, delete with confirmation), live publish/unpublish toggle, category selector, display order, and image upload.
- **Success Stories with Tamil/English Form (`/admin/success-stories`)**:
  - *Special Design Requirement*: The language selector (`Tamil` or `English`) appears **exclusively inside the Add/Edit form**. No public language switcher is exposed.
  - Dynamically renders Tamil form labels, Tamil Unicode guidance, and saves records with `ta` or `en` language codes.
- **Coach Photo & Biography Management (`/admin/about`)**:
  - Upload, preview, replace, or delete the coach photograph.
  - Automatic fallback to placeholder if photo is removed.
  - Manage verified bio, contact information, mission, and vision.
- **Enquiry Management (`/admin/enquiries`)**:
  - Strict privacy via Supabase RLS.
  - View submissions, update status (`New` &rarr; `Contacted` &rarr; `Completed`), search, and delete after confirmation.
  - Quick buttons to direct-dial or launch WhatsApp with the lead.
- **System Settings (`/admin/settings`)**:
  - Connection health check, environment variables template, and admin provisioning guide.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, JavaScript ES6+
- **Styling**: Custom CSS (Vanilla, minimal, responsive, 8px grid system, zero Tailwind)
- **Routing**: React Router DOM v7 (Single-page application with SPA rewrite rules)
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **Storage**: Supabase Storage (`coach-images`, `service-images`, `story-images`)
- **Icons**: Lucide React + Custom SVG Brand Icons
- **Typography**: Plus Jakarta Sans & Noto Sans Tamil

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### 2. Clone and Install Dependencies
```bash
# Navigate to the project directory
cd puthuka

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
```
*(Note: If left empty, the application automatically runs in **Local Preview Mode** with full mock data and local persistence).*

### 4. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```
Verify the production build output in the `dist/` directory.

---

## 🗄️ Supabase Database & Storage Setup

### Step 1: Execute SQL Schema & Initial Seed
1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** from the left navigation.
3. Click **New Query**, copy the complete content of [`supabase/setup.sql`](supabase/setup.sql), and click **Run**.
4. This script automatically creates:
   - Tables: `services`, `success_stories`, `coach_profile`, `site_content`, `enquiries`
   - Row Level Security (RLS) policies protecting customer data
   - Public Storage buckets: `coach-images`, `service-images`, `story-images`
   - Initial verified seed data (Coach Pandian profile, 18 official services, mission & vision)

### Step 2: Storage Buckets Verification
The script creates the following public storage buckets in `storage.buckets`:
- `coach-images` (Coach profile portraits)
- `service-images` (Service cards & illustrations)
- `story-images` (Client-approved transformation photos)

Policies allow public viewing (`SELECT`) and restrict uploads, replacements, and deletions to authenticated administrators.

### Step 3: Create First Administrator
1. In the Supabase Dashboard, go to **Authentication** &rarr; **Users**.
2. Click **Add User** &rarr; **Create User**.
3. Enter your coach/admin email (e.g., `admin@pudugaiwellness.com`) and a secure password.
4. Toggle "Auto Confirm User" to on.
5. You can now log in at `/admin/login`.

---

## 🔒 Security Architecture

- **Row Level Security (RLS)**: Enforced across all tables.
  - Public anonymous visitors can ONLY read published services (`published = true`) and published stories (`published = true`).
  - Public visitors can ONLY insert into `enquiries` with validation checks (name & phone non-empty). Public read access to enquiries is completely blocked.
  - Full CRUD operations require authenticated Supabase admin JWT.
- **No Service-Role Key**: Browser code contains ONLY the public publishable anon key. The privileged service-role key is never exposed.
- **File Validation**: Image uploads are validated on both MIME type (`image/jpeg`, `image/png`, `image/webp`) and file size (&le; 5MB).

---

## 🌐 Deployment to Vercel

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Pudugai Wellness Center application"
   git branch -M main
   git remote add origin https://github.com/your-username/pudugai-wellness-center.git
   git push -u origin main
   ```
2. In [Vercel](https://vercel.com):
   - Click **Add New Project** &rarr; Import your GitHub repository.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Add Environment Variables:
     - `VITE_SUPABASE_URL`: Your Supabase Project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase Publishable Anon Key
3. Deploy! The included `vercel.json` automatically configures SPA URL rewriting for deep routes like `/admin/dashboard` and `/services`.

---

## 📍 Official Verified Business Information

- **Business Name**: Pudugai Wellness Center (PWC)
- **Coach**: Thangapandian S (Wellness Coach & Founder)
- **Phone**: `94434 43261`
- **Instagram**: [https://www.instagram.com/coach_pandian](https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3)
- **Google Maps**: [https://maps.app.goo.gl/JAdNVeq53M3PdrW1A](https://maps.app.goo.gl/JAdNVeq53M3PdrW1A)
- **Address (English)**: E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001
- **Address (Tamil)**: கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001
