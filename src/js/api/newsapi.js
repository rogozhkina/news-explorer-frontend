export default class NewsApi {
  constructor(options) {
    this._options = options;
  }

  getNews(keyWord) {
    const url = this._options.newsUrl + 'keyWord';

    fetch(url, {
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        if (typeof success === 'function') {
          success(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
