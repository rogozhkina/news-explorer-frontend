import {showCardsNumber} from './constants/constants.js';

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
    this._onClickLogout = this._onClickLogout.bind(this);
    this._showLoggedMenu = this._showLoggedMenu.bind(this);
    this._domRootNode.appendChild(this._popupAuth.domElement());
    this._domRootNode.appendChild(this._popupReg.domElement());
    this._domRootNode.appendChild(this._popupSucsess.domElement());
    this._setupLogic();

    this._lastArticlesResult = null;
    this._totalArticlesShown = 0;
    this._lastSearchText = ''; // поисковый запрос
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
    const domExitButton = document.querySelector('.button__escape');
    domExitButton.addEventListener('click', this._onClickLogout);
  }

  _showLoggedMenu(userName) {
    const menuUnauth = document.querySelector('.header_unauth');
    const menuAuth = document.querySelector('.header_auth');

    menuUnauth.style.display = 'none';
    menuAuth.style.display = 'flex';

    if (userName.length < 1) {
      return;
    }

    const userButton = document.querySelector('.button__escape');
    if (!userButton) {
      return;
    }
    userButton.textContent = userName;

    const domKwUserInfo = document.querySelector('.saved-info__username');
    if (!domKwUserInfo) {
      return;
    }
    domKwUserInfo.textContent = userName;
  }

  _showNotLoggedMenu() {
    const menuUnauth = document.querySelector('.header_unauth');
    const menuAuth = document.querySelector('.header_auth');

    menuUnauth.style.display = 'flex';
    menuAuth.style.display = 'none';
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
  }

  _onFormAuthSubmitClicked() {
    const inputEmail = this._formAuth.getInput('email');
    const inputPassword = this._formAuth.getInput('password');
    this._api.signin(inputEmail.value(), inputPassword.value())
      .then((body) => {
        localStorage.setItem('jwt', body.jwt);
        this._popupAuth.close();
        // сделать чтобы страница выглядела как "залогинен"

        // выяснить имя пользователя
        this.setupMenuByUserInfo();
      })
      .catch((err) => {
        console.log('error-catch');
        console.log(err);
        this._popupAuth.close();
      });
  }

  _onFormRegSubmitClicked() {
    const inputName = this._formReg.getInput('name');
    const inputEmail = this._formReg.getInput('email');
    const inputPassword = this._formReg.getInput('password');
    this._api.signup(inputEmail.value(), inputPassword.value(), inputName.value())
      .then((body) => {
        console.log('ok');
        console.log(body);
        this._popupReg.close();
        this._popupSucsess.open();
      })
      .catch((err) => {
        console.log('error-catch');
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
    this._newsResultList.renderPartial( from,howMany);
  }

  _createCardFromArticle(article) {
    const newCard = this._newsResultList.addCard({
      id: article._id,
      title: article.title,
      urlToImage: article.urlToImage,
      date: article.publishedAt,
      text: article.description,
      source: article.source.name,
      // keyword: article.keyword,
      keyword: this._lastSearchText,
      link: article.url,
    });
    newCard.subscribeSave(this._onClickSave);
    newCard.subscribeRemove(this._onClickRemove);
    return newCard;
  }

  _onClickSave(newsCard) {
    const cardData = newsCard.export();
    console.log(cardData);

    this._api.createArticle({
      keyword: this._lastSearchText,
      image: cardData.urlToImage,
      link: cardData.link,
      title: cardData.title,
      date: cardData.date,
      text: cardData.text,
      source: cardData.source,
    }, (res) => {
      newsCard.assignID(res.data._id);
    });
  }

  _onClickRemove(card) {
    console.log('page::_onClickRemove');
    console.log(card)

    this._api.removeArticle(card.ID());

  }

  _onClickButtonSearch() {
    const preloaderSearch = document.querySelector('.preloader_searching');
    const preloaderNotFound = document.querySelector('.preloader_notfound');
    const inputKeyWord = this._formSearch.getInput('search');
    inputKeyWord.domElements();
    const requestText = inputKeyWord.value();
    console.log(requestText);

    if (requestText.length < 2) {
      alert('Необходимо ввести ключевое слово длиной не менее 2-х знаков!');
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
      this._lastSearchText = requestText;
      this.showFirst3Results(this._lastArticlesResult);
    });
  }

  _onClickButtonMore() {
    this._appendResults(this._lastArticlesResult, this._totalArticlesShown, showCardsNumber);
    this._totalArticlesShown += showCardsNumber;

    if (this._totalArticlesShown >= this._lastArticlesResult.length) {
      // скрыть кнопку more
      this.showMoreButton(false);
    }
  }

  renderSavedPage() {
    // вызов инициализации меню, получение пользователя, установка вида меню
    this.setupMenuByUserInfo();

    this._api.getArticles((cards) => {
      const usedKeywords = {};
      cards.forEach((card) => {
        const newCard = this._savedCardList.addCard({
          id:card._id,
          title: card.title,
          link: card.link,
          date: card.date,
          text: card.text,
          source: card.source,
          urlToImage: card.image,
          keyword: card.keyword,
        });
        newCard.subscribeRemove(this._onClickRemove);

        const kw = card.keyword;
        if (typeof usedKeywords[kw] === 'undefined') {
          usedKeywords[kw] = 1;
        } else {
          usedKeywords[kw]++;
        }
      });
      this._savedCardList.render();
      this._fillUsedKeywords(usedKeywords);
      this._fillKwCounter(cards.length);
    });
  }

  _fillUsedKeywords(keywords) {
    const kwSummary = this._composeKeywordsSummary(keywords);
    console.log(kwSummary);
    // querySelector
    const domKwSummary = document.querySelector('.page__kw_summary');
    domKwSummary.textContent = kwSummary;
  }

  _fillKwCounter(n) {
    const domKwCounter = document.querySelector('.saved-info__counter');
    domKwCounter.textContent = n;
  }

  _composeKeywordsSummary(keywords) {
    const keysSorted = Object.keys(keywords).sort(
      (b, a) => keywords[a] - keywords[b],
    );
    console.log(keysSorted);
    const l = keysSorted.length;

      const separator = ', ';

      if(l<=3){
        return keysSorted.join(separator);
      }

      const shortList = keysSorted.slice(0,2);
      const remainedCount = l-2;
      // и 2-м другим
    return shortList.join(separator) + ' и ' + remainedCount + '-м другим';
  }

  renderSearchPage() {
    this._newsResultList.render();
    // вызов инициализации меню, получение пользователя, установка вида меню
    this.setupMenuByUserInfo();
  }

  // получает пользователя
  // и в зависимости от залогиненности
  // формирует разное меню
  setupMenuByUserInfo() {
    // смотрим res и решаем что показать
    this._api.getUserInfo((res) => {
      this._showLoggedMenu(res.data.name);
    }, () => {
      this._showNotLoggedMenu();
    });
  }

  _onClickLogout() {
    localStorage.setItem('jwt', '');
    this._showNotLoggedMenu();
  }
}
