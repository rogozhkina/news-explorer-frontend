export default class NewsApi {
  constructor(options) {
    this._options = options;
  }

  getNews(keyWord, fSuccess) {
    const today = new Date();
    const beforeToday = new Date(today.getTime() - 7*24*60*1000);
    const fromDay = beforeToday.toISOString().slice(0,10);
    const toDay = today.toISOString().slice(0,10);

    const url = `${this._options.newsUrl}?q=${keyWord}&from=${fromDay}&to=${toDay}&sortBy=popularity&pageSize=100&apiKey=${this._options.headers.authorization}`;

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
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        if (typeof fSuccess === 'function') {
          fSuccess(data);
        }
      })
      .catch((err) => {
        console.log("error:");
        console.log(err);
      });
  }



}
