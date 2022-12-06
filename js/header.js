// Mobile navigation dropdown menu
const navMenuMobileBtn = document.getElementById('navMenuMobileBtn');
const navMenuMobileSvg = document.getElementById('navMenuMobileSvg');
const navMenuMobileSvgExit = document.getElementById('navMenuMobileSvgExit');
const navMenuDropdown = document.getElementById('navMenuDropdown');

// Desktop profile (navigation) dropdown menu
const navProfileDesktopBtn = document.getElementById('navProfileDesktopBtn');
const navProfileDesktopDropdown = document.getElementById(
  'navProfileDesktopDropdown'
);

// Log in buttons (navigation field) and container
const logInButtons = document.querySelectorAll('.logInBtn');
const logInFormContainer = document.getElementById('logInFormContainer');

// Create account form button (in log in form) and container
const createAccountBtn = document.getElementById('createAccountBtn');
const createAccountFormContainer = document.getElementById(
  'createAccountFormContainer'
);

// Create account form button (in log in form) and container
const goToLogInFormBtn = document.getElementById('goToLogInForm');

// Navigation dropdown menu actions
navMenuMobileBtn.addEventListener('click', () => {
  navMenuMobileSvg.classList.toggle('hidden');
  navMenuMobileSvgExit.classList.toggle('hidden');
  navMenuDropdown.classList.toggle('hidden');
});

navProfileDesktopBtn.addEventListener('click', () => {
  navProfileDesktopDropdown.classList.toggle('hidden');
});

// Insert log in form ( Mobile, Desktop)
logInButtons.forEach((item) => {
  item.addEventListener('click', () => {
    logInFormContainer.classList.toggle('hidden');
  });
});

// Insert create account form from log in form
createAccountBtn.addEventListener('click', () => {
  logInFormContainer.classList.toggle('hidden');
  createAccountFormContainer.classList.toggle('hidden');
});

// Insert log in form from create account form
goToLogInFormBtn.addEventListener('click', () => {
  createAccountFormContainer.classList.toggle('hidden');
  logInFormContainer.classList.toggle('hidden');
});
