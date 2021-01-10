import Form from './components/form';

export default class FormSucsess extends Form {
  constructor(
    title,
    buttonClass,
    additionalClasses,
  ) {
    super([], null, "", title, buttonClass, null, additionalClasses);
  }

  _onSubmit() {
    // this._setWaitingAnswer();
    // const email = this._names.email.value();
    // const password = this._names.password.value();
    // this._userInfo.setUserInfo(email, password);
    // this._userInfo.updateUserInfo();
    this._informSubscribers();
  }
}
