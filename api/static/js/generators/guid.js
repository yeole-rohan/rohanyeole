var $ = jQuery.noConflict();
$(document).ready(function () {
    // Extract the CSRF token
    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    // GUID generation AJAX request
    $('#guidForm').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/guid/',
            method: 'POST',
            data: $(this).serialize(),
            headers: {
                'X-CSRFToken': csrfToken
            },
            success: function (response) {
                let output = response.guids.join('\n'); // Join GUIDs with newlines
                $('#guidOutput').val(output); // Set value of textarea
                // Enable Copy and Clear buttons
                $('#copyButton').prop('disabled', false);
                $('#clearButton').prop('disabled', false);
            }
        });
    });

    // Copy GUIDs to clipboard
    $('#copyButton').on('click', function () {
        const guids = $('#guidOutput').val();
        navigator.clipboard.writeText(guids)
            .then(() => alert('GUIDs copied to clipboard!'))
            .catch(() => alert('Failed to copy GUIDs.'));
    });

    // Clear GUIDs
    $('#clearButton').on('click', function () {
        $('#guidOutput').val(''); // Clear textarea
        // Disable Copy and Clear buttons
        $('#copyButton').prop('disabled', true);
        $('#clearButton').prop('disabled', true);
    });
})