// # stopped because do not have access token, nedd to add registration form

import { validateEmail } from './email-validation';

const logInAccountForm = document.getElementById('logInAccountForm');
const formError = document.getElementById('form-error');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');

// function submitForm(e) {
//   e.preventDefault();
//   formError.innerHTML = '';

//   let suitableEmail = false;
//   let suitablePassword = false;
//   let approveLogInAccountForm = false;

//   if (userEmail.value.trim().length > 6 && validateEmail(userEmail.value)) {
//     suitableEmail = true;
//   } else {
//     formError.classList.remove('hidden');
//     formError.innerHTML += `<div class="rounded-md bg-red-50 p-4">
//                                 <div class="flex">
//                                   <div class="flex-shrink-0">
//                                     <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
//                                     </svg>
//                                   </div>
//                                   <div class="ml-3">
//                                     <h3 class="text-sm font-medium text-red-800">Required email with noroff.no/stud.noroff.no</h3>
//                                   </div>
//                                 </div>
//                               </div>
//                               `;
//   }

//   if (userPassword.value.trim().length > 4) {
//     suitablePassword = true;
//   } else {
//     formError.classList.remove('hidden');
//     formError.innerHTML += `<div class="rounded-md bg-red-50 p-4">
//                                 <div class="flex">
//                                   <div class="flex-shrink-0">
//                                     <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
//                                     </svg>
//                                   </div>
//                                   <div class="ml-3">
//                                     <h3 class="text-sm font-medium text-red-800">Please enter a valid password</h3>
//                                   </div>
//                                 </div>
//                               </div>
//                               `;
//   }

//   approveLogInAccountForm = suitableEmail && suitablePassword;

//   if (approveLogInAccountForm) {
//     const user = {
//       email: userEmail.value,
//       password: userPassword.value,
//     };
//   }
// }

// logInAccountForm.addEventListener('submit', submitForm);
