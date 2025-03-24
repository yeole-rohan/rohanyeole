var $ = jQuery.noConflict();
$(document).ready(function () {
    // Get DOM elements
    const inputString = document.getElementById('inputString');
    const dashRadio = document.getElementById('dash');
    const underscoreRadio = document.getElementById('underscore');
    const removeStopWords = document.getElementById('removeStopWords');
    const removeNumbers = document.getElementById('removeNumbers');
    const outputSlug = document.getElementById('outputSlug');
    const slugifyButton = document.getElementById('slugifyButton');
    const clearButton = document.getElementById('clearButton');
    const resetButton = document.getElementById('resetButton');

    // Stop words list
    const stopWords = ["a", "an", "the", "and", "or", "but", "for", "with", "on", "at", "by", "of", "in", "to", "from"];

    // Function to generate slug
    function generateSlug() {
        let slug = inputString.value.trim().toLowerCase();

        // Remove stop words if checked
        if (removeStopWords.checked) {
            slug = slug.split(' ').filter(word => !stopWords.includes(word)).join(' ');
        }

        // Remove numbers if checked
        if (removeNumbers.checked) {
            slug = slug.replace(/[0-9]/g, '');
        }

        // Replace spaces with selected separator
        const separator = dashRadio.checked ? '-' : '_';
        slug = slug.replace(/[^\w\s]/g, '').replace(/\s+/g, separator);

        // Update output
        outputSlug.value = slug;
    }

    // Event listeners for real-time updates
    inputString.addEventListener('input', generateSlug);
    dashRadio.addEventListener('change', generateSlug);
    underscoreRadio.addEventListener('change', generateSlug);
    removeStopWords.addEventListener('change', generateSlug);
    removeNumbers.addEventListener('change', generateSlug);

    // Clear button
    clearButton.addEventListener('click', () => {
        inputString.value = '';
        outputSlug.value = '';
    });

    // Reset button
    resetButton.addEventListener('click', () => {
        inputString.value = '';
        dashRadio.checked = true;
        underscoreRadio.checked = false;
        removeStopWords.checked = false;
        removeNumbers.checked = false;
        outputSlug.value = '';
    });

})