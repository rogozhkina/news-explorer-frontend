export default class Form {
  constructor(
    inputs,
    submitButton,
    // blockButton,
    text,
    title,
    buttonClass,
    formValidatorCreator,
    additionalClasses,
  ) {
    this._domElement = null;
    this._inputs = inputs;
    // this._blockButton = blockButton;
    this._text = text;
    this._title = title;
    this._buttonClass = buttonClass;
    this._submit = submitButton;
    this._formValidatorCreator = formValidatorCreator;
    this._validator = null;

    if (typeof additionalClasses !== 'object') {
      this._additionalClasses = [];
    }

    this._additionalClasses = additionalClasses;
    this._names = {};
    this._inputs.forEach((input) => {
      const inputName = input.name();
      this._names[inputName] = input;
    });

    this._subscribers = [];
    this._onFormChanged = this._onFormChanged.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  domElement() {
    if (this._domElement == null) {
      this._domElement = this._createForm();
    }
    return this._domElement;
  }

  _createForm() {
    const element = document.createElement('form');

    this._additionalClasses.forEach((className) => {
      element.classList.add(className);
    });

    this._inputs.forEach((input) => {
      input.domElements().forEach((tag) => {
        element.appendChild(tag);
      });
      input.subscribe(this._onFormChanged);
    });

    element.appendChild(this._submit.domElement());
    // this._submit.subscribe(this._onSubmit);

    const templateString = `<div class="blockbutton">
    <p class="blockbutton__text"></p>
    <button type="submit" class="button button_special"></button>
    </div>`;

    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', templateString.trim());
    const blockelement = template.firstElementChild;
    const text = blockelement.querySelector('.registration__text');
    // text.textContent = this._text;

    const button = element.querySelector('.button');
    button.textContent = this._title;
    button.classList.add(this._buttonClass);

    // element.appendChild(this._blockElement.domElement());

    // element.appendChild(this._blockButton.domElement());

    this._validator = this._formValidatorCreator(
      element,
      this._submit,
      this._inputs,
    );
    this._validator.setEventListeners();
    return element;
  }

  _informSubscribers() {
    this._subscribers.forEach((subscriber) => {
      subscriber();
    });
  }

  _onSubmit() {
    this._informSubscribers();
  }

  _onFormChanged() {}

  reset() {
    this._submit.enable(false);
    this._inputs.forEach((input) => {
      input.reset();
    });
  }

  subscribeSubmit(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    this._subscribers.push(callback);
  }
}
