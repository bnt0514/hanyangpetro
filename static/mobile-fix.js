// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu functionality
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');

            // Change icon
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Detect vertical scroll in tables and update hint
    function updateScrollHints() {
        const tableContainers = document.querySelectorAll('.table-responsive');
        tableContainers.forEach(function (container) {
            // Check if content height exceeds container height
            const hasVerticalScroll = container.scrollHeight > container.clientHeight;

            if (hasVerticalScroll) {
                container.classList.add('has-vertical-scroll');
            } else {
                container.classList.remove('has-vertical-scroll');
            }
        });
    }

    // Run on load and resize
    window.addEventListener('load', updateScrollHints);
    window.addEventListener('resize', updateScrollHints);
    updateScrollHints(); // Run immediately

    // Add touch scroll styling
    const style = document.createElement('style');
    style.textContent = `
        .table-responsive {
            -webkit-overflow-scrolling: touch;
        }
    `;
    document.head.appendChild(style);
});
