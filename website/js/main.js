// Main JavaScript file for the woodworking workshop website

document.addEventListener('DOMContentLoaded', function () {
    // Form submission handling
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Form validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const consent = document.getElementById('consent').checked;

            // Honeypot spam protection
            const website = document.getElementById('website').value;
            if (website) {
                // If honeypot field is filled, it's likely a spam bot
                console.log('Spam detected');
                return;
            }

            if (!name || !phone) {
                alert('Пожалуйста, заполните обязательные поля (Имя и Телефон)');
                return;
            }

            if (!consent) {
                alert('Пожалуйста, дайте согласие на обработку персональных данных');
                return;
            }

            // In a real implementation, you would send the form data to a server here
            // For now, we'll just show a success message
            alert('Спасибо за ваш запрос! Мы свяжемся с вами в ближайшее время.');

            // Reset form
            orderForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (if needed in future)
    // This is a placeholder for potential mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function () {
            navList.classList.toggle('active');
        });
    }

    // Cookie consent handling
    const cookieBanner = document.querySelector('.cookie-banner');
    if (cookieBanner) {
        // Check if user has already accepted cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');

        if (cookiesAccepted) {
            cookieBanner.style.display = 'none';
        } else {
            // Show cookie banner
            cookieBanner.style.display = 'block';

            // Add event listener to accept button (would be added to the banner in a real implementation)
            const acceptButton = cookieBanner.querySelector('.accept-cookies');
            if (acceptButton) {
                acceptButton.addEventListener('click', function () {
                    localStorage.setItem('cookiesAccepted', 'true');
                    cookieBanner.style.display = 'none';
                });
            }
        }
    }
});

// Simple fade-in animation for elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .about-text, .about-image');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function () {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .about-text, .about-image');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Initial check in case elements are already in view
    animateOnScroll();
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    // Show first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // Next button
    const nextButton = document.querySelector('.carousel-next');
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        });
    }

    // Previous button
    const prevButton = document.querySelector('.carousel-prev');
    if (prevButton) {
        prevButton.addEventListener('click', function () {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
        });
    }

    // Auto-advance slides every 5 seconds
    setInterval(function () {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }
    }, 5000);
});