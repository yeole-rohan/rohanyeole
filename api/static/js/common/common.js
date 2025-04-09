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

    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(alert => {
      // Keep the alert for 4 seconds, then fade it out
      setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('fade');
        setTimeout(() => {
          alert.remove();
        }, 500); // Wait for fade transition to finish
      }, 4000); // Display for 4 seconds
    });
});