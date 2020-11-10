
class Card {
  constructor(cardData) {
    this._domElement = null;
    this._cardData = cardData;
    this._likeButton = null;
    this._largeImageSubscribers = [];
    this._removeSubscribers = [];
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this._onImageClick = this._onImageClick.bind(this);
  }

  _createCard() {
    const templateString = `
    <div class='article-card'>
      <div class='article-card__image-section'>
        <div class='article-card__image'>
          <div class='popup_icon'></div>
          <button class='article-card__icon article-card__icon_special'></button>
        </div>
      </div>
      <p class='article-card__date'></p>
      <h2 class='article-card__title'></h2>
      <p class='article-card__text'></p>
      <p class='article-card__source'></p>
    </div>`;

    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', templateString.trim());

    const placeCard = template.firstElementChild;
    placeCard.querySelector(
      '.article-card__title'
    ).textContent = this._cardData.title;

    const cardImage = placeCard.querySelector('.article-card__image');
    cardImage.style.backgroundImage = `url(${this._cardData.urlToImage})`;

    cardImage.addEventListener('click', this._onImageClick);

    this._likeButton = placeCard.querySelector('.article-card__icon');
    this._likeButton.addEventListener('click', this.like);

    this._deleteButton = placeCard.querySelector('.place-card__delete-icon');
    this._deleteButton.addEventListener('click', this.remove);

    return placeCard;
  }

  domElement() {
    if (null == this._domElement) {
      this._domElement = this._createCard();
    }
    return this._domElement;
  }

  like() {
    this._likeButton.classList.toggle('article-card__icon_special');
  }

  remove(event) {
    event.stopImmediatePropagation();
    this.removeListeners();
    this._domElement.remove();

    this._removeSubscribers.forEach((subscrieber) => {
      subscrieber(this);
    });
  }

  removeListeners() {
    this._deleteButton.removeEventListener('click', this.remove);
    this._likeButton.removeEventListener('click', this.like);

    const cardImage = this._domElement.querySelector('.place-card__image');
    cardImage.style.backgroundImage = `url(${this._cardData.link})`;
    cardImage.removeEventListener('click', this._onImageClick);
  }

  subscribeLargeImageClick(callback) {
    if (typeof callback !== 'function') {
      return;
    }

    this._largeImageSubscribers.push(callback);
  }

  subscribeRemove(callback) {
    if (typeof callback !== 'function') {
      return;
    }

    this._removeSubscribers.push(callback);
  }
}

export { Card };
