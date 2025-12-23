# Technical Stack & Integration Audit Report
**ATS-WEBSITE-01 Repository**  
**Generated:** December 23, 2025

---

## 1. Tech Stack Overview (TL;DR)

| Category | Technology |
|----------|-----------|
| **Primary Language** | TypeScript (95%+ of app code) |
| **Frontend Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS + PostCSS |
| **Component Library** | shadcn/ui (Radix UI primitives) |
| **Routing** | React Router v6 |
| **Forms** | React Hook Form + Zod validation |
| **State Management** | React Context + TanStack Query v5 |
| **Backend/Database** | Supabase (PostgreSQL + Auth + Storage) |
| **Build Tool** | Vite 7.2.7 |
| **Package Manager** | npm/bun |
| **Testing** | Vitest + @testing-library/react |
| **Linting** | ESLint 9 with TypeScript support |
| **Styling Tools** | Tailwind CSS 3.4 + Autoprefixer |
| **Dev Auth** | Custom Dev Key (localStorage-based) |

---

## 2. Languages Used (with Purpose)

### **TypeScript (Primary)**
- **Usage**: 95%+ of application code
- **Files**: All `.tsx` and `.ts` files in `src/`
- **Purpose**: Type-safe frontend components, services, hooks, contexts
- **Config**: [tsconfig.json](tsconfig.json) with `baseUrl: "."` and path alias `@/*` → `./src/*`
- **Strictness**: Relaxed (noImplicitAny: false, strictNullChecks: false, noUnusedLocals: false)

### **JavaScript (Secondary)**
- **Usage**: Configuration files only
- **Files**: `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `eslint.config.js`
- **Purpose**: Build configuration, styling pipeline

### **SQL (Database)**
- **Usage**: Supabase migrations and RLS policies
- **Location**: `/sql/` directory
- **Purpose**: Database schema, security policies, migrations
- **Files**:
  - [consultancy_enquiries.sql](sql/consultancy_enquiries.sql) - Table + RLS policies
  - [instruments_rls_policy.sql](sql/instruments_rls_policy.sql) - Public read access
  - [facility_updates.sql](sql/facility_updates.sql) - Update tracking
  - [departments.sql](sql/departments.sql) - Department management
  - [components.sql](sql/components.sql) - Component library
  - [supabase_storage_policies.sql](sql/supabase_storage_policies.sql) - Storage access

### **JSON/YAML (Configuration)**
- **Files**: `package.json`, `tsconfig*.json`, `components.json`, `.env.example`
- **Purpose**: Dependencies, compiler options, component registry, secrets

---

## 3. Frameworks & Libraries

### **Core Frontend**
| Library | Version | Purpose |
|---------|---------|---------|
| **react** | 18.3.1 | UI framework |
| **react-dom** | 18.3.1 | DOM rendering |
| **react-router-dom** | 6.30.1 | Client-side routing |
| **vite** | 7.2.7 | Build tool & dev server |
| **@vitejs/plugin-react-swc** | 3.11.0 | Fast JSX compilation |

### **UI & Styling**
| Library | Version | Purpose |
|---------|---------|---------|
| **tailwindcss** | 3.4.17 | Utility-first CSS framework |
| **shadcn/ui** | Latest | Pre-built Radix UI components |
| **@radix-ui/* (30+ packages)** | ~1.2 | Unstyled, accessible component primitives |
| **lucide-react** | 0.462.0 | Icon library (462+ icons) |
| **embla-carousel-react** | 8.6.0 | Carousel/slider component |
| **react-resizable-panels** | 2.1.9 | Resizable layout panels |
| **next-themes** | 0.3.0 | Dark mode / theme management |

### **Forms & Validation**
| Library | Version | Purpose |
|---------|---------|---------|
| **react-hook-form** | 7.61.1 | Form state management |
| **@hookform/resolvers** | 3.10.0 | Schema validation integration |
| **zod** | 3.25.76 | TypeScript-first schema validation |
| **cmdk** | 1.1.1 | Command/search palette |
| **input-otp** | 1.4.2 | OTP input component |

### **State Management & Data Fetching**
| Library | Version | Purpose |
|---------|---------|---------|
| **@tanstack/react-query** | 5.83.0 | Server state management, caching, sync |
| **React Context API** | Built-in | Local auth state (AdminAuthContext) |

### **Utilities**
| Library | Version | Purpose |
|---------|---------|---------|
| **@supabase/supabase-js** | 2.87.1 | Database, auth, storage client |
| **date-fns** | 3.6.0 | Date manipulation |
| **recharts** | 2.15.4 | Data visualization / charts |
| **sonner** | 1.7.4 | Toast notifications |
| **clsx** | 2.1.1 | Conditional CSS class builder |
| **tailwind-merge** | 2.6.0 | Merge Tailwind class lists |
| **class-variance-authority** | 0.7.1 | Component style variants (shadcn pattern) |
| **vaul** | 0.9.9 | Drawer component |
| **react-day-picker** | 8.10.1 | Date picker calendar |

### **Development & Testing**
| Library | Version | Purpose |
|---------|---------|---------|
| **typescript** | 5.8.3 | Type checking |
| **eslint** | 9.32.0 | Linting |
| **@eslint/js** | 9.32.0 | ESLint core rules |
| **typescript-eslint** | 8.38.0 | TypeScript linting rules |
| **eslint-plugin-react-hooks** | 5.2.0 | React Hooks rules |
| **eslint-plugin-react-refresh** | 0.4.20 | React Fast Refresh rules |
| **vitest** | Implied (test files exist) | Unit testing framework |
| **@testing-library/react** | Implied | React component testing |
| **@tailwindcss/typography** | 0.5.16 | Typography plugin |

---

## 4. APIs & External Services

### **Supabase (Primary Backend)**
**Base URL**: `https://your-project.supabase.co` (via `VITE_SUPABASE_URL`)  
**Authentication**: Anonymous key (`VITE_SUPABASE_ANON_KEY`) for public access

#### **Database Tables & Access Patterns**

| Table | Purpose | RLS Policy | Common Operations |
|-------|---------|-----------|-------------------|
| `instruments` | Lab equipment catalog | Public READ, Admin WRITE/DELETE | `listInstruments()`, `getInstrument()` |
| `consultancy_enquiries` | Public enquiry submissions | Public INSERT, Admin SELECT/UPDATE/DELETE | `createEnquiry()`, `listEnquiries()` |
| `departments` | Research departments | Public READ (active only), Admin WRITE | `listDepartments()`, `getDepartmentBySlug()` |
| `instrument_prices` | Pricing info | Likely Admin-only | `listPrices()`, `createPrice()` |
| `announcements` | News/updates | Public READ, Admin WRITE | `listAnnouncements()`, `createAnnouncement()` |
| `facility_updates` | Facility status | Public READ, Admin WRITE | `getFacilityUpdates()` |
| `content_blocks` | CMS content | Public READ, Admin WRITE | `listContentBlocks()`, `getContentBlock()` |
| `components` | Design component library | Public READ (public + active), Admin WRITE | `listPublicComponents()`, `listComponents()` |

#### **Storage Buckets**
| Bucket | Access | Purpose | Methods |
|--------|--------|---------|---------|
| `instrument-images` | Public | Instrument photos | `uploadInstrumentImage()`, `getPublicImageUrl()` |
| `documents` | Private (signed URLs) | Confidential files | `getSignedDocumentUrl()` |

#### **Authentication Methods**
- **Public (anon) access**: For browsing instruments, departments, enquiries
- **Admin access**: Not Supabase Auth — custom dev key stored in `AdminAuthContext`
- **Session persistence**: Supabase `localStorage` with `persistSession: true`

#### **Key Service Integrations**

**Location**: [src/services/](src/services/) directory

| Service File | Exported Functions | DB Tables Used |
|--------------|-------------------|----------------|
| [instruments.ts](src/services/instruments.ts) | `listInstruments()`, `getInstrument()`, `createInstrument()`, `updateInstrument()`, `deleteInstrument()` | `instruments` |
| [consultancyEnquiries.ts](src/services/consultancyEnquiries.ts) | `createEnquiry()`, `listEnquiries()`, `getEnquiryById()`, `updateEnquiryStatus()`, `deleteEnquiry()` | `consultancy_enquiries`, `departments` (foreign key) |
| [departments.ts](src/services/departments.ts) | `listDepartments()`, `getDepartmentBySlug()`, `createDepartment()`, `updateDepartment()`, `deleteDepartment()` | `departments` |
| [prices.ts](src/services/prices.ts) | `listPrices()`, `getPrice()`, `createPrice()`, `updatePrice()`, `deletePrice()` | `instrument_prices` |
| [announcements.ts](src/services/announcements.ts) | `listAnnouncements()`, `getAnnouncement()`, `createAnnouncement()`, `updateAnnouncement()`, `deleteAnnouncement()` | `announcements` |
| [facilityUpdates.ts](src/services/facilityUpdates.ts) | `getFacilityUpdates()`, `getUpdateTypeBadge()` | `facility_updates` |
| [contentBlocks.ts](src/services/contentBlocks.ts) | `listContentBlocks()`, `getContentBlock()`, `upsertContentBlock()`, `deleteContentBlock()` | `content_blocks` |
| [components.ts](src/services/components.ts) | `listComponents()`, `listPublicComponents()`, `getComponent()`, `getComponentBySlug()`, `createComponent()`, `updateComponent()`, `deleteComponent()` | `components` |
| [storage.ts](src/services/storage.ts) | `uploadInstrumentImage()`, `getPublicImageUrl()`, `getSignedDocumentUrl()` | Supabase Storage (2 buckets) |

### **Gmail Integration (Email)**
**Location**: [src/lib/email.ts](src/lib/email.ts)

- **Method**: OAuth-less mailto/deep link integration
- **Functions**: `buildGmailUrl()`, `openGmailCompose()`
- **Purpose**: Pre-fill email compose with contact info (fallback to native mailto)
- **No secrets required** (URL-based)

### **Supabase Auth System**
**Key Functions**:
- `supabase.auth.getSession()` - Check if user authenticated
- `supabase.auth.getUser()` - Get current user identity
- `supabase.auth.onAuthStateChange()` - Listen for auth changes
- `supabase.auth.signInWithPassword()` - Login with email/password
- `supabase.auth.signUp()` - Register account
- **Status**: Available but not actively used; admin system is separate (dev key only)

### **Third-Party APIs: None Detected**
- No Stripe, payment gateways
- No analytics (Google Analytics, Mixpanel)
- No email service (SendGrid, Mailgun)
- No external AI/LLM providers
- **All data flows through Supabase**

---

## 5. Critical Function Calls & Data Flow

### **Authentication Flow**

#### Admin Login (Custom Dev Key)
```
[AdminLoginPage] (user inputs dev key)
  → useAdminAuth.login(devKey)
    → check if devKey === VITE_ADMIN_DEV_KEY
    → store { user: 'admin', token, loggedAt } in localStorage
    → set isAuthenticated = true
  → navigate('/admin')
  → [RequireAdmin] guards protected routes
```

**Files involved**:
- [src/contexts/AdminAuthContext.tsx](src/contexts/AdminAuthContext.tsx) - Auth state & persistence
- [src/pages/admin/AdminLoginPage.tsx](src/pages/admin/AdminLoginPage.tsx) - Login UI
- [src/components/auth/RequireAdmin.tsx](src/components/auth/RequireAdmin.tsx) - Route guard
- Storage: `localStorage['ats_admin_auth_v1']`

#### Public Authentication (Supabase - Optional)
```
[Auth.tsx]
  → supabase.auth.signInWithPassword({ email, password })
  → Session stored in localStorage via Supabase
  → Auth state available to services
```

### **Data Fetching Patterns**

#### Simple `useEffect` + `useState` Pattern (Most Pages)
```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  serviceFunction(param)
    .then(res => setData(res))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);
```

**Used in**:
- [src/pages/Components.tsx](src/pages/Components.tsx)
- [src/pages/Consultancy.tsx](src/pages/Consultancy.tsx)
- [src/pages/DepartmentDetail.tsx](src/pages/DepartmentDetail.tsx)
- All admin list/form pages

**⚠️ Flag**: No TanStack Query usage despite it being installed. Raw Promise-based fetching. Risk: No automatic cache/refetch.

#### TanStack Query Pattern (QueryClient Setup)
```tsx
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

**Status**: Installed & configured in [src/App.tsx](src/App.tsx) but **NOT ACTIVELY USED** in components.

### **Service Function Call Chain**

#### Example: Consultancy Enquiry Creation
```
[Consultancy.tsx] (form submit)
  → consultancyEnquiries.createEnquiry(enquiry)
    → payload validation (sanitize fields)
    → console.debug (session & user info for debugging)
    → supabase.from('consultancy_enquiries').insert(payload).select()
    → return Enquiry object
  → [toast notification]
```

#### Example: Public Instruments List
```
[Instruments.tsx]
  → instruments.listInstruments()
    → supabase.from('instruments').select('*').order('created_at')
    → return Instrument[]
  → setData(result)
  → [InstrumentCard] components render
```

### **Error Handling Patterns**

#### Pattern 1: State-Based Error Display (Minimal)
```tsx
if (error) {
  return <div className="text-red-600">{error}</div>;
}
```
**Issue**: Generic error messages, no user-friendly context.

#### Pattern 2: Toast Notifications
```tsx
toast({
  title: 'Error',
  description: error.message,
  variant: 'destructive'
});
```
**Used in**: Admin forms, login page

#### Pattern 3: Console Logging
```tsx
console.error('Failed to submit contact form', error);
console.debug('[ConsultancyEnquiries] auth inspect failed:', err);
```
**Issue**: Development logging in production code; should use structured logging.

#### Pattern 4: Null Propagation
```tsx
const { data, error } = await supabase.from('table').select('*').single();
if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
```
**Issue**: Silent failures if error is null/undefined.

### **Critical Data Dependencies**

1. **Admin Auth State** → Controls `/admin/*` route access
2. **Supabase URL + Anon Key** → All DB/storage operations fail without these
3. **`is_requester_admin()` SQL function** → Required for RLS policies (must exist in Supabase)
4. **Storage buckets** → Instrument image display fails if bucket deleted
5. **Department slug** → Foreign key in consultancy enquiries; cascading delete risk

---

## 6. Environment & Deployment Dependencies

### **Required Environment Variables**

| Variable | Source | Required | Purpose | Example |
|----------|--------|----------|---------|---------|
| `VITE_SUPABASE_URL` | `.env.local` | ✅ Yes | Supabase project URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | ✅ Yes | Public auth key | `eyJhbGci...` |
| `VITE_ADMIN_DEV_KEY` | `.env.local` | ⚠️ Dev only | Admin login password | Any string |
| `VITE_USE_SUPABASE` | `.env.local` | ❌ Optional | Toggle Supabase auth | `true` or `false` |

### **Environment Setup**
- **Template**: [.env.example](.env.example)
- **Local file**: `.env.local` (gitignored)
- **Build modes**: `--mode development` or default (production)

### **Build & Deployment**

| Command | Output | Purpose |
|---------|--------|---------|
| `npm run dev` | Dev server on `:8080` (via vite.config.ts) | Local development |
| `npm run build` | `/dist/` folder | Production build (optimized) |
| `npm run build:dev` | `/dist/` folder | Dev build with source maps |
| `npm run lint` | ESLint report | Code quality check |
| `npm run preview` | Local preview of `dist/` | Test production build |

### **Build Tool Dependencies**

| Tool | Version | Purpose |
|------|---------|---------|
| **Vite** | 7.2.7 | Bundler & dev server |
| **React SWC Plugin** | 3.11.0 | Fast JSX transpilation |
| **Tailwind CSS** | 3.4.17 | CSS compilation |
| **PostCSS** | 8.5.6 | CSS transformations |
| **Autoprefixer** | 10.4.21 | Browser prefixes |
| **TypeScript** | 5.8.3 | Type checking (during build) |

### **Secrets Handling**

**Current approach:**
- ✅ Environment variables in `.env.local` (gitignored)
- ✅ Supabase anon key is public-safe (RLS policies protect data)
- ✅ Admin dev key never committed

**Risks:**
- ⚠️ Dev key may be shared in chat/Slack (not stored securely)
- ⚠️ No secret rotation mechanism
- ❌ No vault/secret manager integration (AWS Secrets, HashiCorp Vault)

---

## 7. Project Architecture

### **Folder Structure & Responsibilities**

```
/workspaces/ATS-WEBSITE-01/
├── src/                           # Application source code
│   ├── main.tsx                   # React entry point (createRoot, App render)
│   ├── App.tsx                    # Router setup, QueryClientProvider, auth providers
│   ├── index.css                  # Global styles
│   │
│   ├── components/                # Reusable React components
│   │   ├── ui/                    # shadcn/ui components (button, input, dialog, etc.)
│   │   ├── layout/                # RootLayout, Header, Footer
│   │   ├── admin/                 # AdminLayout
│   │   ├── auth/                  # RequireAdmin (route guard)
│   │   ├── sections/              # Page sections (Hero, About, Services, etc.)
│   │   ├── instruments/           # InstrumentCard
│   │   ├── facilities/            # FacilityCard
│   │   ├── leaders/               # LeaderCard
│   │   ├── services/              # Service cards
│   │   ├── assistant/             # GuidedAssistantWidget
│   │   └── NavLink.tsx, ScrollToTop.tsx
│   │
│   ├── pages/                     # Page components (full routes)
│   │   ├── Home.tsx               # Landing page
│   │   ├── About.tsx, Services.tsx, Instruments.tsx, etc.
│   │   ├── admin/                 # Admin pages
│   │   │   ├── AdminLoginPage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── InstrumentsList.tsx, InstrumentForm.tsx
│   │   │   ├── ComponentsList.tsx, ComponentForm.tsx
│   │   │   ├── DepartmentsList.tsx, DepartmentForm.tsx
│   │   │   ├── AnnouncementsList.tsx, AnnouncementForm.tsx
│   │   │   ├── PricesList.tsx, PriceForm.tsx
│   │   │   ├── EnquiriesList.tsx, InfoBlocksList.tsx, InfoBlockForm.tsx
│   │   │   └── more admin crud pages
│   │   ├── Auth.tsx               # Supabase auth (not actively used)
│   │   ├── Consultancy.tsx        # Public enquiry form
│   │   └── NotFound.tsx
│   │
│   ├── contexts/                  # React Context providers
│   │   └── AdminAuthContext.tsx   # **CRITICAL**: Admin login state + persistence
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── use-toast.ts           # Toast notification hook
│   │   ├── use-mobile.tsx         # Mobile detection
│   │   ├── use-in-view.ts         # Intersection observer
│   │   └── use-count-up.ts        # Number animation
│   │
│   ├── services/                  # API/database service layer
│   │   ├── instruments.ts         # CRUD operations
│   │   ├── consultancyEnquiries.ts
│   │   ├── departments.ts
│   │   ├── prices.ts
│   │   ├── announcements.ts
│   │   ├── facilityUpdates.ts
│   │   ├── contentBlocks.ts
│   │   ├── components.ts
│   │   └── storage.ts             # Image upload, signed URLs
│   │
│   ├── supabase/                  # Supabase client (re-export)
│   │   └── client.ts              # Exports from integrations/supabase
│   │
│   ├── integrations/supabase/     # **CRITICAL**: Supabase initialization
│   │   ├── client.ts              # createClient<Database>()
│   │   └── types.ts               # Auto-generated TypeScript types
│   │
│   ├── lib/                       # Utilities & helpers
│   │   ├── utils.ts               # General utilities
│   │   ├── text.ts                # Text transformation
│   │   └── email.ts               # Gmail deep link builder
│   │
│   ├── data/                      # Static/mock data
│   │   ├── facilities.ts
│   │   ├── instruments.ts
│   │   ├── leaders.ts
│   │   ├── nav.ts                 # Navigation menu
│   │   └── services.ts
│   │
│   ├── assets/                    # Images, fonts
│   │
│   └── __tests__/                 # Unit/integration tests
│       ├── admin-auth.test.tsx    # Auth context tests
│       └── header.test.tsx
│
├── sql/                           # Database migrations & policies
│   ├── consultancy_enquiries.sql
│   ├── instruments_rls_policy.sql
│   ├── departments.sql
│   ├── facility_updates.sql
│   ├── components.sql
│   └── supabase_storage_policies.sql
│
├── public/                        # Static assets
│   ├── robots.txt
│   └── coats/                     # Image directory
│
├── docs/                          # Documentation
│   ├── admin-dev-setup.md         # Admin setup guide
│   ├── backend-storage-setup.md
│   └── facility-updates-setup.md
│
├── supabase/                      # Supabase config
│   ├── client.ts                  # Local client copy (mirrors src/integrations)
│   └── config.toml
│
├── tests/                         # Additional test directory
│   └── unit/
│       └── supabase-client.test.ts
│
└── Config files (root)
    ├── package.json               # Dependencies
    ├── tsconfig.json              # TS root config
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── vite.config.ts             # Build config
    ├── tailwind.config.ts          # Tailwind config
    ├── postcss.config.js           # PostCSS config
    ├── eslint.config.js            # Linting config
    ├── components.json             # shadcn/ui registry
    ├── .env.example                # Template for secrets
    └── README.md                   # Project documentation
```

### **Entry Points**

| File | Purpose | Runs First |
|------|---------|-----------|
| [index.html](index.html) | HTML template (root div#root) | 🟢 First |
| [src/main.tsx](src/main.tsx) | React DOM render, supabase exposure | 🟢 Second |
| [src/App.tsx](src/App.tsx) | Router config, QueryClient provider, AdminAuthProvider | 🟢 Third |
| [src/components/layout/RootLayout.tsx](src/components/layout/RootLayout.tsx) | Header, Footer, Outlet for child routes | 🟢 Fourth |

### **Route Structure**

```
/                                    → RootLayout
├── /                                → HomePage
├── /about                           → AboutPage
├── /instruments                     → InstrumentsPage
├── /instruments/:code               → InstrumentDetailPage
├── /services                        → ServicesPage
├── /services/:id                    → ServiceDetailPage
├── /facilities                      → FacilitiesPage
├── /facilities/:id                  → FacilityDetailPage
├── /leadership/:id                  → LeaderDetailPage
├── /coordinator                     → CoordinatorProfile
├── /pricing                         → PricingPage
├── /contact                         → ContactPage
├── /submit-request                  → SubmitRequestPage
├── /consultancy                     → ConsultancyPage
├── /departments/:slug               → DepartmentDetailPage
├── /components                      → ComponentsPage
├── /components/:slug                → ComponentDetailPage
├── /auth                            → Auth (Supabase login/signup)
│
└── /admin                           → AdminLayout (RequireAdmin guard)
    ├── /admin (index)               → AdminDashboard
    ├── /admin/login                 → AdminLoginPage
    ├── /admin/instruments           → InstrumentsListPage
    ├── /admin/instruments/new       → InstrumentFormPage (create)
    ├── /admin/instruments/:id       → InstrumentFormPage (edit)
    ├── /admin/components            → ComponentsListPage
    ├── /admin/components/new        → ComponentFormPage
    ├── /admin/components/:id        → ComponentFormPage
    ├── /admin/departments           → DepartmentsListPage
    ├── /admin/departments/new       → DepartmentFormPage
    ├── /admin/departments/:id       → DepartmentFormPage
    ├── /admin/prices                → PricesListPage
    ├── /admin/announcements         → AnnouncementsListPage
    ├── /admin/enquiries             → EnquiriesListPage
    └── /admin/info-blocks           → InfoBlocksListPage
```

---

## 8. Critical Files & Single Points of Failure

### **CRITICAL - Must Never Be Deleted**

| File | Reason | Impact |
|------|--------|--------|
| [src/integrations/supabase/client.ts](src/integrations/supabase/client.ts) | Initializes Supabase client; all DB calls depend on it | **TOTAL APP FAILURE** - no database access |
| [src/contexts/AdminAuthContext.tsx](src/contexts/AdminAuthContext.tsx) | Controls all admin authentication | **ADMIN PANEL UNUSABLE** |
| [src/App.tsx](src/App.tsx) | Routes, QueryClient, providers | **APP CRASHES** - React rendering fails |
| [src/main.tsx](src/main.tsx) | React DOM entry point | **BLANK PAGE** |
| [src/components/layout/RootLayout.tsx](src/components/layout/RootLayout.tsx) | Header, Footer, `<Outlet>` for all routes | **BROKEN LAYOUT** on all pages |
| [src/components/auth/RequireAdmin.tsx](src/components/auth/RequireAdmin.tsx) | Admin route protection | **SECURITY BREACH** - unauthenticated access to admin |
| [index.html](index.html) | DOM root | **APP WON'T LOAD** |

### **CRITICAL - Files Acting as Single Points of Failure**

| File | Function | Dependency | Risk |
|------|----------|-----------|------|
| [src/integrations/supabase/types.ts](src/integrations/supabase/types.ts) | Database type definitions (auto-generated) | TypeScript compilation | ⚠️ If corrupted, entire app has type errors |
| [tailwind.config.ts](tailwind.config.ts) | Tailwind CSS configuration | Build pipeline | ⚠️ Misconfiguration breaks all styling |
| [vite.config.ts](vite.config.ts) | Path alias `@/*` setup | Import resolution | ⚠️ Removing alias breaks all `@/` imports |
| [src/supabase/client.ts](src/supabase/client.ts) | Re-export of integrations client | All services import from here | ⚠️ Every service depends on this |

### **HIGH-RISK Files (Fragile Logic)**

| File | Issue | Impact |
|------|-------|--------|
| [src/contexts/AdminAuthContext.tsx](src/contexts/AdminAuthContext.tsx) | Stores auth in localStorage unencrypted; dev key in env file | ⚠️ Dev key could leak; localStorage vulnerable if XSS |
| [src/services/consultancyEnquiries.ts](src/services/consultancyEnquiries.ts) | Hardcoded 'Anonymous' fallback; assumes `department_id` exists | ⚠️ Deleting department breaks foreign key |
| [src/integrations/supabase/client.ts](src/integrations/supabase/client.ts) | Returns `null` if env vars missing (silent fail) | ⚠️ No clear error message; app appears broken |
| [sql/consultancy_enquiries.sql](sql/consultancy_enquiries.sql) | RLS policy depends on `is_requester_admin()` function | ⚠️ If function deleted from Supabase, all policies fail |

---

## 9. Coupling & Risk Zones

### **Tightly Coupled Components**

| Component A | Component B | Coupling Type | Risk |
|------------|-----------|---------------|------|
| Admin pages | `AdminAuthContext` | **Hard dependency** (12+ files import) | ⚠️ Auth context changes break all admin pages |
| All data pages | `supabase/client.ts` | **Hard dependency** (50+ references) | ⚠️ Client initialization failure breaks entire app |
| Services | Database schema | **Schema coupling** | ⚠️ Column rename/delete in Supabase breaks TypeScript types |
| `RequireAdmin` | `AdminAuthContext` | **Direct import** | ✅ Acceptable (clean architecture) |
| Form pages | `react-hook-form` + `zod` | **Coupled frameworks** | ⚠️ Switching validation library requires refactoring 20+ forms |

### **Areas Where Small Changes Break Many Things**

| Change | Affected Components | Severity |
|--------|-------------------|----------|
| Delete `departments` table | **3+ locations**: ForeignKey in consultancy_enquiries, DepartmentDetailPage, DepartmentsList, DepartmentForm | 🔴 **CRITICAL** |
| Rename column in `instruments` table | **5+ locations**: Service layer, admin forms, detail pages, component rendering | 🔴 **CRITICAL** |
| Remove Supabase storage bucket | **2 locations**: uploadInstrumentImage, getPublicImageUrl | 🟡 **HIGH** |
| Change `VITE_ADMIN_DEV_KEY` format | AdminLoginPage, AdminAuthContext | 🟡 **MEDIUM** |
| Remove TanStack Query without replacing | QueryClient provider in App.tsx (currently unused) | 🟢 **LOW** (not in use) |

### **Legacy or Over-Engineered Patterns**

| Pattern | Location | Reason | Recommendation |
|---------|----------|--------|-----------------|
| **Manual `useState` for data fetching** | ~20 pages | Repetitive boilerplate (loading, error, setData) | Use TanStack Query (installed but unused) |
| **QueryClient installed but unused** | [src/App.tsx](src/App.tsx) | Over-engineered setup | Either use it or remove dependency |
| **Console logs in production code** | consultancyEnquiries.ts, NotFound.tsx | Debugging left behind | Use proper error tracking (Sentry, etc.) |
| **Hardcoded 'Anonymous' fallback** | [src/services/consultancyEnquiries.ts](src/services/consultancyEnquiries.ts) | Defensive coding but unclear | Clarify intent in comments |
| **Two copies of Supabase client** | `/src/supabase/client.ts` + `/supabase/client.ts` | Possible migration in progress | Consolidate or document why dual paths exist |
| **localStorage for admin auth** | AdminAuthContext | Dev-only system | OK for dev; replace with proper auth in production |
| **Manual error state per component** | 10+ admin pages | Repetitive pattern | Create reusable `useAsync` hook |

### **Dead Code & Unused Imports**

| Location | Issue |
|----------|-------|
| [src/App.tsx](src/App.tsx) | `const queryClient = new QueryClient()` - QueryClient initialized but **never actually used** in components |
| [src/pages/Auth.tsx](src/pages/Auth.tsx) | Supabase auth UI present but **not linked** from navbar or admin login |
| [src/services/facilityUpdates.ts](src/services/facilityUpdates.ts) | `getUpdateTypeBadge()` export **unclear if used** |

---

## 10. Recommendations

### **Immediate (1-2 weeks)**

1. **Enable TanStack Query Usage**
   - Replace manual `useState` fetching in all pages with `useQuery()`
   - Benefit: Automatic caching, refetch, loading/error states
   - Risk: Medium (refactoring many pages)

2. **Consolidate Supabase Client**
   - Remove `/supabase/client.ts` (duplicate)
   - Use only `/src/integrations/supabase/client.ts`
   - Benefit: Single source of truth

3. **Add Proper Error Handling Utility**
   - Create `useAsync()` hook to standardize loading/error/data states
   - Eliminate repetition in 20+ pages
   - Benefit: Consistency, reduced bugs

4. **Remove Console.debug from Production**
   - Production logging should use structured error tracking (e.g., Sentry)
   - Benefit: Security, cleaner code

### **Short-term (1-2 months)**

5. **Implement Proper Secret Management**
   - Use Supabase Vault or AWS Secrets Manager
   - Stop storing dev keys in .env files
   - Benefit: Security, key rotation

6. **Add RLS Policy Audit**
   - Verify all RLS policies in SQL directory are deployed
   - Test that `is_requester_admin()` function exists
   - Document which tables are public vs. admin-only
   - Benefit: Security assurance

7. **Add Integration Tests**
   - Test full data flow: Form → Service → Supabase → Response
   - Currently only unit tests exist
   - Benefit: Catch breaking changes early

8. **Document Database Schema**
   - Create ERD (Entity Relationship Diagram)
   - Document foreign keys, cascade behavior
   - Benefit: Prevent accidental schema breaks

### **Long-term (3-6 months)**

9. **Move Admin Auth to Supabase Auth**
   - Replace dev key with proper Supabase auth (email + password or OAuth)
   - Benefit: Production-ready, scalable

10. **Implement Analytics**
    - Add event tracking for user journeys
    - Monitor error rates, page performance
    - Benefit: Usage insights, debugging

11. **Add E2E Tests (Playwright)**
    - Test admin workflows (login, create instrument, etc.)
    - Test public flows (search, filter, submit enquiry)
    - Benefit: Regression prevention

12. **Consider Component Library Extraction**
    - Publish shadcn/ui components as internal design system
    - Benefit: Reuse across projects

### **Code Quality Quick Wins**

| Issue | Fix | Effort |
|-------|-----|--------|
| Unused QueryClient | Remove if no plans to use, or migrate pages to it | 5 mins |
| Missing error boundaries | Add React Error Boundary to routes | 30 mins |
| TypeScript strictness | Enable `strictNullChecks`, `noImplicitAny` | 2-4 hours |
| Unused dependencies | Audit and remove unused packages | 1 hour |
| Test coverage | Current tests only cover auth; expand to services | 4-8 hours |

---

## 11. Summary Table: Tech Stack at a Glance

| Category | Technology | Health |
|----------|-----------|--------|
| Language | TypeScript 5.8.3 | ✅ Modern, well-typed |
| Framework | React 18 + Vite 7 | ✅ Current, performant |
| Styling | Tailwind CSS + shadcn/ui | ✅ Excellent |
| Routing | React Router v6 | ✅ Mature |
| Forms | React Hook Form + Zod | ✅ Best-in-class |
| State | Context + TanStack Query | ⚠️ Query installed but unused |
| Backend | Supabase (PostgreSQL + Auth + Storage) | ✅ Solid |
| Admin Auth | Custom dev key (localStorage) | ⚠️ Development only |
| Database RLS | SQL policies | ✅ Present, but verify deployment |
| Error Handling | Try/catch + toast + console | ⚠️ Inconsistent, no central logging |
| Testing | Vitest + @testing-library | ⚠️ Minimal coverage |
| Linting | ESLint 9 + TypeScript | ✅ Good |
| Deployment | Vite build → Static hosting | ✅ Ready |

---

## 12. Glossary

- **RLS**: Row-Level Security (Supabase database access control)
- **PGRST116**: PostgreSQL error code for "no rows returned"
- **SPA**: Single Page Application (React Router handles routing)
- **TanStack Query**: React Query v5 (server state management)
- **shadcn/ui**: Unstyled Radix UI component library
- **Vite SWC**: Speed-optimized JSX transpiler
- **Anon key**: Supabase public key (safe to expose; RLS protects data)

---

**End of Report**

Generated: December 23, 2025  
Repository: TanmayKarpe/ATS-WEBSITE-01  
Branch: main
