(function () {
  const API_BASE = window.location.protocol === "file:" ? "http://localhost:5000" : window.location.origin;

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

  async function request(path, payload) {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(function () {
      return { message: "Unexpected server response." };
    });

    if (!response.ok) {
      throw new Error(data.message || "Request failed.");
    }

    return data;
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
      const data = await request("/api/auth/signup", payload);
      localStorage.setItem("eliteAthleteUser", JSON.stringify(data.user));
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
      const data = await request("/api/auth/login", payload);
      localStorage.setItem("eliteAthleteUser", JSON.stringify(data.user));
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
