import '../css/index.css';

// const button = document.querySelector('.button__search');

// console.log(button);

// button.addEventListener('click', () => {
//   button.classList.add('button_invisible');
// });

const popupMenu = document.querySelector('.popup_menu');
const popupAuth = document.querySelector('.popup_authorization');
const iconMenu = document.querySelector('.icon_menu');
const overlay = document.querySelector('.overlay');
const iconClose = document.querySelector('.popup__icon');
const buttonAuthPopup = document.querySelector('.button_type_authorization_popup');
const iconFlags = document.querySelectorAll('.article-card__icon');
const buttonAuthMenu = document.querySelector('.button_type_authorization_menu');
const buttonSearch = document.querySelector('.button_type_search');
const iconFlag = document.querySelector('.article-card__icon_special');
const popupIcon = document.querySelector('.popup_icon');
const preloader = document.querySelector('.preloader');

iconMenu.addEventListener('click', () => {
  // overlay.classList.add('overlay_show');
  popupMenu.classList.add('popup_menu_open');
  iconMenu.classList.add('icon_menu_hidden');
});

// iconClose.addEventListener('click', () => {
//   console.log(iconClose);
//   popupMenu.classList.remove('popup_menu_open');
// });

buttonAuthPopup.addEventListener('click', () => {
  popupAuth.classList.add('popup_authorization_open');
  popupMenu.classList.remove('popup_menu_open');
});

buttonAuthMenu.addEventListener('click', () => {
  popupAuth.classList.add('popup_authorization_open');
});

iconFlags.forEach((element) => {
  element.addEventListener('click', () => {
    element.classList.add('article-card__icon_active');
  });
});

iconFlag.addEventListener('click', () => {
  popupIcon.classList.add('popup_icon_show');
  iconFlag.classList.add('article-card__icon_attention');
});

buttonSearch.addEventListener('click', () => {
  preloader.classList.add('preloader_active');
});
