function initAuthModal() {
  const siteNav = document.querySelector('.site-nav');

  function firstNameFromEmail(email) {
    const prefix = String(email || '').split('@')[0] || 'Athlete';
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }

  function getSignupDraft() {
    try {
      const raw = localStorage.getItem('eliteAthleteSignupDraft');
      const parsed = JSON.parse(raw || 'null');
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  function getStoredUser() {
    try {
      const rawUser = localStorage.getItem('eliteAthleteUser');
      const parsedUser = JSON.parse(rawUser || 'null');
      return parsedUser && parsedUser.name ? parsedUser : null;
    } catch {
      return null;
    }
  }

  function getDisplayName(user) {
    const fullName = String(user.name || '').trim();
    if (!fullName) {
      return 'Athlete';
    }

    return fullName.split(' ')[0];
  }

  function renderNavAuthState() {
    if (!siteNav) {
      return;
    }

    const oldLoginTrigger = siteNav.querySelector('.nav-login-trigger');
    const oldUserDisplay = siteNav.querySelector('.nav-user-display');
    const oldLogoutTrigger = siteNav.querySelector('.nav-logout-trigger');

    if (oldLoginTrigger) {
      oldLoginTrigger.remove();
    }

    if (oldUserDisplay) {
      oldUserDisplay.remove();
    }

    if (oldLogoutTrigger) {
      oldLogoutTrigger.remove();
    }

    const storedUser = getStoredUser();
    if (storedUser) {
      const userDisplay = document.createElement('span');
      userDisplay.className = 'nav-user-display';
      userDisplay.textContent = `Hi, ${getDisplayName(storedUser)}`;

      const logoutTrigger = document.createElement('button');
      logoutTrigger.type = 'button';
      logoutTrigger.className = 'nav-logout-trigger';
      logoutTrigger.textContent = 'Logout';

      siteNav.appendChild(userDisplay);
      siteNav.appendChild(logoutTrigger);
      return;
    }

    const loginTrigger = document.createElement('button');
    loginTrigger.type = 'button';
    loginTrigger.className = 'nav-login-trigger';
    loginTrigger.textContent = 'Login';
    siteNav.appendChild(loginTrigger);
  }

  renderNavAuthState();

  if (!document.getElementById('loginModal')) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `
        <div class="login-modal" id="loginModal" aria-hidden="true">
          <div class="login-modal-backdrop" id="loginModalBackdrop"></div>
          <div class="login-modal-panel" role="dialog" aria-modal="true" aria-labelledby="loginModalTitle">
            <button class="login-modal-close" id="loginModalClose" type="button" aria-label="Close login form">&times;</button>
            <h2 id="loginModalTitle">Member Login</h2>
            <div class="login-modal-switcher" role="tablist" aria-label="Account access options">
              <button class="login-modal-tab active" id="loginTab" type="button" data-mode="login">Login</button>
              <button class="login-modal-tab" id="signupTab" type="button" data-mode="signup">Sign Up</button>
            </div>
            <p class="login-modal-copy" id="loginModalCopy">Enter your Gmail, phone number, and password.</p>
            <form class="login-modal-form" id="loginModalForm">
              <label for="loginEmail">Gmail Address</label>
              <input id="loginEmail" name="email" type="email" placeholder="athlete@gmail.com" pattern=".+@gmail\\.com" required>

              <label for="loginPhone">Phone Number</label>
              <input id="loginPhone" name="phone" type="tel" placeholder="0123456789" inputmode="numeric" required>

              <label for="loginPassword">Password</label>
              <input id="loginPassword" name="password" type="password" placeholder="Enter your password" minlength="6" required>

              <button class="btn btn-primary" type="submit">Login</button>
            </form>
            <form class="login-modal-form" id="signupModalForm" hidden>
              <label for="signupName">Full Name</label>
              <input id="signupName" name="name" type="text" placeholder="Enter your full name" required>

              <label for="signupEmail">Gmail Address</label>
              <input id="signupEmail" name="email" type="email" placeholder="athlete@gmail.com" pattern=".+@gmail\\.com" required>

              <label for="signupPhone">Phone Number</label>
              <input id="signupPhone" name="phone" type="tel" placeholder="0123456789" inputmode="numeric" required>

              <label for="signupPassword">Create Password</label>
              <input id="signupPassword" name="password" type="password" placeholder="Create your password" minlength="6" required>

              <button class="btn btn-primary" type="submit">Create Account</button>
            </form>
            <div class="login-modal-alt">
              <span id="loginModalAltText">New here?</span>
              <button id="loginModalAltAction" type="button">Sign Up</button>
            </div>
            <p class="login-modal-note">This is a simple front-end popup for your project layout.</p>
          </div>
        </div>
      `
    );
  }

  const loginModal = document.getElementById('loginModal');
  const loginModalBackdrop = document.getElementById('loginModalBackdrop');
  const loginModalClose = document.getElementById('loginModalClose');
  const loginModalForm = document.getElementById('loginModalForm');
  const signupModalForm = document.getElementById('signupModalForm');
  const loginModalCopy = document.getElementById('loginModalCopy');
  const loginModalTitle = document.getElementById('loginModalTitle');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginModalAltText = document.getElementById('loginModalAltText');
  const loginModalAltAction = document.getElementById('loginModalAltAction');

  function setAuthMode(mode) {
    const isSignup = mode === 'signup';

    if (loginModalTitle) {
      loginModalTitle.textContent = isSignup ? 'Create Account' : 'Member Login';
    }

    if (loginModalCopy) {
      loginModalCopy.textContent = isSignup
        ? 'Use your Gmail, phone number, and password to create an account.'
        : 'Enter your Gmail, phone number, and password.';
    }

    if (loginModalForm) {
      loginModalForm.hidden = isSignup;
    }

    if (signupModalForm) {
      signupModalForm.hidden = !isSignup;
    }

    if (loginTab) {
      loginTab.classList.toggle('active', !isSignup);
    }

    if (signupTab) {
      signupTab.classList.toggle('active', isSignup);
    }

    if (loginModalAltText) {
      loginModalAltText.textContent = isSignup ? 'Already have an account?' : 'New here?';
    }

    if (loginModalAltAction) {
      loginModalAltAction.textContent = isSignup ? 'Login' : 'Sign Up';
    }

    const firstField = document.getElementById(isSignup ? 'signupName' : 'loginEmail');
    if (firstField && loginModal && loginModal.classList.contains('active')) {
      firstField.focus();
    }
  }

  function openLoginModal() {
    if (!loginModal) {
      return;
    }

    setAuthMode('login');
    loginModal.classList.add('active');
    loginModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLoginModal() {
    if (!loginModal) {
      return;
    }

    loginModal.classList.remove('active');
    loginModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  if (siteNav) {
    siteNav.addEventListener('click', function (event) {
      const loginTrigger = event.target.closest('.nav-login-trigger');
      if (loginTrigger) {
        openLoginModal();
        return;
      }

      const logoutTrigger = event.target.closest('.nav-logout-trigger');
      if (logoutTrigger) {
        localStorage.removeItem('eliteAthleteUser');
        renderNavAuthState();
        closeLoginModal();
      }
    });
  }

  if (loginModalBackdrop) {
    loginModalBackdrop.addEventListener('click', closeLoginModal);
  }

  if (loginModalClose) {
    loginModalClose.addEventListener('click', closeLoginModal);
  }

  if (loginTab) {
    loginTab.addEventListener('click', function () {
      setAuthMode('login');
    });
  }

  if (signupTab) {
    signupTab.addEventListener('click', function () {
      setAuthMode('signup');
    });
  }

  if (loginModalAltAction) {
    loginModalAltAction.addEventListener('click', function () {
      const isSignupActive = signupTab && signupTab.classList.contains('active');
      setAuthMode(isSignupActive ? 'login' : 'signup');
    });
  }

  if (loginModalForm) {
    loginModalForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      
      const formData = new FormData(loginModalForm);
      const payload = {
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        password: String(formData.get("password") || "")
      };

      try {
        const signupDraft = getSignupDraft();
        const isSamePerson =
          signupDraft &&
          String(signupDraft.email || '').toLowerCase() === payload.email.toLowerCase() &&
          String(signupDraft.phone || '') === payload.phone;

        if (!isSamePerson) {
          alert('Please signup first before login.');
          return;
        }

        localStorage.setItem('eliteAthleteUser', JSON.stringify({
          name: String(signupDraft.name || 'Athlete'),
          email: payload.email,
          phone: payload.phone,
          createdAt: new Date().toISOString()
        }));
        alert("Login successful!");
        loginModalForm.reset();
        renderNavAuthState();
        closeLoginModal();
        setTimeout(function() {
          window.location.href = "index.html";
        }, 500);
      } catch (error) {
        alert("Error: " + error.message);
      }
    });
  }

  if (signupModalForm) {
    signupModalForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      
      const formData = new FormData(signupModalForm);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        password: String(formData.get("password") || "")
      };

      try {
        // Frontend-only mock signup data (not persisted to a backend).
        localStorage.setItem(
          'eliteAthleteSignupDraft',
          JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone
          })
        );
        alert("Account created successfully! Redirecting to login...");
        signupModalForm.reset();
        closeLoginModal();
        setTimeout(function() {
          window.location.href = "login.html";
        }, 500);
      } catch (error) {
        alert("Error: " + error.message);
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
      closeLoginModal();
    }
  });

  window.addEventListener('storage', function (event) {
    if (event.key === 'eliteAthleteUser') {
      renderNavAuthState();
    }
  });
}

document.addEventListener('DOMContentLoaded', initAuthModal);