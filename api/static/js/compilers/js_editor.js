var $ = jQuery.noConflict();
$(document).ready(function () {
    // Initialize CodeMirror for JS
    const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'default',
        autoCloseBrackets: true,
    });
    // Initial code
    const initialCode = `console.log("Hello from JavaScript!");

const add = (a, b) => a + b;
console.log(add(2, 3));`;

    jsEditor.setValue(initialCode);
    const runButton = document.getElementById('run-button');
    const consoleOutput = document.getElementById('console-output');

    // Override console.log in the worker
    function createWorker(code) {
        const blob = new Blob([`
        const originalConsoleLog = console.log;
        console.log = function(...args) {
            postMessage(args.join(' '));
        };
    
        try {
            ${code}
        } catch (e) {
            postMessage(\`Error: \${e.message}\`);
        }
        `], { type: 'application/javascript' });
    
        return new Worker(URL.createObjectURL(blob));
    }
    // Run button logic
runButton.addEventListener('click', async () => {
    runButton.disabled = true;
    consoleOutput.innerHTML = ''; // Clear previous output
  
    const code = jsEditor.getValue();
  
    try {
      // Create and start the Web Worker
      const worker = createWorker(code);
  
      worker.onmessage = (e) => {
        consoleOutput.innerHTML += `<pre>${e.data}</pre>`; // Append output
      };
  
      worker.onerror = (e) => {
        consoleOutput.innerHTML += `<pre>Error: ${e.message}</pre>`; // Append error
      };
  
      worker.onmessageerror = () => {
        consoleOutput.innerHTML += '<pre>Error: Failed to execute code.</pre>';
      };
  
      // Terminate the worker after execution
      setTimeout(() => {
        worker.terminate();
        runButton.disabled = false;
      }, 1000);
    } catch (e) {
      consoleOutput.innerHTML = `<pre>Error: ${e.message}</pre>`; // Show error in console
      runButton.disabled = false;
    }
  });
  
  // Simulate initial run
  runButton.click();
})