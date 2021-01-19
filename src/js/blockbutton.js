export default class BlockButton {
  constructor(text, title, additionalClass) {
    this._text = text;
    this._title = title;
    this._domElement = null;
    this._subscribers = [];
    this._onClick = this._onClick.bind(this);
    this._additionalClass = additionalClass;
  }

  domElement() {
    if (this._domElement == null) {
      this._domElement = this._createBlockButton();
    }
    return this._domElement;
  }

  _createBlockButton() {
    const templateString = `<div class="registration">
    <p class="registration__text"></p>
    <button type="submit" class="button button_special"></button>
  </div>`;
    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', templateString.trim());
    const element = template.firstElementChild;

    const text = element.querySelector('.registration__text');
    text.textContent = this._text;

    const button = element.querySelector('.button');
    button.textContent = this._title;
    button.classList.add(this._additionalClass);

    element.addEventListener('click', this._onClick);
    return element;
  }

  _onClick(event) {
    event.preventDefault();
    this._subscribers.forEach((subscriber) => {
      subscriber();
    });
  }

  subscribeClick(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    this._subscribers.push(callback);
  }
}
