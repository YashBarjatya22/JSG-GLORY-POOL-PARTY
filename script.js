// ==================== PAGE INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page loads
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    initCountdown();
    initScrollEffects();
    initHamburger();
    initCursorGlow();
    updateScrollProgress();
    initButtonEffects();
    initEventCards();
    initFAQ();
    initSmoothScroll();
    initThemeToggle();
    initAudio();
});

// ==================== COUNTDOWN TIMER ==================== 
function initCountdown() {
    // Use numeric date parts to avoid browser parsing inconsistencies.
    const eventDate = new Date(2026, 4, 17, 0, 0, 0);
    const targetDate = eventDate.getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // Add ticking animation
        document.querySelectorAll('.timer-value').forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = 'timerTick 0.3s ease';
            }, 10);
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Add timer tick animation
const style = document.createElement('style');
style.textContent = `
    @keyframes timerTick {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ==================== SCROLL EFFECTS ==================== 
function initScrollEffects() {
    // Scroll progress bar
    window.addEventListener('scroll', updateScrollProgress);

    // Navbar sticky effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

function updateScrollProgress() {
    const winScroll = document.body.scrollLeft + document.documentElement.scrollLeft;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (document.documentElement.scrollTop / height) * 100;
    document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00d9ff, #0088ff)' : '#ff4444'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .form-group.error input,
    .form-group.error select {
        border-color: #ff4444 !important;
        box-shadow: 0 0 20px rgba(255, 68, 68, 0.3) !important;
    }
`;
document.head.appendChild(notificationStyle);

// ==================== HAMBURGER MENU ==================== 
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==================== CURSOR GLOW EFFECT ==================== 
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Show cursor glow on desktop only
    if (window.innerWidth > 768) {
        cursorGlow.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Smooth follow effect
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';
            cursorGlow.style.transform = 'translate(-50%, -50%)';
        });
    }

    // Hide default cursor
    document.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            document.body.style.cursor = 'none';
        }
    });

    document.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'auto';
    });
}

// ==================== FAQ ACCORDION ==================== 
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // Close all open items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            item.querySelector('.faq-question').classList.remove('active');
        }
    });

    // Toggle current item
    if (isActive) {
        faqItem.classList.remove('active');
        element.classList.remove('active');
    } else {
        faqItem.classList.add('active');
        element.classList.add('active');
    }
}

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFaq(this);
        });
    });
}

// ==================== SMOOTH SCROLL BEHAVIOR ==================== 
function initSmoothScroll() {
    const navbar = document.querySelector('.navbar');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetSelector = this.getAttribute('href');
            const target = document.querySelector(targetSelector);

            if (!target) {
                return;
            }

            e.preventDefault();

            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

            window.scrollTo({
                top: Math.max(targetTop, 0),
                behavior: 'smooth'
            });
        });
    });
}

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation attributes
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ==================== BUTTON HOVER GLOW EFFECTS ==================== 
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = this.querySelector('.btn-glow');
            if (glow) {
                glow.style.left = (x - 50) + 'px';
            }
        });
    });
}

// ==================== EVENT CARD INTERACTIONS ==================== 
function initEventCards() {
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==================== FLOATING ACTION BUTTONS ANIMATION ==================== 
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
    const duration = 15 + Math.random() * 10;
    particle.style.animationDuration = duration + 's';
});

// ==================== TESTIMONIALS CAROUSEL ==================== 
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testimonialCards.length > 0) {
    function rotateTestimonials() {
        testimonialCards.forEach(card => card.style.opacity = '0.3');
        testimonialCards[currentTestimonial].style.opacity = '1';
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }

    // Rotate every 5 seconds
    setInterval(rotateTestimonials, 5000);
    rotateTestimonials();
}

// ==================== UTILITY FUNCTIONS ==================== 

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

// ==================== PERFORMANCE OPTIMIZATION ==================== 

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== MOBILE TOUCH OPTIMIZATION ==================== 
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {
        document.body.style.cursor = 'auto';
    });
}

// ==================== PREVENT LAYOUT SHIFT ==================== 
document.documentElement.style.scrollBehavior = 'smooth';

// ==================== PAGE VISIBILITY API ==================== 
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations if tab is not visible
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// ==================== CONSOLE MESSAGE ==================== 
console.log('%c🎉 Welcome to JSG GLORY! 🎉', 'color: #00d9ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 20px rgba(0, 217, 255, 0.6);');
console.log('%cLuxury • Music • Resort • Memories', 'color: #a100f2; font-size: 14px; font-weight: bold;');

// ==================== THEME TOGGLE ==================== 
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;
    const body = document.body;
    
    const storedTheme = localStorage.getItem('theme');
    
    // If user explicitly chose dark, remove the default light-theme class
    if (storedTheme === 'dark') {
        body.classList.remove('light-theme');
        themeToggleBtn.textContent = '🌙';
    } else {
        // Default to light (either explicitly chosen or first visit)
        body.classList.add('light-theme');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '🌙';
        }
    });
}

// ==================== BACKGROUND MUSIC ====================
function initAudio() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    
    if (!bgMusic || !musicToggle) return;
    
    bgMusic.volume = 0.5;
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicIcon.textContent = '⏸️';
                musicText.textContent = 'Pause Music';
            }).catch(e => console.log('Playback failed:', e));
        } else {
            bgMusic.pause();
            musicIcon.textContent = '🎵';
            musicText.textContent = 'Play Music';
        }
    });
}
