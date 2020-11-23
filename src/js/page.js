export default class Page {
  constructor(
    domRootNode,
    userInfo,
    domAuthButton,
    formAuth,
    popupAuth,
    domRegButton,
    formReg,
    popupReg,
  ) {
    this._domRootNode = domRootNode;
    this._userInfo = userInfo;
    this._domAuthButton = domAuthButton;
    this._popupAuth = popupAuth;
    this._formAuth = formAuth;
    this._domRegButton = domRegButton;
    this._popupReg = popupReg;
    this._formReg = formReg;
    this._onClickPopupAuthOpen = this._onClickPopupAuthOpen.bind(this);
    this._onClickPopupRegOpen = this._onClickPopupRegOpen.bind(this);
    this._onClickButtonRegistration = this._onClickButtonRegistration.bind(this);
    this._onFormSubmitClicked = this._onFormSubmitClicked.bind(this);
    this._onAddSubmitClicked = this._onAddSubmitClicked.bind(this);
    this._domRootNode.appendChild(this._popupAuth.domElement());
    this._setupLogic();
  }

  _setupLogic() {
    this._domAuthButton.addEventListener("click", this._onClickPopupAuthOpen);
    this._domRegButton.addEventListener("click", this._onClickPopupRegOpen);
    this._formAuth.subscribeBlockButton(this._onClickButtonRegistration);
  }

  _onClickPopupAuthOpen() {
    console.log(this._domAuthButton);
    this._popupAuth.open();
  }


  _onClickPopupRegOpen() {
    console.log(this._domRegButton);
    this._popupReg.open();
  }


  _onClickButtonRegistration() {
    this._popupAuth.close();
    this._popupReg.open();
  }

  _onFormSubmitClicked() {
    this._api.updateUserInfo(
      this._userInfo.name(),
      // this._userInfo.job(),
      (data) => {
        // В случае success
        // сохраняем и отображаем по второму кругу с использованием информации
        // от сервера, хотя данные должны совпасть
        this._userInfo.setUserInfo(data.name);
        this._userInfo.updateUserInfo(); // отрисовка
        // Закрытие больше не происходит по подписке popup
        this._popupUser.close();
      },
      () => {
        // В случае failed
        this._userInfo.undoUserInfo(); // возврат старых значений
        this._userInfo.updateUserInfo(); // отрисовка
        alert("Не удалось сохранить!");
        this._popupUser.reset();
      }
    );
  }

  _onAddSubmitClicked() {
    this._popupAdd.close();
  }

  render() {
  }
}
