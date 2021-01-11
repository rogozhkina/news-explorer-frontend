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
    formSucsess,
    popupSucsess,
    domSearchButton,
    domMoreButton,
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
    this._domMoreButton = domMoreButton;
    this._popupReg = popupReg;
    this._popupSucsess = popupSucsess;
    this._formReg = formReg;
    this._formSearch = formSearch;
    this._formSucsess = formSucsess;
    this._savedCardList = savedCardList;
    this._newsResultList = newsResultList;
    this._onClickPopupAuthOpen = this._onClickPopupAuthOpen.bind(this);
    this._onClickPopupRegOpen = this._onClickPopupRegOpen.bind(this);
    this._onClickButtonRegistration = this._onClickButtonRegistration.bind(this);
    this._onClickButtonAuthorization = this._onClickButtonAuthorization.bind(this);
    this._onClickAuthorization = this._onClickAuthorization.bind(this);
    this._onClickButtonSearch = this._onClickButtonSearch.bind(this);
    this._onFormRegSubmitClicked = this._onFormRegSubmitClicked.bind(this);
    this._onFormAuthSubmitClicked = this._onFormAuthSubmitClicked.bind(this);
    this._onAddSubmitClicked = this._onAddSubmitClicked.bind(this);
    this._onClickButtonMore = this._onClickButtonMore.bind(this);
    this._onClickSave = this._onClickSave.bind(this);
    this._onClickRemove = this._onClickRemove.bind(this);
    this._showLoggedMenu = this._showLoggedMenu.bind(this);
    this._domRootNode.appendChild(this._popupAuth.domElement());
    this._domRootNode.appendChild(this._popupReg.domElement());
    this._domRootNode.appendChild(this._popupSucsess.domElement());
    this._setupLogic();

    this._lastArticlesResult = null;
    this._totalArticlesShown = 0;
  }




  _setupLogic() {
    this._domAuthButton.addEventListener('click', this._onClickPopupAuthOpen);
    this._domSearchButton.addEventListener('click', this._onClickButtonSearch);
    this._domMoreButton.addEventListener('click', this._onClickButtonMore);
    this._formAuth.subscribeBlockButton(this._onClickButtonRegistration);
    this._formReg.subscribeBlockButton(this._onClickButtonAuthorization);
    this._formReg.subscribeSubmit(this._onFormRegSubmitClicked);
    this._formAuth.subscribeSubmit(this._onFormAuthSubmitClicked);
    this._formSucsess.subscribeBlockButton(this._onClickAuthorization);
  }

  _showLoggedMenu() {
    const menuUnauth = document.querySelector('.header_unauth');
    const menuAuth = document.querySelector('.header_auth');

    menuUnauth.style.display = 'none';
    menuAuth.style.display = 'flex';
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

  _onClickButtonAuthorization() {
    this._popupReg.close();
    this._popupAuth.open();
  }

  _onClickAuthorization() {
    this._popupSucsess.close();
    this._popupAuth.open();
    this._showLoggedMenu();
  }

  _onFormAuthSubmitClicked() {
    const inputEmail = this._formAuth.getInput('email');
    const inputPassword = this._formAuth.getInput('password');
    //alert('_onFormAuthSubmitClicked');
    this._api.signin(inputEmail.value(), inputPassword.value());
  }

  _onFormRegSubmitClicked() {
    //alert('_onFormSubmitClicked');

    const inputName = this._formReg.getInput('name');
    const inputEmail = this._formReg.getInput('email');
    const inputPassword = this._formReg.getInput('password');
    //const popupSucsess = document.querySelector('.popup_sucsess');
    this._api.signup(inputEmail.value(), inputPassword.value(), inputName.value())
    .then((body)=>{
      console.log("ok");
      console.log(body);
      this._popupReg.close();
})
    .catch((err)=>{
      console.log("error-catch");
      console.log(err);
      this._popupReg.close();
      this._popupSucsess.open();
    });
  }

  _onAddSubmitClicked() {
    this._popupAdd.close();
  }

  showStateSearching() {
    // скрыть результаты
    this._newsResultList.clear();
    this._newsResultList.render();

    // показать preloader
    const preloader = document.querySelector('.preloader_searching');
    if (!preloader) {
      return;
    }
    preloader.style.display = 'block';
  }

  showStateNotFound() {
    // скрыть результаты?
    this.showPreloaderSearch();
    // поменять preloader "not found"
    const preloaderNotFound = document.querySelector('.preloader_notfound');
  }

  showPreloaderSearch(b) {
    if (typeof b === 'undefined') {
      b = true;
    }
    const preloaderSearch = document.querySelector('.preloader_searching');
    if (!preloaderSearch) {
      return;
    }
    if (b) {
      preloaderSearch.style.display = 'block';
    } else {
      preloaderSearch.style.display = 'none';
    }
  }

  showResultsSection(bShow) {
    if (typeof bShow === 'undefined') {
      bShow = true;
    }
    const articlesSection = document.querySelector('.articles');
    if (bShow) {
      articlesSection.classList.add('articles_show');
      articlesSection.classList.remove('articles_hidden');
    } else {
      articlesSection.classList.remove('articles_show');
      articlesSection.classList.add('articles_hidden');
    }
  }

  hideResultsSection() {
    this.showResultsSection(false);
  }

  showMoreButton(bShow) {
    if (typeof bShow === 'undefined') {
      bShow = true;
    }
    if (bShow) {
      this._domMoreButton.style.display = 'block';
    } else {
      this._domMoreButton.style.display = 'none';
    }
  }

  formatDate(d) {
    const date = new Date(d);
    return `${date.getDay()} ${date.getMonth()}, ${date.getFullYear()}`;
  }

  showFirst3Results(articles) {
    this.showResultsSection();
    this.showPreloaderSearch(false);

    this._newsResultList.clear();
    let i = 0;
    articles.every((article) => {
      this._createCardFromArticle(article);
      i++;
      return i < 3;
    });
    this._newsResultList.render();
    this._totalArticlesShown = 3;
    this.showMoreButton(articles.length > 3);
  }

  _appendResults(articles, from, howMany) {
    const l = articles.length;
    if (from >= l) {
      return;
    }

    for (let n = 0; n < howMany && (from < l - n); n++) {
      const article = articles[from + n];
      this._createCardFromArticle(article);
    }
    this._newsResultList.render();
  }

  _createCardFromArticle(article) {
    const newCard = this._newsResultList.addCard({
      title: article.title,
      urlToImage: article.urlToImage,
      date: this.formatDate(article.publishedAt),
      text: article.description,
      source: article.source.name,
    });
    newCard.subscribeSave(this._onClickSave);
    newCard.subscribeRemove(this._onClickRemove);
    return newCard;
  }

  _onClickSave(newsCard) {
    const cardData = newsCard.export();
    console.log(cardData);

    this._api.createArticle({
      // keyword: cardData.keyword,
      image: cardData.urlToImage,
      // link: cardData.link,
      title: cardData.title,
      date: cardData.date,
      text: cardData.text,
      source: cardData.source,
    });
  }

  _onClickRemove(newsCard) {
    alert('_onClickRemove');
  }

  _onClickButtonSearch() {
  //  alert('klick');
    const preloaderSearch = document.querySelector('.preloader_searching');
    const preloaderNotFound = document.querySelector('.preloader_notfound');
    const inputKeyWord = this._formSearch.getInput('search');
    inputKeyWord.domElements();
    const requestText = inputKeyWord.value();
    console.log(requestText);

    if (requestText.length < 2) {
      alert('Необходимо ввести ключевое слово!');
      return;
    }

    this.showStateSearching();
    this.hideResultsSection();

    preloaderNotFound.style.display = 'none';

    this._newsApi.getNews(requestText, (data) => {
      console.log('result');
      console.log(data);

      if (!data.articles || data.articles.length === 0) {
        // alert('News not found');
        preloaderSearch.style.display = 'none';
        preloaderNotFound.style.display = 'block';
        return;
      }

      this._lastArticlesResult = data.articles;
      this.showFirst3Results(this._lastArticlesResult);
    });
  }

  _onClickButtonMore() {
    this._appendResults(this._lastArticlesResult, this._totalArticlesShown, 3);
    this._totalArticlesShown += 3;

    if (this._totalArticlesShown >= this._lastArticlesResult.length) {
      // скрыть кнопку more
      this.showMoreButton(false);
    }
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

  renderSearchPage() {
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
