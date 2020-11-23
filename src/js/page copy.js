export default class Page {
  constructor(
    api,
    domRootNode,
    // buttonRegistrationHint,
    domAuthButton,
    domRegButton,
    domEntryButton,
    popupAuth,
    popupReg,
    formAuth,
    // formReg,
    // newsCardList,
    userInfo,
    // blockButton,
    // popupAdd,
    // popupUser,
    // userForm,
    // formAdd,
    // popupImage,
    // largeImage,
  ) {
    this._api = api;
    // this._domEditButton = domEditButton;
    this._domRootNode = domRootNode;
    this._domAuthButton = domAuthButton;
    this._domRegButton = domRegButton;
    this._domEntryButton = domEntryButton;
    this._popupAuth = popupAuth;
    this._popupReg = popupReg;
    this._formAuth = formAuth;
    // this._formReg = formReg;
    // this._newsCardList = newsCardList;
    this._userInfo = userInfo;
    // this._popupAdd = popupAdd;
    // this._popupUser = popupUser;
    // this._userForm = userForm;
    // this._formAdd = formAdd;
    // this._popupImage = popupImage;
    // this._largeImage = largeImage;
    this._onClickEditUser = this._onClickEditUser.bind(this);
    this._onClickPopupAuthOpen = this._onClickPopupAuthOpen.bind(this);
    this._onClickPopupRegOpen = this._onClickPopupRegOpen.bind(this);
    // this._onClickNewsPageOpen = this._onClickNewsPageOpen.bind(this);
    // this._onClickLargeImage = this._onClickLargeImage.bind(this);
    this._onFormSubmitClicked = this._onFormSubmitClicked.bind(this);
    this._onAddSubmitClicked = this._onAddSubmitClicked.bind(this);
    // this._domRootNode.appendChild(this._popupUser.domElement());
    this._domRootNode.appendChild(this._popupAuth.domElement());
    this._domRootNode.appendChild(this._popupReg.domElement());
    // this._domRootNode.appendChild(this._popupAdd.domElement());
    // this._domRootNode.appendChild(this._popupImage.domElement());

    // buttonRegistrationHint.subscribeClick(()=>{
    //     console.log("buttonRegistrationHint");
    //     this._popupReg.open();
    // });


    this._setupLogic();
  }



  _setupLogic() {
    // this._domEditButton.addEventListener("click", this._onClickEditUser);
    this._domAuthButton.addEventListener("click", this._onClickPopupAuthOpen);
    this._domRegButton.addEventListener("click", this._onClickPopupRegOpen);
    // this._domEntryButton.addEventListener("click", this._onClickNewsPageOpen);
    // this._cardList.subscribeLargeImageClick(this._onClickLargeImage);
    // this._userForm.subscribeSubmit(this._onFormSubmitClicked);
    // this._formAdd.subscribeSubmit(this._onAddSubmitClicked);
  }

  // _onClickLargeImage(cardData) {
  //   this._largeImage.setImageURL(cardData.link);
  //   this._popupImage.open();
  // }

  _onClickEditUser() {
    this._popupUser.open();
  }

  _onClickPopupAuthOpen() {
    console.log(this._domAuthButton);
    this._popupAuth.open();
  }


  _onClickPopupRegOpen() {
    this._popupReg.open();
  }

  // _onClickNewsPageOpen() {
  //   console.log('Ура');
  // }

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
    // this._api.getUserInfo((userData) => {
    //   this._userInfo.setUserInfo(
    //     userData.name,
    //     userData.email,
    //     userData._id,
    //   );
    //   this._userInfo.updateUserInfo();
    // });

    // this._api.getInitialCards((cards) => {
    //   cards.forEach((card) => {
    //     if (card.owner._id != this._userInfo.id()) {
    //       return;
    //     }

    //     this._cardList.addCard({
    //       name: card.name,
    //       link: card.link,
    //     });
    //   });

      // this._newsCardList.render();
    // });
  }
}
