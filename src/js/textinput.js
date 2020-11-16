export default class TextInput {
  constructor(type, spanMessage, placeholder, name, validator) {
    this._domInput = null;
    this._domSpanMessage = null;
    this._domErrorMessage = null;
    this._spanMessage = spanMessage;
    this._placeholder = placeholder;
    this._name = name;
    this._type = type;
    this._validator = validator;
    this._subscribers = [];
  }

  isValid() {
    return this._validator.isValid();
  }

  name() {
    return this._name;
  }

  _createInput() {
    const templateString = `
    <input
    required
    type="type"
    class="popup__input input popup__input_type_name"
    />`;
    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', templateString.trim());
    const element = template.firstElementChild;

    element.setAttribute('type', this._type);
    element.setAttribute('placeholder', this._placeholder);
    element.setAttribute('name', this._name);

    return element;
  }

  setValue(text, triggerChecks) {
    this.domElements();
    this._domInput.value = text;

    if (typeof triggerChecks === 'undefined') {
      triggerChecks = true;
    }
    if (triggerChecks) {
      this._validator.onValueChanged(text);
    }
  }

  reset() {
    this._validator.reset();
    this.setValue("");
    this._domErrorMessage.textContent = "";
  }

  value() {
    return this._domInput.value;
  }

  _createSpanMessage() {
    const templateString = `<span class="popup__label"></span>`;
    const template = document.createElement("div");
    template.insertAdjacentHTML("beforeend", templateString.trim());
    const element = template.firstElementChild;
    element.textContent = this._spanMessage;
    return element;
  }

  _createErrorMessage() {
    const templateString = `<span class="popup__error-message"></span>`;
    const template = document.createElement("div");
    template.insertAdjacentHTML("beforeend", templateString.trim());
    const element = template.firstElementChild;
    element.setAttribute("id", this._name);
    return element;
  }

  onChange() {
    const value = this._domInput.value;
    this._validator.onValueChanged(value);

    this._subscribers.forEach((subscriber) => {
      if (typeof subscriber === "function") {
        subscriber();
      }
    });
  }

  validator() {
    return this._validator;
  }

  domInput() {
    if (this._domInput == null) {
      this._domInput = this._createInput();
    }
    return this._domInput;
  }

  domSpanMessage() {
    if (this._domSpanMessage == null) {
      this._domSpanMessage = this._createSpanMessage();
    }
    return this._domSpanMessage;
  }

  domErrorMessage() {
    if (this._domErrorMessage == null) {
      this._domErrorMessage = this._createErrorMessage();
    }
    return this._domErrorMessage;
  }

  domElements() {
    const result = [];
    // const el2 = this.domSpanMessage();
    // const el1 = this.domInput();
    // const el3 = this.domErrorMessage();
    // result.push(el2);
    // result.push(el1);
    // result.push(el3);
    result.push(this.domSpanMessage());
    result.push(this.domInput());
    result.push(this.domErrorMessage());

    return result;
  }

  subscribe(callback) {
    this._subscribers.push(callback);
  }
}
