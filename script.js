// elements we need from the page
const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const rememberBox = document.getElementById('remember');
const toggleButton = document.getElementById('togglePassword');
const formMessage = document.getElementById('formMessage');
const forgotLink = document.getElementById('forgotLink');
const socialButtons = document.querySelectorAll('.btn-social');

const SAVED_USER_KEY = 'savedUsername';

// remember me
function loadSavedUsername() {
  try {
    const saved = localStorage.getItem(SAVED_USER_KEY);
    if (saved) {
      usernameInput.value = saved;
      rememberBox.checked = true;
    }
  } catch (error) {
  }
}

function handleRemember() {
  try {
    if (rememberBox.checked) {
      localStorage.setItem(SAVED_USER_KEY, usernameInput.value.trim());
    } else {
      localStorage.removeItem(SAVED_USER_KEY);
    }
  } catch (error) {
  }
}

// validation functions
function showError(input, errorElement, message) {
  input.classList.add('invalid');
  errorElement.textContent = message;
}

function clearError(input, errorElement) {
  input.classList.remove('invalid');
  errorElement.textContent = '';
}

function validateUsername() {
  const value = usernameInput.value.trim();

  if (value === '') {
    showError(usernameInput, usernameError, 'Please enter your username.');
    return false;
  }
  if (value.length < 3) {
    showError(usernameInput, usernameError, 'Username must be at least 3 characters.');
    return false;
  }
  if (/\s/.test(value)) {
    showError(usernameInput, usernameError, 'Username cannot contain spaces.');
    return false;
  }

  clearError(usernameInput, usernameError);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;

  if (value === '') {
    showError(passwordInput, passwordError, 'Please enter your password.');
    return false;
  }
  if (value.length < 8) {
    showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
    return false;
  }
  if (!/\d/.test(value)) {
    showError(passwordInput, passwordError, 'Password must include at least one number.');
    return false;
  }

  clearError(passwordInput, passwordError);
  return true;
}
// event listeners

usernameInput.addEventListener('blur', validateUsername);
passwordInput.addEventListener('blur', validatePassword);

usernameInput.addEventListener('input', () => {
  if (usernameInput.classList.contains('invalid')) validateUsername();
});
passwordInput.addEventListener('input', () => {
  if (passwordInput.classList.contains('invalid')) validatePassword();
});

toggleButton.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  toggleButton.textContent = isHidden ? 'Hide' : 'Show';
  toggleButton.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = '';

    const usernameOk = validateUsername();
    const passwordOk = validatePassword();

  if (!usernameOk || !passwordOk) {
    return;
  }

  handleRemember();

  formMessage.textContent = 'Login successful. Welcome, ' + usernameInput.value.trim() + '!';
});

forgotLink.addEventListener('click', (event) => {
  event.preventDefault();
  formMessage.textContent = 'try again for password reset.';
});

socialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    formMessage.textContent = button.dataset.provider + ' try again for access.';
  });
});

// runs once when the page loads
loadSavedUsername();