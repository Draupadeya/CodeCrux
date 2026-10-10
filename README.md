# CODE CRUX
### AI-Powered Smart Education and Virtual Engineering Learning Platform

> **Learn Smarter, Visualize in 3D, Practice in Virtual Labs, and Innovate with AI.**

## 🚀 About the Project

CODE CRUX is an AI-powered smart education platform designed to transform traditional engineering education into an interactive, personalized, and immersive learning experience.

The platform integrates Artificial Intelligence (AI), 3D visualization, Augmented Reality (AR), Virtual Reality (VR), virtual laboratories, coding practice, and intelligent assessments into one unified ecosystem.

It helps students understand complex concepts, practice practical skills, clarify doubts using AI, and explore engineering systems through interactive visualizations.

## 🎯 Problem Statement

**Student Innovation – Smart Education**

Digital learning should enable students to learn more effectively, efficiently, flexibly, and comfortably. CODE CRUX addresses the challenges of theoretical learning, limited laboratory access, lengthy lectures, fragmented learning tools, and difficulty understanding complex engineering concepts.

## ✨ Key Features

### 🤖 AI-Powered Learning
- **AI Course Creation:** Organizes supported long-form video lectures into smaller learning modules.
- **StudyBuddy AI:** Helps students clarify doubts and understand course-related concepts.
- **Personalized Learning:** Helps identify topics that may require additional practice.
- **Multilingual Learning:** Supports learning in multiple languages through available language integrations.

### 📚 Integrated Learning Environment
- Course modules and learning resources.
- Digital notes and coding practice.
- Integrated compiler support for programming practice.
- Learning progress and performance tracking.

### 🧊 3D, AR and VR Learning
- Interactive 3D engineering visualizations.
- AR-based exploration of engineering models.
- VR-based immersive learning experiences.
- Virtual engineering laboratories for practical exploration.

### 🧪 Department-Specific Virtual Labs

**Computer Science and Engineering (CSE)**
- Coding practice and algorithm visualization.
- 3D AR Practice Lab.
- Neural-network visualization using immersive learning.
- AI-assisted course learning.

**Electronics and Communication Engineering (ECE)**
- Electronic circuit simulations.
- Arduino and electronic component visualizations.
- Communication and satellite-system concepts.
- Virtual electronics laboratory experiences.

**Biomedical Engineering**
- 3D visualization of the human heart, eye, and skeleton.
- Biomedical equipment and kidney dialysis concepts.
- Virtual biomedical laboratory experiences.

**Mechanical Engineering**
- 3D car engines and motorbike components.
- Mechanical assemblies and component exploration.
- Four-stroke engine visualization.
- Mechanical simulation experiences.

**Civil Engineering**
- Building and bridge visualization.
- Blueprint and structural concepts.
- 3D models of buildings, bridges, and dams.
- Virtual civil engineering experiences.

### 🛡️ AI-Assisted Examination System
- Monitoring of configured indicators of potentially suspicious exam activity.
- Recording and review of relevant examination events.
- Faculty access to examination-related information.
- Support for controlled online assessments.

Automated flags should be reviewed by authorized faculty before consequential action is taken.

### 👨‍🏫 Faculty Dashboard
- Student learning progress monitoring.
- Assessment management.
- Review of flagged examination events.
- Student access management.
- Learning and performance insights.

### 🏆 Certificates
The platform can support certificates for eligible course completions and assessments, helping students showcase their learning achievements.

## 🛠️ Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Python, Django |
| API Development | Django REST Framework |
| 3D Visualization | Three.js, WebGL |
| AI Integration | Mistral AI |
| External Services | YouTube API, translation services, cloud storage |
| Database | Configured application database |

*The exact integrations depend on the implemented modules and project configuration.*

## 🏗️ System Architecture

```text
                 STUDENTS AND FACULTY
                          |
                          v
              REACT.JS + TAILWIND CSS
                          |
                          v
               DJANGO REST FRAMEWORK
                          |
              +-----------+-----------+
              |           |           |
              v           v           v
          AI SERVICES  DATABASE   EXTERNAL APIs
          Mistral AI   App Data   YouTube, etc.
              |
              v
       DEPARTMENT LEARNING MODULES
              |
       +------+------+------+------+
       |      |      |      |      |
      CSE    ECE   BME   Mechanical Civil
              |
              v
        3D / AR / VR LEARNING
        VIRTUAL LABORATORIES
        CODING AND ASSESSMENTS
        FACULTY DASHBOARD
```

## 🔄 How It Works

1. Students and faculty sign in to the platform.
2. Students access their department-specific dashboard.
3. Students select a course or provide a supported lecture URL.
4. The platform organizes available content into learning modules.
5. Students use Notes, Compiler, and StudyBuddy AI while learning.
6. Students explore 3D models, AR experiences, and virtual laboratories.
7. Students complete available coding exercises and assessments.
8. Faculty monitor learning progress and review examination events where applicable.

## 💻 Getting Started

The following steps are a general guide. Adapt the directory names and commands to match the actual repository.

### Prerequisites

- Python
- Node.js and npm
- Git
- A database configured for the Django application
- API credentials for enabled external services

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Set Up the Backend

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install the dependencies if `requirements.txt` exists:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

### 3. Set Up the Frontend

Open another terminal and navigate to the frontend directory:

```bash
npm install
npm run dev
```

Use the scripts defined in your project's `package.json`. Configure the frontend API URL to point to the backend server.

## 🔐 Environment Configuration

Store API keys and secret values in environment variables or a local `.env` file excluded from version control.

Example placeholders:

```env
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
DATABASE_URL=your-database-connection
MISTRAL_API_KEY=your-mistral-api-key
YOUTUBE_API_KEY=your-youtube-api-key
```

These are illustrative variable names. Update them to match your implementation.

**Never upload real API keys, passwords, tokens, or production credentials to GitHub.**

## 🔮 Future Scope

- Expand into Aeronautical Engineering.
- Add Chemical and Polymer Engineering modules.
- Introduce Nuclear Engineering learning experiences.
- Develop Quantum Technology visualizations.
- Improve AI-generated 3D models and simulations.
- Introduce advanced personalized learning paths.
- Expand multilingual content and virtual laboratories.
- Develop AI-powered project mentoring and research support.
- Integrate with more educational institutions.

## 🌟 Impact

CODE CRUX aims to make engineering education more accessible, engaging, and practical by connecting theoretical learning with interactive visualization and experimentation.

It provides a unified learning environment where students can **learn, practice, visualize, experiment, assess, and improve**.

## 🤝 Contributing

Contributions, suggestions, bug reports, and feature ideas are welcome.

1. Fork the repository.
2. Create a new branch.
3. Implement and test your changes.
4. Commit your changes with a clear message.
5. Submit a pull request describing your contribution.

Please do not commit secrets, private student information, or examination recordings.

## 📄 License

A license has not yet been specified. Add a `LICENSE` file before distributing the project or authorizing reuse of its code.

---

### CODE CRUX
**Learn Smarter. Visualize Better. Practice Virtually. Innovate with AI.**

