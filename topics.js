// Topic Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Copy Code Button Functionality
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
    
    // Smooth scrolling for sidebar navigation
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active state
                document.querySelectorAll('.sidebar-nav a').forEach(a => {
                    a.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mark topic as complete
    document.querySelector('.topic-meta .completed').addEventListener('click', function() {
        const topicsCompleted = JSON.parse(localStorage.getItem('topicsCompleted') || '{}');
        const currentTopic = window.location.pathname.split('/').pop().replace('.html', '');
        
        topicsCompleted[currentTopic] = !topicsCompleted[currentTopic];
        localStorage.setItem('topicsCompleted', JSON.stringify(topicsCompleted));
        
        this.classList.toggle('completed');
        
        if (this.classList.contains('completed')) {
            this.innerHTML = '<i class="fas fa-check-circle"></i> Completed!';
        } else {
            this.innerHTML = '<i class="far fa-check-circle"></i> Mark Complete';
        }
    });
    
    // Check if topic is already completed
    const topicsCompleted = JSON.parse(localStorage.getItem('topicsCompleted') || '{}');
    const currentTopic = window.location.pathname.split('/').pop().replace('.html', '');
    
    if (topicsCompleted[currentTopic]) {
        const completeBtn = document.querySelector('.topic-meta .completed');
        completeBtn.classList.add('completed');
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed!';
    }
    
    // Quiz functionality
    setupQuiz();
    
    // Progress circles animation
    setupProgressCircles();
    
    // Syntax highlighting for all code blocks
    highlightAllCode();
});

function setupQuiz() {
    const quizSubmitBtn = document.querySelector('.quiz-section .btn.primary');
    if (quizSubmitBtn) {
        quizSubmitBtn.addEventListener('click', function() {
            const answers = {
                q1: 'c', // Correct answer for question 1
                // Add more questions as needed
            };
            
            let score = 0;
            let total = 0;
            
            // Check each question
            for (const question in answers) {
                total++;
                const selected = document.querySelector(`input[name="${question}"]:checked`);
                
                if (selected && selected.value === answers[question]) {
                    score++;
                    selected.parentElement.style.background = 'rgba(76, 201, 240, 0.3)';
                } else if (selected) {
                    selected.parentElement.style.background = 'rgba(248, 37, 133, 0.3)';
                }
            }
            
            // Show results
            const percentage = Math.round((score / total) * 100);
            alert(`Quiz Results: ${score}/${total} correct (${percentage}%)`);
            
            // Disable further changes
            document.querySelectorAll('.quiz-options input').forEach(input => {
                input.disabled = true;
            });
        });
    }
}

function setupProgressCircles() {
    document.querySelectorAll('.progress-circle').forEach(circle => {
        const progress = circle.dataset.progress;
        if (progress && progress !== '100') {
            circle.style.background = `conic-gradient(var(--success) 0% ${progress}%, var(--light) ${progress}% 100%)`;
        }
    });
}

function highlightAllCode() {
    // Highlight keywords in all code blocks
    const keywords = ['def', 'class', 'import', 'from', 'as', 'if', 'else', 'elif', 'for', 'while', 'return', 'try', 'except', 'finally', 'with'];
    const constants = ['True', 'False', 'None'];
    
    document.querySelectorAll('code').forEach(codeBlock => {
        let html = codeBlock.innerHTML;
        
        // Highlight keywords
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight constants
        constants.forEach(constant => {
            const regex = new RegExp(`\\b${constant}\\b`, 'g');
            html = html.replace(regex, `<span class="constant">${constant}</span>`);
        });
        
        // Highlight numbers
        html = html.replace(/\b([0-9]+(\.[0-9]+)?)\b/g, '<span class="number">$1</span>');
        
        // Highlight strings
        html = html.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>');
        
        // Highlight comments
        html = html.replace(/#.*$/gm, '<span class="comment">$&</span>');
        
        codeBlock.innerHTML = html;
    });
}

// Add CSS for syntax highlighting
const syntaxStyles = `
.keyword { color: #569cd6; font-weight: bold; }
.constant { color: #9cdcfe; }
.number { color: #b5cea8; }
.string { color: #ce9178; }
.comment { color: #6a9955; font-style: italic; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = syntaxStyles;
document.head.appendChild(styleSheet);