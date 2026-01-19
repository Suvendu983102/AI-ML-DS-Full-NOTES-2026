// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load user progress from localStorage
    const progress = JSON.parse(localStorage.getItem('ai-ml-progress') || '{}');
    const topicsCompleted = Object.values(progress).filter(Boolean).length;
    const totalTopics = 12; // Total topics in curriculum
    
    // Calculate total time spent (simplified - in real app, track actual time)
    const totalHours = Math.round(topicsCompleted * 3.33); // 40 hours for 12 topics
    
    // Calculate projects done
    const projectsDone = JSON.parse(localStorage.getItem('projectsCompleted') || '[]').length;
    const totalProjects = 10;
    
    // Calculate streak
    const streak = calculateStreak();
    
    // Update dashboard stats
    document.getElementById('total-time').textContent = `${totalHours} hours`;
    document.getElementById('topics-completed').textContent = `${topicsCompleted}/${totalTopics}`;
    document.getElementById('projects-done').textContent = `${projectsDone}/${totalProjects}`;
    document.getElementById('current-streak').textContent = `${streak} days`;
    
    // Initialize charts
    initializeProgressChart(topicsCompleted, totalTopics, projectsDone, totalProjects);
    initializeActivityChart();
    
    // Load learning timeline
    loadLearningTimeline(progress);
    
    // Setup goal tracking
    setupGoalTracking();
    
    // Setup daily check-in
    setupDailyCheckin();
});

function calculateStreak() {
    const checkins = JSON.parse(localStorage.getItem('dailyCheckins') || '[]');
    if (checkins.length === 0) return 0;
    
    // Sort dates descending
    checkins.sort((a, b) => new Date(b) - new Date(a));
    
    let streak = 1;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    // Check if user checked in today or yesterday
    if (checkins[0] === today) {
        // Count consecutive days
        for (let i = 0; i < checkins.length - 1; i++) {
            const currentDate = new Date(checkins[i]);
            const nextDate = new Date(checkins[i + 1]);
            const diffDays = Math.floor((currentDate - nextDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }
    } else if (checkins[0] === yesterday) {
        streak = 1; // Yesterday only
    } else {
        streak = 0; // Broken streak
    }
    
    return streak;
}

function initializeProgressChart(topicsCompleted, totalTopics, projectsDone, totalProjects) {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Topics Completed', 'Topics Remaining', 'Projects Done', 'Projects Remaining'],
            datasets: [{
                data: [
                    topicsCompleted,
                    totalTopics - topicsCompleted,
                    projectsDone,
                    totalProjects - projectsDone
                ],
                backgroundColor: [
                    '#4cc9f0', // Topics completed
                    '#e0e0e0', // Topics remaining
                    '#4361ee', // Projects done
                    '#f0f0f0'  // Projects remaining
                ],
                borderWidth: 2,
                borderColor: 'white'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function initializeActivityChart() {
    const ctx = document.getElementById('activity-chart').getContext('2d');
    
    // Generate last 7 days
    const days = [];
    const activityData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        
        // Simulate activity data (in real app, use actual data)
        activityData.push(Math.floor(Math.random() * 4)); // 0-3 hours
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Hours Studied',
                data: activityData,
                backgroundColor: '#4361ee',
                borderRadius: 5,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function loadLearningTimeline(progress) {
    const timeline = document.querySelector('.timeline');
    const topics = [
        { id: 'python', title: 'Python Basics', hours: 4, date: 'Week 1' },
        { id: 'libraries', title: 'ML Libraries', hours: 4, date: 'Week 2' },
        { id: 'statistics', title: 'Statistics', hours: 6, date: 'Week 3' },
        { id: 'algorithms', title: 'ML Algorithms', hours: 5, date: 'Week 4' },
        { id: 'problems', title: 'ML Problems', hours: 5, date: 'Week 5' },
        { id: 'deeplearning', title: 'Deep Learning', hours: 4, date: 'Week 6' },
        { id: 'tools', title: 'AI Tools', hours: 5, date: 'Week 7' },
        { id: 'generative', title: 'Generative AI', hours: 5, date: 'Week 8' },
        { id: 'sql', title: 'SQL & BI Tools', hours: 6, date: 'Week 9' },
        { id: 'aptitude', title: 'Aptitude', hours: 6, date: 'Week 10' },
        { id: 'projects', title: 'Projects', hours: 10, date: 'Week 11-12' }
    ];
    
    timeline.innerHTML = '';
    
    topics.forEach((topic, index) => {
        const completed = progress[topic.id] || false;
        const completionDate = completed ? getRandomPastDate() : null;
        
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${completed ? 'completed' : ''}`;
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${topic.date}</span>
                <h4>${topic.title}</h4>
                <p>${topic.hours} hours • ${completed ? '✓ Completed' : '⏳ In Progress'}</p>
                ${completionDate ? `<small>Completed on: ${completionDate}</small>` : ''}
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

function getRandomPastDate() {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
    return pastDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function setupGoalTracking() {
    // Load saved goals
    const savedGoals = JSON.parse(localStorage.getItem('learningGoals') || '{}');
    
    // Set checkbox states
    document.querySelectorAll('.goal-list input[type="checkbox"]').forEach(checkbox => {
        const goalId = checkbox.id;
        if (savedGoals[goalId]) {
            checkbox.checked = savedGoals[goalId];
        }
        
        checkbox.addEventListener('change', function() {
            savedGoals[goalId] = this.checked;
            localStorage.setItem('learningGoals', JSON.stringify(savedGoals));
            
            // Update stats if needed
            if (this.checked) {
                showNotification('Goal completed! 🎉');
            }
        });
    });
}

function setupDailyCheckin() {
    const today = new Date().toDateString();
    const checkins = JSON.parse(localStorage.getItem('dailyCheckins') || '[]');
    
    // Check if already checked in today
    if (!checkins.includes(today)) {
        // Show check-in modal after 5 seconds
        setTimeout(() => {
            showCheckinModal();
        }, 5000);
    }
}

function showCheckinModal() {
    const modal = document.createElement('div');
    modal.className = 'checkin-modal';
    modal.innerHTML = `
        <div class="checkin-content">
            <h3>Daily Check-in ✨</h3>
            <p>Have you studied today?</p>
            <div class="checkin-buttons">
                <button class="btn primary" id="checkin-yes">Yes, I studied!</button>
                <button class="btn secondary" id="checkin-later">Remind me later</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s;
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('checkin-yes').addEventListener('click', function() {
        const today = new Date().toDateString();
        const checkins = JSON.parse(localStorage.getItem('dailyCheckins') || '[]');
        
        if (!checkins.includes(today)) {
            checkins.push(today);
            localStorage.setItem('dailyCheckins', JSON.stringify(checkins));
            
            // Update streak display
            const streak = calculateStreak();
            document.getElementById('current-streak').textContent = `${streak} days`;
            
            showNotification('Check-in recorded! Keep up the good work! 🚀');
        }
        
        document.body.removeChild(modal);
    });
    
    document.getElementById('checkin-later').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'dashboard-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add modal animations
const modalStyles = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.checkin-content {
    background: white;
    padding: 40px;
    border-radius: 15px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.checkin-content h3 {
    color: var(--secondary);
    margin-bottom: 15px;
}

.checkin-content p {
    color: var(--gray);
    margin-bottom: 30px;
}

.checkin-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.dashboard-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
}

.dashboard-notification .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.dashboard-notification i {
    font-size: 1.2rem;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.timeline-item.completed .timeline-content {
    background: linear-gradient(135deg, #f8fff8 0%, #e8f5e9 100%);
    border-left-color: var(--success);
}

.timeline-item.completed .timeline-content h4 {
    color: var(--success);
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);