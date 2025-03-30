var $ = jQuery.noConflict();
$(document).ready(function () {
    const inputSQL = document.getElementById('inputSQL');
    const unformattedSQL = `SELECT name, age, address FROM customers WHERE age > 18 AND (country = 'USA' OR country = 'Canada') ORDER BY last_name;`;
    inputSQL.value = unformattedSQL;
    // Beautify SQL
    document.getElementById('beautify').addEventListener('click', () => {
        const formattedSQL = beautifySQL(inputSQL.value);
        document.getElementById('outputSQL').textContent = formattedSQL;
        document.getElementById('downloadSQL').disabled = false;
    });

    // Minify SQL
    document.getElementById('minify').addEventListener('click', () => {
        const minifiedSQL = minifySQL(inputSQL.value);
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
            .then(() => showCustomPopup('SQL copied to clipboard!', 'info'))
            .catch(() => showCustomPopup('Failed to copy SQL.', 'danger'));
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
        const keywords = [
            'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN','GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'UNION', 'UNION ALL', 'AND', 'OR'
        ];
        const tokens = sql.replace(/\s+/g, ' ').split(' '); // Replace multiple spaces with a single space
    
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const upperToken = token.toUpperCase();
            // console.log(token);
            
            // Handle closing keywords (reduce indentation)
            if (upperToken === 'END' || upperToken === ')' || upperToken === 'ELSE') {
                indentLevel--;
            }
            console.log(keywords.includes(upperToken));
            
            // Add new line and indentation for major clauses
            if (keywords.includes(upperToken)) {
                formatted += '\n' + '    '.repeat(indentLevel) + token + '\n ';
                console.log(formatted);
            }
            
            // Handle commas in SELECT clauses (add new line and indentation)
            else if (token.includes(',')) {
                formatted += token + '\n' + '    '.repeat(indentLevel + 1);
            }
            // Handle opening keywords (increase indentation and add new line)
            else if (upperToken === 'BEGIN' || upperToken === 'CASE' || upperToken === '(') {
                formatted += '\n' + '    '.repeat(indentLevel) + token + '\n';
                indentLevel++;
            }
            // Handle regular tokens
            else {
                formatted += token + ' ';
            }
    
            // Handle closing keywords (add new line and indentation)
            if (upperToken === 'END' || upperToken === ')') {
                formatted += '\n' + '    '.repeat(indentLevel);
            }
        }
        console.log(formatted);
        
        return formatted.trim(); // Remove trailing whitespace
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
