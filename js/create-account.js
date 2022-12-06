import { validateEmail } from './utils/email-validation';
import { REGISTER_USER_API } from './settings/api';

const createAccountForm = document.getElementById('createAccountForm');
const createAccountFormError = document.getElementById(
  'create-account-form-error'
);
const createAccountFormUserName = document.getElementById(
  'createAccountFormUserName'
);
const createAccountFormUserEmail = document.getElementById(
  'createAccountFormUserEmail'
);
const createAccountFormUserPassword = document.getElementById(
  'createAccountFormUserPassword'
);
const createAccountSuccessMsg = document.getElementById('success-message');
const createAccountFormContainerDiv = document.getElementById('createAccountFormContainerDiv');

createAccountForm.addEventListener('submit', function (e) {
  e.preventDefault();
  createAccountFormError.innerHTML = ' ';

  let suitableName = false;
  let suitableEmail = false;
  let suitablePassword = false;
  let approveCreateAccountForm = false;

  if (createAccountFormUserName.value.trim().length > 0) {
    suitableName = true;
  } else {
    createAccountFormError.classList.remove('hidden');
    createAccountFormError.innerHTML += `<div class="rounded-md bg-red-50 p-4">
                                <div class="flex">
                                  <div class="flex-shrink-0">
                                    <!-- Heroicon name: mini/x-circle -->
                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                  <div class="ml-3">
                                    <h3 class="text-sm font-medium text-red-800">Missing user name</h3>
                                  </div>
                                </div>
                              </div>
                              `;
  }

  if (
    createAccountFormUserEmail.value.trim().length > 6 &&
    validateEmail(createAccountFormUserEmail.value)
  ) {
    suitableEmail = true;
  } else {
    createAccountFormError.classList.remove('hidden');
    createAccountFormError.innerHTML += `<div class="rounded-md bg-red-50 p-4">
                                <div class="flex">
                                  <div class="flex-shrink-0">
                                    <!-- Heroicon name: mini/x-circle -->
                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                  <div class="ml-3">
                                    <h3 class="text-sm font-medium text-red-800">Required email with noroff.no/stud.noroff.no</h3>
                                  </div>
                                </div>
                              </div>
                              `;
  }

  if (createAccountFormUserPassword.value.trim().length >= 8) {
    suitablePassword = true;
  } else {
    createAccountFormError.classList.remove('hidden');
    createAccountFormError.innerHTML += `<div class="rounded-md bg-red-50 p-4">
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

  approveCreateAccountForm = suitableName && suitableEmail && suitablePassword;

  if (approveCreateAccountForm) {
    const createUserInfo = {
      name: createAccountFormUserName.value,
      email: createAccountFormUserEmail.value,
      password: createAccountFormUserPassword.value,
    };

    // console.log(createUserInfo);

    (async function registerUser() {
      const response = await fetch(REGISTER_USER_API, {
        method: 'POST',
        body: JSON.stringify(createUserInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // const data = await response.json();
      // console.log(data);

      if (response.status === 201) {
        console.log('user created');
        // location.replace('/index.html');
        createAccountForm.classList.add('hidden');
        navMenuDropdown.classList.add('hidden');
        navMenuMobileSvgExit.classList.add('hidden');
        navMenuMobileSvg.classList.remove('hidden');
        createAccountFormContainerDiv.classList.add('hidden');

        createAccountSuccessMsg.classList.remove('hidden');
        createAccountSuccessMsg.innerHTML = `<div class="rounded-md bg-green-50 p-4">
                                              <div class="flex">
                                                <div class="flex-shrink-0">
                                                  <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                                  </svg>
                                                </div>
                                                <div class="ml-3">
                                                  <h3 class="text-sm font-medium text-green-800">Congratulations!!</h3>
                                                  <div class="mt-2 text-sm text-green-700">
                                                    <p>You have successfully created your new account. Go to log in to start sharing products and start bidding</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>`;
      } else if (response.status === 400) {
        createAccountFormError.classList.remove('hidden');
        createAccountFormError.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                                <div class="flex">
                                                  <div class="flex-shrink-0">
                                                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                      <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                                    </svg>
                                                  </div>
                                                  <div class="ml-3">
                                                    <p class="text-sm text-yellow-700">
                                                      You already have an account
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>`;
      } else if (response.status === 409) {
        createAccountFormError.classList.remove('hidden');
        createAccountFormError.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                                <div class="flex">
                                                  <div class="flex-shrink-0">
                                                    <!-- Heroicon name: mini/exclamation-triangle -->
                                                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                      <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                                    </svg>
                                                  </div>
                                                  <div class="ml-3">
                                                    <p class="text-sm text-yellow-700">
                                                      You have been trying to log in too many times.
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>`;
      } else if (response.status === 500) {
        createAccountFormError.classList.remove('hidden');
        createAccountFormError.innerHTML = `<div class="rounded-md bg-red-50 p-4">
                                                <div class="flex">
                                                  <div class="flex-shrink-0">
                                                    <!-- Heroicon name: mini/x-circle -->
                                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                                    </svg>
                                                  </div>
                                                  <div class="ml-3">
                                                    <h3 class="text-sm font-medium text-red-800">This email is already in use</h3>
                                                  </div>
                                                </div>
                                              </div>`;
      } else {
        createAccountFormError.classList.remove('hidden');
        createAccountFormError.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                                <div class="flex">
                                                  <div class="flex-shrink-0">
                                                    <!-- Heroicon name: mini/exclamation-triangle -->
                                                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                      <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                                    </svg>
                                                  </div>
                                                  <div class="ml-3">
                                                    <p class="text-sm text-yellow-700">
                                                      Something went wrong. Please try again later.
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>`;
      }
    })();
  }
});

//   const response = await fetch(REGISTER_USER_API, {
//     method: 'POST',
//     header: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(createUserInfo),
//   });
//   const data = await response.json();

//   if (response.status === 201) {
//     console.log('user created');
//   } else if (response.status === 400) {
//     createAccountFormError.classList.remove('hidden');
//     createAccountFormError.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
//                                                 <div class="flex">
//                                                   <div class="flex-shrink-0">
//                                                     <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                                       <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
//                                                     </svg>
//                                                   </div>
//                                                   <div class="ml-3">
//                                                     <p class="text-sm text-yellow-700">
//                                                       You already have an account
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>`;
//   } else if (response.status === 409) {
//     createAccountFormError.classList.remove('hidden');
//     createAccountFormError.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
//                                                 <div class="flex">
//                                                   <div class="flex-shrink-0">
//                                                     <!-- Heroicon name: mini/exclamation-triangle -->
//                                                     <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                                       <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
//                                                     </svg>
//                                                   </div>
//                                                   <div class="ml-3">
//                                                     <p class="text-sm text-yellow-700">
//                                                       You have been trying to log in too many times.
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>`;
//   } else if (response.status === 500) {
//     createAccountFormError.classList.remove('hidden');
//     createAccountFormError.innerHTML = `<div class="rounded-md bg-red-50 p-4">
//                                                 <div class="flex">
//                                                   <div class="flex-shrink-0">
//                                                     <!-- Heroicon name: mini/x-circle -->
//                                                     <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                                       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
//                                                     </svg>
//                                                   </div>
//                                                   <div class="ml-3">
//                                                     <h3 class="text-sm font-medium text-red-800">This email is already in use</h3>
//                                                   </div>
//                                                 </div>
//                                               </div>`;
//   } else {
//     createAccountFormError.classList.remove('hidden');
//     createAccountFormError.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
//                                                 <div class="flex">
//                                                   <div class="flex-shrink-0">
//                                                     <!-- Heroicon name: mini/exclamation-triangle -->
//                                                     <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                                       <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
//                                                     </svg>
//                                                   </div>
//                                                   <div class="ml-3">
//                                                     <p class="text-sm text-yellow-700">
//                                                       Something went wrong. Please try again later.
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>`;
//   }
// })();
