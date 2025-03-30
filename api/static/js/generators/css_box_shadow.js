var $ = jQuery.noConflict();
$(document).ready(function () {
// Link range sliders with number inputs
function bindRangeToInput(rangeId, inputId) {
    const range = document.getElementById(rangeId);
    const input = document.getElementById(inputId);
    range.addEventListener('input', () => {
        input.value = range.value;
        updateBoxShadow(); // Update shadow on input
    });
    input.addEventListener('input', () => {
        range.value = input.value;
        updateBoxShadow(); // Update shadow on input
    });
}

// Bind all range inputs
bindRangeToInput('horizontalOffset', 'horizontalOffsetValue');
bindRangeToInput('verticalOffset', 'verticalOffsetValue');
bindRangeToInput('blurRadius', 'blurRadiusValue');
bindRangeToInput('spreadRadius', 'spreadRadiusValue');
bindRangeToInput('opacity', 'opacityValue');

// Add event listeners for color picker and checkbox
document.getElementById('shadowColor').addEventListener('input', updateBoxShadow);
document.getElementById('inset').addEventListener('change', updateBoxShadow);

// Update Box Shadow
function updateBoxShadow() {
    const horizontalOffset = document.getElementById('horizontalOffset').value;
    const verticalOffset = document.getElementById('verticalOffset').value;
    const blurRadius = document.getElementById('blurRadius').value;
    const spreadRadius = document.getElementById('spreadRadius').value;
    const shadowColor = document.getElementById('shadowColor').value;
    const opacity = document.getElementById('opacity').value;
    const inset = document.getElementById('inset').checked;

    // Convert color to RGBA
    const rgbaColor = hexToRgba(shadowColor, opacity);

    // Generate CSS
    const boxShadow = `${inset ? 'inset ' : ''}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;

    // Apply to preview box
    const previewBox = document.getElementById('previewBox');
    previewBox.style.webkitBoxShadow = boxShadow;
    previewBox.style.mozBoxShadow = boxShadow;
    previewBox.style.boxShadow = boxShadow;

    // Display CSS code
    const cssCode = `-webkit-box-shadow: ${boxShadow};\n-moz-box-shadow: ${boxShadow};\nbox-shadow: ${boxShadow};`;
    document.getElementById('cssCode').value = cssCode;
}

// Copy CSS to Clipboard
document.getElementById('copyCssButton').addEventListener('click', () => {
    const cssCode = document.getElementById('cssCode');
    cssCode.select();
    navigator.clipboard.writeText(cssCode.value)
        .then(() => showCustomPopup('CSS copied to clipboard!', 'info'))
        .catch(() => showCustomPopup('Failed to copy CSS.', 'danger'));
});

// Convert HEX to RGBA
function hexToRgba(hex, opacity) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Initialize default box shadow
updateBoxShadow();

})