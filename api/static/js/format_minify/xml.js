var $ = jQuery.noConflict();
$(document).ready(function () {
    // Minify XML
    const inputXML = document.getElementById('inputXML');
    const default_xml_code = `<note><to>John</to><from>Jane</from><heading>Reminder</heading><body>Don't forget our meeting tomorrow at 10 AM.</body></note>`
    inputXML.textContent = default_xml_code;


    document.getElementById('minify').addEventListener('click', () => {
        const minifiedXML = minifyXML(inputXML.value);
        document.getElementById('outputXML').textContent = minifiedXML;
        document.getElementById('downloadXML').disabled = false;
    });

    // Clear Input & Output
    document.getElementById('beautify').addEventListener('click', () => {
        const formattedXML = formatXML(inputXML.value);
        document.getElementById('outputXML').textContent = formattedXML;
        document.getElementById('downloadXML').disabled = false;
    });

    // Clear Input & Output
    document.getElementById('clear').addEventListener('click', () => {
        inputXML.value = '';
        document.getElementById('outputXML').textContent = '';
        document.getElementById('downloadXML').disabled = true;
    });

    // Copy to Clipboard
    document.getElementById('copyXML').addEventListener('click', () => {
        const outputXML = document.getElementById('outputXML').textContent;
        navigator.clipboard.writeText(outputXML)
            .then(() => showCustomPopup('XML copied to clipboard!', 'info'))
            .catch(() => showCustomPopup('Failed to copy XML.', 'danger'));
    });

    // Download XML
    document.getElementById('downloadXML').addEventListener('click', () => {
        const outputXML = document.getElementById('outputXML').textContent;
        const blob = new Blob([outputXML], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.xml';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Minify XML Logic
    function minifyXML(xml) {
        return xml
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .replace(/>\s+</g, '><') // Remove spaces between tags
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .trim();
    }
    function formatXML(xml, indent = '    ') {
        let formatted = '';
        let level = 0;
        let inTag = false;
        let inAttribute = false;

        for (let i = 0; i < xml.length; i++) {
            const char = xml[i];

            // Handle opening tags
            if (char === '<' && xml[i + 1] !== '/') {
                if (formatted && formatted[formatted.length - 1] !== '\n') {
                    formatted += '\n';
                }
                formatted += indent.repeat(level) + char;
                level++;
                inTag = true;
            }
            // Handle closing tags
            else if (char === '<' && xml[i + 1] === '/') {
                level--;
                if (formatted[formatted.length - 1] !== '\n') {
                    formatted += '\n';
                }
                formatted += indent.repeat(level) + char;
                inTag = true;
            }
            // Handle tag end
            else if (char === '>') {
                formatted += char;
                if (!inAttribute) {
                    formatted += '\n';
                }
                inTag = false;
                inAttribute = false;
            }
            // Handle attributes
            else if (inTag && char === ' ') {
                formatted += char;
                inAttribute = true;
            }
            // Add other characters
            else {
                if (!inTag && formatted[formatted.length - 1] === '\n') {
                    formatted += indent.repeat(level);
                }
                formatted += char;
            }
        }

        return formatted.trim();
    }

})
