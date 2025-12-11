# Atelier Spaces Nate - Full Stack Web Application

A professional portfolio and studio management platform for a research-led design studio working with form, systems, and cultural intelligence, rooted in African contexts.

## 🎯 Project Overview

This is a complete full-stack web application featuring:

- **Backend**: Django REST Framework API
- **Frontend**: React + TypeScript with Tailwind CSS
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage for media files
- **Authentication**: JWT-based authentication
- **Design**: Minimalist black/white aesthetic
- **Deployment**: Heroku (backend) + Netlify (frontend) + Supabase (database & storage)

## ✨ Features

### Public Features
- Portfolio project showcase with filtering by type
- News/blog articles with rich content
- Collaboration request submission
- Responsive design across all devices
- SEO-optimized pages

### Admin Features
- Django admin panel with custom enhancements
- Project and news article management
- Collaboration request tracking
- Site settings configuration
- Image upload and management

## 🛠 Technology Stack

### Backend
- Django 4.2+
- Django REST Framework
- PostgreSQL (production) / SQLite (development)
- JWT Authentication (Simple JWT)
- Pillow for image handling
- Gunicorn for production server
- django-cors-headers for CORS
- drf-yasg for API documentation

### Frontend
- React 19
- TypeScript
- Tailwind CSS 4
- React Router v6
- React Query (TanStack Query)
- Axios for API calls
- Framer Motion for animations
- React Icons

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
- Windows: `venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create `.env` file:
```bash
copy .env.example .env
```

6. Run migrations:
```bash
python manage.py migrate
```

7. Create superuser:
```bash
python manage.py createsuperuser
```

8. Run development server:
```bash
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
copy .env.example .env
```

4. Start development server:
```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## Project Structure

```
Atelier-Spaces-Nate/
├── backend/
│   ├── config/              # Django project settings
│   ├── projects/            # Projects app
│   ├── news/                # News/blog app
│   ├── collaborations/      # Collaboration requests app
│   ├── core/                # Site settings app
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx
│   └── package.json
└── project_documentation.txt
```

## API Endpoints

### Public Endpoints
- `GET /api/projects/` - List all projects
- `GET /api/projects/{slug}/` - Project details
- `GET /api/projects/featured/` - Featured projects
- `GET /api/news/` - List articles
- `GET /api/news/{slug}/` - Article details
- `POST /api/collaborations/` - Submit collaboration request
- `GET /api/settings/` - Site settings

### Admin Endpoints (Requires Authentication)
- `POST /api/token/` - Obtain JWT token
- `POST /api/token/refresh/` - Refresh token
- All CRUD operations for projects and news

## 🚀 Deployment

This project is configured to deploy to:
- **Backend**: Heroku (with Supabase for database and storage)
- **Frontend**: Netlify
- **Database**: Supabase PostgreSQL
- **File Storage**: Supabase Storage

### Quick Deploy

Run the automated deployment script:
```powershell
.\deploy.ps1
```

This will guide you through deploying both frontend and backend.

### Manual Deployment

#### Option 1: Automated Scripts
```powershell
# Deploy backend to Heroku
.\deploy-heroku.ps1

# Deploy frontend to Netlify
.\deploy-netlify.ps1
```

#### Option 2: Step-by-Step

**1. Supabase Setup (2 minutes)**
- Create project at https://app.supabase.com
- Create storage bucket: `atelier-media` (public)
- Get credentials from Settings → API

**2. Backend (Heroku)**
```bash
cd backend
heroku create your-app-name
heroku config:set SECRET_KEY="..." DATABASE_URL="..." SUPABASE_URL="..." SUPABASE_KEY="..."
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

**3. Frontend (Netlify)**
```bash
cd frontend
netlify init
netlify env:set REACT_APP_API_URL "https://your-app.herokuapp.com/api"
netlify deploy --prod
```

**4. Update CORS**
```bash
heroku config:set CORS_ALLOWED_ORIGINS="https://your-site.netlify.app,http://localhost:3000"
```

### Deployment Documentation

- **📖 Full Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Comprehensive deployment instructions
- **⚡ Quick Reference**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Fast deployment steps
- **✅ Checklist**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Step-by-step checklist
- **⚙️ Configuration**: [DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md) - Technical configuration details

## Design System

### Color Palette
- **Pure Black**: `#000000` - Headlines, important elements
- **Pure White**: `#FFFFFF` - Backgrounds, cards
- **Dark Gray 1**: `#1A1A1A` - Secondary backgrounds
- **Dark Gray 2**: `#333333` - Body text
- **Dark Gray 3**: `#666666` - Subtle text, captions
- **Off White**: `#F8F8F8` - Alternative backgrounds

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## Default Admin Access

After creating a superuser, access the admin panel at:
- Development: `http://localhost:8000/admin/`
- Production: `https://your-domain.herokuapp.com/admin/`

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=atelier_spaces_nate
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Development Workflow

1. Start backend server: `python manage.py runserver`
2. Start frontend server: `npm start`
3. Access frontend at `http://localhost:3000`
4. Access admin at `http://localhost:8000/admin/`
5. API available at `http://localhost:8000/api/`

## Testing

### Backend
```bash
cd backend
python manage.py test
```

### Frontend
```bash
cd frontend
npm test
```

## Security Features

- JWT authentication with token refresh
- CORS protection
- CSRF protection
- Password validation
- SQL injection prevention via ORM
- XSS protection in React
- Secure password hashing

## Performance Optimizations

- Database query optimization
- Image lazy loading
- Code splitting
- API response caching
- Static file compression
- CDN-ready architecture

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Copyright © 2025 Atelier Spaces Nate. All rights reserved.

## Support

For issues or questions:
- Email: hello@atelierspacesnate.com
- Create an issue in the repository

## Acknowledgments

Built with Django REST Framework, React, TypeScript, and Tailwind CSS.
Designed for modern web standards and optimal user experience.
