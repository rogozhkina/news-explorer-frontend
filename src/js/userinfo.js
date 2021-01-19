export default class UserInfo {
  constructor(selectorEmail, selectorPassword, selectorName) {
    this._domName = document.querySelector(selectorName);
    this._domEmail = document.querySelector(selectorEmail);
    this._domPassword = document.querySelector(selectorPassword);

    this._id = '';

    this._name = '';
    this._email = '';
    this._password = '';
  }

  // Рисует содержимое на странице
  updateUserInfo() {
    this._domName.textContent = this._name;
    this._domEmail.textContent = this._email;
    this._domPassword.textContent = this._password;
  }

  name() {
    return this._name;
  }

  email() {
    return this._email;
  }

  password() {
    return this._password;
  }

  id() {
    return this._id;
  }
}
