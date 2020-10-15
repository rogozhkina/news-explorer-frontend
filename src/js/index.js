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
const buttonAuth = document.querySelector('.button_type_registration');

iconMenu.addEventListener('click', () => {
  // overlay.classList.add('overlay_show');
  popupMenu.classList.add('popup_menu_open');
  iconMenu.classList.add('icon_menu_hidden');
});

// iconClose.addEventListener('click', () => {
//   console.log(iconClose);
//   popupMenu.classList.remove('popup_menu_open');
// });

buttonAuth.addEventListener('click', () => {
  console.log(buttonAuth);
  console.log(popupAuth);
  popupAuth.classList.add('popup_authorization_open');
  popupMenu.classList.remove('popup_menu_open');
});
