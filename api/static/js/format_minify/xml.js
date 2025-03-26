var $ = jQuery.noConflict();
$(document).ready(function () {
// Minify XML
document.getElementById('minify').addEventListener('click', () => {
    const inputXML = document.getElementById('inputXML').value;
    const minifiedXML = minifyXML(inputXML);
    document.getElementById('outputXML').textContent = minifiedXML;
    document.getElementById('downloadXML').disabled = false;
});

// Clear Input & Output
document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('inputXML').value = '';
    document.getElementById('outputXML').textContent = '';
    document.getElementById('downloadXML').disabled = true;
});

// Copy to Clipboard
document.getElementById('copyXML').addEventListener('click', () => {
    const outputXML = document.getElementById('outputXML').textContent;
    navigator.clipboard.writeText(outputXML)
        .then(() => alert('XML copied to clipboard!'))
        .catch(() => alert('Failed to copy XML.'));
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

})
