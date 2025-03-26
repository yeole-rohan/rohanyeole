var $ = jQuery.noConflict();
$(document).ready(function () {
    // Beautify SQL
    document.getElementById('beautify').addEventListener('click', () => {
        const inputSQL = document.getElementById('inputSQL').value;
        const formattedSQL = beautifySQL(inputSQL);
        document.getElementById('outputSQL').textContent = formattedSQL;
        document.getElementById('downloadSQL').disabled = false;
    });

    // Minify SQL
    document.getElementById('minify').addEventListener('click', () => {
        const inputSQL = document.getElementById('inputSQL').value;
        const minifiedSQL = minifySQL(inputSQL);
        document.getElementById('outputSQL').textContent = minifiedSQL;
        document.getElementById('downloadSQL').disabled = false;
    });

    // Clear Input & Output
    document.getElementById('clear').addEventListener('click', () => {
        document.getElementById('inputSQL').value = '';
        document.getElementById('outputSQL').textContent = '';
        document.getElementById('downloadSQL').disabled = true;
    });

    // Copy to Clipboard
    document.getElementById('copySQL').addEventListener('click', () => {
        const outputSQL = document.getElementById('outputSQL').textContent;
        navigator.clipboard.writeText(outputSQL)
            .then(() => alert('SQL copied to clipboard!'))
            .catch(() => alert('Failed to copy SQL.'));
    });

    // Download SQL
    document.getElementById('downloadSQL').addEventListener('click', () => {
        const outputSQL = document.getElementById('outputSQL').textContent;
        const blob = new Blob([outputSQL], { type: 'text/sql' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.sql';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Beautify SQL Logic
    function beautifySQL(sql) {
        let formatted = '';
        let indentLevel = 0;
        const lines = sql.split('\n');

        lines.forEach(line => {
            const trimmed = line.trim();

            if (trimmed.startsWith(')') || trimmed.startsWith('END')) {
                indentLevel--;
            }

            formatted += '  '.repeat(indentLevel) + trimmed + '\n';

            if (trimmed.endsWith('(') || trimmed.startsWith('CASE') || trimmed.startsWith('BEGIN')) {
                indentLevel++;
            }
        });

        return formatted.trim();
    }

    // Minify SQL Logic
    function minifySQL(sql) {
        return sql
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .replace(/\s*($)\s*/g, '$1') // Remove spaces around parentheses
            .replace(/\s*$\s*/g, '') // Remove spaces around closing parentheses
            .replace(/; /g, ';') // Remove spaces after semicolons
            .trim(); // Remove leading/trailing whitespace
    }
})
