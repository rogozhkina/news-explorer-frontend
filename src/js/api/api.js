export default class Api {
  constructor(options) {
    this._options = options;
  }

  signup(email, password, name) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        throw err;
      });
  }

  signin(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        throw err;
      });
  }

  logout() {
    return fetch(`${this._options.baseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        throw err;
      });
  }

  getUserInfo(success, fFailed) {
    const url = `${this._options.baseUrl}/users/me`;

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
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
        return Promise.resolve();
      })
      .catch((err) => {
        if (typeof fFailed === 'function') {
          fFailed();
        }
      });
  }

  getArticles(success) {
    const url = `${this._options.baseUrl}/articles`;
    fetch(url, {
      method: 'GET',
      credentials: 'include',
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

  createArticle(article) {
    const url = `${this._options.baseUrl}/articles`;
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        keyword: article.keyword,
        image: article.image,
        link: article.link,
        title: article.title,
        date: article.date,
        text: article.text,
        source: article.source,
      }),
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
        throw err;
      });
  }

  removeArticle(id) {
    const url = `${this._options.baseUrl}/cards/\${id}`;
    fetch(url, {
      method: 'DELETE',
      credentials: 'include',
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
        throw err;
      });
  }
}
