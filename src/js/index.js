import '../css/index.css';

// const button = document.querySelector('.button__search');

// console.log(button);

// button.addEventListener('click', () => {
//   button.classList.add('button_invisible');
// });

const popupMenu = document.querySelector('.popup_menu');
const iconMenu = document.querySelector('.icon_menu');
const overlay = document.querySelector('.overlay');

iconMenu.addEventListener('click', () => {
  // overlay.classList.add('overlay_show');
  popupMenu.classList.add('popup_menu_open');
  iconMenu.classList.add('icon_menu_hidden');
});
