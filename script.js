// Project Screenshots Data
const projectScreenshots = {
    herbaguide: [
        { src: 'images/herbaguide-1.jpg', caption: 'HerbaGuide - Home Screen' },
        { src: 'images/herbaguide-2.jpg', caption: 'HerbaGuide - Plant Scanning Feature' },
        { src: 'images/herbaguide-3.jpg', caption: 'HerbaGuide - Results & Information' },
        { src: 'images/herbaguide-4.jpg', caption: 'HerbaGuide - News Section' }
    ],
    hospital: [
        { src: 'images/hospital-1.jpg', caption: 'Result Chart' },
    ],
    sensasi: [
        { src: 'images/sensasi-1.jpg', caption: 'Admin Page' },
        { src: 'images/sensasi-2.jpg', caption: 'News Page' },
        { src: 'images/sensasi-3.jpg', caption: 'Gallery' },
    ],
    restaurant: [
        { src: 'images/restaurant-1.jpg', caption: 'Restaurant System - Dashboard' },
    ],
    dormitory: [
        { src: 'images/dormitory-1.jpg', caption: 'Administrator data' },
        { src: 'images/dormitory-2.jpg', caption: 'Student Records Management' },
        { src: 'images/dormitory-3.jpg', caption: 'Student registration data' },
        { src: 'images/dormitory-4.jpg', caption: 'Room Assignment Interface' }
    ]
};

let currentProject = '';
let currentSlide = 0;

// Open Modal
function openModal(projectName) {
    currentProject = projectName;
    currentSlide = 0;
    const modal = document.getElementById('screenshotModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showSlide(0);
    createIndicators();
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('screenshotModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show Slide
function showSlide(index) {
    const screenshots = projectScreenshots[currentProject];
    if (!screenshots || screenshots.length === 0) return;
    
    if (index >= screenshots.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = screenshots.length - 1;
    } else {
        currentSlide = index;
    }
    
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = screenshots[currentSlide].src;
    modalCaption.textContent = screenshots[currentSlide].caption;
    
    updateIndicators();
}

// Change Slide
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Create Indicators
function createIndicators() {
    const screenshots = projectScreenshots[currentProject];
    const indicatorsContainer = document.getElementById('carouselIndicators');
    indicatorsContainer.innerHTML = '';
    
    screenshots.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.onclick = () => showSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
}

// Update Indicators
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('screenshotModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'Escape') closeModal();
    }
});

// Close modal when clicking outside
document.getElementById('screenshotModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'screenshotModal') {
        closeModal();
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link with smooth transition
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.style.color = 'var(--text-light)';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary)';
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    fadeInObserver.observe(item);
});

// Observe project cards with stagger effect
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Observe skill categories with stagger effect
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.animationDelay = `${index * 0.1}s`;
    fadeInObserver.observe(category);
});

// Parallax effect for background shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form Submission with enhanced feedback
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('button');
    const originalHTML = button.innerHTML;
    
  
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1]?.value || '';
    const message = contactForm.querySelector('textarea').value;

    if (name && email && message) {

        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        button.style.opacity = '0.7';
        

        setTimeout(() => {

            button.innerHTML = '<span>Message Sent! ✓</span>';
            button.style.background = 'var(--primary-dark)';

            contactForm.reset();
            

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
                button.style.opacity = '1';
                button.style.background = '';
            }, 3000);
        }, 1500);
    } else {

        button.innerHTML = '<span>Please fill all fields!</span>';
        button.style.background = '#e74c3c';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
        }, 2000);
    }
});

// Page load animation
window.addEventListener('load', () => {

    document.body.style.overflow = 'visible';
    

    const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-buttons, .hero-social');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});