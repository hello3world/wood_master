// Stock JavaScript file with filtering functionality

document.addEventListener('DOMContentLoaded', function () {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Get all stock items
    const stockItems = document.querySelectorAll('.stock-item');

    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Show/hide stock items based on filter
            stockItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add click event to stock items for ordering functionality
    stockItems.forEach(item => {
        const orderButton = item.querySelector('.btn');
        if (orderButton) {
            orderButton.addEventListener('click', function () {
                const title = item.querySelector('h3').textContent;
                const price = item.querySelector('.price').textContent;
                
                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Fill the form with product info
                    const messageField = document.getElementById('message');
                    if (messageField) {
                        messageField.value = `Хочу заказать: ${title}, цена: ${price}`;
                    }
                } else {
                    // If we're on the stock page, redirect to main page with contact section
                    window.location.href = '../index.html#contact';
                }
            });
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');

            // Animate burger to X
            this.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (nav && menuToggle) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (nav && menuToggle) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
});