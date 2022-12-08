function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveUser(user) {
  saveToStorage('user', user);
}

function saveToken(token) {
  saveToStorage('token', token);
}

// function which gets data from the local storage
function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value); // convert to JS
  } else {
    return []
  }
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

const userKey = 'user';

function getUserName() {
  const user = getFromStorage(userKey);
  if (userKey) {
    return user.name
  } else {
    return null;
  }
}

function clearStorage() {
  localStorage.clear();
}

export { saveUser, saveToken, getToken, getUserName, clearStorage };
