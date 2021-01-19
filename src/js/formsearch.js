import Form from './components/form';

export default class FormSearch extends Form {
  constructor(
    inputs,
    submitButton,
    title,
    buttonClass,
    formValidatorCreator,
  ) {
    super(inputs, submitButton, '', title, buttonClass, formValidatorCreator, []);
  }

  reset() {
    super.reset();
    const keyWord = this._keyWord();
    this._names.keyWord.setValue(keyWord);
  }

  _setWaitingAnswer() {
    this._submit.rename('Сохранение...');
    this._submit.enable(false);
  }
}
