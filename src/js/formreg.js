import Form from './components/form';

export default class FormReg extends Form {
  constructor(
    userInfo,
    inputs,
    submitButton,
    text,
    title,
    buttonClass,
    formValidatorCreator,
    additionalClasses,
  ) {
    super(inputs, submitButton, text, title, buttonClass, formValidatorCreator, additionalClasses);
    this._userInfo = userInfo;
  }

  reset() {
    super.reset();
    this._submit.enable(false);
    // this._submit.rename('Зарегистрироваться');
    const email = this._userInfo.email();
    const password = this._userInfo.password();
    const name = this._userInfo.name();
    this._names.email.setValue(email);
    this._names.password.setValue(password);
    this._names.name.setValue(name);
  }

  // _setWaitingAnswer() {
  //   this._submit.rename('Сохранение...');
  //   this._submit.enable(false);
  // }

  _onSubmit() {
    // this._setWaitingAnswer();
    const email = this._names.email.value();
    const password = this._names.password.value();
    const name = this._names.name.value();
    this._userInfo.setUserInfo(email, password, name);
    this._userInfo.updateUserInfo();
    this._informSubscribers();
  }
}
