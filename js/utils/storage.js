function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveUser(user) {
  saveToStorage('user', user);
}

function saveToken(token) {
  saveToStorage('token', token);
}

export { saveUser, saveToken };
