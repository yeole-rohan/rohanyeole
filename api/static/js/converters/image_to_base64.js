var $ = jQuery.noConflict();
$(document).ready(function () {
  document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        
        // File type validation
        if (!validTypes.includes(file.type)) {
          showCustomPopup('Invalid file type! Please upload an image (JPG, PNG, GIF, or WEBP).', 'danger');
            event.target.value = ''; // Reset input
            return;
        }
      const reader = new FileReader();
      // Show loader and disable buttons
      document.getElementById('loader').style.display = "block";

      reader.onload = function (e) {
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('imagePreview').style.display = "block";
        document.getElementById('base64Output').value = e.target.result;
        // Hide loader and enable button
        document.getElementById('loader').style.display = "none";
      };
      reader.readAsDataURL(file);
    }else{
      showCustomPopup('Please select an image first.', 'danger');
      return;
    }
  });

  document.getElementById('copyBtn').addEventListener('click', function () {
    const base64Text = document.getElementById('base64Output');
    base64Text.select();
    document.execCommand("copy");
    showCustomPopup('Base64 copied to clipboard!', 'success');
  });

  document.getElementById('downloadBtn').addEventListener('click', function () {
    const base64Text = document.getElementById('base64Output').value;

    if (!base64Text) {
      showCustomPopup('No Base64 data to download.', 'danger');
      return;
    }

    const blob = new Blob([base64Text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "base64_output.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
})