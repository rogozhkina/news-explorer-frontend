export default class Api {
  constructor(options) {
    this._options = options;
  }

  signUp(name, email, password) {
    return fetch(`${this.options.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
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

  signIn(email, password) {
    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
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
    return fetch(`${this.options.baseUrl}/logout`, {
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

  getUserInfo(success) {
    const url = this._options.baseUrl + '/users/me';

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

  getCards(success) {
    const url = this._options.baseUrl + '/cards';

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

  createCard(card) {
    const url = this._options.baseUrl + '/cards';

    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        keyword: card.keyword,
        image: card.image,
        link: card.link,
        title: card.title,
        date: card.date,
        text: card.text,
        source: card.source,
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

  removeCard(id) {
    const url = this._options.baseUrl + '/cards/${id}';

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
