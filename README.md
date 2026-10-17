# Sunrise Adult Family Home LLC — Website & CMS

A modern, fast, SEO-optimized website for **Sunrise Adult Family Home LLC** in Marysville, WA. Built with **Astro** for near-instant loading and 100/100 performance, paired with **Sanity CMS** so the owner can easily update pictures, room availability, and text without touching any code.

---

## 🌟 Features for the Owner

- **Change Photos & Gallery**: Upload new bedroom, dining, or garden pictures from any phone or laptop.
- **Manage Room Availability**: Switch bedroom status between `Available Now`, `Inquire for Details`, and `Occupied`.
- **Edit Contact & Rates**: Update phone numbers, email addresses, license info, and tour scheduling info.
- **Service & FAQ Manager**: Add or edit care services, daily assistance checklists, and frequently asked questions.
- **Testimonials**: Add authentic family reviews and star ratings.
- **Lead Capture Forms**: Direct integration with Formspree for tour bookings and contact inquiries with client-side validation.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# Website runs at: http://localhost:4321

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## ☁️ Deploying to Vercel

### Method 1: Via Vercel Web Dashboard (Recommended)

1. Push this repository to GitHub:
   ```bash
   git push origin main
   ```
2. Log into [vercel.com](https://vercel.com) and click **"Add New..." > "Project"**.
3. Select your repository: `SUNRISE_Adult_Home_Care`.
4. Framework Preset: **Astro** (detected automatically).
5. Output Directory: `dist` (configured in `vercel.json`).
6. Click **Deploy**.

### Method 2: Via Vercel CLI

```bash
# In your terminal:
vercel
```
Follow the interactive prompts to link and deploy your project.

---

## 🛠️ Setting Up Sanity CMS (For the Owner's Admin Portal)

1. Create a free account at [sanity.io](https://www.sanity.io/).
2. Create a new project named **Sunrise AFH**.
3. Note your **Project ID** from your Sanity manage dashboard.
4. Add the following environment variables to your `.env` (locally) and in your **Vercel Project Settings > Environment Variables**:

```env
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your_sanity_project_id
SANITY_STUDIO_DATASET=production
```

5. Deploy the Sanity Studio so the owner can log in anywhere:
```bash
npm run studio:deploy
```
This gives the owner a clean URL like: `https://sunrise-afh.sanity.studio` where she can log in with her email or Google account to update images and content.

### Setting Up Automatic Live Updates (Webhooks)
To make Vercel automatically re-deploy whenever the owner clicks **"Publish"** in Sanity:
1. In Vercel, go to **Project Settings > Git > Deploy Hooks**.
2. Create a hook named `Sanity CMS Publish` on branch `main` and copy the URL.
3. In Sanity dashboard, go to **API > Webhooks > Create Webhook**, paste the Vercel Deploy Hook URL, and select all triggers on publish.
4. Done! Every time the owner edits a picture or text and clicks Publish, the website automatically updates live in ~30 seconds.
