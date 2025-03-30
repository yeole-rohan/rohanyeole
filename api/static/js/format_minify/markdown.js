var $ = jQuery.noConflict();
$(document).ready(function () {
    // Beautify Markdown
document.getElementById('beautify').addEventListener('click', () => {
    const inputMarkdown = document.getElementById('inputMarkdown').value;
    const formattedMarkdown = beautifyMarkdown(inputMarkdown);
    document.getElementById('outputMarkdown').textContent = formattedMarkdown;
    document.getElementById('downloadMarkdown').disabled = false;
});

// Minify Markdown
document.getElementById('minify').addEventListener('click', () => {
    const inputMarkdown = document.getElementById('inputMarkdown').value;
    const minifiedMarkdown = minifyMarkdown(inputMarkdown);
    document.getElementById('outputMarkdown').textContent = minifiedMarkdown;
    document.getElementById('downloadMarkdown').disabled = false;
});

// Clear Input & Output
document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('inputMarkdown').value = '';
    document.getElementById('outputMarkdown').textContent = '';
    document.getElementById('downloadMarkdown').disabled = true;
});

// Copy to Clipboard
document.getElementById('copyMarkdown').addEventListener('click', () => {
    const outputMarkdown = document.getElementById('outputMarkdown').textContent;
    navigator.clipboard.writeText(outputMarkdown)
        .then(() => showCustomPopup('Markdown copied to clipboard!', 'info'))
        .catch(() => showCustomPopup('Failed to copy Markdown.', 'danger'));
});

// Download Markdown
document.getElementById('downloadMarkdown').addEventListener('click', () => {
    const outputMarkdown = document.getElementById('outputMarkdown').textContent;
    const blob = new Blob([outputMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.md';
    a.click();
    URL.revokeObjectURL(url);
});

// Beautify Markdown Logic
function beautifyMarkdown(markdown) {
    let formatted = '';
    const lines = markdown.split('\n');
    let inList = false; // Track if we're inside a list

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Add a blank line before headings
        if (trimmed.startsWith('#') && index > 0) {
            formatted += '\n';
        }

        // Add a blank line before lists (if not already in a list)
        if ((trimmed.startsWith('-') || trimmed.startsWith('*')) && !inList) {
            formatted += '\n';
            inList = true; // Mark that we're inside a list
        }

        // Add a blank line after lists (if exiting a list)
        if (inList && !(trimmed.startsWith('-') || trimmed.startsWith('*')) && trimmed !== '') {
            formatted += '\n';
            inList = false; // Mark that we're exiting the list
        }

        // Add a blank line between paragraphs
        if (trimmed !== '' && index > 0 && lines[index - 1].trim() !== '' && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
            formatted += '\n';
        }

        // Add the trimmed line to the formatted output
        formatted += trimmed + '\n';
    });

    return formatted.trim(); // Remove trailing whitespace
}


// Minify Markdown Logic
function minifyMarkdown(markdown) {
    return markdown
        .replace(/\n+/g, '\n') // Replace multiple newlines with a single newline
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Remove leading/trailing whitespace
}

})