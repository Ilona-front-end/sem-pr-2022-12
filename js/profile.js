import { REGISTERED_USER_PROFILE_BASE } from './settings/api';
import { getToken, getUserName } from './utils/storage';

const registeredUserNameContainer = document.getElementById('registeredUserNameContainer');
const registeredUserEmailContainer = document.getElementById('registeredUserEmailContainer');
const registeredUserAvatarContainer = document.getElementById('registeredUserAvatarContainer');
const registeredUserCreditContainer = document.getElementById('registeredUserCreditContainer');
const registeredUserListedProductsNumberContainer = document.getElementById('registeredUserListedProductsNumberContainer');

const userName = getUserName();
const accessToken = getToken();
async function getUserProfileDetails() {
  const profileResponse = await fetch(`${REGISTERED_USER_PROFILE_BASE}/${userName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const profileJson = await profileResponse.json();
  console.log(profileJson);

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
