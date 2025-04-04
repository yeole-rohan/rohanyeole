var $ = jQuery.noConflict();
$(document).ready(function () {
  document.getElementById('convertBtn').addEventListener('click', function() {
    const base64Text = document.getElementById('base64Input').value.trim();

    if (!base64Text) {
        alert("Please enter Base64 data first.");
        return;
    }

    // Show loader
    document.getElementById('loader').style.display = "block";
    document.getElementById('convertBtn').disabled = true;

    setTimeout(() => {
        try {
            // Create image source from Base64
            const imageSrc = base64Text.startsWith("data:image") ? base64Text : `data:image/png;base64,${base64Text}`;
            document.getElementById('imagePreview').src = imageSrc;
            document.getElementById('imagePreview').style.display = "block";

            // Hide loader
            document.getElementById('loader').style.display = "none";
            document.getElementById('convertBtn').disabled = false;
        } catch (error) {
            alert("Invalid Base64 data. Please check and try again.");
            document.getElementById('loader').style.display = "none";
            document.getElementById('convertBtn').disabled = false;
        }
    }, 1000); // Simulated delay for better UX
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const image = document.getElementById('imagePreview').src;

    if (!image) {
        alert("No image available to download.");
        return;
    }

    const link = document.createElement("a");
    link.href = image;
    link.download = "converted_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
})