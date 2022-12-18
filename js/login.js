import { validateEmail } from './utils/email-validation';
import { LOGIN_USER_API } from './settings/api';
import { saveUser, saveToken } from './utils/storage';

const logInAccountForm = document.getElementById('logInAccountForm');
const loginFormError = document.getElementById('login-form-error');
const userEmail = document.getElementById('loginUserEmail');
const userPassword = document.getElementById('loginUserPassword');

logInAccountForm.addEventListener('submit', function (e) {
  e.preventDefault();
  loginFormError.innerHTML = ' ';

  let suitableEmail = false;
  let suitablePassword = false;
  let approveLogInAccountForm = false;

  if (userEmail.value.trim().length > 6 && validateEmail(userEmail.value)) {
    suitableEmail = true;
  } else {
    loginFormError.classList.remove('hidden');
    loginFormError.innerHTML += `<div class="rounded-md bg-red-50 p-4">
                                <div class="flex">
                                  <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                  <div class="ml-3">
                                    <h3 class="text-sm font-medium text-red-800">Required email with stud.noroff.no</h3>
                                  </div>
                                </div>
                              </div>
                              `;
  }

  if (userPassword.value.trim().length > 7) {
    suitablePassword = true;
  } else {
    loginFormError.classList.remove('hidden');
    loginFormError.innerHTML += `<div class="rounded-md bg-red-50 p-4">
                                <div class="flex">
                                  <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                  <div class="ml-3">
                                    <h3 class="text-sm font-medium text-red-800">Please enter a valid password</h3>
                                  </div>
                                </div>
                              </div>
                              `;
  }

  approveLogInAccountForm = suitableEmail && suitablePassword;

  if (approveLogInAccountForm) {
    const user = {
      email: userEmail.value,
      password: userPassword.value,
    };

    (async function logInUser() {
      const response = await fetch(LOGIN_USER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        const responseData = await response.json();

        const userSaveToLocalStorageProfile = {
          name: responseData.name,
          email: responseData.email,
        };

        saveUser(userSaveToLocalStorageProfile);
        saveToken(responseData.accessToken);
        location.reload();
      } else {
        const responseError = await response.json();

        const responseErrorMessage = responseError.errors[0].message;
        throw new Error(responseErrorMessage);
      }
    })().catch((message) => {
      loginFormError.classList.remove('hidden');
      loginFormError.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                    <div class="flex">
                                      <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                        </svg>
                                      </div>
                                      <div class="ml-3">
                                        <h3 class="text-sm font-medium text-yellow-800">Can not log in. Reason might be:</h3>
                                        <div class="mt-2 text-sm text-yellow-600">
                                          <ul role="list" class="list-disc space-y-1 pl-5">
                                            <li>${message}</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  `;
    });
  } else {
    console.log('access not approved');
  }
});
