# Gian Xavier Aquino - Portfolio Website

A modern, full-stack personal portfolio website with dynamic content management system built with React, TypeScript, Laravel, and MySQL.

![Portfolio Screenshot](https://via.placeholder.com/800x400?text=Portfolio+Screenshot)

## 🌟 Features

- **Dynamic Content Management**: Full admin panel to manage portfolio content without touching code
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Certificate Management**: Upload and showcase certifications with image upload functionality
- **Portfolio Updates**: Share project updates and achievements dynamically
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Secure Authentication**: Token-based authentication for admin access
- **RESTful API**: Well-structured API for frontend-backend communication

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Bootstrap 5** - Responsive UI framework
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Laravel 11** - PHP framework
- **MySQL** - Database
- **Laravel Sanctum** - API authentication
- **PHP 8.2+** - Server-side language


## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PHP (v8.2 or higher)
- Composer
- MySQL

### Backend Setup

1. **Navigate to backend folder**
```bash
   cd portfolio-backend
```

2. **Install dependencies**
```bash
   composer install
```

3. **Create environment file**
```bash
   cp .env.example .env
```

4. **Configure database in `.env`**
```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
```

5. **Generate application key**
```bash
   php artisan key:generate
```

6. **Run migrations**
```bash
   php artisan migrate
```

7. **Seed admin user**
```bash
   php artisan db:seed
```

8. **Create storage link**
```bash
   php artisan storage:link
```

9. **Start development server**
```bash
   php artisan serve
```
   Backend will run at: `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend folder**
```bash
   cd portfolio-frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start development server**
```bash
   npm run dev
```
   Frontend will run at: `http://localhost:5173`

**Admin Routes:**
- Login: `/login`
- Dashboard: `/admin/dashboard`

## 📝 API Endpoints

### Public Routes
```
GET  /api/updates        - Get all published updates
GET  /api/certificates   - Get all visible certificates
```

### Protected Routes (Requires Authentication)
```
POST   /api/login                  - Admin login
POST   /api/logout                 - Admin logout
GET    /api/me                     - Get authenticated user

GET    /api/admin/updates          - Get all updates
POST   /api/updates                - Create update
PUT    /api/updates/{id}           - Update update
DELETE /api/updates/{id}           - Delete update

GET    /api/admin/certificates     - Get all certificates
POST   /api/certificates           - Create certificate (with image upload)
PUT    /api/certificates/{id}      - Update certificate
DELETE /api/certificates/{id}      - Delete certificate
```

## 🎨 Features Showcase

### Public Portfolio
- Hero section with animated tech stack cards
- About Me section with floating tech logos
- Dynamic portfolio updates display
- Certificate showcase with modal viewer
- Responsive contact section

### Admin Dashboard
- Secure authentication system
- Portfolio updates management (CRUD operations)
- Certificate management with image upload
- Real-time content preview
- Intuitive sidebar navigation

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

### Backend (Railway/Render)
1. Connect GitHub repository
2. Configure environment variables
3. Set up MySQL database
4. Deploy

## 📦 Database Schema

### Users Table
- id, name, email, password, timestamps

### Updates Table
- id, title, description, category, image_url, published, timestamps

### Certificates Table
- id, certificate_name, full_name, issuer, image_path, issue_date, certificate_number, score, skills_covered, description, is_visible, timestamps

## 🔧 Development

### Build Frontend
```bash
npm run build
```

### Run Backend Tests
```bash
php artisan test
```

### Clear Cache (Backend)
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## 📸 Screenshots

_Add your actual screenshots here when deployed_

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Gian Xavier Aquino**
- Fourth-year IT Student
- Divine Word College of Calapan


## 📞 Contact

- Email: naigaquino1245@gmail.com
- GitHub: [@ianCode0522](https://github.com/ianCode0522)

---

⭐ **Star this repository if you found it helpful!**
