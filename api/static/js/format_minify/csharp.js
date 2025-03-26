var $ = jQuery.noConflict();
$(document).ready(function () {
        const inputCs = document.getElementById('inputCs');
        const outputCs = document.getElementById('outputCs');
        const beautifyButton = document.getElementById('beautify');
        const minifyButton = document.getElementById('minify');
        const clearButton = document.getElementById('clear');
        const copyButton = document.getElementById('copyCs');
        const downloadButton = document.getElementById('downloadCs');
    
        // Beautify C#
        beautifyButton.addEventListener('click', () => {
            const csCode = inputCs.value;
            const beautified = formatCSharp(csCode);
            outputCs.textContent = beautified;
        });

        // Minify C#
        minifyButton.addEventListener('click', () => {
            const csCode = inputCs.value;
            const minified = minifyCSharp(csCode);
            outputCs.textContent = minified;
        });
    
        // Clear Input and Output
        clearButton.addEventListener('click', () => {
            inputCs.value = '';
            outputCs.textContent = '';
        });
    
        // Copy to Clipboard
        copyButton.addEventListener('click', () => {
            const formattedCs = outputCs.textContent;
            if (formattedCs) {
                navigator.clipboard.writeText(formattedCs)
                    .then(() => alert('C# code copied to clipboard!'))
                    .catch(() => alert('Failed to copy C# code.'));
            } else {
                alert('No C# code to copy.');
            }
        });
    
        // Download C#
        downloadButton.addEventListener('click', () => {
            const formattedCs = outputCs.textContent;
            if (formattedCs) {
                const blob = new Blob([formattedCs], { type: 'text/csharp' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'formatted-cs.cs';
                a.click();
                URL.revokeObjectURL(url);
            } else {
                alert('No C# code to download.');
            }
        });
    
        // Manual C# Formatting Logic
        function formatCSharp(code) {
            let indentLevel = 0;
            const lines = code.split('\n');
            const formattedLines = [];
    
            lines.forEach(line => {
                const trimmedLine = line.trim();
    
                if (trimmedLine.startsWith('}') || trimmedLine.startsWith(']') || trimmedLine.startsWith(')')) {
                    indentLevel--;
                }
    
                formattedLines.push('    '.repeat(indentLevel) + trimmedLine);
    
                if (trimmedLine.endsWith('{') || trimmedLine.endsWith('[') || trimmedLine.endsWith('(')) {
                    indentLevel++;
                }
            });
    
            return formattedLines.join('\n');
        }
    
        // Manual C# Minifying Logic
        function minifyCSharp(code) {
            return code
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .join(' ')
                .replace(/\s*([{}()[$;,=])\s*/g, '$1') // Remove spaces around braces, brackets, and operators
                .replace(/; /g, ';'); // Remove spaces after semicolons
        }
    
});