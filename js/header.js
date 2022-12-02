// Mobile navigation dropdown menu
const navMenuMobileBtn = document.getElementById('navMenuMobileBtn');
const navMenuMobileSvg = document.getElementById('navMenuMobileSvg');
const navMenuMobileSvgExit = document.getElementById('navMenuMobileSvgExit');
const navMenuDropdown = document.getElementById('navMenuDropdown');

// Desktop profile dropdown menu
const navProfileDesktopBtn = document.getElementById('navProfileDesktopBtn');
const navProfileDesktopDropdown = document.getElementById('navProfileDesktopDropdown');

// Log in buttons and container
const logInButtons = document.querySelectorAll('.logInBtn');
const logInFormContainer = document.getElementById('logInFormContainer');

// Create account form button and container
const createAccountBtn = document.getElementById('createAccountBtn');
const createAccountFormContainer = document.getElementById('createAccountFormContainer');

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
    logInFormContainer.innerHTML = `
                                      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                                        <div class="fixed inset-0 z-10 overflow-y-auto">
                                          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                              <div class="mb-2">
                                                <div class="mx-auto flex h-12 w-12 items-center justify-center">
                                                  <a href="./index.html">
                                                    <img 
                                                      src="./img/logo.jpg"
                                                      alt="Auction"
                                                    />
                                                  </a>
                                                </div>
                                                <div class="mt-3 text-center sm:mt-5">
                                                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Log in to your account</h3>
                                                </div>
                                                <div class="mt-8">
                                                  <div class="mt-6">
                                                    <form id="logInAccountForm" class="space-y-6">
                                                      <div id="form-error" class="hidden"></div>
                                                      <div class="mt-3">
                                                        <label
                                                          for="userEmail"
                                                          class="block text-sm font-medium text-gray-700"
                                                          >Email address</label
                                                        >
                                                        <div class="mt-1">
                                                          <input
                                                            id="userEmail"
                                                            name="userEmail"
                                                            type="text"
                                                            autocomplete="email"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div class="space-y-1">
                                                        <label
                                                          for="userPassword"
                                                          class="block text-sm font-medium text-gray-700"
                                                          >Password (Minimum 5 digits)</label
                                                        >
                                                        <div class="mt-1">
                                                          <input
                                                            id="userPassword"
                                                            name="userPassword"
                                                            type="password"
                                                            autocomplete="current-password"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div class="flex items-center justify-between">
                                                        <div class="flex items-center">
                                                          <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                          />
                                                          <label
                                                            for="remember-me"
                                                            class="ml-2 block text-sm text-gray-900"
                                                            >Remember me</label
                                                          >
                                                        </div>
                                                        <div class="text-sm">
                                                          <a
                                                            href="#"
                                                            class="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >Forgot your password?</a
                                                          >
                                                        </div>
                                                      </div>
                                                      <div>
                                                        <button
                                                          id="button"
                                                          type="submit"
                                                          class="logInFormSubmit flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                          Sign in
                                                        </button>
                                                      </div>
                                                    </form>
                                                    <div class="inset-0 mt-6" aria-hidden="true">
                                                      <div class="w-full border-t border-gray-300"></div>
                                                    </div>
                                                    <div class="mt-6">
                                                      <button
                                                        type="button"
                                                        id="createAccountBtn"
                                                        class="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                      >
                                                        Create an account
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      `;
  });
});

// Insert create account form
if (createAccountBtn) {
  createAccountBtn.addEventListener('click', () => {
    console.log('hello')
    createAccountFormContainer.innerHTML = `
                                      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                                        <div class="fixed inset-0 z-10 overflow-y-auto">
                                          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                              <div class="mb-2">
                                                <div class="mx-auto flex h-12 w-12 items-center justify-center">
                                                  <a href="./index.html">
                                                    <img 
                                                      src="./img/logo.jpg"
                                                      alt="Auction"
                                                    />
                                                  </a>
                                                </div>
                                                <div class="mt-3 text-center sm:mt-5">
                                                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Create account</h3>
                                                </div>
                                                <div class="mt-8">
                                                  <div class="mt-6">
                                                    <form id="createAccountForm" class="space-y-6">
                                                      <div id="form-error" class="hidden"></div>
                                                      <div class="mt-3">
                                                        <label for="userName" class="block text-sm font-medium text-gray-700">Your name</label>
                                                        <div class="mt-1">
                                                          <input id="userName" name="userName" type="text" autocomplete="text" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                        </div>
                                                      </div>
                                                      <div class="mt-1">
                                                        <label
                                                          for="userEmail"
                                                          class="block text-sm font-medium text-gray-700"
                                                          >Email address</label
                                                        >
                                                        <div class="mt-1">
                                                          <input
                                                            id="userEmail"
                                                            name="userEmail"
                                                            type="text"
                                                            autocomplete="email"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div class="space-y-1">
                                                        <label
                                                          for="userPassword"
                                                          class="block text-sm font-medium text-gray-700"
                                                          >Password (Minimum 5 digits)</label
                                                        >
                                                        <div class="mt-1">
                                                          <input
                                                            id="userPassword"
                                                            name="userPassword"
                                                            type="password"
                                                            autocomplete="current-password"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div class="flex items-center justify-between">
                                                        <div class="flex items-center">
                                                          <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                          />
                                                          <label
                                                            for="remember-me"
                                                            class="ml-2 block text-sm text-gray-900"
                                                            >Remember me</label
                                                          >
                                                        </div>
                                                        <div class="text-sm">
                                                          <a
                                                            href="#"
                                                            class="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >Forgot your password?</a
                                                          >
                                                        </div>
                                                      </div>
                                                      <div>
                                                        <button
                                                          id="button"
                                                          type="submit"
                                                          class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                          Sign in
                                                        </button>
                                                      </div>
                                                    </form>
                                                    <div class="inset-0 mt-6" aria-hidden="true">
                                                      <div class="w-full border-t border-gray-300"></div>
                                                    </div>
                                                    <div class="mt-6">
                                                      <button
                                                        type="button"
                                                        id="createAccountBtn"
                                                        class="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                      >
                                                        Create an account
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      `;
  });
}

// createAccountBtn.addEventListener('click', () => {
//   createAccountFormContainer.innerHTML = `
//                                       <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                                         <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
//                                         <div class="fixed inset-0 z-10 overflow-y-auto">
//                                           <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                                             <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
//                                               <div class="mb-2">
//                                                 <div class="mx-auto flex h-12 w-12 items-center justify-center">
//                                                   <a href="./index.html">
//                                                     <img 
//                                                       src="./img/logo.jpg"
//                                                       alt="Auction"
//                                                     />
//                                                   </a>
//                                                 </div>
//                                                 <div class="mt-3 text-center sm:mt-5">
//                                                   <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Create account</h3>
//                                                 </div>
//                                                 <div class="mt-8">
//                                                   <div class="mt-6">
//                                                     <form id="createAccountForm" class="space-y-6">
//                                                       <div id="form-error" class="hidden"></div>
//                                                       <div class="mt-3">
//                                                         <label for="userName" class="block text-sm font-medium text-gray-700">Your name</label>
//                                                         <div class="mt-1">
//                                                           <input id="userName" name="userName" type="text" autocomplete="text" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
//                                                         </div>
//                                                       </div>
//                                                       <div class="mt-1">
//                                                         <label
//                                                           for="userEmail"
//                                                           class="block text-sm font-medium text-gray-700"
//                                                           >Email address</label
//                                                         >
//                                                         <div class="mt-1">
//                                                           <input
//                                                             id="userEmail"
//                                                             name="userEmail"
//                                                             type="text"
//                                                             autocomplete="email"
//                                                             class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                                                           />
//                                                         </div>
//                                                       </div>
//                                                       <div class="space-y-1">
//                                                         <label
//                                                           for="userPassword"
//                                                           class="block text-sm font-medium text-gray-700"
//                                                           >Password (Minimum 5 digits)</label
//                                                         >
//                                                         <div class="mt-1">
//                                                           <input
//                                                             id="userPassword"
//                                                             name="userPassword"
//                                                             type="password"
//                                                             autocomplete="current-password"
//                                                             class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                                                           />
//                                                         </div>
//                                                       </div>
//                                                       <div class="flex items-center justify-between">
//                                                         <div class="flex items-center">
//                                                           <input
//                                                             id="remember-me"
//                                                             name="remember-me"
//                                                             type="checkbox"
//                                                             class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                           />
//                                                           <label
//                                                             for="remember-me"
//                                                             class="ml-2 block text-sm text-gray-900"
//                                                             >Remember me</label
//                                                           >
//                                                         </div>
//                                                         <div class="text-sm">
//                                                           <a
//                                                             href="#"
//                                                             class="font-medium text-indigo-600 hover:text-indigo-500"
//                                                             >Forgot your password?</a
//                                                           >
//                                                         </div>
//                                                       </div>
//                                                       <div>
//                                                         <button
//                                                           id="button"
//                                                           type="submit"
//                                                           class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                                         >
//                                                           Sign in
//                                                         </button>
//                                                       </div>
//                                                     </form>
//                                                     <div class="inset-0 mt-6" aria-hidden="true">
//                                                       <div class="w-full border-t border-gray-300"></div>
//                                                     </div>
//                                                     <div class="mt-6">
//                                                       <button
//                                                         type="button"
//                                                         id="createAccountBtn"
//                                                         class="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                                       >
//                                                         Create an account
//                                                       </button>
//                                                     </div>
//                                                   </div>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                       `;
// });
