// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Responsive menu handling
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Code Playground Functionality
    const runCodeBtn = document.getElementById('run-code');
    const clearOutputBtn = document.getElementById('clear-output');
    const codeArea = document.getElementById('code-area');
    const outputArea = document.getElementById('output-area');
    
    if (runCodeBtn && codeArea && outputArea) {
        runCodeBtn.addEventListener('click', function() {
            const code = codeArea.textContent;
            
            // Show loading state
            outputArea.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Running code...</div>';
            
            // Simulate code execution with a timeout
            setTimeout(() => {
                try {
                    // Create a mock execution environment
                    const mockOutput = executeMockPython(code);
                    outputArea.innerHTML = `<pre class="output-success">${mockOutput}</pre>`;
                } catch (error) {
                    outputArea.innerHTML = `<pre class="output-error">Error: ${error.message}</pre>`;
                }
            }, 1000);
        });
    }
    
    if (clearOutputBtn && outputArea) {
        clearOutputBtn.addEventListener('click', function() {
            outputArea.innerHTML = '';
        });
    }
    
    // Syntax highlighting for code blocks
    highlightCodeBlocks();
    
    // Animate elements on scroll
    setupScrollAnimations();
    
    // Topic Progress Tracking
    setupProgressTracking();
});

// Mock Python Code Execution
function executeMockPython(code) {
    // This is a simplified mock execution for demonstration
    // In a real application, you would use a Python interpreter API
    
    const lines = code.split('\n');
    let output = '';
    
    lines.forEach(line => {
        if (line.includes('print(')) {
            const match = line.match(/print\((.*)\)/);
            if (match) {
                // Evaluate simple expressions
                let value = match[1];
                
                // Handle string concatenation
                if (value.includes('+')) {
                    const parts = value.split('+').map(part => part.trim());
                    if (parts[0].startsWith('"') || parts[0].startsWith("'")) {
                        value = parts.map(part => part.replace(/["']/g, '')).join('');
                    }
                }
                
                // Handle f-strings
                if (value.includes('f"')) {
                    value = value.replace(/f"/, '').replace(/"/, '');
                    value = value.replace(/\{.*?\}/g, '6');
                }
                
                output += value.replace(/["']/g, '') + '\n';
            }
        }
    });
    
    // Add default output if no print statements found
    if (!output) {
        output = "Code executed successfully!\nAdd print() statements to see output.";
    }
    
    return output;
}

// Syntax Highlighting Function
function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre:not(.no-highlight)');
    
    codeBlocks.forEach(block => {
        const code = block.textContent;
        
        // Simple keyword highlighting
        const highlighted = code
            .replace(/\b(def|class|import|from|as|if|else|elif|for|while|return|try|except|finally|with)\b/g, '<span class="keyword">$1</span>')
            .replace(/\b(True|False|None)\b/g, '<span class="constant">$1</span>')
            .replace(/\b([0-9]+(\.[0-9]+)?)\b/g, '<span class="number">$1</span>')
            .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>')
            .replace(/#.*$/gm, '<span class="comment">$&</span>');
        
        block.innerHTML = highlighted;
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.timeline-item, .topic-card, .hour-card').forEach(el => {
        observer.observe(el);
    });
}

// Progress Tracking
function setupProgressTracking() {
    // Load progress from localStorage
    const progress = JSON.parse(localStorage.getItem('ai-ml-progress')) || {};
    
    // Update UI with progress
    updateProgressUI(progress);
    
    // Setup click handlers for topic completion
    document.querySelectorAll('.topic-card, .hour-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // Don't interfere with links
            
            const topicId = this.dataset.topic || this.querySelector('h4, h3').textContent;
            progress[topicId] = !progress[topicId];
            
            // Save to localStorage
            localStorage.setItem('ai-ml-progress', JSON.stringify(progress));
            
            // Update UI
            updateProgressUI(progress);
            
            // Visual feedback
            this.classList.toggle('completed');
        });
    });
}

function updateProgressUI(progress) {
    const completed = Object.values(progress).filter(Boolean).length;
    const total = document.querySelectorAll('.topic-card, .hour-card').length;
    const percentage = Math.round((completed / total) * 100);
    
    // Update progress indicator if it exists
    const progressIndicator = document.querySelector('.progress-indicator');
    if (!progressIndicator) {
        // Create progress indicator
        const nav = document.querySelector('.navbar .container');
        if (nav) {
            const indicator = document.createElement('div');
            indicator.className = 'progress-indicator';
            indicator.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="progress-text">${percentage}% Complete</span>
            `;
            nav.appendChild(indicator);
        }
    } else {
        progressIndicator.querySelector('.progress-fill').style.width = `${percentage}%`;
        progressIndicator.querySelector('.progress-text').textContent = `${percentage}% Complete`;
    }
}

// Add CSS for progress indicator
const progressStyles = `
.progress-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
}

.progress-bar {
    width: 100px;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--success), var(--primary));
    transition: width 0.3s;
}

.progress-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary);
}

.completed {
    position: relative;
    border-left: 4px solid var(--success);
}

.completed::after {
    content: '✓';
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--success);
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
`;

// Add progress styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = progressStyles;
document.head.appendChild(styleSheet);