import { Form } from "./form.js";

export class FormUser extends Form {
  constructor(
    userInfo,
    inputs,
    submitButton,
    formValidatorCreator,
    additionalClasses
  ) {
    super(inputs, submitButton, formValidatorCreator, additionalClasses);
    this._userInfo = userInfo;
  }

  reset() {
    super.reset();
    this._submit.enable(true);
    this._submit.rename("Сохранить");
    const name = this._userInfo.name();
    const email = this._userInfo.email();
    this._names["username"].setValue(name);
    this._names["email"].setValue(email);
  }

  _setWaitingAnswer() {
    this._submit.rename("Сохранение...");
    this._submit.enable(false);
  }

  _onSubmit() {
    this._setWaitingAnswer();
    const name = this._names["username"].value();
    const email = this._names["email"].value();
    this._userInfo.setUserInfo(name, email);
    this._userInfo.updateUserInfo();
    this._informSubscribers();
  }
}
