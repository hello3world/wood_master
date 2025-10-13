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
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

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
    animateGalleryOnScroll();
});