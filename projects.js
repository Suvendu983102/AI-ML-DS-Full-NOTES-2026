// Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.level === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectLinks = document.querySelectorAll('.project-actions .btn:first-child');
    
    // Project data (in a real app, this would come from a database)
    const projectsData = {
        'project1-details': {
            title: 'Weather Data Classification',
            level: 'beginner',
            time: '1 hour',
            description: 'Predict weather type (Sunny/Rainy/Cloudy) based on meteorological data.',
            objectives: [
                'Learn data preprocessing techniques',
                'Implement Decision Tree classifier',
                'Evaluate model performance',
                'Visualize classification results'
            ],
            steps: [
                {
                    title: 'Data Collection',
                    content: 'Collect weather data with features: Temperature, Humidity, Wind Speed, Pressure'
                },
                {
                    title: 'Data Preprocessing',
                    content: 'Handle missing values, normalize features, split into train/test sets'
                },
                {
                    title: 'Model Training',
                    content: 'Train Decision Tree classifier on the training data'
                },
                {
                    title: 'Evaluation',
                    content: 'Evaluate accuracy, precision, recall on test set'
                }
            ],
            code: `import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load data
df = pd.read_csv('weather_data.csv')

# Prepare features and target
X = df[['Temperature', 'Humidity', 'WindSpeed', 'Pressure']]
y = df['Weather']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")`
        },
        // Add more project data here
    };
    
    // Open modal when project is clicked
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('href').replace('#', '');
            
            if (projectsData[projectId]) {
                openProjectModal(projectsData[projectId]);
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Download Code buttons
    document.querySelectorAll('.btn.outline').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectName = projectCard.querySelector('h3').textContent;
            
            // Create a simple text file with sample code
            const code = `# ${projectName} Project Code
# Complete project code goes here

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

print("Downloading ${projectName} code...")
print("This is a sample. Full code available on GitHub.")`;
            
            downloadCode(projectName, code);
        });
    });
    
    // Initialize project cards animation
    animateProjectCards();
});

function openProjectModal(projectData) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.querySelector('.modal-body');
    
    // Create modal content
    modalBody.innerHTML = `
        <div class="project-detail">
            <div class="project-meta">
                <div class="meta-item">
                    <i class="fas fa-signal"></i>
                    <span>${projectData.level.toUpperCase()}</span>
                </div>
                <div class="meta-item">
                    <i class="far fa-clock"></i>
                    <span>${projectData.time}</span>
                </div>
            </div>
            
            <h3>Project Description</h3>
            <p>${projectData.description}</p>
            
            <h3>Learning Objectives</h3>
            <ul>
                ${projectData.objectives.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
            
            <h3>Step-by-Step Guide</h3>
            <div class="project-steps">
                ${projectData.steps.map((step, index) => `
                    <div class="step">
                        <span class="step-number">${index + 1}</span>
                        <h4>${step.title}</h4>
                        <p>${step.content}</p>
                    </div>
                `).join('')}
            </div>
            
            <h3>Sample Code</h3>
            <div class="code-example">
                <div class="example-header">
                    <span>Python Implementation</span>
                    <button class="copy-code">
                        <i class="far fa-copy"></i> Copy Code
                    </button>
                </div>
                <pre><code>${projectData.code}</code></pre>
            </div>
            
            <div class="modal-actions">
                <button onclick="downloadCode('${projectData.title}', \`${projectData.code}\`)" class="btn primary">
                    <i class="fas fa-download"></i> Download Full Code
                </button>
                <button class="btn secondary" onclick="closeModal()">
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Update modal title
    document.getElementById('modal-title').textContent = projectData.title;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Re-attach copy functionality
    attachCopyFunctionality();
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function downloadCode(filename, code) {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${filename.replace(/\s+/g, '_').toLowerCase()}.py`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function attachCopyFunctionality() {
    document.querySelectorAll('.copy-code').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-example').querySelector('code');
            const codeText = codeBlock.textContent;
            
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            });
        });
    });
}

function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add styles for modal actions
const modalStyles = `
.modal-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid var(--light);
}

.loading {
    text-align: center;
    padding: 40px;
    color: var(--gray);
}

.loading i {
    margin-right: 10px;
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);