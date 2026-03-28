# CodeCrux - Advanced Video Proctoring & Exam Management System

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Django](https://img.shields.io/badge/Django-4.2-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

**CodeCrux** is a comprehensive video proctoring platform designed for secure online examination. It combines real-time proctoring with AI-powered analysis to ensure exam integrity.

## 🎯 Features

### 🔒 Security & Proctoring
- **Real-time Webcam Monitoring** — Continuous video stream during exams
- **Microphone Testing** — Verify audio input quality
- **Face Recognition & Verification** — Multi-factor identity verification using face embeddings
- **Screen Activity Monitoring** — Track suspicious behavior patterns
- **Automatic Candidate Blocking** — Flag and block suspicious users

### 📊 Exam Management
- **Exam Scheduling** — Create and manage scheduled exams
- **Question & Test Cases** — Support for programming assignments with test validation
- **Exam Attempts** — Track multiple attempts per student
- **Real-time Performance Metrics** — Analyze student performance

### 🧠 AI-Powered Analysis
- **Mood Detection** — Analyze emotional state during exams (stress, frustration, etc.)
- **Audio Analysis** — Detect background noise, speech patterns
- **Behavior Analysis** — ML-based anomaly detection
- **Report Generation** — Comprehensive proctoring reports with evidence

### 👥 User Management
- **Student Portal** — Dashboard with courses, exams, certificates
- **Faculty Dashboard** — Create exams, monitor students, view analytics
- **Admin Panel** — System administration and user management
- **Role-Based Access Control** — Student, Faculty, Admin roles

### 📚 Course Management
- **YouTube Video Integration** — Process video transcripts for courses
- **Study Materials** — Module-based learning paths
- **Quiz Generation** — AI-powered quiz creation from content
- **Progress Tracking** — Monitor student advancement

### 🎓 Additional Features
- **Certificate Generation** — Automated certificate creation
- **Payment/Coins System** — In-app purchase system for course access
- **FAQ Management** — Knowledge base for students
- **Session Management** — Track exam sessions and timestamps

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL (production) / SQLite (development)
- OpenCV & TensorFlow (for video analysis)
- FFmpeg (for video processing)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Draupadeya/CodeCrux.git
cd CodeCrux/video_proctoring_project
```

2. **Create and activate virtual environment:**
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Setup Django:**
```bash
cd proctoring
python manage.py migrate
python manage.py createsuperuser
```

5. **Collect static files:**
```bash
python manage.py collectstatic --noinput
```

6. **Run development server:**
```bash
python manage.py runserver 8000
```

Visit: **http://localhost:8000**

---

## 📦 Project Structure

```
video_proctoring_project/
├── proctoring/                  # Django project settings
│   ├── settings.py             # Configuration
│   ├── urls.py                 # URL routing
│   ├── wsgi.py                 # Production WSGI
│   └── asgi.py                 # WebSocket support
│
├── monitor/                     # Main proctoring app
│   ├── models.py               # Database models
│   ├── views.py                # Request handlers
│   ├── api.py                  # REST endpoints
│   ├── analyzer.py             # AI analysis engine
│   ├── management/             # Custom commands
│   ├── migrations/             # Database migrations
│   ├── templates/              # HTML templates
│   └── static/                 # CSS, JS files
│
├── courses/                     # Course management
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── studymate/                   # Study features
│
├── requirements.txt            # Python dependencies
├── manage.py                   # Django CLI
├── Procfile                    # Production configuration
├── Dockerfile                  # Container configuration
└── fly.toml / render.yaml      # Deployment config
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Django
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,example.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/codecrux

# Optional: AI Services
GEMINI_API_KEY=your-google-genai-key
```

### Database Setup
```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 🛠️ Key Technologies

| Component | Technology |
|-----------|-----------|
| **Backend** | Django 4.2 |
| **Database** | PostgreSQL / SQLite |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Video Analysis** | OpenCV, PIL |
| **AI/ML** | DeepFace, TensorFlow |
| **Server** | Gunicorn |
| **Deployment** | Render, Docker |

---

## 📚 API Endpoints

### Authentication
- `POST /api/login` — Student/Faculty login
- `POST /api/logout` — Logout user
- `GET /api/user-profile` — Get current user info

### Exam Management
- `GET /api/exams/` — List exams
- `POST /api/exams/create/` — Create new exam
- `GET /api/exams/<id>/` — Get exam details
- `POST /api/exams/<id>/submit/` — Submit exam attempt

### Proctoring
- `POST /api/proctoring/capture-frame/` — Submit webcam frame
- `POST /api/proctoring/analyze-audio/` — Submit audio for analysis
- `GET /api/proctoring/session/<id>/` — Get proctoring session data

### Courses
- `GET /api/courses/` — List courses
- `POST /api/courses/create/` — Create course
- `POST /api/courses/<id>/process-video/` — Process YouTube video

---

## 🧪 Testing

Run tests:
```bash
python manage.py test
```

Test specific module:
```bash
python manage.py test monitor.tests
```

---

## 📈 Monitoring & Analytics

### Admin Dashboard
- Real-time exam statistics
- Student performance metrics
- Proctoring event logs
- System health monitoring

### Reports Available
- Candidate examination reports
- Mood & behavior analysis
- Evidence collection
- Compliance audits

---

## 🚢 Deployment

### Render Deployment
Connected to GitHub for automatic deployment:
- **Repository:** https://github.com/Draupadeya/codecrux-lite
- **Live URL:** https://codecrux-lite.onrender.com
- **Auto-deploy:** On every push to `main` branch

### Docker Deployment
```bash
docker build -t codecrux .
docker run -p 8000:8000 codecrux
```

### Environment Setup
1. Set environment variables in Render dashboard
2. Configure database connection string
3. Enable SSL/TLS for production
4. Set up backup strategy

---

## 🔐 Security Features

✅ **CSRF Protection** — All forms protected  
✅ **SQL Injection Prevention** — ORM parameterized queries  
✅ **Password Hashing** — Django default security  
✅ **Session Management** — Secure session handling  
✅ **Face Verification** — Multi-factor verification  
✅ **Event Logging** — All proctoring events recorded  

---

## 📝 Database Models

### Core Models
- **StudentProfile** — Student user information
- **Faculty** — Faculty/instructor data
- **Candidate** — Exam candidate with face embeddings
- **Session** — Proctoring session data
- **Event** — Recorded proctoring events
- **Exam** — Exam records
- **ExamAttempt** — Student exam attempts
- **Course** — Course information
- **Question** — Quiz questions
- **TestCase** — Test cases for programming problems

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
pip cache purge
pip install -r requirements.txt
```

### Database Issues
```bash
# Reset database (development only)
python manage.py migrate zero
python manage.py migrate
```

### Static Files
```bash
python manage.py collectstatic --clear --noinput
```

---

## 📖 Documentation

- **[ADMIN_SETUP_GUIDE.md](./proctoring/ADMIN_SETUP_GUIDE.md)** — Admin portal setup
- **[ARCHITECTURE.md](./proctoring/ARCHITECTURE.md)** — System architecture
- **[TESTING_GUIDE.md](./proctoring/TESTING_GUIDE.md)** — Testing procedures
- **[MOOD_ANALYSIS_README.md](./proctoring/MOOD_ANALYSIS_README.md)** — Mood detection
- **[FACE_DETECTION_API_GUIDE.md](./proctoring/FACE_DETECTION_API_GUIDE.md)** — Face recognition

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 📧 Contact & Support

- **Author:** Draupadeya (KILAMBI SRINIVASA PHANINDRA)
- **Email:** phanindrakilambi@gmail.com
- **GitHub:** [@Draupadeya](https://github.com/Draupadeya)
- **Repository:** [CodeCrux](https://github.com/Draupadeya/CodeCrux)

---

## 🎓 Key Features Details

### Pre-Exam Checks
Students must complete before exam:
1. ✅ **Microphone Test** — Verify audio input
2. ✅ **Webcam Test** — Verify video input
3. ✅ **Rules Acknowledgment** — Accept exam rules

### During Exam
- 📹 Continuous webcam recording
- 🔊 Microphone monitoring
- 😊 Mood analysis
- 👁️ Face detection and verification
- 📊 Real-time analytics

### Post-Exam
- 📋 Performance reports
- 🎓 Certificate generation (if passed)
- 📈 Analytics and insights
- 💾 Evidence archival

---

## ⚡ Performance

- **Response Time:** < 500ms average
- **Concurrent Users:** 100+
- **Video Processing:** Real-time (30 FPS)
- **Database Queries:** Optimized with indexing

---

## 🚀 Future Improvements

- [ ] Multi-language support
- [ ] Enhanced AI models for emotion detection
- [ ] Mobile app (React Native)
- [ ] Live proctoring chat support
- [ ] Advanced plagiarism detection
- [ ] API rate limiting and SLA guarantees

---

**Built with ❤️ for secure online education**
