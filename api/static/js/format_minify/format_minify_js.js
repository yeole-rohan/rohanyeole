var $ = jQuery.noConflict();
$(document).ready(function () {
    const inputMarkdown = document.getElementById('inputMarkdown');
    const outputMarkdown = document.getElementById('outputMarkdown');
    const beautifyButton = document.getElementById('beautify');
    const minifyButton = document.getElementById('minify');
    const clearButton = document.getElementById('clear');
    const copyButton = document.getElementById('copyMarkdown');
    const downloadButton = document.getElementById('downloadMarkdown');

    // Beautify Markdown
    beautifyButton.addEventListener('click', () => {
        const markdown = inputMarkdown.value;
        const beautified = formatMarkdown(markdown);
        outputMarkdown.textContent = beautified;
    });

    // Minify Markdown
    minifyButton.addEventListener('click', () => {
        const markdown = inputMarkdown.value;
        const minified = minifyMarkdown(markdown);
        outputMarkdown.textContent = minified;
    });

    // Clear Input and Output
    clearButton.addEventListener('click', () => {
        inputMarkdown.value = '';
        outputMarkdown.textContent = '';
    });

    // Copy to Clipboard
    copyButton.addEventListener('click', () => {
        const formattedMarkdown = outputMarkdown.textContent;
        if (formattedMarkdown) {
            navigator.clipboard.writeText(formattedMarkdown)
                .then(() => alert('Markdown copied to clipboard!'))
                .catch(() => alert('Failed to copy Markdown.'));
        } else {
            alert('No Markdown to copy.');
        }
    });

    // Download Markdown
    downloadButton.addEventListener('click', () => {
        const formattedMarkdown = outputMarkdown.textContent;
        if (formattedMarkdown) {
            const blob = new Blob([formattedMarkdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'formatted-markdown.md';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('No Markdown to download.');
        }
    });

    // Helper: Format Markdown
    function formatMarkdown(markdown) {
        try {
            const formatted = prettier.format(markdown, {
                parser: 'babel',
                plugins: prettierPlugins,
                tabWidth: 2,
                semi: true,
                singleQuote: true,
            });
            return formatted;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    // Helper: Minify Markdown
    function minifyMarkdown(markdown) {
        return markdown
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join(' ');
    }

})