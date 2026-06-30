# Projects Dashboard

A full-stack SaaS dashboard for managing projects, built with Next.js, Supabase, and Tailwind CSS. Features filtering, search, CRUD operations, and authentication.

## 🌐 Live Demo

**[View Live Application](https://mini-saas-dashboard-oxfwkof05-hellhckrs-projects.vercel.app/)**

## 🎯 Features

- **Project Management**: Create, read, update, and delete projects
- **Filtering & Search**: Filter by status and search by title in real-time
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop
- **Authentication**: Email/password sign-in and sign-up via Supabase
- **Type Safety**: Full TypeScript support
- **Deployment Ready**: Containerized and deployed to Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **Deployment**: Vercel

## 📋 Project Fields

- **Title**: Project name
- **Status**: `active`, `on hold`, or `completed`
- **Deadline**: Date in YYYY-MM-DD format
- **Assigned Team Member**: Person responsible
- **Budget**: Numeric value in USD

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier)

### Local Setup

```bash
# 1. Clone and install
git clone <your-repo-url>
cd projects-dashboard
npm install

# 2. Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=ey...xxx
EOF


# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)


### Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon key

Get these from Supabase Dashboard → Settings → API

## 📚 API Endpoints

### Get Projects
```bash
GET /api/projects?status=active&search=dashboard
```

### Create Project
```bash
POST /api/projects
Content-Type: application/json

{
  "title": "New Project",
  "status": "active",
  "deadline": "2024-12-31",
  "assigned_team_member": "John Doe",
  "budget": 50000
}
```

### Update Project
```bash
PUT /api/projects/[id]
```

### Delete Project
```bash
DELETE /api/projects/[id]
```

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel Dashboard during setup.


## 🔐 Authentication (Optional)

Sign up at `/auth` or sign in with existing credentials. The dashboard is currently public; wrap it with auth protection by visiting `/dashboard` instead.


## 🎨 UI Components

- **Table**: Responsive project list with sorting
- **Modal**: Add/edit form with validation
- **Filters**: Status dropdown and title search
- **Badges**: Color-coded status indicators

All components from shadcn/ui with Tailwind styling.


## 📊 Performance Notes

- Client-side filtering for snappier UX
- Images and assets optimized via Next.js
- Minimal bundle size with shadcn/ui tree-shaking
- Database queries indexed on `status` field



## 📄 License

MIT

---

