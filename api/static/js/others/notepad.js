var $ = jQuery.noConflict();
$(document).ready(function () {
    // Initialize Quill editor
    const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // Formatting
                [{ 'header': [1, 2, 3, false] }],                // Headers
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],   // Lists
                ['clean']                                      // Clear formatting
                [{ 'size': ['12', '16', '20', '24', '32'] }]     // Font sizes
            ]
        }
    });

    // Get all DOM elements
    const saveButton = document.getElementById('saveButton');
    const printButton = document.getElementById('printButton');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const statusBar = document.getElementById('statusBar');
    // Save as TXT
    saveButton.addEventListener('click', () => {
        const content = quill.getText(); // Get plain text
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notepad.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Print
    printButton.addEventListener('click', () => {
        const content = quill.getText(); // Get plain text
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<pre>' + content + '</pre>');
        printWindow.document.close();
        printWindow.print();
        printWindow.document.close();
    });

    // Full Screen
    fullscreenButton.addEventListener('click', () => {
        document.body.classList.toggle('fullscreen');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    // Change Full Screen button text
    fullscreenButton.innerHTML = document.fullscreenElement ? '<i class="fas fa-expand"></i>' : '<i class="fas fa-compress"></i>';
    });

    // Update Status Bar
function updateStatusBar() {
    const cursorPosition = quill.getSelection();
    const text = quill.getText();
    const lines = text.slice(0, cursorPosition.index).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1; // +1 for cursor position
    const chars = text.length;
    const words = text.trim().split(/\s+/).length;
    statusBar.textContent = `Line: ${line}, Column: ${column} | Chars: ${chars} | Words: ${words}`;
}

// Update status bar on editor changes
quill.on('text-change', updateStatusBar);
quill.on('selection-change', updateStatusBar);

// Initialize status bar
updateStatusBar();
})