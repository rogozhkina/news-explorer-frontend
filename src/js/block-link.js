export default class BlockLink {
  constructor(blockClass, linkClass, text, linkTitle, linkURL) {
    // this._word = word;
    this._text = text;
    this._blockClass = blockClass;
    this._linkClass = linkClass;
    this._linkTitle = linkTitle;
    this._linkURL = linkURL;
    if (typeof this._linkURL === 'undefined') {
      this._linkURL = "#";
    }
    this._domElement = null;
    this._subscribers = [];
    this._onClick = this._onClick.bind(this);
  }

  domElement() {
    if (this._domElement == null) {
      this._domElement = this._createBlockLink();
    }
    return this._domElement;
  }

  _createBlockLink() {
    const element = document.createElement('div');
    element.classList.add(this._blockClass);

    const link = document.createElement('a');
    link.classList.add(this._linkClass);
    link.classList.add('link');
    link.textContent = this._linkTitle;
    link.setAttribute("href", this._linkURL);
    link.addEventListener('click', this._onClick);

    element.textContent = this._text;
    element.appendChild(link);
    return element;
  }

  _onClick(event) {
    event.preventDefault();
    this._subscribers.forEach((subscriber) => {
      if (typeof subscriber === 'function') {
        subscriber();
      }
    });
  }

  subscribe(callback) {
    this._subscribers.push(callback);
  }
}
