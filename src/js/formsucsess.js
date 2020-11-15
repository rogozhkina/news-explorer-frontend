import Form from './components/form';

export default class FormSucsess extends Form {
  constructor(
    submitButton,
    additionalClasses,
  ) {
    super(submitButton, additionalClasses);
  }

  reset() {
    super.reset();
    this._submit.enable(true);
    this._submit.rename('Войти');
  }

  // _setWaitingAnswer() {
  //   this._submit.rename('Сохранение...');
  //   this._submit.enable(false);
  // }

  _onSubmit() {
    this._setWaitingAnswer();
    this._informSubscribers();
  }
}
