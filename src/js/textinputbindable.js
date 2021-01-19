import TextInput from './textinput';

export default class TextInputBindable extends TextInput {
  constructor(selector, name, validator) {
    super('', '', '', name, validator);
    this._selector = selector;
  }

  _bindInput() {
    const elements = document.getElementsByClassName(this._selector);
    const element = elements[0];

    return element;
  }

  domInput() {
    if (this._domInput == null) {
      this._domInput = this._bindInput();
    }
    return this._domInput;
  }

  domElements() {
    const result = [];
    result.push(this.domInput());
    return result;
  }

}
