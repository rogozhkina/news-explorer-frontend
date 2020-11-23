export default class Page {
  constructor(
    domRootNode,
    userInfo,
    domAuthButton,
    formAuth,
    popupAuth,
  ) {
    this._domRootNode = domRootNode;
    this._domAuthButton = domAuthButton;
    this._popupAuth = popupAuth;
    this._formAuth = formAuth;
    this._userInfo = userInfo;
    this._onClickPopupAuthOpen = this._onClickPopupAuthOpen.bind(this);
    this._onClickRegistration = this._onClickRegistration.bind(this);
    this._onFormSubmitClicked = this._onFormSubmitClicked.bind(this);
    this._onAddSubmitClicked = this._onAddSubmitClicked.bind(this);
    this._domRootNode.appendChild(this._popupAuth.domElement());
    this._setupLogic();
  }

  _setupLogic() {
    this._domAuthButton.addEventListener("click", this._onClickPopupAuthOpen);
    this._formAuth.subscribeBlockButton(this._onClickRegistration);
  }

  _onClickPopupAuthOpen() {
    console.log(this._domAuthButton);
    this._popupAuth.open();
  }


  _onClickRegistration() {
    alert('_onClickRegistration');
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
