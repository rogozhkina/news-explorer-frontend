import { daysNumber } from '../constants/constants';

export default class NewsApi {
  constructor(options) {
    this._options = options;
  }

  getNews(keyWord, fSuccess) {
    const today = new Date();
    const msBefore = daysNumber * 24 * 60 * 60 * 1000;
    const beforeToday = new Date(today.getTime() - msBefore);
    const fromDay = beforeToday.toISOString().slice(0, 10);
    const toDay = today.toISOString().slice(0, 10);

    const url = `${this._options.newsUrl}?q=${keyWord}&from=${fromDay}&to=${toDay}&sortBy=popularity&pageSize=100&apiKey=${this._options.headers.authorization}`;

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
      });
  }
}
