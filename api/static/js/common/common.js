var $ = jQuery.noConflict();
$(document).ready(function () {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Function to show custom popup
    function showCustomPopup(message, type = 'info') {
        const popup = document.getElementById('customPopup');
        popup.textContent = message;
        popup.className = `custom-popup alert alert-${type} show`;
        popup.role ="alert"

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 5000);
    }
    // Make the function globally accessible
    window.showCustomPopup = showCustomPopup;
});