var $ = jQuery.noConflict();
$(document).ready(function () {
    const inputJs = document.getElementById('inputJs');
    const outputJs = document.getElementById('outputJs');
    const beautifyButton = document.getElementById('beautify');
    const minifyButton = document.getElementById('minify');
    const clearButton = document.getElementById('clear');
    const copyButton = document.getElementById('copyJs');
    const downloadButton = document.getElementById('downloadJs');

    // Beautify Markdown
    beautifyButton.addEventListener('click', () => {
        const markdown = inputJs.value;
        const beautified = formatMarkdown(markdown);
        outputJs.textContent = beautified;
    });

    // Minify Markdown
    minifyButton.addEventListener('click', () => {
        const markdown = inputJs.value;
        const minified = minifyMarkdown(markdown);
        outputJs.textContent = minified;
    });

    // Clear Input and Output
    clearButton.addEventListener('click', () => {
        inputJs.value = '';
        outputJs.textContent = '';
    });

    // Copy to Clipboard
    copyButton.addEventListener('click', () => {
        const formattedMarkdown = outputJs.textContent;
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
        const formattedMarkdown = outputJs.textContent;
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