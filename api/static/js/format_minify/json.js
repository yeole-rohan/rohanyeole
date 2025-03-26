var $ = jQuery.noConflict();
$(document).ready(function () {
    // Beautify JSON
    document.getElementById('beautify').addEventListener('click', () => {
        try {
            const inputJson = document.getElementById('inputJson').value;
            const formattedJson = JSON.stringify(JSON.parse(inputJson), null, 2); // 2 spaces for indentation
            document.getElementById('outputJson').textContent = formattedJson;
            document.getElementById('downloadJson').disabled = false;
        } catch (error) {
            alert('Invalid JSON. Please check your input.');
        }
    });

    // Minify JSON
    document.getElementById('minify').addEventListener('click', () => {
        try {
            const inputJson = document.getElementById('inputJson').value;
            const minifiedJson = JSON.stringify(JSON.parse(inputJson));
            document.getElementById('outputJson').textContent = minifiedJson;
            document.getElementById('downloadJson').disabled = false;
        } catch (error) {
            alert('Invalid JSON. Please check your input.');
        }
    });

    // Clear Input & Output
    document.getElementById('clear').addEventListener('click', () => {
        document.getElementById('inputJson').value = '';
        document.getElementById('outputJson').textContent = '';
        document.getElementById('downloadJson').disabled = true;
    });

    // Copy to Clipboard
    document.getElementById('copyJson').addEventListener('click', () => {
        const outputJson = document.getElementById('outputJson').textContent;
        navigator.clipboard.writeText(outputJson)
            .then(() => alert('JSON copied to clipboard!'))
            .catch(() => alert('Failed to copy JSON.'));
    });

    // Download JSON
    document.getElementById('downloadJson').addEventListener('click', () => {
        const outputJson = document.getElementById('outputJson').textContent;
        const blob = new Blob([outputJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        a.click();
        URL.revokeObjectURL(url);
    });

})