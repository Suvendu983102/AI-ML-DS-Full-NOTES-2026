// tools.js - AI Tools Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Filter Tools by Category
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter tool cards
            toolCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else if (card.classList.contains(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Add animation to filtered cards
            const visibleCards = document.querySelectorAll(`.tool-card${filterValue !== 'all' ? `.${filterValue}` : ''}[style*="display: flex"]`);
            visibleCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('animate-in');
                setTimeout(() => card.classList.remove('animate-in'), 500);
            });
        });
    });

    // Tool Progress Tracking
    const startButtons = document.querySelectorAll('.start-learning');
    
    startButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const toolName = this.getAttribute('data-tool');
            const toolCard = this.closest('.tool-card');
            const progressBar = toolCard.querySelector('.progress');
            const progressPercent = toolCard.querySelector('.progress-percent');
            
            // Get current progress from localStorage
            const storageKey = `tool-progress-${toolName}`;
            let currentProgress = parseInt(localStorage.getItem(storageKey)) || 0;
            
            // Update progress
            if (currentProgress < 100) {
                currentProgress += 25;
                if (currentProgress > 100) currentProgress = 100;
                localStorage.setItem(storageKey, currentProgress);
                
                // Update UI
                progressBar.style.width = `${currentProgress}%`;
                progressPercent.textContent = `${currentProgress}%`;
                
                // Change button text based on progress
                if (currentProgress === 100) {
                    this.innerHTML = '<i class="fas fa-check-circle"></i> Completed!';
                    this.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                    this.style.cursor = 'default';
                    this.onclick = null;
                } else if (currentProgress >= 50) {
                    this.innerHTML = '<i class="fas fa-sync-alt"></i> Continue Learning';
                }
                
                // Update overall progress
                updateOverallProgress();
            }
            
            // Show modal for tool details
            showToolModal(toolName);
        });
    });

    // Show Tool Details Modal
    function showToolModal(toolName) {
        const modal = document.getElementById('toolModal');
        const modalContent = modal.querySelector('.modal-content');
        
        // Set modal content based on tool
        const toolData = getToolData(toolName);
        if (!toolData) return;
        
        // Update modal content
        document.getElementById('modalToolName').textContent = toolData.name;
        modal.querySelector('.modal-icon i').className = toolData.icon;
        modal.querySelector('.modal-category').textContent = toolData.category;
        modal.querySelector('.modal-rating').textContent = toolData.rating;
        modal.querySelector('.modal-year').textContent = `Released: ${toolData.year}`;
        modal.querySelector('.modal-description').textContent = toolData.description;
        
        // Show modal with animation
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close modal on click outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal button
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        
        // Tab functionality
        const tabButtons = modal.querySelectorAll('.tab-btn');
        const tabContents = modal.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Modal actions
        modal.querySelector('.start-course').addEventListener('click', () => {
            alert(`Starting course: ${toolData.name}`);
            closeModal();
        });
    }

    // Close modal function
    function closeModal() {
        const modal = document.getElementById('toolModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Get tool data
    function getToolData(toolName) {
        const toolsData = {
            'opencv': {
                name: 'OpenCV',
                icon: 'fas fa-eye',
                category: 'Computer Vision',
                rating: '4.8/5',
                year: '2000',
                description: 'OpenCV (Open Source Computer Vision Library) is an open source computer vision and machine learning software library. OpenCV was built to provide a common infrastructure for computer vision applications and to accelerate the use of machine perception in commercial products.'
            },
            'pytorch': {
                name: 'PyTorch',
                icon: 'fas fa-brain',
                category: 'Deep Learning',
                rating: '4.9/5',
                year: '2016',
                description: 'PyTorch is an open source machine learning library based on the Torch library. It\'s used for applications such as computer vision and natural language processing, primarily developed by Facebook\'s AI Research lab.'
            },
            'tensorflow': {
                name: 'TensorFlow',
                icon: 'fas fa-network-wired',
                category: 'Deep Learning',
                rating: '4.7/5',
                year: '2015',
                description: 'TensorFlow is a free and open-source software library for machine learning and artificial intelligence. It can be used across a range of tasks but has a particular focus on training and inference of deep neural networks.'
            },
            'nlp': {
                name: 'NLP Libraries',
                icon: 'fas fa-language',
                category: 'Natural Language Processing',
                rating: '4.6/5',
                year: '2001-2020',
                description: 'A collection of Natural Language Processing tools including NLTK, spaCy, Transformers, and BERT for text processing, sentiment analysis, named entity recognition, and language translation.'
            }
        };
        
        return toolsData[toolName] || null;
    }

    // Update overall progress
    function updateOverallProgress() {
        const tools = ['opencv', 'pytorch', 'tensorflow', 'nlp', 'scikit', 'pandas', 'numpy', 'api', 'docker'];
        let totalProgress = 0;
        
        tools.forEach(tool => {
            const progress = parseInt(localStorage.getItem(`tool-progress-${tool}`)) || 0;
            totalProgress += progress;
        });
        
        const overallProgress = Math.round(totalProgress / tools.length);
        
        // Update circle progress
        const circle = document.querySelector('.progress-circle circle:last-child');
        const percentageText = document.querySelector('.progress-text .percentage');
        
        if (circle && percentageText) {
            const circumference = 440; // 2 * π * r (r=70)
            const offset = circumference - (circumference * overallProgress) / 100;
            circle.style.strokeDashoffset = offset;
            percentageText.textContent = `${overallProgress}%`;
            
            // Update progress bars in detailed progress
            updateDetailedProgress();
        }
    }

    // Update detailed progress bars
    function updateDetailedProgress() {
        const progressItems = document.querySelectorAll('.detailed-progress .progress-item');
        
        progressItems.forEach(item => {
            const toolName = item.querySelector('span').textContent.toLowerCase();
            const storageKey = `tool-progress-${toolName}`;
            const progress = parseInt(localStorage.getItem(storageKey)) || 0;
            
            const progressBar = item.querySelector('.progress');
            const percentSpan = item.querySelector('.percent');
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            if (percentSpan) {
                percentSpan.textContent = `${progress}%`;
            }
        });
    }

    // Initialize progress on page load
    function initializeProgress() {
        // Set initial progress for demo
        const demoProgress = {
            'opencv': 40,
            'pytorch': 25,
            'pandas': 60,
            'numpy': 75
        };
        
        Object.entries(demoProgress).forEach(([tool, progress]) => {
            if (!localStorage.getItem(`tool-progress-${tool}`)) {
                localStorage.setItem(`tool-progress-${tool}`, progress);
            }
        });
        
        updateOverallProgress();
        
        // Initialize all tool cards with saved progress
        toolCards.forEach(card => {
            const toolName = card.getAttribute('data-tool');
            const progress = parseInt(localStorage.getItem(`tool-progress-${toolName}`)) || 0;
            
            const progressBar = card.querySelector('.progress');
            const progressPercent = card.querySelector('.progress-percent');
            const startButton = card.querySelector('.start-learning');
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressPercent) progressPercent.textContent = `${progress}%`;
            
            // Update button based on progress
            if (progress === 100 && startButton) {
                startButton.innerHTML = '<i class="fas fa-check-circle"></i> Completed!';
                startButton.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                startButton.style.cursor = 'default';
                startButton.onclick = null;
            }
        });
    }

    // Initialize page
    initializeProgress();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.tool-card, .path-step').forEach(el => {
        observer.observe(el);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key closes modal
        if (e.key === 'Escape') {
            closeModal();
        }
        
        // Ctrl/Cmd + F focuses filter
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            document.querySelector('.filter-btn').focus();
        }
    });

    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print';
    printBtn.style.position = 'fixed';
    printBtn.style.bottom = '20px';
    printBtn.style.right = '20px';
    printBtn.style.zIndex = '1000';
    printBtn.style.background = 'var(--primary-gradient)';
    printBtn.style.color = 'white';
    printBtn.style.border = 'none';
    printBtn.style.padding = '10px 20px';
    printBtn.style.borderRadius = '25px';
    printBtn.style.cursor = 'pointer';
    printBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    
    printBtn.addEventListener('click', () => window.print());
    document.body.appendChild(printBtn);
});