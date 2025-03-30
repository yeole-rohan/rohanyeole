var $ = jQuery.noConflict();
$(document).ready(function () {
    const inputYaml = document.getElementById('inputYaml');
    const outputYaml = document.getElementById('outputYaml');
    const beautifyButton = document.getElementById('beautify');
    const minifyButton = document.getElementById('minify');
    const clearButton = document.getElementById('clear');
    const copyButton = document.getElementById('copyYaml');
    const downloadButton = document.getElementById('downloadYaml');

    const default_yml_code = `name: John Doe
age: 30
address:
city: New York
state: NY
zip: 10001
skills:
- Python
- JavaScript
- SQL
education:
degree: Bachelor of Science
major: Computer Science
school: University of Example
graduation_year: 2015
work_experience:
- company: Tech Corp
role: Software Engineer
start_date: 2015-06-01
end_date: 2018-12-31
`
    inputYaml.textContent = default_yml_code;
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
            showCustomPopup('Code is beautified.', 'success');
        } catch (error) {
            outputYaml.textContent = `Error: ${error.message}`;
            showCustomPopup('Error.', 'danger');
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
            showCustomPopup('Code is minified.', 'success');
        } catch (error) {
            outputYaml.textContent = `Error: ${error.message}`;
            showCustomPopup('Error.', 'danger');
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
                .then(() => showCustomPopup('YAML copied to clipboard!'))
                .catch(() => showCustomPopup('Failed to copy YAML.'));
        } else {
            showCustomPopup('No YAML to copy.', 'danger');
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
            showCustomPopup('No YAML to download.');
        }
    });
});