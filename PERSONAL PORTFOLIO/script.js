// DOM Elements
const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('#checkbox');
const backToTop = document.querySelector('#back-to-top');
const progressBars = document.querySelectorAll('.progress-bar');
const contactForm = document.querySelector('#contact-form');
const downloadCvBtn = document.querySelector('#download-cv');

// Static typing text options for the hero section
const typingTextOptions = [
    "Web Developer",
    "Aspiring Data Scientist",
    "AI & ML Enthusiast",
    "Medical Laboratory Student",
];

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animation for hamburger to X
    const bars = menuToggle.querySelectorAll('.bar');
    if (menuToggle.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            menuToggle.click();
        }
    });
});

// Dark Mode Toggle
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    saveThemePreference();
});

// Check for saved theme preference
function loadThemePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
}

// Save theme preference
function saveThemePreference() {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Call function to animate elements on scroll
    animateOnScroll();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing effect for hero section
function typeText() {
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed

    function type() {
        const currentText = typingTextOptions[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If word is complete, start deleting after pause
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end of the word
        }
        
        // If deletion is complete, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTextOptions.length;
            typingSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

// Animated skill progress bars
function animateProgressBars() {
    progressBars.forEach(progressBar => {
        const percent = progressBar.getAttribute('data-percent');
        progressBar.style.width = '0%';
        
        // Trigger animation when visible
        setTimeout(() => {
            progressBar.style.width = percent + '%';
        }, 200);
    });
}

// Animate elements when they enter the viewport
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-content, .contact-card');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // For skill cards, animate the progress bar
                if (element.classList.contains('skill-card')) {
                    const progressBar = element.querySelector('.progress-bar');
                    const percent = progressBar.getAttribute('data-percent');
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = percent + '%';
                    }, 200);
                }
            }
        }
    });
}

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !message) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would typically send the form data to your server
        // For demo purposes, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// CV Download functionality
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would link to the actual CV file
        alert('CV download functionality will be implemented soon.');
        // When ready, use this:
        // window.open('path/to/your/cv.pdf', '_blank');
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 5%';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = 'var(--glass-shadow)';
        }
    });
}

// Preloader functionality
function preloader() {
    const loader = document.createElement('div');
    loader.className = 'preloader';
    loader.innerHTML = `
        <div class="loader">
            <div class="loading-animation"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.removeChild(loader);
                
                // Start animations after preloader is gone
                typeText();
                animateProgressBars();
            }, 500);
        }, 1000);
    });
}

// Initialize all functions
function init() {
    loadThemePreference();
    handleNavbarScroll();
    preloader();
    
    // If page is already loaded when script runs
    if (document.readyState === 'complete') {
        typeText();
        animateProgressBars();
        animateOnScroll();
    }
}

// Start everything
init();

// Add some CSS programmatically for the preloader
const style = document.createElement('style');
style.innerHTML = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader {
        position: relative;
        width: 100px;
        height: 100px;
    }
    
    .loading-animation {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: var(--primary-color);
        animation: spin 1s linear infinite;
    }
    
    .loading-animation:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: var(--accent-color);
        animation: spin 2s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .animated {
        animation: fadeInUp 0.5s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);
