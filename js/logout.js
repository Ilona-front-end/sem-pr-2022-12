import { getUserName, clearStorage } from './utils/storage';

const logOutMobileBtns = document.querySelectorAll('.log-out-mobile-btn');
const logInBtns = document.querySelectorAll('.logInBtn');

const userIsLoggedIn = getUserName();

if (userIsLoggedIn) {
  // show or hide sign out buttons
  logOutMobileBtns.forEach((button) => {
    button.classList.remove('hidden');
  });

  // show or hide log in buttons
  logInBtns.forEach((btn) => {
    btn.classList.add('invisible');
  });
  console.log('user is logged in');
} else {
  console.log('user is logged out');
}

// log out user by clearing local storage
for (let i = 0; i < logOutMobileBtns.length; i++) {
  logOutMobileBtns[i].addEventListener('click', () => {
    clearStorage();
    location.reload();
  });
}
