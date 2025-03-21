var $ = jQuery.noConflict();
$(document).ready(function () {
    // Initialize CodeMirror editors
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
        mode: "htmlmixed",
        theme: "default",
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        matchBrackets: true
    });
    const cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
        mode: "css",
        theme: "default",
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        matchBrackets: true
    });
    const jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
        mode: "javascript",
        theme: "default",
        lineNumbers: true,
        autoCloseTags: true,
        matchBrackets: true

});


// Tab switching logic
const tabs = document.querySelectorAll('.editor-tab');
const sections = document.querySelectorAll('.editor-section');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
        htmlEditor.refresh();
        cssEditor.refresh();
        jsEditor.refresh();
    });
});

// Output functionality
const outputFrame = document.getElementById("output-frame");
const consoleOutput = document.getElementById("console-output");

// Function to update output
const updateOutput = () => {
    // Get code from editors
    const htmlCode = htmlEditor.getValue().trim();
    const cssCode = `<style>${cssEditor.getValue().trim()}</style>`;
    const jsCode = `<script>${jsEditor.getValue().trim()}</script>`;

    // Combine all code into a single HTML document
    const documentContent = `
        <!DOCTYPE html>
        <html>
        <head>
            ${cssCode}
        </head>
        <body>
            ${htmlCode}
            ${jsCode}
        </body>
        </html>
    `;

    // Clear previous console output
    consoleOutput.innerHTML = '';

    // Render the combined code in the iframe
    outputFrame.contentWindow.document.open();
    outputFrame.contentWindow.document.write(documentContent);

    // Intercept console.log in the iframe
    const iframeConsole = outputFrame.contentWindow.console;
    const originalConsoleLog = iframeConsole.log;
    const consoleMessages = [];

    iframeConsole.log = function (...args) {
        // Capture console output
        consoleMessages.push(args.join(' '));
        // Update the console output div
        consoleOutput.innerHTML = consoleMessages.map(msg => `<div>${msg}</div>`).join('');
        // Call the original console.log
        originalConsoleLog.apply(iframeConsole, args);
    };

    // Execute JavaScript in the iframe
    try {
        outputFrame.contentWindow.eval(jsEditor.getValue());
    } catch (e) {
        consoleMessages.push(`Error: ${e.message}`);
        consoleOutput.innerHTML = consoleMessages.map(msg => `<div>${msg}</div>`).join('');
    }

    outputFrame.contentWindow.document.close();
};

// Listen for changes in editors
htmlEditor.on('change', updateOutput);
cssEditor.on('change', updateOutput);
jsEditor.on('change', updateOutput);

// Run the code on page load
updateOutput();

// Resize functionality
const editorMain = document.querySelector(".editor-main");
const outputSection = document.querySelector(".output-section");
const resizeHandle = document.querySelector(".resize-handle");
let isResizing = false;

resizeHandle.addEventListener("mousedown", (e) => {
    isResizing = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", () => {
        isResizing = false;
        document.removeEventListener("mousemove", resize);
    });
});

const resize = (e) => {
    if (isResizing) {
        const newWidth = e.pageX - editorMain.getBoundingClientRect().left;
        if (newWidth > 100 && newWidth < window.innerWidth - 100) { // Set min and max width
            editorMain.style.width = `${newWidth}px`;
            outputSection.style.width = `calc(100% - ${newWidth}px)`;
        }
    }
};



// Move download button to top-right corner
const downloadButton = document.getElementById("download-button");
downloadButton.style.position = 'absolute';
downloadButton.style.top = '10px';
downloadButton.style.right = '10px';

// Download functionality
downloadButton.addEventListener("click", () => {
    const htmlCode = htmlEditor.getValue().trim();
    const cssCode = `<style>${cssEditor.getValue().trim()}</style>`;
    const jsCode = `<script>${jsEditor.getValue().trim()}</script>`;
    const combinedCode = `
        <!DOCTYPE html>
        <html>
        <head>
            ${cssCode}
        </head>
        <body>
            ${htmlCode}
            ${jsCode}
        </body>
        </html>
    `;
    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.html';
    a.click();
    URL.revokeObjectURL(url);
});
})