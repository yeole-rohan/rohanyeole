var $ = jQuery.noConflict();
$(document).ready(function () {
    // Event listener for uploading a CSS file
    document.getElementById('uploadCss').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                if (!fileContent.trim()) {
                    alert('The uploaded file is empty. Please upload a valid CSS file.');
                    document.getElementById('uploadCss').value = ''; // Clear the file input
                } else {
                    document.getElementById('inputCss').value = fileContent;
                }
            };
            reader.readAsText(file);
        }
    });

    // Beautify CSS
    document.getElementById('beautify').addEventListener('click', () => {
        const inputCss = document.getElementById('inputCss').value;
        const tabSize = parseInt(document.getElementById('tabSize').value, 10);
        const formattedCss = beautifyCss(inputCss, tabSize);
        document.getElementById('outputCss').textContent = formattedCss;
    });

    // Minify CSS
    document.getElementById('minify').addEventListener('click', () => {
        const inputCss = document.getElementById('inputCss').value;
        const minifiedCss = minifyCss(inputCss);
        document.getElementById('outputCss').textContent = minifiedCss;
    });

    // Clear Input & Output
    document.getElementById('clear').addEventListener('click', () => {
        document.getElementById('inputCss').value = '';
        document.getElementById('outputCss').textContent = '';
        document.getElementById('uploadCss').value = '';
    });

    // Copy to Clipboard
    document.getElementById('copyCss').addEventListener('click', () => {
        const outputCss = document.getElementById('outputCss').textContent;
        navigator.clipboard.writeText(outputCss)
            .then(() => alert('CSS copied to clipboard!'))
            .catch(() => alert('Failed to copy CSS.'));
    });

    // Download CSS
    document.getElementById('downloadCss').addEventListener('click', () => {
        const outputCss = document.getElementById('outputCss').textContent;
        const blob = new Blob([outputCss], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.css';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Beautify CSS Logic
    function beautifyCss(css, tabSize) {
        return css
            .replace(/\s*\{\s*/g, ` ${' '.repeat(tabSize - 1)}{\n${' '.repeat(tabSize * 1)}`)
            .replace(/\s*\}\s*/g, `\n${' '.repeat(tabSize * 0)}}\n`)
            .replace(/\s*;\s*/g, `;\n${' '.repeat(tabSize * 1)}`)
            .replace(/\s*,\s*/g, ', ')
            .replace(/\s*:\s*/g, ': ')
            .replace(/\s*\/\*[\s\S]*?\*\/\s*/g, match => `\n${match}\n`);
    }

    // Minify CSS Logic
    function minifyCss(css) {
        return css
            .replace(/\/\*[\s\S]*?\*\/|[\r\n]+/g, '') // Remove comments and newlines
            .replace(/\s*\{\s*/g, '{') // Remove spaces around {
            .replace(/\s*\}\s*/g, '}') // Remove spaces around }
            .replace(/\s*;\s*/g, ';') // Remove spaces around ;
            .replace(/\s*:\s*/g, ':') // Remove spaces around :
            .replace(/\s*,\s*/g, ','); // Remove spaces around ,
    }
})