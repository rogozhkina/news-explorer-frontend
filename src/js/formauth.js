import Form from './components/form';

export default class FormUser extends Form {
  constructor(
    userInfo,
    inputs,
    submitButton,
    formValidatorCreator,
    additionalClasses,
  ) {
    super(inputs, submitButton, formValidatorCreator, additionalClasses);
    this._userInfo = userInfo;
  }

  reset() {
    super.reset();
    this._submit.enable(true);
    this._submit.rename('Войти');
    const email = this._userInfo.email();
    const password = this._userInfo.password();
    // this._names.setValue(name);
    this._names['email'].setValue(email);
    // this._names.setValue(password);
  }

  _setWaitingAnswer() {
    this._submit.rename('Сохранение...');
    this._submit.enable(false);
  }

  _onSubmit() {
    this._setWaitingAnswer();
    const email = this._names.email.value();
    const password = this._names.password.value();
    this._userInfo.setUserInfo(email, password);
    this._userInfo.updateUserInfo();
    this._informSubscribers();
  }
}
