function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveUser(user) {
  saveToStorage('user', user);
}

function saveToken(token) {
  saveToStorage('token', token);
}

const tokenKey = 'token';

function getToken() {
  const value = localStorage.getItem(tokenKey);
  if (value) {
    return JSON.parse(value); // convert to JS
  } else {
    return null;
  }
}

export { saveUser, saveToken, getToken };
