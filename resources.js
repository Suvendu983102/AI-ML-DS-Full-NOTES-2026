// Resources Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Download cheat sheet functionality
    document.querySelectorAll('.cheatsheet-card .btn').forEach(button => {
        button.addEventListener('click', function() {
            const cheatsheetTitle = this.closest('.cheatsheet-card').querySelector('h3').textContent;
            downloadCheatsheet(cheatsheetTitle);
        });
    });
    
    // External link tracking
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.href;
            trackResourceClick(url);
        });
    });
    
    // Dataset download simulation
    document.querySelectorAll('.dataset-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const datasetName = this.closest('.dataset-card').querySelector('h3').textContent;
            simulateDatasetDownload(datasetName);
        });
    });
    
    // Search functionality (if added later)
    initializeSearch();
    
    // Resource card animations
    animateResourceCards();
});

function downloadCheatsheet(title) {
    // Create a simple PDF content
    const content = `
        ${title} Cheat Sheet
        ====================
        
        Created: ${new Date().toLocaleDateString()}
        
        Python Basics:
        --------------
        list.append(x) - Add item to list
        dict.keys() - Get dictionary keys
        str.split() - Split string
        len(x) - Get length
        
        NumPy:
        ------
        np.array() - Create array
        np.mean() - Calculate mean
        np.reshape() - Reshape array
        np.sum() - Sum of elements
        
        Pandas:
        -------
        pd.read_csv() - Read CSV file
        df.head() - First 5 rows
        df.describe() - Statistics
        df.groupby() - Group data
        
        Scikit-learn:
        -------------
        train_test_split() - Split data
        fit() - Train model
        predict() - Make predictions
        score() - Model accuracy
        
        Save this cheat sheet for quick reference!
    `;
    
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_').toLowerCase()}_cheatsheet.txt`;
    document.body.appendChild(element);
    element.click();
    
    // Show success message
    showNotification(`${title} cheatsheet downloaded!`);
}

function trackResourceClick(url) {
    // In a real app, send this to analytics
    console.log('Resource clicked:', url);
    
    // Store in localStorage for user history
    const history = JSON.parse(localStorage.getItem('resourceHistory') || '[]');
    history.push({
        url: url,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('resourceHistory', JSON.stringify(history.slice(-20))); // Keep last 20
}

function simulateDatasetDownload(datasetName) {
    // Show loading state
    const link = event.target;
    const originalText = link.textContent;
    link.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    link.style.pointerEvents = 'none';
    
    // Simulate download delay
    setTimeout(() => {
        // Create dummy dataset
        let datasetContent = '';
        
        switch(datasetName) {
            case 'Titanic Dataset':
                datasetContent = `PassengerId,Survived,Pclass,Name,Sex,Age
1,0,3,"Braund, Mr. Owen Harris",male,22
2,1,1,"Cumings, Mrs. John Bradley",female,38`;
                break;
            case 'Iris Flowers':
                datasetContent = `sepal_length,sepal_width,petal_length,petal_width,species
5.1,3.5,1.4,0.2,setosa
4.9,3.0,1.4,0.2,setosa`;
                break;
            default:
                datasetContent = `feature1,feature2,feature3,target
1.2,3.4,5.6,0
2.3,4.5,6.7,1`;
        }
        
        // Download file
        const element = document.createElement('a');
        const file = new Blob([datasetContent], {type: 'text/csv'});
        element.href = URL.createObjectURL(file);
        element.download = `${datasetName.replace(/\s+/g, '_').toLowerCase()}.csv`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        // Reset button
        link.innerHTML = originalText;
        link.style.pointerEvents = 'auto';
        
        showNotification(`${datasetName} downloaded successfully!`);
    }, 1500);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
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

function initializeSearch() {
    // Add search functionality if needed
    const searchContainer = document.createElement('div');
    searchContainer.className = 'resource-search';
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search resources..." id="resource-search">
        <button id="search-btn"><i class="fas fa-search"></i></button>
    `;
    
    // Insert at beginning of resources section
    const firstCategory = document.querySelector('.resource-category');
    if (firstCategory) {
        firstCategory.parentNode.insertBefore(searchContainer, firstCategory);
    }
    
    // Add search functionality
    const searchInput = document.getElementById('resource-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }
}

function performSearch() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    if (!searchTerm) return;
    
    // Search through all resource content
    const resources = document.querySelectorAll('.resource-card, .tool-card, .dataset-card');
    let found = false;
    
    resources.forEach(resource => {
        const text = resource.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            resource.style.backgroundColor = '#e3f2fd';
            resource.style.border = '2px solid var(--primary)';
            found = true;
        } else {
            resource.style.backgroundColor = '';
            resource.style.border = '';
        }
    });
    
    if (!found) {
        showNotification('No resources found for your search.');
    }
}

function animateResourceCards() {
    const cards = document.querySelectorAll('.resource-card, .tool-card, .dataset-card, .cheatsheet-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add notification animations
const notificationStyles = `
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

.resource-search {
    margin-bottom: 40px;
    display: flex;
    gap: 10px;
}

#resource-search {
    flex: 1;
    padding: 15px 20px;
    border: 2px solid var(--light);
    border-radius: 50px;
    font-size: 1rem;
    outline: none;
}

#resource-search:focus {
    border-color: var(--primary);
}

#search-btn {
    background: var(--primary);
    color: white;
    border: none;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-content i {
    font-size: 1.2rem;
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);