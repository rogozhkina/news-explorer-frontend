export default class UserInfo {
  constructor(selectorName, selectorEmail, selectorPassword) {
    this._domName = document.querySelector(selectorName);
    this._domEmail = document.querySelector(selectorEmail);
    this._domPassword = document.querySelector(selectorPassword);

    this._id = '';

    this._name = '';
    this._email = '';
    this._password = '';

    // Для возврата по undo
    // this._prevName = "";
    // this._prevJob = "";
    // this._prevAvatar = "";
  }

  // Рисует содержимое на странице
  updateUserInfo() {
    this._domName.textContent = this._name;
    this._domEmail.textContent = this._email;
    this._domPassword.textContent = this._password;
    // this._domAvatar.style.backgroundImage = `url(${this._avatar})`;
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

  // Сохраняет новые значения
  // setUserInfo(name, job, avatar, id) {
    // this._prevAvatar = this._avatar;
    // this._prevName = this._name;
    // this._prevJob = this._job;

    // this._name = name;
    // this._job = job;

    // if (typeof avatar !== "undefined") {
    //   this._avatar = avatar;
    // }
  //   if (typeof id !== "undefined") {
  //     this._id = id;
  //   }
  // }

  // Возвращает предыдущие значения
  // на случай, если что-то пошло не так
  // undoUserInfo() {
    // this._avatar = this._prevAvatar;
    // this._name = this._prevName;
    // this._job = this._prevJob;
  // }
}
