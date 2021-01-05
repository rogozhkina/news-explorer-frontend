export default class Page {
  constructor(
    domRootNode,
    api,
    newsApi,
    userInfo,
    domAuthButton,
    formAuth,
    popupAuth,
    domRegButton,
    formReg,
    popupReg,
    formSearch,
    domSearchButton,
    savedCardList,
    newsResultList,
  ) {
    this._domRootNode = domRootNode;
    this._api = api;
    this._newsApi = newsApi;
    this._userInfo = userInfo;
    this._domAuthButton = domAuthButton;
    this._popupAuth = popupAuth;
    this._formAuth = formAuth;
    this._domRegButton = domRegButton;
    this._domSearchButton = domSearchButton;
    this._popupReg = popupReg;
    this._formReg = formReg;
    this._formSearch = formSearch;
    this._savedCardList = savedCardList;
    this._newsResultList = newsResultList;
    this._onClickPopupAuthOpen = this._onClickPopupAuthOpen.bind(this);
    this._onClickPopupRegOpen = this._onClickPopupRegOpen.bind(this);
    this._onClickButtonRegistration = this._onClickButtonRegistration.bind(this);
    this._onClickButtonSearch = this._onClickButtonSearch.bind(this);
    this._onFormRegSubmitClicked = this._onFormRegSubmitClicked.bind(this);
    this._onAddSubmitClicked = this._onAddSubmitClicked.bind(this);
    this._domRootNode.appendChild(this._popupAuth.domElement());
    this._domRootNode.appendChild(this._popupReg.domElement());
    this._setupLogic();
  }

  _setupLogic() {
    this._domAuthButton.addEventListener('click', this._onClickPopupAuthOpen);
    this._domSearchButton.addEventListener('click', this._onClickButtonSearch);
    this._formAuth.subscribeBlockButton(this._onClickButtonRegistration);

    this._formReg.subscribeSubmit(this._onFormRegSubmitClicked);
  }

  _onClickPopupAuthOpen() {
    this._popupAuth.open();
  }

  _onClickPopupRegOpen() {
    this._popupReg.open();
  }

  _onClickButtonRegistration() {
    this._popupAuth.close();
    this._popupReg.open();
  }

  _onFormRegSubmitClicked() {
    alert('_onFormSubmitClicked');

    const inputName = this._formReg.getInput('name');
    const inputEmail = this._formReg.getInput('email');
    const inputPassword = this._formReg.getInput('password');
    this._api.signup(inputEmail.value(), inputPassword.value(), inputName.value());
  }

  _onAddSubmitClicked() {
    this._popupAdd.close();
  }

  _onClickButtonSearch() {
  //  alert('klick');
    const inputKeyWord = this._formSearch.getInput('search');
    inputKeyWord.domElements();
    console.log(inputKeyWord.value());
    this._newsApi.getNews(inputKeyWord.value(), (data) => {
      console.log("result");
      console.log(data);
      if (data.articles) {
        data.articles.forEach((article) => {
          this._newsResultList.addCard({
            title: article.title,
            urlToImage: article.urlToImage,
            date: article.publishedAt,
            text: article.description,
            source: article.source.name,
          });
        });
        this._newsResultList.render();
      }
    });
  }

  renderSavedPage() {
    this._api.getArticles((cards) => {
      cards.forEach((card) => {
        if (card.owner._id != this._userInfo.id()) {
          return;
        }

        this._savedCardList.addCard({
          title: card.title,
          date: card.date,
          text: card.text,
          source: card.source,
          urlToImage: card.urlToImage,
        });
      });

      this._savedCardList.render();
    });
  }

  renderSearchPage(){
    // this._newsResultList.addCard({
    //   title: "Title",
    //   urlToImage: "http://localhost:8080/images/image_08.png",
    //   date:"date",
    //   text:"text",
    //   source:"source",
    // });

    this._newsResultList.render();
  }
}
