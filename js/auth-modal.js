function initAuthModal() {
  const siteNav = document.querySelector('.site-nav');

  if (siteNav && !siteNav.querySelector('.nav-login-trigger')) {
    const loginTrigger = document.createElement('button');
    loginTrigger.type = 'button';
    loginTrigger.className = 'nav-login-trigger';
    loginTrigger.textContent = 'Login';
    siteNav.appendChild(loginTrigger);
  }

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

  const loginTrigger = document.querySelector('.nav-login-trigger');
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

  if (loginTrigger) {
    loginTrigger.addEventListener('click', openLoginModal);
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
    loginModalForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Login submitted. Connect this form to your backend when you are ready.');
      loginModalForm.reset();
      closeLoginModal();
    });
  }

  if (signupModalForm) {
    signupModalForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Sign up submitted. Connect this form to your backend when you are ready.');
      signupModalForm.reset();
      closeLoginModal();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
      closeLoginModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', initAuthModal);