var $ = jQuery.noConflict();
$(document).ready(function () {
        const inputCs = document.getElementById('inputCs');
        const outputCs = document.getElementById('outputCs');
        const beautifyButton = document.getElementById('beautify');
        const minifyButton = document.getElementById('minify');
        const clearButton = document.getElementById('clear');
        const copyButton = document.getElementById('copyCs');
        const downloadButton = document.getElementById('downloadCs');

        const default_csharp_code = `using System;class Program{static void Main(string[] args){Console.WriteLine("Welcome to the Unstructured Code Example!");Console.WriteLine("Enter your name:");string name = Console.ReadLine();Console.WriteLine("Hello, " + name + "!");Console.WriteLine("Enter your age:");int age = Convert.ToInt32(Console.ReadLine());if (age > 18){Console.WriteLine("You are an adult.");}else{Console.WriteLine("You are a minor.");}Console.WriteLine("Enter two numbers to add:");int num1 = Convert.ToInt32(Console.ReadLine());int num2 = Convert.ToInt32(Console.ReadLine());int result = num1 + num2;Console.WriteLine("The sum is: " + result);Console.WriteLine("Press any key to exit...");Console.ReadKey();}}`
        inputCs.textContent = default_csharp_code;
        // Beautify C#
        beautifyButton.addEventListener('click', () => {
            const csCode = inputCs.value;
            const beautified = formatCSharp(csCode);
            outputCs.textContent = beautified;
            showCustomPopup('Code is beautified.', 'success');
        });

        // Minify C#
        minifyButton.addEventListener('click', () => {
            const csCode = inputCs.value;
            const minified = minifyCSharp(csCode);
            outputCs.textContent = minified;
            showCustomPopup('Code is minified.', 'success');
        });
    
        // Clear Input and Output
        clearButton.addEventListener('click', () => {
            inputCs.value = '';
            outputCs.textContent = '';
            showCustomPopup('Text cleared', 'info');
        });
    
        // Copy to Clipboard
        copyButton.addEventListener('click', () => {
            const formattedCs = outputCs.textContent;
            if (formattedCs) {
                navigator.clipboard.writeText(formattedCs)
                    .then(() => showCustomPopup('C# code copied to clipboard!', 'success'))
                    .catch(() => showCustomPopup('Failed to copy C# code.', 'danger'))
            } else {
                showCustomPopup('No C# code to copy.', 'danger');
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
                showCustomPopup('C# code downloaded.', 'success');
            } else {
                showCustomPopup('No C# code to download.', 'danger');
            }
        });
    
        // Manual C# Formatting Logic
        function formatCSharp(code) {
            let indentLevel = 0;
            const lines = code.split(/(?<=[{};])\s*/).filter(line => line.trim() !== '');
            const formattedLines = [];
            
            lines.forEach(line => {
                const trimmedLine = line.trim();
    
                if (trimmedLine.startsWith('}') || trimmedLine.startsWith(']') || trimmedLine.startsWith(')')) {
                    indentLevel = Math.max(0, indentLevel - 1); // Ensure indentLevel doesn't go below 0
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