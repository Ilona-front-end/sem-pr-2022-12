import { getUserName, clearStorage } from './utils/storage';

const logOutMobileBtns = document.querySelectorAll('.log-out-mobile-btn');

// show or hide sign out button
const userIsLoggedIn = getUserName();

if (userIsLoggedIn) {
  logOutMobileBtns.forEach((button) => {
    button.classList.remove('hidden');
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
