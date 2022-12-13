import { REGISTERED_USER_PROFILE_BASE, USER_PROFILE_AVATAR_BASE } from './settings/api';
import { getToken, getUserName } from './utils/storage';

const registeredUserNameContainer = document.getElementById('registeredUserNameContainer');
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

  registeredUserNameContainer.innerHTML = registeredUserName;
  registeredUserEmailContainer.innerHTML = registeredUserEmail;
  // registeredUserAvatarContainer.innerHTML = `<img class="h-20 w-20 rounded-full lg:h-24 lg:w-24" src="${registeredUserAvatar}" alt="User avatar" />`;
  registeredUserAvatarContainer.innerHTML = `<img class="h-40 w-40 rounded-full xl:h-56 xl:w-56" src="${registeredUserAvatar}" alt="User avatar" />`;
  registeredUserCreditContainer.innerHTML = registeredUserCredit;
  registeredUserListedProductsNumberContainer.innerHTML = registeredUserListedProductsNumber;
}
getUserProfileDetails();

// update user avatar
updateAvatar.addEventListener('click', () => {
  registeredUserAvatarContainer.classList.add('hidden');
  registeredUserAvatarBtn.classList.add('hidden');
  changeAvatarInput.classList.remove('hidden');
  changeAvatarInputBtn.classList.remove('hidden');
});

changeAvatar.addEventListener('click', () => {
  let suitableAvatarUrl = false;

  if (avatar1.value.trim().length > 5) {
    suitableAvatarUrl = true;
  }

  let newAvatarUrl = {};
  if (suitableAvatarUrl) {
    newAvatarUrl = {
      avatar: avatar1.value,
    };
  }

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
                                                <p>You have successfully updated your profile picture</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>`;
    } else {
      const avatarChangeError = await changeAvatarResponse.json();
      console.log(avatarChangeError);
    }

    // location.reload();
  }
  changeAvatarImg();
}); 
