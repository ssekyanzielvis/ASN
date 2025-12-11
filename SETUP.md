# Atelier Spaces Nate - Setup Guide

## Quick Start

### Prerequisites

- Python 3.9+ installed
- Node.js 16+ and npm installed
- Git installed

### Backend Setup (Django)

1. **Navigate to backend directory:**
   ```powershell
   cd backend
   ```

2. **Create virtual environment:**
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```powershell
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (admin):**
   ```powershell
   python manage.py createsuperuser
   ```
   Follow prompts to set username, email, and password.

6. **Create initial site settings:**
   ```powershell
   python manage.py shell
   ```
   In the shell:
   ```python
   from core.models import SiteSettings
   settings = SiteSettings.load()
   settings.save()
   exit()
   ```

7. **Run development server:**
   ```powershell
   python manage.py runserver
   ```
   Backend will be available at http://localhost:8000

8. **Access Django admin:**
   - Navigate to http://localhost:8000/admin/
   - Login with superuser credentials
   - Add categories, projects, news articles

### Frontend Setup (React)

1. **Navigate to frontend directory (in new terminal):**
   ```powershell
   cd frontend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Start development server:**
   ```powershell
   npm start
   ```
   Frontend will open at http://localhost:3000

## Project Structure

```
atelier-spaces-nate/
├── backend/                 # Django REST API
│   ├── api/                # Main Django project
│   │   ├── settings.py    # Configuration
│   │   └── urls.py        # URL routing
│   ├── core/              # Main app
│   │   ├── models.py      # Database models
│   │   ├── serializers.py # API serializers
│   │   ├── views.py       # API views
│   │   └── admin.py       # Admin configuration
│   ├── manage.py          # Django management
│   └── requirements.txt   # Python dependencies
│
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   ├── App.tsx       # Main app component
│   │   └── index.tsx     # Entry point
│   ├── public/           # Static files
│   └── package.json      # Node dependencies
│
├── ARCHITECTURE.md        # Architecture documentation
├── DEPLOYMENT.md          # Deployment guide
└── README.md             # Project overview
```

## API Endpoints

### Public Endpoints (No Authentication)

- `GET /api/projects/` - List all projects
- `GET /api/projects/{slug}/` - Get project details
- `GET /api/projects/featured/` - Get featured projects
- `GET /api/news/` - List published articles
- `GET /api/news/{slug}/` - Get article details
- `GET /api/categories/` - List all categories
- `POST /api/collaborations/` - Submit collaboration request
- `GET /api/settings/current/` - Get site settings

### Admin Endpoints (Require Authentication)

- `POST /api/token/` - Obtain JWT tokens
- `POST /api/token/refresh/` - Refresh access token
- `POST /api/projects/` - Create project (admin only)
- `PUT /api/projects/{slug}/` - Update project (admin only)
- `DELETE /api/projects/{slug}/` - Delete project (admin only)
- Similar CRUD endpoints for news, categories, etc.

## Common Tasks

### Adding Content via Django Admin

1. **Access Admin Panel:**
   - Go to http://localhost:8000/admin/
   - Login with superuser credentials

2. **Add Category:**
   - Click "Categories" → "Add Category"
   - Enter name and description
   - Save

3. **Add Project:**
   - Click "Projects" → "Add Project"
   - Fill in all fields
   - Upload images
   - Set featured status if needed
   - Save

4. **Add News Article:**
   - Click "News articles" → "Add News article"
   - Write title, excerpt, and content
   - Upload featured image
   - Set published status
   - Save

5. **Configure Site Settings:**
   - Click "Site Settings"
   - Update site title, tagline, quote
   - Add contact information
   - Add social media links
   - Save

### Database Management

**Reset Database:**
```powershell
cd backend
Remove-Item db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

**Backup Database:**
```powershell
copy db.sqlite3 db.sqlite3.backup
```

**Export Data:**
```powershell
python manage.py dumpdata > backup.json
```

**Import Data:**
```powershell
python manage.py loaddata backup.json
```

## Development Tips

### Backend Development

**Run specific migrations:**
```powershell
python manage.py migrate core
```

**Create new migration:**
```powershell
python manage.py makemigrations
```

**Access Django shell:**
```powershell
python manage.py shell
```

**Run tests:**
```powershell
python manage.py test
```

### Frontend Development

**Build for production:**
```powershell
npm run build
```

**Run tests:**
```powershell
npm test
```

**Check for linting issues:**
```powershell
npm run lint
```

## Troubleshooting

### Backend Issues

**Port already in use:**
```powershell
python manage.py runserver 8001
```

**Module not found:**
```powershell
pip install -r requirements.txt
```

**Database locked:**
- Close any programs accessing db.sqlite3
- Restart development server

### Frontend Issues

**Port 3000 in use:**
- Set different port: `$env:PORT=3001; npm start`

**Module not found:**
```powershell
Remove-Item -Recurse node_modules
npm install
```

**Build fails:**
```powershell
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
npm install
```

## Testing the Application

### Manual Testing Checklist

- [ ] Homepage loads with featured projects
- [ ] Projects page shows all projects with filters
- [ ] Project detail page displays full information
- [ ] News page shows published articles
- [ ] News detail page displays article content
- [ ] Collaboration form submits successfully
- [ ] Contact page shows contact information
- [ ] Admin panel accessible and functional
- [ ] Mobile responsive design works

### API Testing

Use the Swagger UI at http://localhost:8000/swagger/ to test API endpoints interactively.

## Next Steps

1. **Add Content:**
   - Create categories for your projects
   - Add your first project with images
   - Write a news article
   - Configure site settings

2. **Customize:**
   - Update colors in `frontend/tailwind.config.js`
   - Modify homepage content in `HomePage.tsx`
   - Add custom pages as needed

3. **Deploy:**
   - Follow DEPLOYMENT.md for production setup
   - Configure domain and SSL
   - Set up monitoring and backups

## Support

For issues or questions:
- Check ARCHITECTURE.md for system design
- Review project_documentation.txt for detailed specs
- Check Django/React documentation
- Review error logs in terminal

## Development Workflow

1. Start backend server
2. Start frontend server
3. Make changes to code
4. Test changes in browser
5. Commit changes to git
6. Deploy to production when ready
