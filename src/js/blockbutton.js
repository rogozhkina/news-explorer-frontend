export default class BlockButton {
  constructor(text, title, additionalClass) {
    // this._word = word;
    this._text = text;
    // this._blockClass = blockClass;
    // this._linkClass = linkClass;
    this._title = title;
    // this._linkURL = linkURL;
    // if (typeof this._linkURL === 'undefined') {
    //   this._linkURL = "#";
    // }
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



    // element.classList.add('registration');

    // const link = document.createElement('a');
    // link.classList.add(this._linkClass);
    // link.classList.add('link');
    // link.textContent = this._linkTitle;
    // link.setAttribute("href", this._linkURL);
    // link.addEventListener('click', this._onClick);

    // element.textContent = this._text;
    // element.appendChild(this._linkButton);
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
