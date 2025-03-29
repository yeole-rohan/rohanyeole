var $ = jQuery.noConflict();
$(document).ready(function () {
    const sampleJSON = JSON.stringify({
        name: 'John Doe',
        age: 30,
        address: {
            street: '123 Main St',
            city: 'New York',
            country: 'USA'
        },
        hobbies: ['Reading', 'Traveling', 'Coding']
    }, null, 2);
    const inputEditor = CodeMirror.fromTextArea(document.getElementById('inputEditor'), {
        mode: 'application/json',
        lineNumbers: true,
        lineWrapping: true,
    });
    inputEditor.setValue(sampleJSON)
    const outputEditor = CodeMirror.fromTextArea(document.getElementById('outputEditor'), {
        mode: 'application/json',
        lineNumbers: true,
        readOnly: true,
        lineWrapping: true,
    });

    document.getElementById('formatBtn').addEventListener('click', () => {
        try {
            const input = JSON.parse(inputEditor.getValue());
            outputEditor.setValue(JSON.stringify(input, null, 2));
            JSON.parse(inputEditor.getValue());
            showCustomPopup('JSON is formatted!', 'success');
        } catch (e) {
            outputEditor.setValue(e.message)
            showCustomPopup('Invalid JSON!', 'danger');
        }
    });

    document.getElementById('minifyBtn').addEventListener('click', () => {
        try {
            const input = JSON.parse(inputEditor.getValue());
            outputEditor.setValue(JSON.stringify(input));
            showCustomPopup('JSON is minified!', 'success');
        } catch (e) {
            outputEditor.setValue(e.message)
            showCustomPopup('Invalid JSON!', 'danger');
        }
    });

    document.getElementById('validateBtn').addEventListener('click', () => {
        try {
            JSON.parse(inputEditor.getValue());
            showCustomPopup('JSON is valid!', 'success');
        } catch (e) {
            outputEditor.setValue(e.message)
            showCustomPopup('Invalid JSON!', 'danger');
        }
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        const blob = new Blob([outputEditor.getValue()], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        a.click();
    });

    document.getElementById('fileUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => inputEditor.setValue(e.target.result);
        reader.readAsText(file);
        showCustomPopup('File uploaded successfully!', 'info');

    });

    document.getElementById('loadUrlBtn').addEventListener('click', () => {
        const url = document.getElementById('jsonUrl').value;
        if (url) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => inputEditor.setValue(JSON.stringify(data, null, 2)),
                showCustomPopup('URL data loaded successfully!', 'info'))
                .catch(() => showCustomPopup('Please enter a valid JSON URL.', 'danger'));
        } else {
            showCustomPopup('Please enter a valid JSON URL.', 'danger');
        }
    });

    document.getElementById('toCsvBtn').addEventListener('click', () => {
        try {
            const input = JSON.parse(inputEditor.getValue());
            const csv = jsonToCsv(input);
            outputEditor.setValue(csv);
            showCustomPopup('Converted to CSV format.', 'success');
        } catch (e) {
            outputEditor.setValue(e.message)
            showCustomPopup('Invalid JSON!', 'danger');
        }
    });

    document.getElementById('toYamlBtn').addEventListener('click', () => {
        try {
            const input = JSON.parse(inputEditor.getValue());
            const yaml = jsyaml.dump(input);
            outputEditor.setValue(yaml);
            showCustomPopup('Converted to YAMl format.', 'success');
        } catch (e) {
            outputEditor.setValue(e.message)
            showCustomPopup('Invalid JSON!', 'danger');
        }
    });

    function jsonToCsv(json) {
        const flatten = (obj, parentKey = '', result = {}) => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = parentKey ? `${parentKey}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        flatten(obj[key], newKey, result);
                    } else {
                        result[newKey] = obj[key];
                    }
                }
            }
            return result;
        };

        const flattened = Array.isArray(json) ? json.map(item => flatten(item)) : [flatten(json)];
        const headers = Object.keys(flattened[0]);
        const rows = flattened.map(item => headers.map(header => item[header]));

        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    }
})