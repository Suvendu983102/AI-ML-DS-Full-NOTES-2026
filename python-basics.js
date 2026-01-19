// JavaScript for Python Basics Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress circles
    initProgressCircles();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup sidebar navigation
    setupSidebarNav();
    
    // Setup copy code buttons
    setupCopyCodeButtons();
});

// Initialize progress circles
function initProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        if (progress === '100') {
            circle.style.background = 'conic-gradient(#4caf50 0% 100%, #e0e0e0 100% 100%)';
        } else {
            circle.style.background = `conic-gradient(var(--primary) 0% ${progress}%, var(--light-gray) ${progress}% 100%)`;
        }
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Run code button
    document.getElementById('run-code').addEventListener('click', runPythonCode);
    
    // Reset code button
    document.getElementById('reset-code').addEventListener('click', resetCode);
    
    // Quiz buttons
    document.getElementById('submit-quiz').addEventListener('click', checkQuiz);
    document.getElementById('reset-quiz').addEventListener('click', resetQuiz);
    
    // Solution buttons
    document.getElementById('show-solution1').addEventListener('click', () => showSolution(1));
    document.getElementById('show-solution2').addEventListener('click', () => showSolution(2));
    document.getElementById('show-solution3').addEventListener('click', () => showSolution(3));
    
    // Mark complete button
    const completeBtn = document.querySelector('.completed');
    if (completeBtn) {
        completeBtn.addEventListener('click', markComplete);
    }
}

// Setup sidebar navigation
function setupSidebarNav() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.hour-section, .quiz-section');
    
    // Highlight active section in sidebar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
    
    // Smooth scroll for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Setup copy code buttons
function setupCopyCodeButtons() {
    document.querySelectorAll('.copy-code').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-example').querySelector('code');
            const codeText = codeBlock.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                // Show feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.background = '#4caf50';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy code to clipboard');
            });
        });
    });
}

// Run Python code in interactive demo
function runPythonCode() {
    const codeTextarea = document.getElementById('python-code');
    const outputArea = document.getElementById('python-output');
    const code = codeTextarea.value;
    
    // Clear previous output
    outputArea.innerHTML = '';
    
    try {
        // Create a simple Python interpreter simulation
        const result = simulatePythonExecution(code);
        
        // Display the result
        const pre = document.createElement('pre');
        pre.textContent = result;
        outputArea.appendChild(pre);
        
        // Remove placeholder if present
        const placeholder = outputArea.querySelector('.output-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
    } catch (error) {
        const errorMsg = document.createElement('pre');
        errorMsg.style.color = '#f72585';
        errorMsg.textContent = `Error: ${error.message}`;
        outputArea.appendChild(errorMsg);
    }
}

// Simulate Python execution (simplified)
function simulatePythonExecution(code) {
    // Extract print statements
    const lines = code.split('\n');
    let output = '';
    
    // Simple variable assignment simulation
    const variables = {};
    
    lines.forEach(line => {
        line = line.trim();
        
        // Skip comments
        if (line.startsWith('#')) return;
        
        // Handle print statements
        if (line.startsWith('print(')) {
            const printContent = line.match(/print\((.+)\)/);
            if (printContent) {
                let content = printContent[1];
                
                // Handle f-strings (simple simulation)
                content = content.replace(/f(['"])(.*?)\1/g, (match, quote, str) => {
                    return quote + evaluateFString(str, variables) + quote;
                });
                
                // Remove quotes for display
                content = content.replace(/['"]/g, '');
                
                output += content + '\n';
            }
        }
        
        // Handle variable assignments (simple)
        else if (line.includes('=')) {
            const parts = line.split('=');
            const varName = parts[0].trim();
            const value = parts[1].trim();
            
            // Store variable (simplified)
            variables[varName] = value.replace(/['"]/g, '');
        }
    });
    
    return output;
}

// Evaluate f-string expressions (simplified)
function evaluateFString(str, variables) {
    // Replace {variable} with its value
    return str.replace(/\{([^}]+)\}/g, (match, varName) => {
        return variables[varName.trim()] || match;
    });
}

// Reset code in interactive demo
function resetCode() {
    const defaultCode = `# Python Interactive Playground
# Try changing these values

name = "BCA Student"
age = 20
cgpa = 8.5
is_ai_student = True

print("=== Student Information ===")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"CGPA: {cgpa}")
print(f"AI Student: {is_ai_student}")

# Calculate
next_year_age = age + 1
print(f"\\nNext year, I will be {next_year_age} years old")`;
    
    document.getElementById('python-code').value = defaultCode;
    document.getElementById('python-output').innerHTML = 
        '<p class="output-placeholder">Click "Run Code" to see output here...</p>';
}

// Check quiz answers
function checkQuiz() {
    const answers = {
        q1: 'c',
        q2: 'b',
        q3: 'c'
    };
    
    let score = 0;
    const total = Object.keys(answers).length;
    
    // Check each question
    Object.keys(answers).forEach(question => {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        const answerDiv = document.getElementById(`answer${question.slice(1)}`);
        
        if (selected) {
            if (selected.value === answers[question]) {
                score++;
                answerDiv.classList.add('show');
            } else {
                answerDiv.classList.add('show');
            }
        }
    });
    
    // Display result
    const percentage = Math.round((score / total) * 100);
    const resultDiv = document.getElementById('quiz-result');
    
    let message = '';
    let color = '';
    
    if (percentage === 100) {
        message = `🎉 Perfect! You got ${score}/${total} correct!`;
        color = '#4caf50';
    } else if (percentage >= 70) {
        message = `👍 Good job! You got ${score}/${total} correct.`;
        color = '#2196f3';
    } else {
        message = `📚 Keep practicing! You got ${score}/${total} correct.`;
        color = '#ff9800';
    }
    
    resultDiv.innerHTML = `<p>${message}</p>`;
    resultDiv.style.background = `${color}20`;
    resultDiv.style.color = color;
    resultDiv.style.border = `2px solid ${color}`;
    resultDiv.classList.add('show');
}

// Reset quiz
function resetQuiz() {
    // Clear all selections
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Hide all answers
    document.querySelectorAll('.quiz-answer').forEach(answer => {
        answer.classList.remove('show');
    });
    
    // Hide result
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('show');
}

// Show solution for exercises
function showSolution(exerciseNum) {
    const solutions = {
        1: `# Exercise 1: Student Data Management Solution

# Create student dictionary
students = [
    {"name": "Amit", "marks": 85, "grade": "A"},
    {"name": "Priya", "marks": 92, "grade": "A+"},
    {"name": "Rohan", "marks": 78, "grade": "B"},
    {"name": "Ananya", "marks": 65, "grade": "C"},
    {"name": "Karan", "marks": 88, "grade": "A"}
]

# Calculate average marks
total_marks = sum(student["marks"] for student in students)
average_marks = total_marks / len(students)

# Find student with highest marks
highest_student = max(students, key=lambda x: x["marks"])

# Count students with marks above 80
above_80 = sum(1 for student in students if student["marks"] > 80)

# Display results
print("=== Student Data Analysis ===")
print(f"Total Students: {len(students)}")
print(f"Average Marks: {average_marks:.2f}")
print(f"Highest Marks: {highest_student['marks']} by {highest_student['name']}")
print(f"Students above 80 marks: {above_80}")

print("\\nAll Students:")
for student in students:
    print(f"{student['name']}: {student['marks']} marks ({student['grade']})")`,
        
        2: `# Exercise 2: Data Analysis for AI Solution

# Create dataset (AI model accuracies)
accuracies = [85, 92, 78, 96, 88, 82, 91, 87, 95, 89]

# Calculate mean
mean_accuracy = sum(accuracies) / len(accuracies)

# Calculate median
sorted_accuracies = sorted(accuracies)
mid = len(sorted_accuracies) // 2
if len(sorted_accuracies) % 2 == 0:
    median_accuracy = (sorted_accuracies[mid-1] + sorted_accuracies[mid]) / 2
else:
    median_accuracy = sorted_accuracies[mid]

# Calculate range
range_accuracy = max(accuracies) - min(accuracies)

# Find accuracies above threshold
threshold = 85
above_threshold = [acc for acc in accuracies if acc > threshold]

# Create squared values list
squared_accuracies = [acc**2 for acc in accuracies]

# Display results
print("=== AI Model Accuracy Analysis ===")
print(f"Dataset: {accuracies}")
print(f"Mean Accuracy: {mean_accuracy:.2f}%")
print(f"Median Accuracy: {median_accuracy}%")
print(f"Range: {range_accuracy}%")
print(f"Accuracies above {threshold}%: {above_threshold}")
print(f"Squared Accuracies: {squared_accuracies}")`,
        
        3: `# Exercise 3: Simple AI Classifier Solution

def classify_environment(temperature, humidity):
    """
    Classify environment for AI training
    """
    if 20 <= temperature <= 30 and 40 <= humidity <= 60:
        return "Ideal for AI Training"
    elif temperature > 30:
        return "Needs Cooling"
    elif humidity < 40:
        return "Needs Humidifier"
    elif humidity > 60:
        return "Needs Dehumidifier"
    else:
        return "Needs Adjustment"

# Test the classifier with different inputs
test_cases = [
    (25, 50),   # Ideal
    (35, 50),   # Too hot
    (25, 30),   # Too dry
    (25, 70),   # Too humid
    (15, 50),   # Too cold
    (32, 65)    # Hot and humid
]

print("=== AI Training Environment Classifier ===")
print("Temperature (°C) | Humidity (%) | Classification")
print("-" * 50)

for temp, hum in test_cases:
    classification = classify_environment(temp, hum)
    print(f"{temp:^16} | {hum:^13} | {classification}")

# Interactive version
print("\\n=== Interactive Version ===")
try:
    user_temp = float(input("Enter temperature (°C): "))
    user_hum = float(input("Enter humidity (%): "))
    
    result = classify_environment(user_temp, user_hum)
    print(f"\\nResult: {result}")
except ValueError:
    print("Please enter valid numbers!")`
    };
    
    const solutionBox = document.getElementById(`solution${exerciseNum}`);
    const solutionCode = solutions[exerciseNum];
    
    if (solutionBox.innerHTML === '') {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = solutionCode;
        pre.appendChild(code);
        solutionBox.appendChild(pre);
    }
    
    solutionBox.classList.toggle('show');
}

// Mark topic as complete
function markComplete() {
    const completeBtn = document.querySelector('.completed');
    
    if (!completeBtn.classList.contains('completed-active')) {
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed!';
        completeBtn.classList.add('completed-active');
        completeBtn.style.color = '#4caf50';
        
        // Update progress circles
        document.querySelectorAll('.progress-circle').forEach(circle => {
            circle.style.background = 'conic-gradient(#4caf50 0% 100%, #e0e0e0 100% 100%)';
            const span = circle.querySelector('span');
            if (span.textContent !== '✓') {
                span.textContent = '✓';
            }
        });
        
        // Show success message
        alert('🎉 Congratulations! You have completed Python Basics!');
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});