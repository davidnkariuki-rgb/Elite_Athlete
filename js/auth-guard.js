(function () {
  function isLoggedIn() {
    try {
      const raw = localStorage.getItem("eliteAthleteUser");
      if (!raw) {
        return false;
      }

      const parsed = JSON.parse(raw);
      return Boolean(parsed && parsed.email);
    } catch {
      return false;
    }
  }

  function redirectToLogin(actionName) {
    const action = actionName || "continue";
    alert(`Please signup or login to ${action}.`);
    window.location.href = "login.html";
  }

  function requireLogin(actionName) {
    if (isLoggedIn()) {
      return true;
    }

    redirectToLogin(actionName);
    return false;
  }

  function bindProtectedClicks() {
    document.addEventListener(
      "click",
      function (event) {
        const target = event.target.closest("[data-requires-auth]");
        if (!target) {
          return;
        }

        if (isLoggedIn()) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        const actionName = target.getAttribute("data-auth-action") || "continue";
        redirectToLogin(actionName);
      },
      true
    );
  }

  function bindProtectedSubmits() {
    document.addEventListener(
      "submit",
      function (event) {
        const form = event.target.closest("form[data-requires-auth-form]");
        if (!form) {
          return;
        }

        if (isLoggedIn()) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        const actionName = form.getAttribute("data-auth-action") || "submit this form";
        redirectToLogin(actionName);
      },
      true
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindProtectedClicks();
    bindProtectedSubmits();
  });

  window.EliteAuthGuard = {
    isLoggedIn: isLoggedIn,
    requireLogin: requireLogin
  };
})();
