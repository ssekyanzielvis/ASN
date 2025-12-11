# ⚡ QUICK REFERENCE CARD

## 🚀 Start Application
```powershell
.\start-project.ps1
```

## 🌐 URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api
- **Admin Panel:** http://localhost:8000/admin
- **API Docs:** http://localhost:8000/swagger

## 📝 Common Commands

### Backend
```powershell
cd backend
.\venv\Scripts\activate                    # Activate virtual environment
python manage.py runserver                 # Start server
python manage.py createsuperuser           # Create admin user
python manage.py migrate                   # Run migrations
python manage.py makemigrations            # Create migrations
python manage.py shell                     # Django shell
```

### Frontend
```powershell
cd frontend
npm start                                  # Start dev server
npm build                                  # Build for production
npm test                                   # Run tests
npm install                                # Install dependencies
```

## 📁 Key Files

### Backend
- `backend/core/models.py` - Database models
- `backend/core/serializers.py` - API serializers
- `backend/core/views.py` - API views
- `backend/core/admin.py` - Admin configuration
- `backend/api/settings.py` - Django settings
- `backend/api/urls.py` - URL routing

### Frontend
- `frontend/src/App.tsx` - Main app
- `frontend/src/pages/` - Page components
- `frontend/src/components/` - Reusable components
- `frontend/src/services/api.ts` - API services
- `frontend/src/types/index.ts` - TypeScript types
- `frontend/tailwind.config.js` - Styling theme

## 🎨 Models

### Category
- name, slug, description

### Project
- title, slug, description, full_content
- project_type, category, featured
- featured_image, image_1-4, video_url
- display_order

### NewsArticle
- title, slug, excerpt, content
- featured_image, author
- published, publish_date

### Collaboration
- name, email, project_type, message
- status, reviewed

### SiteSettings
- site_title, tagline, founder_quote
- contact_email, phone, address
- social media links

## 🛠️ Troubleshooting

**Port in use:**
```powershell
python manage.py runserver 8001  # Backend
$env:PORT=3001; npm start        # Frontend
```

**Module not found:**
```powershell
pip install -r requirements.txt  # Backend
npm install                      # Frontend
```

**Database issues:**
```powershell
Remove-Item db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

**Frontend build fails:**
```powershell
Remove-Item -Recurse node_modules
npm install
```

## 📚 Documentation
- **GETTING_STARTED.md** - Quick start
- **SETUP.md** - Detailed setup
- **DEPLOYMENT.md** - Production deployment
- **PROJECT_COMPLETE.md** - Complete overview
- **README.md** - Project info

## 🎯 Workflow
1. Start servers (`.\start-project.ps1`)
2. Login to admin (http://localhost:8000/admin)
3. Add content (categories, projects, news)
4. View on frontend (http://localhost:3000)
5. Make changes, test, commit

## ✅ Checklist
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Create superuser
- [ ] Add categories
- [ ] Add first project
- [ ] Add news article
- [ ] Configure site settings
- [ ] Test all pages
- [ ] Test responsiveness

## 🔑 Default Settings
- **Backend Port:** 8000
- **Frontend Port:** 3000
- **Database:** SQLite (dev), PostgreSQL (prod)
- **Auth:** JWT tokens
- **Pagination:** 12 items/page
- **Image Upload:** Enabled
- **CORS:** Configured for localhost:3000

## 🎨 Theme Colors
- Pure Black: #000000
- Pure White: #FFFFFF
- Dark Gray 1: #1A1A1A
- Dark Gray 2: #333333
- Dark Gray 3: #666666
- Off White: #F8F8F8

## 🚀 Deploy Commands

### Heroku (Backend)
```powershell
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

### Vercel (Frontend)
```powershell
vercel
vercel --prod
```

---

**Need More Help?** Check GETTING_STARTED.md or SETUP.md
