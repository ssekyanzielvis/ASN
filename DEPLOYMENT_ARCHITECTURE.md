# Deployment Architecture & Flow

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                               │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  React Frontend (TypeScript + Tailwind CSS)               │ │
│  │  • Portfolio pages                                         │ │
│  │  • News articles                                          │ │
│  │  • Contact forms                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             │ HTTPS
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                     NETLIFY CDN                                   │
│  • Static file hosting                                           │
│  • Automatic HTTPS                                               │
│  • Global CDN distribution                                       │
│  • Auto-deploy from Git                                         │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             │ REST API Calls
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                       HEROKU DYNO                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Django REST Framework API                                 │ │
│  │  • JWT Authentication                                      │ │
│  │  • Project management                                      │ │
│  │  • News management                                         │ │
│  │  • File upload handling                                    │ │
│  │  • Admin panel                                             │ │
│  └────────────────┬───────────────────────────┬───────────────┘ │
└────────────────────┼───────────────────────────┼─────────────────┘
                     │                           │
          Database   │                           │ File Storage
          Queries    │                           │ Operations
                     ↓                           ↓
     ┌──────────────────────────┐   ┌──────────────────────────┐
     │   SUPABASE DATABASE      │   │   SUPABASE STORAGE       │
     │  • PostgreSQL            │   │  • Image files           │
     │  • Projects table        │   │  • Project images        │
     │  • News articles table   │   │  • Public CDN URLs       │
     │  • Users table           │   │  • Bucket: atelier-media │
     │  • Collaboration table   │   │  • Public access         │
     └──────────────────────────┘   └──────────────────────────┘
```

## Data Flow

### 1. User Views Project
```
User Browser → Netlify (React App) → Heroku (API Request) 
→ Supabase DB (Get Projects) → Supabase Storage (Get Image URLs)
→ Heroku (JSON Response) → Netlify → User Browser (Rendered Page)
```

### 2. Admin Uploads Project Image
```
Admin Browser → Netlify (Admin Form) → Heroku (Upload API)
→ Supabase Storage (Store File) → Supabase DB (Save URL)
→ Heroku (Success Response) → Netlify → Admin Browser (Confirmation)
```

### 3. User Submits Collaboration
```
User Browser → Netlify (Contact Form) → Heroku (POST API)
→ Supabase DB (Save Request) → Heroku (Email Notification)
→ Netlify → User Browser (Thank You Message)
```

## Deployment Flow

```
┌─────────────────┐
│  1. SUPABASE    │  Setup database and storage
│     SETUP       │  • Create project
│                 │  • Create bucket: atelier-media
│                 │  • Get credentials
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  2. HEROKU      │  Deploy backend API
│     BACKEND     │  • Create app
│                 │  • Set environment variables
│                 │  • Push code
│                 │  • Run migrations
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  3. NETLIFY     │  Deploy frontend
│     FRONTEND    │  • Connect Git repo
│                 │  • Set build settings
│                 │  • Set API URL
│                 │  • Deploy
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  4. UPDATE      │  Configure CORS
│     CORS        │  • Add Netlify URL to Heroku
│                 │  • Test connections
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  5. VERIFY      │  Test everything
│     & TEST      │  • API endpoints
│                 │  • Image uploads
│                 │  • Full user flow
└─────────────────┘
```

## Security Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                          │
├──────────────────────────────────────────────────────────────┤
│  1. NETLIFY                                                   │
│     • Automatic HTTPS/SSL                                     │
│     • DDoS protection                                        │
│     • CDN security                                           │
├──────────────────────────────────────────────────────────────┤
│  2. HEROKU                                                    │
│     • CORS protection                                        │
│     • CSRF tokens                                            │
│     • JWT authentication                                     │
│     • Environment variable encryption                        │
├──────────────────────────────────────────────────────────────┤
│  3. DJANGO                                                    │
│     • SQL injection prevention (ORM)                         │
│     • XSS protection                                         │
│     • Clickjacking protection                                │
│     • Password hashing (PBKDF2)                              │
├──────────────────────────────────────────────────────────────┤
│  4. SUPABASE                                                  │
│     • Row Level Security (RLS)                               │
│     • Storage bucket policies                                │
│     • Encrypted connections                                  │
│     • Backup and recovery                                    │
└──────────────────────────────────────────────────────────────┘
```

## Environment Variables Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT (.env files)                  │
├─────────────────────────────────────────────────────────────┤
│  Backend:  DEBUG=True, DATABASE=SQLite, etc.                │
│  Frontend: REACT_APP_API_URL=http://localhost:8000/api      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Deploy to
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  PRODUCTION (Platform configs)               │
├─────────────────────────────────────────────────────────────┤
│  Heroku:   heroku config:set VAR=value                      │
│  Netlify:  Environment variables in dashboard               │
│  Supabase: Project settings                                 │
└─────────────────────────────────────────────────────────────┘
```

## Request/Response Cycle

### GET Project List
```
1. User visits:        https://your-site.netlify.app/projects
2. React Router:       Loads Projects page component
3. React Query:        Fetches from API
4. Axios:              GET https://your-app.herokuapp.com/api/projects/
5. Heroku:             Receives request
6. Django:             Processes request
7. Supabase DB:        Returns project data
8. Supabase Storage:   Provides image URLs
9. Django:             Serializes data to JSON
10. Heroku:            Sends response
11. React:             Receives and renders data
12. Browser:           Displays projects with images
```

### POST Collaboration Request
```
1. User fills form:    Contact page on Netlify
2. Form submit:        React handles validation
3. Axios POST:         To /api/collaborations/
4. Heroku:             Receives POST request
5. Django:             Validates data
6. Supabase DB:        Saves collaboration request
7. Django:             (Optional) Sends email notification
8. Heroku:             Returns success response
9. React:              Shows success message
10. User:              Sees confirmation
```

## File Upload Flow

```
1. Admin selects file → 2. Browser reads file → 3. Form data prepared
                                                           ↓
8. Image displays   ← 7. React updates UI  ← 6. Success response
                                                           ↓
                                              5. URL saved in DB (Supabase)
                                                           ↓
                                              4. File stored in bucket (Supabase)
                                                           ↓
                                              3. Heroku receives upload
```

## Monitoring & Maintenance

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│    NETLIFY     │     │     HEROKU     │     │   SUPABASE     │
├────────────────┤     ├────────────────┤     ├────────────────┤
│ • Build logs   │     │ • App logs     │     │ • DB logs      │
│ • Deploy logs  │     │ • Error logs   │     │ • Storage logs │
│ • Analytics    │     │ • Metrics      │     │ • Query logs   │
│ • Uptime       │     │ • Dyno status  │     │ • Backups      │
└────────────────┘     └────────────────┘     └────────────────┘
        │                      │                       │
        └──────────────────────┼───────────────────────┘
                               ↓
                    ┌────────────────────┐
                    │   MONITORING       │
                    │   (Optional)       │
                    │   • Sentry         │
                    │   • LogRocket      │
                    │   • Custom alerts  │
                    └────────────────────┘
```

## Cost Breakdown (Free Tiers)

```
┌──────────────────────────────────────────────────────────────┐
│                        FREE TIER LIMITS                       │
├──────────────────────────────────────────────────────────────┤
│  NETLIFY                                                      │
│  • Bandwidth: 100 GB/month                                   │
│  • Build minutes: 300 minutes/month                          │
│  • Sites: Unlimited                                          │
│  • Forms: 100 submissions/month                              │
├──────────────────────────────────────────────────────────────┤
│  HEROKU                                                       │
│  • Dyno hours: 550-1000 hours/month (with account)          │
│  • Eco dynos: $5/month (for 24/7 uptime)                    │
│  • Add-ons: Limited free tiers                               │
├──────────────────────────────────────────────────────────────┤
│  SUPABASE                                                     │
│  • Database: 500 MB                                          │
│  • Storage: 1 GB                                             │
│  • Bandwidth: 2 GB                                           │
│  • API requests: Unlimited                                   │
└──────────────────────────────────────────────────────────────┘

Total for basic portfolio site: FREE (or ~$5/month for 24/7 Heroku)
```

## Scaling Strategy

```
Start →  Free Tiers      →  Paid Plans        →  Enterprise
         (Testing)          (Production)         (High Traffic)
         
Netlify: Free            →  Pro ($19/mo)      →  Business ($99/mo)
Heroku:  Eco ($5)        →  Basic ($7)        →  Standard ($25+)
Supabase: Free           →  Pro ($25/mo)      →  Enterprise (Custom)

Traffic:  <1K visits/day →  1-10K visits/day  →  10K+ visits/day
```
