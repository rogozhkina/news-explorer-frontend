export default class Button {
  constructor(title, additionalClasses, classDisabled) {
    this._title = title;
    this._classDisabled = classDisabled;
    this._additionalClasses = additionalClasses;
    this._domElement = null;
    this._subscribers = [];
    this._onClick = this._onClick.bind(this);
  }

  domElement() {
    if (this._domElement == null) {
      this._domElement = this._createButton();
    }
    console.log(this._domElement);
    return this._domElement;
  }

  _createButton() {
    const templateString = `<button type="submit" class="button">-title-</button>`;
    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', templateString.trim());
    const element = template.firstElementChild;

    this._additionalClasses.forEach((className) => {
      if (className.length > 0) {
        element.classList.add(className);
      }
    });

    element.textContent = this._title;

    element.addEventListener('click', this._onClick);

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

  disable(){
    this.enable(false);
  }

  enable(isEnabled) {
    if (typeof isEnabled === 'undefined') {
      isEnabled = true;
    }

    if (isEnabled) {
      this.domElement().removeAttribute('disabled');

      if (this._classDisabled && this._classDisabled.length > 0) {
        this.domElement().classList.remove(this._classDisabled);
      }
    } else {
      console.log(isEnabled);
      this.domElement().setAttribute('disabled', 'disabled');

      if (this._classDisabled && this._classDisabled.length > 0) {
        this.domElement().classList.add(this._classDisabled);
      }
    }
  }

  rename(title) {
    this._title = title;
    this.domElement().textContent = title;
  }

  subscribe(callback) {
    this._subscribers.push(callback);
  }
}
