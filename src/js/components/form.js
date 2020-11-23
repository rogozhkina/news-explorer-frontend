export default class Form {
  constructor(
    inputs,
    submitButton,
    text,
    title,
    buttonClass,
    formValidatorCreator,
    additionalClasses,
  ) {
    this._domElement = null;
    this._inputs = inputs;
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
    this._subscribersBlockButton = [];
    this._onFormChanged = this._onFormChanged.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onClickBlockButton = this._onClickBlockButton.bind(this);
  }

  domElement() {
    if (this._domElement == null) {
      this._domElement = this._createForm();
    }
    return this._domElement;
  }

  _createForm() {
    const formElement = document.createElement('form');
    this._additionalClasses.forEach((className) => {
      formElement.classList.add(className);
    });

    const formTitleElement = document.createElement("span");
    formTitleElement.classList.add("popup__label");
    formElement.appendChild(formTitleElement);
    this._inputs.forEach((input) => {
      input.domElements().forEach((tag) => {
        formElement.appendChild(tag);
      });
      input.subscribe(this._onFormChanged);
    });
    formElement.appendChild(this._submit.domElement());
    this._submit.subscribe(this._onSubmit);

    const templateString = `<div class="blockbutton">
    <p class="blockbutton__text"></p>
    <button type="submit" class="button button_special"></button>
    </div>`;

    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', templateString.trim());
    const blockButtonElement = template.firstElementChild;
    const textElement = blockButtonElement.querySelector('.blockbutton__text');
    textElement.textContent = this._text;

    const blockButtonActionElement = blockButtonElement.querySelector('.button_special');
    blockButtonActionElement.textContent = this._title;
    blockButtonActionElement.classList.add(this._buttonClass);

    blockButtonActionElement.addEventListener('click', this._onClickBlockButton);



    formElement.appendChild(blockButtonElement);

    this._validator = this._formValidatorCreator(
      formElement,
      this._submit,
      this._inputs,
    );
    this._validator.setEventListeners();
    return formElement;
  }

  _onClickBlockButton(event) {
    event.preventDefault();
    this._subscribersBlockButton.forEach((f) => {
      if (typeof f === 'function') { f(); }
    });
  }

  subscribeBlockButton(callback) {
    this._subscribersBlockButton.push(callback);
  }

  _informSubscribersBlockButton() {
    this._subscribersBlockButton.forEach((subscriber) => {
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
