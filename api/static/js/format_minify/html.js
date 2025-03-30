var $ = jQuery.noConflict();
$(document).ready(function () {
    // Event listener for uploading an HTML file
document.getElementById('uploadHtml').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            if (!fileContent.trim()) {
                showCustomPopup('The uploaded file is empty. Please upload a valid HTML file.', 'danger');
                document.getElementById('uploadHtml').value = ''; // Clear the file input
            } else {
                document.getElementById('inputHtml').value = fileContent;
            }
        };
        reader.readAsText(file);
    }
});

// Beautify HTML
document.getElementById('beautify').addEventListener('click', () => {
    const inputHtml = document.getElementById('inputHtml').value;
    const tabSize = parseInt(document.getElementById('tabSize').value, 10);
    const formattedHtml = beautifyHtml(inputHtml, tabSize);
    document.getElementById('outputHtml').textContent = formattedHtml;
});

// Minify HTML
document.getElementById('minify').addEventListener('click', () => {
    const inputHtml = document.getElementById('inputHtml').value;
    const minifiedHtml = minifyHtml(inputHtml);
    document.getElementById('outputHtml').textContent = minifiedHtml;
});

// Clear Input & Output
document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('inputHtml').value = '';
    document.getElementById('outputHtml').textContent = '';
    document.getElementById('uploadHtml').value = '';
});

// Copy to Clipboard
document.getElementById('copyHtml').addEventListener('click', () => {
    const outputHtml = document.getElementById('outputHtml').textContent;
    navigator.clipboard.writeText(outputHtml)
        .then(() => showCustomPopup('HTML copied to clipboard!', 'info'))
        .catch(() => showCustomPopup('Failed to copy HTML.', 'danger'));
});

// Download HTML
document.getElementById('downloadHtml').addEventListener('click', () => {
    const outputHtml = document.getElementById('outputHtml').textContent;
    const blob = new Blob([outputHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.html';
    a.click();
    URL.revokeObjectURL(url);
});

// Beautify HTML Logic
function beautifyHtml(html, tabSize) {
    let formatted = '';
    let indentLevel = 0;
    let inTag = false; // Track if we're inside a tag
    let inComment = false; // Track if we're inside a comment
    let inText = false; // Track if we're inside text content

    for (let i = 0; i < html.length; i++) {
        const char = html[i];

        // Handle comments
        if (html.substring(i, i + 4) === '<!--') {
            inComment = true;
            formatted += '\n' + ' '.repeat(indentLevel * tabSize) + '<!--';
            i += 3;
        } else if (html.substring(i, i + 3) === '-->') {
            inComment = false;
            formatted += '-->';
            i += 2;
        }

        // Handle opening tags
        else if (char === '<' && !inComment) {
            if (html[i + 1] !== '/') {
                // Add newline and indentation for opening tag
                formatted +=' '.repeat(indentLevel * tabSize) + '<';
                inTag = true;

                // Increase indentation for nested tags (except for self-closing tags)
                if (!html.substring(i + 1).startsWith('!') && !html.substring(i + 1).startsWith('?')) {
                    indentLevel++;
                }
            } else {
                // Handle closing tags
                if (!inText) {
                    // Add newline and indentation for closing tag only if not inside text
                    indentLevel--; // Decrease indentation before adding the tag
                    formatted += ' '.repeat(indentLevel * tabSize) + '</';
                } else {
                    // Keep closing tag on the same line if inside text
                    formatted += '</';
                }
                inTag = true;
                i++; // Skip the '/' character
            }
        }

        // Handle closing tags
        else if (char === '>' && !inComment) {
            formatted += '>';
            inTag = false;

            // Handle self-closing tags (e.g., <img />)
            if (html[i - 1] === '/') {
                indentLevel--; // Decrease indentation for self-closing tags
            }
        }

        // Handle text content
        else {
            formatted += char;
            if (!inTag && !inComment) {
                inText = true; // Mark that we're inside text content
            }
        }
    }

    // Remove the first unnecessary newline and return the formatted HTML
    return formatted.trim();
}

// Minify HTML Logic
function minifyHtml(html) {
    return html
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/>\s+</g, '><') // Remove spaces between tags
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .trim();
}
})