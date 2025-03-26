var $ = jQuery.noConflict();
$(document).ready(function () {
    const inputYaml = document.getElementById('inputYaml');
    const outputYaml = document.getElementById('outputYaml');
    const beautifyButton = document.getElementById('beautify');
    const minifyButton = document.getElementById('minify');
    const clearButton = document.getElementById('clear');
    const copyButton = document.getElementById('copyYaml');
    const downloadButton = document.getElementById('downloadYaml');

    // Beautify YAML
    beautifyButton.addEventListener('click', () => {
        const yaml = inputYaml.value;
        try {
            const beautified = prettier.format(yaml, {
                parser: 'yaml',
                plugins: prettierPlugins,
                tabWidth: 2,
            });
            outputYaml.textContent = beautified;
        } catch (error) {
            outputYaml.textContent = `Error: ${error.message}`;
        }
    });

    // Minify YAML
    minifyButton.addEventListener('click', () => {
        const yaml = inputYaml.value;
        try {
            const minified = prettier.format(yaml, {
                parser: 'yaml',
                plugins: prettierPlugins,
                tabWidth: 0,
                printWidth: Infinity, // Ensure all content is on a single line
            });
            outputYaml.textContent = minified;
        } catch (error) {
            outputYaml.textContent = `Error: ${error.message}`;
        }
    });

    // Clear Input and Output
    clearButton.addEventListener('click', () => {
        inputYaml.value = '';
        outputYaml.textContent = '';
    });

    // Copy to Clipboard
    copyButton.addEventListener('click', () => {
        const formattedYaml = outputYaml.textContent;
        if (formattedYaml) {
            navigator.clipboard.writeText(formattedYaml)
                .then(() => alert('YAML copied to clipboard!'))
                .catch(() => alert('Failed to copy YAML.'));
        } else {
            alert('No YAML to copy.');
        }
    });

    // Download YAML
    downloadButton.addEventListener('click', () => {
        const formattedYaml = outputYaml.textContent;
        if (formattedYaml) {
            const blob = new Blob([formattedYaml], { type: 'text/yaml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'formatted-yaml.yaml';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('No YAML to download.');
        }
    });
});