export default class NewsApi {
  constructor(options) {
    this._options = options;
  }

  getNews(keyWord) {
    const url = `${this._options.newsUrl}?keyWord&sortBy=popularity&pageSize=3&apiKey=${this._options.headers.authorization}`;

    // const url = `https://newsapi.org/v2/`;

    //https://newsapi.org/v2/everything?q=apple&from=2020-11-25&to=2020-11-25&sortBy=popularity&apiKey=35c6d32499234db7b822ba7bc92a823e

    // const url = 'http://newsapi.org/v2/top-headlines?' +
    // 'apiKey=35c6d32499234db7b822ba7bc92a823e';

    // const req = new Request(url);
    // fetch(req)
    //     .then(function(response) {
    //         console.log(response.json());
    //     });

    fetch(url, {
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log('url');
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
