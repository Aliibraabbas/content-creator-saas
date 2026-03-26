# 📝 Content Creator SaaS

Application for content creators to manage their content library with authentication, CRUD operations, favorites, filters, and user preferences.

## 🎯 Project Description

This application allows content creators to:
- **Authenticate** securely with Supabase Auth
- **Create, Read, Update, Delete** content items (title, description, URL)
- **Mark content as favorites** for quick access
- **Search and filter** content by title, description, or favorites
- **Customize preferences** (theme, view mode, default filters)
- **Persist settings** across sessions with local storage

---

## ✨ Features

### 🔐 Authentication
- Email/password authentication via Supabase
- Protected routes requiring authentication
- Automatic session management
- Secure logout functionality

### 📚 Content Management (CRUD)
- **Create** new content with title, description, and URL
- **View** all content in list or grid mode
- **Edit** existing content
- **Delete** content with confirmation
- **Toggle favorites** for quick filtering

### 🔍 Search & Filters
- Real-time search by title or description
- Filter by favorites only
- Clear all filters button
- Persistent filter state

### ⚙️ User Preferences
- Theme selection (System, Light, Dark)
- Default view mode (List or Grid)
- Show favorites by default toggle
- Settings persist across sessions
- Reset to defaults option

### 🔒 Security
- Row Level Security (RLS) with Supabase
- Users can only access their own content
- Database policies enforce `user_id = auth.uid()`
- No direct database access from client

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19** - UI library with modern hooks
- **TypeScript (Strict Mode)** - Type safety and better DX
- **Vite** - Fast build tool and dev server

### **Architecture**
- **Feature-Sliced Design (FSD)** - Scalable architecture pattern
  - `app/` - Application initialization, providers, routing
  - `pages/` - Route pages (Dashboard, Content Detail, Settings, etc.)
  - `widgets/` - Complex UI blocks (Header, Sidebar)
  - `features/` - User interactions (Auth, Content Filters, Profile Update)
  - `entities/` - Business entities (Content, User)
  - `shared/` - Reusable utilities, UI components, API clients

### **State Management**
- **Zustand** - Lightweight global state (Auth, User Preferences, Content UI)
- **React Query (TanStack Query)** - Server state management, caching, mutations
- **Zustand Persist** - LocalStorage persistence for user preferences

### **Data & Validation**
- **Zod** - Runtime schema validation for forms and API data
- **React Hook Form** - Form state management with Zod resolver

### **Testing**
- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing
- **23 tests** covering Zod schemas, Zustand stores, components, and business logic

---

## 📁 Folder Architecture

```
src/
├── app/                    # Application layer
│   ├── providers/          # React context providers (Auth, Query, ErrorBoundary)
│   └── routes/             # React Router configuration
│
├── pages/                  # Route pages
│   ├── dashboard/          # Main content list page
│   ├── content-detail/     # Single content view
│   ├── content-create/     # Create new content
│   ├── content-edit/       # Edit existing content
│   ├── settings/           # User preferences page
│   ├── login/              # Login page
│   └── register/           # Registration page
│
├── widgets/                # Complex UI blocks
│   └── content-list/       # Content list component
│
├── features/               # User interactions
│   ├── auth/               # Authentication (login, register, logout)
│   ├── content-create/     # Create content form
│   ├── content-update/     # Update content form
│   ├── content-delete/     # Delete content button
│   ├── content-favorite/   # Favorite toggle button
│   ├── content-filters/    # Search and filter UI
│   └── profile-update/     # User preferences form
│
├── entities/               # Business entities
│   ├── content/            # Content entity
│   │   ├── api/            # Supabase API calls
│   │   ├── lib/            # React Query hooks
│   │   ├── model/          # Types, schemas, UI store
│   │   └── ui/             # ContentCard component
│   └── user/               # User entity
│       └── model/          # User types, preferences store
│
└── shared/                 # Shared utilities
    ├── api/                # Supabase client, database types
    ├── config/             # Environment variables
    ├── lib/                # Utilities, helpers
    ├── ui/                 # Reusable UI components (Button, Input, Form)
    └── test/               # Test utilities, mocks
```
---

## 🔐 Authentication Flow

1. **User visits protected route** → Redirected to `/login`
2. **User enters credentials** → Supabase Auth validates
3. **On success** → Session stored, user redirected to dashboard
4. **Auth state managed** by Zustand store (`useAuthStore`)
5. **Protected routes** check `isAuthenticated` before rendering
6. **Logout** → Clear session, redirect to login

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 18+ and npm
- Supabase account (free tier works)

### **1. Clone the repository**
```bash
git clone git@github.com:Aliibraabbas/content-creator-saas.git
cd content-creator-saas
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Configure environment variables**
Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Get your Supabase credentials:**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and anon/public key

### **4. Set up Supabase database**

Run this SQL in your Supabase SQL Editor:

```sql
-- Create content table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  content_url TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_favorite BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own content"
ON content FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own content"
ON content FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content"
ON content FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content"
ON content FOR DELETE
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_content_user_id ON content(user_id);
CREATE INDEX idx_content_created_at ON content(created_at DESC);
```

### **5. Run the development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Running Tests

### **Run all tests**
```bash
npm test
```

### **Run tests in watch mode**
```bash
npm run test:watch
```

### **Run tests with coverage**
```bash
npm run test:coverage
```

**Test Coverage:**
- ✅ 23 tests across 6 test suites
- ✅ Zod schema validation (5 tests)
- ✅ Zustand stores (8 tests)
- ✅ React components (5 tests)
- ✅ Business logic (5 tests)

See [TEST_COVERAGE.md](./TEST_COVERAGE.md) for detailed test documentation.

---

## 🏗️ Building for Production

### **Build the project**
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### **Preview production build locally**
```bash
npm run preview
```

---

<!-- ## 🚀 Deployment

### **Deploy to Vercel**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

--- -->

### **State Management Strategy**

- **Zustand** for client-side global state (auth, UI preferences)
- **React Query** for server state (content data, mutations)
- **React Hook Form** for form state
- **URL state** for filters (optional enhancement)

---

## 🔧 TypeScript Configuration

**Strict mode enabled** in `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    // ... other strict checks
  }
}
```
