var $ = jQuery.noConflict();
$(document).ready(function () {
   const copyBtn = document.getElementById("copy-btn");
   const downloadBtn = document.getElementById("download-btn");
   const codeBlock = document.getElementById("code-block");
   const formatBtn = document.getElementById("format-btn");
   
   if (copyBtn && downloadBtn && codeBlock) {
      copyBtn.addEventListener("click", function () {
         const code = codeBlock.querySelector("code").innerText;
         navigator.clipboard.writeText(code)
            .then(() => showCustomPopup("Shuffled text copied!", 'success'))
            .catch(err => showCustomPopup("Failed to copy: " + err, 'danger'))
      });

      downloadBtn.addEventListener("click", function () {
         const code = codeBlock.querySelector("code").innerText;
         const blob = new Blob([code], { type: "text/html" });
         const url = URL.createObjectURL(blob);
         const a = document.createElement("a");
         a.href = url;
         a.download = "source.html";
         a.click();
         URL.revokeObjectURL(url);
      });
      formatBtn.addEventListener("click", function () {
         const codeElement = codeBlock.querySelector("code");
         const rawHTML = codeElement.innerText;
         const formatted = html_beautify(rawHTML, {
             indent_size: 2,
             wrap_line_length: 80,
             preserve_newlines: true
         });
         codeElement.innerText = formatted;
         Prism.highlightElement(codeElement);
     });
   }

})