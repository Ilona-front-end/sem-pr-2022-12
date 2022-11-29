const menuMobileBtn = document.getElementById('menu-btn-mobile');
const menuMobileSvg = document.getElementById('menu-icon');
const menuMobileSvgExit = document.getElementById('menu-icon-exit');

const menuDropdownInfoMobile = document.getElementById('mobile-menu');

const profileDropdownBtnLg = document.getElementById('profile-dropdown-btn-lg');
const profileDropdownInfoLg = document.getElementById('profile-dropdown-info-lg');

menuMobileBtn.onclick = function () {
  menuMobileSvg.classList.toggle('hidden');
  menuMobileSvgExit.classList.toggle('hidden');

  menuDropdownInfoMobile.classList.toggle('hidden');
}

profileDropdownBtnLg.onclick = function () {
  profileDropdownInfoLg.classList.toggle('hidden');
}