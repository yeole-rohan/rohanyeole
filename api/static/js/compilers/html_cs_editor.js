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
    var defaultHTML = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My HTML Page</title>
    </head>
    <body>
        <h1>Code, Edit, Run code online.</h1>
        <p>Try changing the text and click on the run button to see the output.</p>
    </body>
</html>`
    htmlEditor.setValue(defaultHTML);
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

    // Initialize consoleMessages array globally
    const consoleMessages = [];

    const updateOutput = () => {
        // Get code from editors
        const htmlCode = htmlEditor.getValue().trim();
        const cssCode = `<style>${cssEditor.getValue().trim()}</style>`;
        const jsCode = `<script>${jsEditor.getValue().trim()}</script>`;

        // Parse the HTML code to insert CSS and JS in correct locations
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlCode, 'text/html');
        const title = doc.querySelector('title')?.textContent || 'Untitled';

        // Update the title bar
        const titleBar = document.getElementById('output-title');
        titleBar.textContent = title;
        // Insert CSS into <head>
        const head = doc.querySelector('head');
        if (head) {
            head.insertAdjacentHTML('beforeend', cssCode);
        }

        // Insert JS before closing </body>
        const body = doc.querySelector('body');
        if (body) {
            body.insertAdjacentHTML('beforeend', jsCode);
        }

        // Convert the parsed document back to a string
        const documentContent = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;

        // Render the combined code in the iframe
        outputFrame.contentWindow.document.open();
        outputFrame.contentWindow.document.write(documentContent);

        // Intercept console.log in the iframe
        const iframeConsole = outputFrame.contentWindow.console;
        // const originalConsoleLog = iframeConsole.log;

        iframeConsole.log = function (...args) {
            // Capture console output
            consoleMessages.push(args.join(' '));
            // Update the console output div
            consoleOutput.innerHTML = consoleMessages.map(msg => `<div>${msg}</div>`).join('');
            // Suppress output in the browser console
            // Uncomment the line below if you want to redirect to browser console as well
            // originalConsoleLog.apply(iframeConsole, args);
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

    // Download functionality
    downloadButton.addEventListener("click", () => {
        const htmlCode = htmlEditor.getValue().trim();
        const cssCode = `<style>${cssEditor.getValue().trim()}</style>`;
        const jsCode = `<script>${jsEditor.getValue().trim()}</script>`;
        // Parse the HTML code to insert CSS and JS in correct locations
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlCode, 'text/html');

        // Insert CSS into <head>
        const head = doc.querySelector('head');
        if (head) {
            head.insertAdjacentHTML('beforeend', cssCode);
        }

        // Insert JS before closing </body>
        const body = doc.querySelector('body');
        if (body) {
            body.insertAdjacentHTML('beforeend', jsCode);
        }

        // Convert the parsed document back to a string
        const combinedCode = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
        const blob = new Blob([combinedCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code.html';
        a.click();
        URL.revokeObjectURL(url);
    });
})