// Enhanced 3D Portfolio Application
class Portfolio3D {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Initialize all managers
            new ThemeManager();
            new NavigationManager();
            new TypingAnimation();
            new ScrollAnimationManager();
            new EnhancedSkillsAnimationManager();
            new TiltEffectManager();
            new ParticleSystemManager();
            new CounterAnimationManager();
            new SmoothScrollManager();
            new PerformanceMonitor();
            new KeyboardNavigationManager();

            console.log('3D Portfolio initialized successfully!');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }
}

// Enhanced Theme Management with 3D Effects
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
        this.createThemeTransition();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeElements();
    }

    updateThemeElements() {
        const nav = document.querySelector('.nav');
        if (nav) {
            const scrolled = window.scrollY > 50;
            if (this.theme === 'dark') {
                nav.style.background = scrolled 
                    ? 'rgba(26, 32, 44, 0.9)' 
                    : 'rgba(26, 32, 44, 0.8)';
            } else {
                nav.style.background = scrolled 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'rgba(255, 255, 255, 0.8)';
            }
        }
    }

    createThemeTransition() {
        const transition = document.createElement('div');
        transition.className = 'theme-transition';
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(transition);
        this.transitionElement = transition;
    }

    toggle() {
        // Trigger transition effect
        this.transitionElement.style.opacity = '0.3';
        
        setTimeout(() => {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.applyTheme();
            
            setTimeout(() => {
                this.transitionElement.style.opacity = '0';
            }, 100);
        }, 250);
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });

        window.addEventListener('scroll', () => this.updateThemeElements());
    }
}

// Enhanced Navigation with 3D Effects
class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.createScrollIndicator();
    }

    bindEvents() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
                this.closeMobileMenu();
            });
        });

        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 10));
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Add body scroll lock
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            this.nav.style.transform = 'translateY(0)';
            this.nav.style.boxShadow = 'var(--shadow-lg)';
        } else {
            this.nav.style.boxShadow = 'var(--shadow-sm)';
        }

        // Update active nav link
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);

        window.addEventListener('scroll', Utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            indicator.style.width = `${progress}%`;
        }, 10));
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Typing Animation for Hero Section
class TypingAnimation {
    constructor() {
        this.element = document.querySelector('.typing-text');
        this.words = this.element?.getAttribute('data-words')?.split(',') || [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        if (this.element && this.words.length > 0) {
            this.init();
        }
    }

    init() {
        this.element.textContent = '';
        setTimeout(() => this.type(), 1000);
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Enhanced Scroll Animation Manager
class ScrollAnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupAnimations();
        this.createObserver();
    }

    setupAnimations() {
        const elementsToAnimate = [
            { selector: '.hero-text', animation: 'slide-in-left' },
            { selector: '.hero-visual', animation: 'slide-in-right' },
            { selector: '.about-card', animation: 'fade-in' },
            { selector: '.skill-category-enhanced', animation: 'scale-in' },
            { selector: '.project-card', animation: 'fade-in' },
            { selector: '.education-card', animation: 'slide-in-left' },
            { selector: '.contact-card', animation: 'fade-in' }
        ];

        elementsToAnimate.forEach(({ selector, animation }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add(animation);
            });
        });
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('skill-category-enhanced')) {
                        this.animateSkillCards(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateSkillCards(skillCategory) {
        const skillCards = skillCategory.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                const level = card.getAttribute('data-level');
                const progressBar = card.querySelector('.skill-progress-modern');
                if (progressBar) {
                    progressBar.style.width = `${level}%`;
                }
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 150);
        });
    }
}

// Enhanced Skills Animation Manager
class EnhancedSkillsAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeSkillCategories();
        this.setupInitialStates();
    }

    setupInitialStates() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    }

    observeSkillCategories() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillCategory(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-category-enhanced').forEach(category => {
            observer.observe(category);
        });
    }

    animateSkillCategory(category) {
        const skillCards = category.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                const level = parseInt(card.getAttribute('data-level'));
                const progressBar = card.querySelector('.skill-progress-modern');
                
                // Animate card appearance
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Animate progress bar
                if (progressBar) {
                    setTimeout(() => {
                        progressBar.style.width = `${level}%`;
                    }, 300);
                }
                
                // Add hover effect enhancement
                this.enhanceCardInteraction(card);
            }, index * 200);
        });
    }

    enhanceCardInteraction(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add glow effect
            const logo = card.querySelector('.skill-logo');
            if (logo) {
                logo.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            // Remove glow effect
            const logo = card.querySelector('.skill-logo');
            if (logo) {
                logo.style.boxShadow = 'none';
            }
        });
    }
}

// 3D Tilt Effect Manager
class TiltEffectManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTiltElements();
    }

    setupTiltElements() {
        const tiltElements = document.querySelectorAll('[data-tilt], .skill-card, .project-card');
        
        tiltElements.forEach(element => {
            this.addTiltEffect(element);
        });
    }

    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }
}

// Particle System Manager
class ParticleSystemManager {
    constructor() {
        this.init();
    }

    init() {
        this.createParticleSystem();
    }

    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.1;
            animation: particleFloat ${duration}s infinite linear;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.createParticle(container);
            }
        }, duration * 1000);
    }
}

// Counter Animation Manager
class CounterAnimationManager {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }

    init() {
        this.observeCounters();
    }

    observeCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.ceil(current) + suffix;
        }, stepTime);
    }
}

// Smooth Scroll Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.addBackToTop();
        this.enhanceScrolling();
    }

    addBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--gradient-primary);
            color: white;
            border: none;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(backToTop);

        const toggleBackToTop = Utils.throttle(() => {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
                backToTop.style.transform = 'scale(1)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
                backToTop.style.transform = 'scale(0.8)';
            }
        }, 100);

        backToTop.addEventListener('click', () => {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });

        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'scale(1.1)';
            backToTop.style.boxShadow = 'var(--shadow-glow-lg)';
        });

        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = 'scale(1)';
            backToTop.style.boxShadow = 'var(--shadow-lg)';
        });

        window.addEventListener('scroll', toggleBackToTop);
    }

    enhanceScrolling() {
        // Add smooth scrolling for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log(`Page load time: ${loadTime}ms`);
                    
                    // Log other performance metrics
                    console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
                    console.log(`First Paint: ${performance.getEntriesByType('paint')[0]?.startTime}ms`);
                }, 0);
            });
        }

        // Monitor frame rate
        this.monitorFrameRate();
    }

    monitorFrameRate() {
        let lastTime = performance.now();
        let frameCount = 0;
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                console.log(`FPS: ${fps}`);
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }
}

// Keyboard Navigation Manager
class KeyboardNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Press 'T' to toggle theme
            if (e.key === 't' || e.key === 'T') {
                if (!e.target.matches('input, textarea')) {
                    e.preventDefault();
                    document.getElementById('theme-toggle')?.click();
                }
            }

            // Press 'Escape' to close mobile menu
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu?.classList.contains('active')) {
                    document.getElementById('nav-toggle')?.click();
                }
            }

            // Arrow keys for navigation
            if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

// Add CSS animations for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.1;
        }
        90% {
            opacity: 0.1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle {
        will-change: transform, opacity;
    }
    
    .nav-link.active::before {
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: transparent;
    }
`;
document.head.appendChild(style);

// Initialize the application
new Portfolio3D();

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Portfolio3D,
        ThemeManager,
        NavigationManager,
        TypingAnimation,
        ScrollAnimationManager,
        Utils
    };
}