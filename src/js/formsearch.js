import Form from './components/form';

export default class FormSearch extends Form {
  constructor(
    inputs,
    submitButton,
    title,
    buttonClass,
    formValidatorCreator,
    //additionalClasses,
  ) {
    super( inputs, submitButton, '', title, buttonClass, formValidatorCreator, [] );
  }

  reset() {
    super.reset();
    // this._submit.enable(false);
    // this._submit.rename('Зарегистрироваться');
    const keyWord = this._keyWord();
    // const password = this._userInfo.password();
    // const name = this._userInfo.name();
    // this._names.email.setValue(email);
    // this._names.password.setValue(password);
    this._names.keyWord.setValue(keyWord);
  }

  // _setWaitingAnswer() {
  //   this._submit.rename('Сохранение...');
  //   this._submit.enable(false);
  // }


}
