var $ = jQuery.noConflict();
$(document).ready(function () {
    document.getElementById('parseButton').addEventListener('click', () => {
        const url = document.getElementById('inputUrl').value;

        // Send POST request
        fetch('/parse-url/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}', // Add CSRF token for Django security
            },
            body: JSON.stringify({ url: url }), // Send data as JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#outputUrl tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            // Populate the table with parsed data
            for (const [part, value] of Object.entries(data)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${part}</td>
                    <td>${value || '&nbsp;'}</td>
                `;
                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            const tableBody = document.querySelector('#outputUrl tbody');
            tableBody.innerHTML = `
                <tr>
                    <td colspan="2">Error: ${error.message}</td>
                </tr>
            `;
        });
    });
})