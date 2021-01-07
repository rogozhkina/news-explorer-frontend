export default class NewsCard {
  constructor(cardData) {
    this._domElement = null;
    this._cardData = cardData;
    this._saveButton = null;
    this._deleteButton = null;
    this._removeSubscribers = [];
    this._saveSubscribers = [];
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  _createNewsCard() {
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

    const card = template.firstElementChild;

    card.querySelector('.article-card__title').textContent = this._cardData.title;
    card.querySelector('.article-card__date').textContent = this._cardData.date;
    card.querySelector('.article-card__text').textContent = this._cardData.text;
    card.querySelector('.article-card__source').textContent = this._cardData.source;

    const cardImage = card.querySelector('.article-card__image');

    cardImage.style.backgroundImage = `url(${this._cardData.urlToImage})`;

    // card.addEventListener('click', this._onImageClick);

    this._saveButton = card.querySelector('.article-card__icon');
    this._saveButton.addEventListener('click', this.save);

    this._deleteButton = card.querySelector('.article-card__delete-icon');
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', this.remove);
    }

    return card;
  }

  export(){
    return this._cardData;
  }

  domElement() {
    if (this._domElement == null) {
      this._domElement = this._createNewsCard();
    }
    return this._domElement;
  }

  save() {
    this._saveButton.classList.toggle('article-card__icon_saved');
    if(this._saveButton.classList.contains('article-card__icon_saved')){
      // сохранили
      this._saveSubscribers.forEach((subscriber) => {
        subscriber(this);
      });
    } else {
      //удалили
      this._removeSubscribers.forEach((subscriber) => {
        subscriber(this);
      });
    }
  }

  remove(event) {
    event.stopImmediatePropagation();
    this.removeListeners();
    this._domElement.remove();

    this._removeSubscribers.forEach((subscriber) => {
      subscriber(this);
    });
  }

  removeListeners() {
    if (this._deleteButton) {
      this._deleteButton.removeEventListener('click', this.remove);
    }
    this._saveButton.removeEventListener('click', this.save);

    // const cardImage = this._domElement.querySelector('.place-card__image');
    // cardImage.style.backgroundImage = `url(${this._cardData.link})`;
    // cardImage.removeEventListener('click', this._onImageClick);
  }

  subscribeRemove(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    this._removeSubscribers.push(callback);
  }

  subscribeSave(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    this._saveSubscribers.push(callback);
  }
}
