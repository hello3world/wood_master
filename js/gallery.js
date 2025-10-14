// Gallery JavaScript file with filtering functionality

document.addEventListener('DOMContentLoaded', function () {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add click event to gallery items for lightbox functionality (simplified)
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            // In a real implementation, this would open a lightbox with the full-size image
            // For now, we'll just show an alert with the item information
            const title = this.querySelector('h3').textContent;
            alert(`Вы выбрали: ${title}\n\nВ полной реализации здесь откроется увеличенное изображение.`);
        });
    });

    // Simple fade-in animation for gallery items when they come into view
    function animateGalleryOnScroll() {
        galleryItems.forEach(item => {
            // Check if element is already animated
            if (item.style.opacity === '1') return;

            const itemPosition = item.getBoundingClientRect().top;

            // On mobile devices, trigger animation earlier
            const screenPosition = window.innerWidth <= 768 ?
                window.innerHeight / 1.1 :  // Earlier trigger on mobile
                window.innerHeight / 1.3;   // Standard trigger on desktop

            if (itemPosition < screenPosition) {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated gallery items
    galleryItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.cursor = 'pointer';
    });

    // Run animation check on scroll
    window.addEventListener('scroll', animateGalleryOnScroll);

    // Initial check in case elements are already in view
    // Adding a small delay to ensure proper calculation
    setTimeout(animateGalleryOnScroll, 100);

    // Immediate check for elements that are already in view
    // This ensures first elements are visible without scrolling, especially on mobile
    galleryItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // On mobile devices, show more items initially (increase visibility threshold)
        const visibilityThreshold = window.innerWidth <= 768 ? 0.9 : 0.8;

        // If element is in the top portion of the viewport, show it immediately
        if (itemPosition < windowHeight * visibilityThreshold) {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }
    });

    // Also trigger animation check after images load
    window.addEventListener('load', function () {
        setTimeout(animateGalleryOnScroll, 100);
    });
});