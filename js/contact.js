(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");
    const statusEl = document.getElementById("contactStatus");

    if (!contactForm || !statusEl) {
      return;
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      statusEl.textContent = "Sentt..";
      contactForm.reset();
    });
  });
})();
