import '../css/index.css';

const popupMenu = document.querySelector('.popup_menu');
const popupAuth = document.querySelector('.popup_authorization');
const iconMenu = document.querySelector('.icon_menu');
const buttonAuthPopup = document.querySelector('.button_type_authorization_popup');
const iconFlags = document.querySelectorAll('.article-card__icon');
const buttonAuthMenu = document.querySelector('.button_type_authorization_menu');
const buttonSearch = document.querySelector('.button_type_search');
const iconFlag = document.querySelector('.article-card__icon_special');
const popupIcon = document.querySelector('.popup_icon');
const preloader = document.querySelector('.preloader');

iconMenu.addEventListener('click', () => {
  popupMenu.classList.add('popup_menu_open');
  iconMenu.classList.add('icon_menu_hidden');
});

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

class Card {
  constructor(cardData) {
    this._domElement = null;
    this._cardData = cardData;
    this._likeButton = null;
    this.like = this.like.bind(this);
  }

  _createCard() {
    const templateString = `

    </div>

<div class="article-card">
            <div class="article-card__image-section">
              <div class="article-card__image">
                <div class="popup_icon"></div>
                <button
                  class="article-card__icon article-card__icon_special"
                ></button>
              </div>
            </div>
            <p class="article-card__date"></p>
            <h2 class="article-card__title"></h2>
            <p class="article-card__text">
            </p>
            <p class="article-card__source"></p>
</div>`;

    const template = document.createElement("div");
    template.insertAdjacentHTML("beforeend", templateString.trim());

    const placeCard = template.firstElementChild;
    placeCard.querySelector(
      ".article-card__title"
    ).textContent = this._cardData.title;

    const cardImage = placeCard.querySelector(".article-card__image");
    cardImage.style.backgroundImage = `url(${this._cardData.urlToImage})`;


    this._likeButton = placeCard.querySelector(".article-card__icon");
    this._likeButton.addEventListener("click", this.like);

    return placeCard;
  }

  domElement() {
    if (null == this._domElement) {
      this._domElement = this._createCard();
    }
    return this._domElement;
  }

  like() {
    this._likeButton.classList.toggle("article-card__icon_special");
  }

}
