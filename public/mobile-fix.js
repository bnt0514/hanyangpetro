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
            // Wait for table to fully render
            setTimeout(function () {
                const table = container.querySelector('.product-table');
                if (!table) return;

                // Check if table content height exceeds container's max-height (80vh)
                const maxHeight = window.innerHeight * 0.8;
                const tableHeight = table.offsetHeight;
                const hasVerticalScroll = tableHeight > maxHeight;

                if (hasVerticalScroll) {
                    container.classList.add('has-vertical-scroll');
                } else {
                    container.classList.remove('has-vertical-scroll');
                }
            }, 100);
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
