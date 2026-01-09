// Vision Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
    const visionItems = document.querySelectorAll('.vision-item');

    visionItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Prevent link clicks from triggering
            if (e.target.tagName === 'A') return;

            // Check if any item is currently active
            const anyActive = Array.from(visionItems).some(i => i.classList.contains('active'));

            // Toggle all items together
            visionItems.forEach(visionItem => {
                if (anyActive) {
                    visionItem.classList.remove('active');
                } else {
                    visionItem.classList.add('active');
                }
            });
        });
    });
});
