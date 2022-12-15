import { REGISTERED_USER_PROFILE_BASE, USER_PROFILE_AVATAR_BASE } from './settings/api';
import { getToken, getUserName } from './utils/storage';

const registeredUserNameContainer = document.querySelectorAll('.registeredUserNameContainer');
const registeredUserEmailContainer = document.getElementById('registeredUserEmailContainer');
const registeredUserAvatarContainer = document.getElementById('registeredUserAvatarContainer');
const registeredUserCreditContainer = document.getElementById('registeredUserCreditContainer');
const registeredUserListedProductsNumberContainer = document.getElementById('registeredUserListedProductsNumberContainer');

// update avatar
const updateAvatar = document.getElementById('updateAvatar');
const registeredUserAvatarBtn = document.getElementById('registeredUserAvatarBtn');
const changeAvatarInput = document.getElementById('changeAvatarInput');
const changeAvatarInputBtn = document.getElementById('changeAvatarInputBtn');
const changeAvatar = document.getElementById('changeAvatar');
const avatar1 = document.getElementById('avatar1');

const generalAvatarMessage = document.getElementById('generalAvatarMessage');

const userName = getUserName();
const accessToken = getToken();

// get user profile details
async function getUserProfileDetails() {
  const profileResponse = await fetch(`${REGISTERED_USER_PROFILE_BASE}/${userName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const profileJson = await profileResponse.json();
  // console.log(profileJson);

  const registeredUserName = profileJson.name;
  const registeredUserEmail = profileJson.email;
  const registeredUserAvatar = profileJson.avatar;
  const registeredUserCredit = profileJson.credits;
  const registeredUserListedProductsNumber = profileJson._count.listings;

  // registeredUserNameContainer.innerHTML = registeredUserName;
  // for (let i = 0; i < registeredUserNameContainer.length; i++) {
  //   registeredUserNameContainer[i].innerHTML = registeredUserName;
  // }
  registeredUserNameContainer.forEach((adminName) => {
    adminName.innerHTML = registeredUserName;
  });
  registeredUserEmailContainer.innerHTML = registeredUserEmail;

  if (registeredUserAvatar) {
    registeredUserAvatarContainer.innerHTML = `<img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src="${registeredUserAvatar}" alt="User avatar" />`;
  } else {
    registeredUserAvatarContainer.innerHTML = `<img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-28.jpg" alt="User avatar is empty" />`;
  }
  registeredUserCreditContainer.innerHTML = registeredUserCredit;
  registeredUserListedProductsNumberContainer.innerHTML = registeredUserListedProductsNumber;
}
getUserProfileDetails();

// update user avatar
updateAvatar.addEventListener('click', () => {
  registeredUserAvatarBtn.classList.add('hidden');
  changeAvatarInput.classList.remove('hidden');
  changeAvatarInputBtn.classList.remove('hidden');
});

changeAvatar.addEventListener('click', () => {
  const newAvatarUrl = {
    avatar: avatar1.value,
  };

  async function changeAvatarImg() {
    const CHANGE_PROFILE_AVATAR_API = `${USER_PROFILE_AVATAR_BASE}/${userName}/media`;

    const changeAvatarResponse = await fetch(CHANGE_PROFILE_AVATAR_API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newAvatarUrl),
    });
    console.log(changeAvatarResponse);

    if (changeAvatarResponse.status === 200) {
      // const changeAvatarJson = await changeAvatarResponse.json();
      console.log('avatar changed');
      generalAvatarMessage.innerHTML = `<div class="rounded-md bg-green-50 p-4">
                                          <div class="flex">
                                            <div class="flex-shrink-0">
                                              <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                              </svg>
                                            </div>
                                            <div class="ml-3">
                                              <h3 class="text-sm font-medium text-green-800">Congratulations!!</h3>
                                              <div class="mt-2 text-sm text-green-700">
                                                <p>Your profile picture will be soon updated</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>`;
    } else {
      const avatarChangeError = await changeAvatarResponse.json();
      console.log(avatarChangeError);
      console.log('avatar not changed');

      generalAvatarMessage.innerHTML = `<div class="rounded-md bg-red-50 p-4">
                                          <div class="flex">
                                            <div class="flex-shrink-0">
                                              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                              </svg>
                                            </div>
                                            <div class="ml-3">
                                              <h3 class="text-sm font-medium text-red-800">Something went wrong: ${avatarChangeError.errors[0].message}</h3>
                                            </div>
                                          </div>
                                        </div>`;
    }

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }
  changeAvatarImg();
}); 
