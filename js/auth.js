(function () {
  function setStatus(message, isError) {
    const statusEl = document.getElementById("authStatus");
    if (!statusEl) {
      return;
    }

    statusEl.textContent = message;
    statusEl.style.marginTop = "0.9rem";
    statusEl.style.fontWeight = "700";
    statusEl.style.color = isError ? "#ff9a9a" : "#97f7bf";
  }

  function firstNameFromEmail(email) {
    const prefix = String(email || "").split("@")[0] || "Athlete";
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }

  function saveMockUser(user) {
    localStorage.setItem("eliteAthleteUser", JSON.stringify(user));
  }

  async function handleSignupSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      password: String(formData.get("password") || "")
    };

    setStatus("Creating your account...", false);

    try {
      // Frontend-only mock signup data (not persisted to a backend).
      localStorage.setItem("eliteAthleteSignupDraft", JSON.stringify(payload));
      setStatus("Account created successfully. Redirecting to login...", false);
      form.reset();
      setTimeout(function () {
        window.location.href = "login.html";
      }, 900);
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      password: String(formData.get("password") || "")
    };

    setStatus("Logging you in...", false);

    try {
      saveMockUser({
        name: firstNameFromEmail(payload.email),
        email: payload.email,
        phone: payload.phone,
        createdAt: new Date().toISOString()
      });
      setStatus("Login successful. Redirecting to home page...", false);
      form.reset();
      setTimeout(function () {
        window.location.href = "index.html";
      }, 900);
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
      signupForm.addEventListener("submit", handleSignupSubmit);
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", handleLoginSubmit);
    }
  });
})();
