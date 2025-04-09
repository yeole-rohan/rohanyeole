var $ = jQuery.noConflict();
$(document).ready(function () {

   const form = document.getElementById("contact_form");
   const spinner = document.getElementById("contact-form-spinner");
   const submitBtn = document.getElementById("contact-submit-btn");

   form.addEventListener("submit", function () {
      // Disable button, show spinner
      submitBtn.disabled = true;
      spinner.classList.remove("d-none");
   });

})