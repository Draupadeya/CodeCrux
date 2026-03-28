// Sample course data
const courses = [
    {
        id: 1,
        title: "Advanced Web Development",
        description: "Master modern web technologies including React, Node.js, and cloud deployment",
        level: "Advanced",
        progress: 65,
        icon: "🚀",
        duration: "12 weeks",
        students: 2340
    },
    {
        id: 2,
        title: "Python for Data Science",
        description: "Learn data analysis, visualization, and machine learning with Python",
        level: "Intermediate",
        progress: 42,
        icon: "📊",
        duration: "10 weeks",
        students: 3450
    },
    {
        id: 3,
        title: "UI/UX Design Fundamentals",
        description: "Create stunning user interfaces with design principles and tools",
        level: "Beginner",
        progress: 28,
        icon: "🎨",
        duration: "8 weeks",
        students: 1890
    },
    {
        id: 4,
        title: "Cloud Computing with AWS",
        description: "Deploy scalable applications on AWS with best practices and security",
        level: "Advanced",
        progress: 78,
        icon: "☁️",
        duration: "14 weeks",
        students: 1560
    },
    {
        id: 5,
        title: "Mobile App Development",
        description: "Build cross-platform mobile apps using React Native and Flutter",
        level: "Intermediate",
        progress: 55,
        icon: "📱",
        duration: "11 weeks",
        students: 2670
    },
    {
        id: 6,
        title: "Cybersecurity Essentials",
        description: "Protect systems and data with modern security practices and tools",
        level: "Beginner",
        progress: 34,
        icon: "🔒",
        duration: "9 weeks",
        students: 1210
    },
    {
        id: 7,
        title: "Artificial Intelligence Basics",
        description: "Understand AI concepts, neural networks, and deep learning applications",
        level: "Advanced",
        progress: 71,
        icon: "🤖",
        duration: "13 weeks",
        students: 2890
    },
    {
        id: 8,
        title: "DevOps and CI/CD",
        description: "Automate deployment pipelines and manage infrastructure efficiently",
        level: "Intermediate",
        progress: 48,
        icon: "⚙️",
        duration: "10 weeks",
        students: 1430
    }
];

// Initialize courses on page load
document.addEventListener('DOMContentLoaded', function() {
    populateCourses();
    attachEventListeners();
});

// Populate course grid with dynamic cards
function populateCourses() {
    const courseGrid = document.getElementById('courseGrid');
    
    courseGrid.innerHTML = courses.map((course, index) => `
        <div class="course-card" style="animation-delay: ${index * 0.1}s;">
            <div class="course-thumb">
                ${course.icon}
            </div>
            <div class="course-content">
                <div class="course-level">${course.level}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                
                <div class="course-progress">
                    <span>${course.progress}%</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%;"></div>
                    </div>
                </div>
                
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-users"></i> ${course.students}</span>
                </div>
                
                <div class="course-actions">
                    <button class="btn-small" onclick="viewCourse(${course.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-small btn-add-course" onclick="startCourse(${course.id})">
                        <i class="fas fa-play"></i> Start
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// View course details
function viewCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        alert(`📚 ${course.title}\n\n${course.description}\n\nDuration: ${course.duration}\nStudents: ${course.students}`);
    }
}

// Start course
function startCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        alert(`🎉 Welcome to ${course.title}!\n\nLet's begin your learning journey!`);
        // In a real app, navigate to course player
    }
}

// Attach event listeners for interactive features
function attachEventListeners() {
    // Add event listeners for navigation
    const startBtn = document.querySelector('.btn-primary');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            const firstCourse = courses[0];
            startCourse(firstCourse.id);
        });
    }

    // Add scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.course-card').forEach(card => {
        observer.observe(card);
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Press 'H' for hero section
    if (event.key === 'h' || event.key === 'H') {
        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' for courses section
    if (event.key === 'c' || event.key === 'C') {
        document.querySelector('.section-header').scrollIntoView({ behavior: 'smooth' });
    }
});

// Update stats dynamically
function updateStats() {
    const stats = [
        { icon: 'fa-book', number: 150, label: 'Active Courses' },
        { icon: 'fa-users', number: 50000, label: 'Students Enrolled' },
        { icon: 'fa-graduation-cap', number: 98, label: 'Success Rate' },
        { icon: 'fa-trophy', number: 25000, label: 'Certificates' }
    ];

    setTimeout(() => {
        document.querySelectorAll('.stat-number').forEach((element, index) => {
            const stat = stats[index];
            animateNumber(element, stat.number);
        });
    }, 500);
}

// Animate numbers counting up
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.parentElement.textContent.includes('Rate') ? '%' : '+');
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current) + (element.parentElement.textContent.includes('Rate') ? '%' : '+');
        }
    }, 30);
}

// Call update stats when page loads
window.addEventListener('load', updateStats);

// Add theme toggle functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Log that script loaded
console.log('✨ StudyMate dynamic UI loaded successfully!');
console.log('Press H to scroll to hero, C to scroll to courses');
