var $ = jQuery.noConflict();
$(document).ready(function () {
  
     // Initialize Pyodide only once
    let pyodideInstance;
    const outputDiv = document.getElementById('console-output');
    const runButton = document.getElementById('run-button');
    outputDiv.value = "Initializing...\n";
    async function initializePyodide() {
        pyodideInstance = await loadPyodide();
        outputDiv.value = "Ready!\n";
        // Redirect Python's stdout to the console output
        pyodideInstance.setStdout({
          batched: (text) => {      
            outputDiv.value += text + `\n`;
          }
      });
    }

    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById('python-editor'), {
        mode: 'python',
        theme: 'default',
        lineNumbers: true,
        indentUnit: 4,
        autofocus: true,
    });
    // Add default Python code to the editor
    editor.setValue(`# Welcome to the Python Compiler!\nprint("Hello, Python!")\nprint("This is running in the browser!")`);

    if (!pyodideInstance) {
        initializePyodide();
    }
    // Function to run Python code
    async function runPythonCode() {
      runButton.disabled = true;
        const code = editor.getValue();
        const outputDiv = document.getElementById('console-output');
        // Clear previous output
        outputDiv.value = ''
        outputDiv.value = '\nExecuting...\n';

        try {
            // Run Python code using Pyodide
            await pyodideInstance.runPythonAsync(code);            
            // Add success message at the end
            outputDiv.value += `\n ⭐ Code Execution Successful!\n`;

        } catch (error) {
            outputDiv.value = `\nError: ${error.message}\n`;
        }
        runButton.disabled = false;
    }

    // Attach event listener to run button
    runButton.addEventListener('click', runPythonCode);
})