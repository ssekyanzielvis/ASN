# 🚀 GETTING STARTED - Atelier Spaces Nate

Welcome! This guide will get you up and running in minutes.

## ⚡ Super Quick Start (Recommended)

Just run this one command in PowerShell from the project root:

```powershell
.\start-project.ps1
```

This will automatically:
- Start the backend Django server at http://localhost:8000
- Start the frontend React server at http://localhost:3000
- Open both in separate windows

## 📋 First Time Setup Checklist

### 1. Install Prerequisites
- [ ] Python 3.9+ ([Download](https://www.python.org/downloads/))
- [ ] Node.js 16+ ([Download](https://nodejs.org/))
- [ ] Git ([Download](https://git-scm.com/))

### 2. Clone/Open Project
```powershell
cd C:\Users\SSEKYANZI\atelier-spaces-nate
```

### 3. Initial Setup (First Time Only)

**Backend Setup:**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

**Frontend Setup:**
```powershell
cd frontend
npm install
```

### 4. Run the Application

**Option A - Automatic (Both Servers):**
```powershell
.\start-project.ps1
```

**Option B - Manual (Separate Terminals):**

Terminal 1 (Backend):
```powershell
cd backend
.\venv\Scripts\activate
python manage.py runserver
```

Terminal 2 (Frontend):
```powershell
cd frontend
npm start
```

## 🌐 Access Points

After starting:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | Main website |
| **Backend API** | http://localhost:8000/api | REST API |
| **Admin Panel** | http://localhost:8000/admin | Content management |
| **API Docs** | http://localhost:8000/swagger | API documentation |

## 📝 Adding Your First Content

1. **Access Admin Panel:**
   - Go to http://localhost:8000/admin
   - Login with your superuser credentials

2. **Add a Category:**
   - Click "Categories" → "Add Category"
   - Name: "Architecture" 
   - Save

3. **Add a Project:**
   - Click "Projects" → "Add Project"
   - Fill in title, description
   - Select category
   - Upload an image
   - Check "Featured" box
   - Save

4. **Configure Site Settings:**
   - Click "Site Settings"
   - Update site title and tagline
   - Add a founder quote
   - Add contact email
   - Save

5. **View on Frontend:**
   - Go to http://localhost:3000
   - See your project on the homepage!

## 🎨 What You'll See

### Frontend Pages
- **/** - Homepage with featured projects
- **/projects** - All projects with filters
- **/projects/[slug]** - Individual project details
- **/news** - Blog/news articles
- **/collaborate** - Collaboration request form
- **/contact** - Contact information

### Backend Admin
- Dashboard with content overview
- Projects management
- News articles management
- Categories management
- Collaboration requests
- Site settings

## 🛠️ Common Tasks

### Add More Content
```
Admin → Projects → Add Project
Admin → News → Add News Article
```

### View Collaboration Requests
```
Admin → Collaborations
```

### Update Site Information
```
Admin → Site Settings
```

### Stop the Servers
- Press `Ctrl + C` in each terminal window

### Restart the Servers
- Run `.\start-project.ps1` again

## ❓ Troubleshooting

### "Port already in use"
Backend:
```powershell
python manage.py runserver 8001
```

Frontend:
```powershell
$env:PORT=3001; npm start
```

### "Module not found" (Backend)
```powershell
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

### "Module not found" (Frontend)
```powershell
cd frontend
Remove-Item -Recurse node_modules
npm install
```

### Can't access admin panel
Make sure you created a superuser:
```powershell
cd backend
.\venv\Scripts\activate
python manage.py createsuperuser
```

### Changes not appearing
- **Backend**: Restart the Django server
- **Frontend**: The page should auto-reload (if not, refresh browser)

## 📚 Next Steps

1. ✅ **Start the application** (you're here!)
2. 📝 **Add content** via admin panel
3. 🎨 **Customize design** (see SETUP.md)
4. 🚀 **Deploy to production** (see DEPLOYMENT.md)

## 📖 More Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[README.md](README.md)** - Full project overview

## 🎯 Development Workflow

```
1. Start servers (.\start-project.ps1)
2. Make changes to code
3. View changes in browser (auto-reloads)
4. Add content via admin panel
5. Test everything works
6. Commit changes to git
```

## ✨ Features You Can Use

- ✅ Full CRUD for projects
- ✅ Rich text content for news
- ✅ Image uploads (multiple per project)
- ✅ Video embedding
- ✅ Project categorization
- ✅ Featured projects
- ✅ Collaboration request forms
- ✅ Responsive design
- ✅ API documentation
- ✅ Admin dashboard

## 🎉 You're Ready!

Your full-stack portfolio platform is ready to use. Add your content and make it your own!

---

**Quick Reference Commands:**

```powershell
# Start everything
.\start-project.ps1

# Start backend only
cd backend; .\venv\Scripts\activate; python manage.py runserver

# Start frontend only
cd frontend; npm start

# Create superuser
cd backend; .\venv\Scripts\activate; python manage.py createsuperuser

# Install dependencies
cd backend; pip install -r requirements.txt
cd frontend; npm install
```

Need help? Check the other documentation files or review the error messages in the terminal.
