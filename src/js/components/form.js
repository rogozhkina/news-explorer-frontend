export default class Form {
  constructor(inputs, link, submitButton, formValidatorCreator, additionalClasses) {
    this._domElement = null;
    this._link = link;
    // this._blockLink = null;
    this._inputs = inputs;
    this._formValidatorCreator = formValidatorCreator;
    this._validator = null;
    // this._link = link;

    if (typeof additionalClasses !== 'object') {
      this._additionalClasses = [];
    }

    this._additionalClasses = additionalClasses;
    this._names = {};
    this._inputs.forEach((input) => {
      const inputName = input.name();
      this._names[inputName] = input;
    });

    this._submit = submitButton;
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

//   _createBlockLink() {
//   const templateString = `<div class="registration">
//   или
//   <a class="link registration__link" href=" " target="_blank"
//     ></a
//   >
// </div>`;
//   }

  _createForm() {
    const tagElement = document.createElement('form');



    this._additionalClasses.forEach((className) => {
      tagElement.classList.add(className);
    });

    this._inputs.forEach((input) => {
      input.domElements().forEach((tag) => {
        tagElement.appendChild(tag);
      });
      input.subscribe(this._onFormChanged);
    });

    tagElement.appendChild(this._submit.domElement());
    this._submit.subscribe(this._onSubmit);

    tagElement.appendChild(this._link.domElement());

    this._validator = this._formValidatorCreator(
      tagElement,
      this._submit,
      this._inputs,
    );
    this._validator.setEventListeners();
    return tagElement;
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
