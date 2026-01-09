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

    // Mobile table scroll fix - Advanced Sticky Columns
    function applyStickyColumns() {
        const tables = document.querySelectorAll('.product-table');

        tables.forEach(function (table) {
            const thead = table.querySelector('thead');
            const tbody = table.querySelector('tbody');
            if (!thead || !tbody) return;

            const headerRow = thead.querySelector('tr');
            if (!headerRow) return;

            // 1. Identify table type and sticky columns
            const headerCells = Array.from(headerRow.cells);
            const colCount = headerCells.length;

            // Document tables (RoHS, MSDS) typically have 2-3 columns - only stick first column
            // Product tables have 7+ columns - stick first 2 columns
            const stickyCount = colCount <= 3 ? 1 : 2;

            if (headerCells.length < stickyCount) return;            // 2. Measure Widths & Assign Header Sticky
            let currentLeft = 0;
            const colWidths = [];

            headerCells.forEach((th, index) => {
                // Get precise width including padding/border
                const rect = th.getBoundingClientRect();
                const width = rect.width;
                colWidths[index] = width;

                if (index < stickyCount) {
                    th.style.position = 'sticky';
                    th.style.left = currentLeft + 'px';
                    th.style.zIndex = '60';
                    th.classList.add('sticky-header-cell');

                    // Advance offset for next column
                    currentLeft += width;
                }
            });

            // 3. Apply to Body Rows (handling rowspan)
            const numCols = headerCells.length;
            const rowSpans = new Array(numCols).fill(0);

            const rows = Array.from(tbody.querySelectorAll('tr'));

            rows.forEach(tr => {
                const cells = Array.from(tr.cells);
                let cellIndex = 0; // DOM cell index

                // Iterate VISUAL columns
                for (let visualCol = 0; visualCol < numCols; visualCol++) {
                    // Check if spanned
                    if (rowSpans[visualCol] > 0) {
                        rowSpans[visualCol]--;
                        continue;
                    }

                    // If not spanned, consume DOM cell
                    if (cellIndex < cells.length) {
                        const cell = cells[cellIndex];

                        // Update rowspan
                        const span = (parseInt(cell.getAttribute('rowspan')) || 1) - 1;
                        if (span > 0) {
                            rowSpans[visualCol] = span;
                        }

                        // Apply sticky if target column
                        if (visualCol < stickyCount) {
                            cell.style.position = 'sticky';

                            // Calculate left offset
                            let leftPos = 0;
                            for (let i = 0; i < visualCol; i++) {
                                leftPos += colWidths[i];
                            }

                            cell.style.left = leftPos + 'px';
                            // Dynamic Z-Index to ensure first col is above second
                            cell.style.zIndex = (50 - visualCol) + '';
                            cell.style.background = '#fff';
                            cell.classList.add('sticky-body-cell');
                            cell.style.borderRight = '1px solid #ddd'; // Visual separator
                        }

                        cellIndex++;
                    }
                }
            });
        });
    }

    // Run on load and resize to ensure correct widths
    window.addEventListener('load', applyStickyColumns);
    window.addEventListener('resize', applyStickyColumns);
    // Also run immediately in case DOM is ready
    applyStickyColumns();

    // Add touch scroll styling
    const style = document.createElement('style');
    style.textContent = `
        .table-responsive {
            -webkit-overflow-scrolling: touch;
        }
    `;
    document.head.appendChild(style);
});
