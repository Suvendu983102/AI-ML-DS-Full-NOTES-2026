// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Admin navigation
    setupAdminNavigation();
    
    // Load dashboard data
    loadDashboardData();
    
    // Load user management data
    loadUsersData();
    
    // Load content management data
    loadContentData();
    
    // Setup tab functionality
    setupContentTabs();
    
    // Initialize charts
    initializeAdminCharts();
    
    // Setup search functionality
    setupAdminSearch();
    
    // Load recent activities
    loadRecentActivities();
    
    // Setup real-time updates (simulated)
    setupRealtimeUpdates();
});

function setupAdminNavigation() {
    const navLinks = document.querySelectorAll('.admin-navbar .nav-links a[href^="#"]');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').replace('#', '');
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            } else {
                // Show dashboard by default
                document.getElementById('dashboard').style.display = 'block';
            }
        });
    });
}

function loadDashboardData() {
    // Simulate API call for dashboard data
    setTimeout(() => {
        // Mock data
        const dashboardData = {
            totalStudents: 1250,
            activeLearners: 843,
            projectsSubmitted: 456,
            completionRate: '68%'
        };
        
        // Update UI
        document.getElementById('total-students').textContent = 
            dashboardData.totalStudents.toLocaleString();
        document.getElementById('active-learners').textContent = 
            dashboardData.activeLearners.toLocaleString();
        document.getElementById('projects-submitted').textContent = 
            dashboardData.projectsSubmitted.toLocaleString();
        document.getElementById('completion-rate').textContent = 
            dashboardData.completionRate;
        
        // Load topic completion stats
        loadTopicCompletionStats();
    }, 1000);
}

function loadTopicCompletionStats() {
    const topics = [
        { name: 'Python Basics', completion: 92, students: 1150 },
        { name: 'ML Libraries', completion: 85, students: 987 },
        { name: 'Statistics', completion: 78, students: 890 },
        { name: 'ML Algorithms', completion: 72, students: 812 },
        { name: 'Deep Learning', completion: 65, students: 745 },
        { name: 'Projects', completion: 58, students: 698 }
    ];
    
    const topicStatsDiv = document.getElementById('topic-stats');
    topicStatsDiv.innerHTML = '';
    
    topics.forEach(topic => {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-stat-item';
        topicItem.innerHTML = `
            <div class="topic-name">${topic.name}</div>
            <div class="topic-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${topic.completion}%"></div>
                </div>
                <span class="progress-percentage">${topic.completion}%</span>
                <small class="topic-students">${topic.students} students</small>
            </div>
        `;
        topicStatsDiv.appendChild(topicItem);
    });
}

function loadUsersData() {
    // Mock user data
    const users = [
        { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', progress: 85, lastActive: '2 hours ago', status: 'active' },
        { id: 2, name: 'Priya Patel', email: 'priya@example.com', progress: 92, lastActive: '5 minutes ago', status: 'active' },
        { id: 3, name: 'Rohan Kumar', email: 'rohan@example.com', progress: 45, lastActive: '1 day ago', status: 'inactive' },
        { id: 4, name: 'Ananya Singh', email: 'ananya@example.com', progress: 78, lastActive: '3 hours ago', status: 'active' },
        { id: 5, name: 'Admin User', email: 'admin@example.com', progress: 100, lastActive: 'Just now', status: 'admin' }
    ];
    
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${user.id}</td>
            <td>
                <strong>${user.name}</strong>
                ${user.status === 'admin' ? '<br><small class="text-muted">Administrator</small>' : ''}
            </td>
            <td>${user.email}</td>
            <td>
                <div class="progress-bar" style="width: 100px; margin: 5px 0;">
                    <div class="progress-fill" style="width: ${user.progress}%"></div>
                </div>
                <small>${user.progress}%</small>
            </td>
            <td>${user.lastActive}</td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>
                <div class="user-actions">
                    <div class="action-icon" title="View Profile" onclick="viewUserProfile(${user.id})">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="action-icon" title="Edit User" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </div>
                    <div class="action-icon" title="Delete User" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadContentData() {
    // Mock content data
    const topics = [
        { id: 1, title: 'Python Basics', description: 'Introduction to Python programming', hours: 4, lessons: 8, students: 1250 },
        { id: 2, title: 'Machine Learning Libraries', description: 'NumPy, Pandas, Scikit-learn', hours: 4, lessons: 10, students: 987 },
        { id: 3, title: 'Statistics for AI', description: 'Probability, distributions, hypothesis testing', hours: 6, lessons: 12, students: 890 },
        { id: 4, title: 'ML Algorithms', description: 'Linear Regression, Decision Trees, SVM', hours: 5, lessons: 15, students: 812 },
        { id: 5, title: 'Deep Learning', description: 'Neural Networks, CNN, RNN', hours: 4, lessons: 10, students: 745 }
    ];
    
    const topicsListDiv = document.getElementById('topics-list');
    topicsListDiv.innerHTML = '';
    
    topics.forEach(topic => {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.innerHTML = `
            <div class="topic-info">
                <h4>${topic.title}</h4>
                <p>${topic.description}</p>
                <div class="topic-meta">
                    <span class="meta-item">
                        <i class="far fa-clock"></i>
                        ${topic.hours} hours
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-book"></i>
                        ${topic.lessons} lessons
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-users"></i>
                        ${topic.students.toLocaleString()} students
                    </span>
                </div>
            </div>
            <div class="topic-actions">
                <button class="btn small" onclick="editTopic(${topic.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn small secondary" onclick="viewTopicAnalytics(${topic.id})">
                    <i class="fas fa-chart-bar"></i> Analytics
                </button>
            </div>
        `;
        topicsListDiv.appendChild(topicItem);
    });
}

function setupContentTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initializeAdminCharts() {
    // User Activity Chart
    const activityCtx = document.getElementById('user-activity-chart').getContext('2d');
    
    // Generate dates for last 7 days
    const dates = [];
    const activityData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        activityData.push(Math.floor(Math.random() * 200) + 100); // 100-300 active users
    }
    
    new Chart(activityCtx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Active Users',
                data: activityData,
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Active Users'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function setupAdminSearch() {
    const userSearch = document.getElementById('user-search');
    if (userSearch) {
        userSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterUsersTable(searchTerm);
        });
    }
}

function filterUsersTable(searchTerm) {
    const rows = document.querySelectorAll('#users-table-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function loadRecentActivities() {
    const activities = [
        { 
            type: 'user', 
            icon: 'fas fa-user-plus', 
            title: 'New User Registered',
            description: 'Priya Patel joined the platform',
            time: '5 minutes ago'
        },
        { 
            type: 'project', 
            icon: 'fas fa-project-diagram', 
            title: 'Project Submitted',
            description: 'Weather Classification project submitted by Aarav',
            time: '15 minutes ago'
        },
        { 
            type: 'topic', 
            icon: 'fas fa-book', 
            title: 'Topic Completed',
            description: '50 students completed Python Basics',
            time: '1 hour ago'
        },
        { 
            type: 'system', 
            icon: 'fas fa-cog', 
            title: 'System Update',
            description: 'New features added to code playground',
            time: '2 hours ago'
        },
        { 
            type: 'announcement', 
            icon: 'fas fa-bullhorn', 
            title: 'Announcement Sent',
            description: 'Weekly newsletter sent to all users',
            time: '4 hours ago'
        }
    ];
    
    const activityListDiv = document.getElementById('recent-activity');
    activityListDiv.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">
                ${activity.time}
            </div>
        `;
        activityListDiv.appendChild(activityItem);
    });
}

function setupRealtimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        // Update active learners count
        const activeLearners = document.getElementById('active-learners');
        const currentCount = parseInt(activeLearners.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 20) - 10; // -10 to +10
        const newCount = Math.max(0, currentCount + change);
        activeLearners.textContent = newCount.toLocaleString();
        
        // Update projects submitted
        const projectsSubmitted = document.getElementById('projects-submitted');
        const currentProjects = parseInt(projectsSubmitted.textContent.replace(/,/g, ''));
        if (Math.random() > 0.7) { // 30% chance of new project
            projectsSubmitted.textContent = (currentProjects + 1).toLocaleString();
        }
    }, 30000);
}

// Admin Functions
function addNewTopic() {
    showAdminModal('Add New Topic', `
        <div class="modal-form">
            <div class="form-group">
                <label>Topic Title</label>
                <input type="text" id="topic-title" class="form-control" placeholder="Enter topic title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="topic-description" class="form-control" rows="3" placeholder="Enter topic description"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Hours Required</label>
                    <input type="number" id="topic-hours" class="form-control" min="1" max="20" value="4">
                </div>
                <div class="form-group">
                    <label>Number of Lessons</label>
                    <input type="number" id="topic-lessons" class="form-control" min="1" max="50" value="10">
                </div>
            </div>
            <div class="form-group">
                <label>Difficulty Level</label>
                <select id="topic-difficulty" class="form-control">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>
        </div>
    `, () => {
        const title = document.getElementById('topic-title').value;
        const description = document.getElementById('topic-description').value;
        
        if (!title || !description) {
            alert('Please fill in all required fields');
            return false;
        }
        
        // In real app, send to API
        console.log('Creating new topic:', { title, description });
        alert('Topic created successfully!');
        return true;
    });
}

function sendAnnouncement() {
    showAdminModal('Send Announcement', `
        <div class="modal-form">
            <div class="form-group">
                <label>Announcement Title</label>
                <input type="text" id="announcement-title" class="form-control" placeholder="Enter announcement title">
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea id="announcement-message" class="form-control" rows="5" placeholder="Enter your announcement message"></textarea>
            </div>
            <div class="form-group">
                <label>Target Audience</label>
                <select id="announcement-audience" class="form-control" multiple>
                    <option value="all" selected>All Users</option>
                    <option value="active">Active Learners</option>
                    <option value="inactive">Inactive Users</option>
                    <option value="beginners">Beginners</option>
                    <option value="advanced">Advanced Learners</option>
                </select>
                <small class="form-text">Hold Ctrl/Cmd to select multiple options</small>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="send-email">
                    Also send as email
                </label>
            </div>
        </div>
    `, () => {
        const title = document.getElementById('announcement-title').value;
        const message = document.getElementById('announcement-message').value;
        
        if (!title || !message) {
            alert('Please fill in all required fields');
            return false;
        }
        
        // In real app, send to API
        console.log('Sending announcement:', { title, message });
        alert('Announcement sent successfully!');
        return true;
    });
}

function viewReports() {
    showAdminModal('Generate Report', `
        <div class="modal-form">
            <div class="form-group">
                <label>Report Type</label>
                <select id="report-type" class="form-control">
                    <option value="user">User Activity Report</option>
                    <option value="learning">Learning Progress Report</option>
                    <option value="project">Project Submissions Report</option>
                    <option value="system">System Usage Report</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" id="start-date" class="form-control">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" id="end-date" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label>Format</label>
                <div class="format-options">
                    <label>
                        <input type="radio" name="format" value="pdf" checked>
                        <i class="fas fa-file-pdf"></i> PDF
                    </label>
                    <label>
                        <input type="radio" name="format" value="excel">
                        <i class="fas fa-file-excel"></i> Excel
                    </label>
                    <label>
                        <input type="radio" name="format" value="csv">
                        <i class="fas fa-file-csv"></i> CSV
                    </label>
                </div>
            </div>
        </div>
    `, () => {
        const reportType = document.getElementById('report-type').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        if (!startDate || !endDate) {
            alert('Please select date range');
            return false;
        }
        
        // In real app, generate and download report
        console.log('Generating report:', { reportType, startDate, endDate });
        alert('Report generated and downloaded!');
        return true;
    });
}

function manageUsers() {
    // Navigate to users section
    document.querySelector('.nav-links a[href="#users"]').click();
}

// User Management Functions
function viewUserProfile(userId) {
    showAdminModal('User Profile', `
        <div class="user-profile-modal">
            <div class="user-header">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-info">
                    <h3>User #${userId}</h3>
                    <p>Last active: 2 hours ago</p>
                </div>
            </div>
            <div class="user-details">
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">user${userId}@example.com</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Progress:</span>
                    <span class="detail-value">85% complete</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Projects Completed:</span>
                    <span class="detail-value">7/10</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Join Date:</span>
                    <span class="detail-value">January 15, 2024</span>
                </div>
            </div>
        </div>
    `, null, 'large');
}

function editUser(userId) {
    showAdminModal('Edit User', `
        <div class="modal-form">
            <div class="form-group">
                <label>User ID</label>
                <input type="text" class="form-control" value="#${userId}" disabled>
            </div>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="user-name" class="form-control" value="User ${userId}">
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="user-email" class="form-control" value="user${userId}@example.com">
            </div>
            <div class="form-group">
                <label>User Role</label>
                <select id="user-role" class="form-control">
                    <option value="student">Student</option>
                    <option value="admin">Administrator</option>
                    <option value="instructor">Instructor</option>
                </select>
            </div>
            <div class="form-group">
                <label>Account Status</label>
                <select id="user-status" class="form-control">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                </select>
            </div>
        </div>
    `, () => {
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        
        if (!name || !email) {
            alert('Please fill in all required fields');
            return false;
        }
        
        console.log('Updating user:', { userId, name, email });
        alert('User updated successfully!');
        return true;
    });
}

function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user #${userId}? This action cannot be undone.`)) {
        console.log('Deleting user:', userId);
        showNotification(`User #${userId} has been deleted`, 'success');
        
        // In real app, remove from table
        setTimeout(() => {
            const row = document.querySelector(`tr:has(td:contains("#${userId}"))`);
            if (row) {
                row.remove();
            }
        }, 1000);
    }
}

function exportUsers() {
    showNotification('Exporting user data...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        // Create CSV data
        const csvData = "ID,Name,Email,Progress,Last Active,Status\n" +
                       "1,Aarav Sharma,aarav@example.com,85%,2 hours ago,active\n" +
                       "2,Priya Patel,priya@example.com,92%,5 minutes ago,active\n" +
                       "3,Rohan Kumar,rohan@example.com,45%,1 day ago,inactive";
        
        // Download file
        const element = document.createElement('a');
        const file = new Blob([csvData], {type: 'text/csv'});
        element.href = URL.createObjectURL(file);
        element.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        showNotification('User data exported successfully!', 'success');
    }, 1500);
}

// Content Management Functions
function createNewTopic() {
    addNewTopic(); // Reuse the same function
}

function editTopic(topicId) {
    showAdminModal('Edit Topic', `
        <div class="modal-form">
            <div class="form-group">
                <label>Topic ID</label>
                <input type="text" class="form-control" value="#${topicId}" disabled>
            </div>
            <div class="form-group">
                <label>Topic Title</label>
                <input type="text" id="edit-topic-title" class="form-control" value="Topic ${topicId}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="edit-topic-description" class="form-control" rows="3">Description for topic ${topicId}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Hours Required</label>
                    <input type="number" id="edit-topic-hours" class="form-control" min="1" max="20" value="4">
                </div>
                <div class="form-group">
                    <label>Number of Lessons</label>
                    <input type="number" id="edit-topic-lessons" class="form-control" min="1" max="50" value="10">
                </div>
            </div>
        </div>
    `, () => {
        const title = document.getElementById('edit-topic-title').value;
        const description = document.getElementById('edit-topic-description').value;
        
        if (!title || !description) {
            alert('Please fill in all required fields');
            return false;
        }
        
        console.log('Updating topic:', { topicId, title, description });
        alert('Topic updated successfully!');
        return true;
    });
}

function viewTopicAnalytics(topicId) {
    showAdminModal(`Topic #${topicId} Analytics`, `
        <div class="analytics-modal">
            <div class="analytics-stats">
                <div class="stat">
                    <span class="stat-label">Total Students</span>
                    <span class="stat-value">1,250</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Completion Rate</span>
                    <span class="stat-value">92%</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Avg. Time Spent</span>
                    <span class="stat-value">3.5 hours</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Avg. Score</span>
                    <span class="stat-value">87%</span>
                </div>
            </div>
            
            <div class="analytics-chart">
                <canvas id="topic-analytics-chart" height="200"></canvas>
            </div>
            
            <div class="analytics-table">
                <h4>Recent Completions</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Completion Date</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Aarav Sharma</td>
                            <td>Today</td>
                            <td>95%</td>
                        </tr>
                        <tr>
                            <td>Priya Patel</td>
                            <td>Yesterday</td>
                            <td>92%</td>
                        </tr>
                        <tr>
                            <td>Rohan Kumar</td>
                            <td>2 days ago</td>
                            <td>88%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `, null, 'xlarge');
    
    // Initialize chart for the modal
    setTimeout(() => {
        const ctx = document.getElementById('topic-analytics-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Weekly Completions',
                    data: [150, 280, 320, 290],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }, 100);
}

// Modal System
function showAdminModal(title, content, onSave = null, size = 'medium') {
    // Remove existing modal
    const existingModal = document.querySelector('.admin-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = `admin-modal ${size}`;
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            ${onSave ? `
            <div class="modal-footer">
                <button class="btn secondary" onclick="closeAdminModal()">Cancel</button>
                <button class="btn primary" onclick="saveModalChanges()">Save Changes</button>
            </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('admin-modals').appendChild(modal);
    
    // Store callback in modal element
    modal.dataset.onSave = onSave ? 'true' : 'false';
    if (onSave) {
        modal.saveCallback = onSave;
    }
    
    // Add close functionality
    modal.querySelector('.modal-overlay').addEventListener('click', closeAdminModal);
    modal.querySelector('.modal-close').addEventListener('click', closeAdminModal);
    
    // Escape key to close
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeAdminModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeAdminModal() {
    const modal = document.querySelector('.admin-modal');
    if (modal) {
        modal.remove();
    }
}

function saveModalChanges() {
    const modal = document.querySelector('.admin-modal');
    if (modal && modal.saveCallback) {
        const result = modal.saveCallback();
        if (result) {
            closeAdminModal();
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add modal and notification styles
const adminModalStyles = `
.admin-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: relative;
    background: white;
    border-radius: 15px;
    max-height: 90vh;
    overflow: hidden;
    animation: modalSlideIn 0.3s ease-out;
}

.modal-content.medium {
    width: 90%;
    max-width: 600px;
}

.modal-content.large {
    width: 90%;
    max-width: 800px;
}

.modal-content.xlarge {
    width: 90%;
    max-width: 1000px;
}

.modal-header {
    padding: 25px 30px;
    border-bottom: 1px solid var(--light);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: var(--secondary);
}

.modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--gray);
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 30px;
    max-height: 60vh;
    overflow-y: auto;
}

.modal-footer {
    padding: 20px 30px;
    border-top: 1px solid var(--light);
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}

.modal-form .form-group {
    margin-bottom: 20px;
}

.modal-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--dark);
}

.form-control {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--light);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form-control:focus {
    outline: none;
    border-color: var(--primary);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.format-options {
    display: flex;
    gap: 20px;
    margin-top: 10px;
}

.format-options label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.user-profile-modal .user-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
}

.user-avatar {
    width: 80px;
    height: 80px;
    background: var(--light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: var(--primary);
}

.user-details {
    display: grid;
    gap: 15px;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--light);
}

.detail-item:last-child {
    border-bottom: none;
}

.detail-label {
    font-weight: 500;
    color: var(--dark);
}

.detail-value {
    color: var(--gray);
}

.analytics-modal .analytics-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.analytics-modal .stat {
    text-align: center;
    padding: 20px;
    background: var(--light);
    border-radius: 10px;
}

.analytics-modal .stat-label {
    display: block;
    color: var(--gray);
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.analytics-modal .stat-value {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary);
}

.analytics-chart {
    height: 250px;
    margin-bottom: 30px;
}

.analytics-table {
    overflow-x: auto;
}

.analytics-table table {
    width: 100%;
    border-collapse: collapse;
}

.analytics-table th {
    background: var(--light);
    color: var(--secondary);
    font-weight: 600;
    padding: 12px;
    text-align: left;
}

.analytics-table td {
    padding: 12px;
    border-bottom: 1px solid var(--light);
}

.analytics-table tr:hover {
    background: #f8f9fa;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Add styles to document
const adminStyleSheet = document.createElement('style');
adminStyleSheet.textContent = adminModalStyles;
document.head.appendChild(adminStyleSheet);