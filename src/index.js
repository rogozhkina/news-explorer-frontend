import './css/index.css';

import Api from './js/api/api';
import Button from './js/button';
import Form from './js/components/form';
import FormAuth from './js/formauth';
import FormReg from './js/formreg';
import FormSearch from './js/formsearch';
import FormValidator from './js/formvalidator';
import InputValidator from './js/inputvalidator';
import Page from './js/page';
import Popup from './js/components/popup';
import TextInput from './js/textinput';
import TextInputBindable from './js/textinputbindable';
import UserInfo from './js/userinfo';
import NewsApi from './js/api/newsapi';



(function () {
  const domRootNode = document.querySelector('.page');
  const domAuthButton = document.querySelector('.button_type_authorization');
  const domRegButton = document.querySelector('.button_type_registration');
  const domSearchButton = document.querySelector('.button_type_search');
  const errorEmptyField = 'Это обязательное поле';
  const errorWrongLength = 'Должно быть от 2 до 30 символов';
  const errorWrongLink = 'Это не ссылка';

  const api = new Api({
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://localhost:3000'
        : 'http://localhost:3000',
    headers: {
      authorization: '098deaea-e99e-492d-906f-622aa2508f6d',
      'Content-Type': 'application/json',
    },
  });

  const newsApi = new NewsApi({
    newsUrl: 'https://newsapi.org/v2/everything',
    headers: {
      authorization: '35c6d32499234db7b822ba7bc92a823e',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',

    },
  });

  const userInfo = new UserInfo(
    '.user__name',
    '.user__email',
    '.user__password',
  );

  const authSubmitButton = new Button(
    'Войти',
    ['popup__button', 'button_type_entry'],
    'popup__button_disabled',
  );

  const formAuth = new FormAuth(
    userInfo,
    [
      new TextInput(
        'email',
        'Email',
        'Введите почту',
        'email',
        new InputValidator(2, 30, errorEmptyField, errorWrongLength),
      ),
      new TextInput(
        'password',
        'Пароль',
        'Введите пароль',
        'password',
        new InputValidator(2, 30, errorEmptyField, errorWrongLength),
      ),
    ],
    authSubmitButton,
    'или ',
    'Зарегистрироваться',
    'button_type_registration',
    (tagElement, submit, inputs) => { return new FormValidator(tagElement, submit, inputs); },
    ['popup__form'],
  );

  const regSubmitButton = new Button(
    'Зарегистрироваться',
    ['popup__button', 'button_type_login'],
    'popup__button_disabled',
  );

  const formReg = new FormReg(
    userInfo,
    [
      new TextInput(
        'email',
        'Email',
        'Введите почту',
        'email',
        new InputValidator(2, 30, errorEmptyField, errorWrongLength),
      ),
      new TextInput(
        'password',
        'Пароль',
        'Введите пароль',
        'password',
        new InputValidator(2, 30, errorEmptyField, errorWrongLength),
      ),
      new TextInput(
        'text',
        'Имя',
        'Введите свое имя',
        'name',
        new InputValidator(2, 30, errorEmptyField, errorWrongLength),
      ),
    ],
    regSubmitButton,
    'или ',
    'Войти',
    'button_type_authorization',
    (tagElement, submit, inputs) => { return new FormValidator(tagElement, submit, inputs); },
    ['popup__form'],
  );

  const formSearch = new FormSearch(

    [
      new TextInputBindable(
        'news__input',
        'search',
        new InputValidator(2, 30, errorEmptyField, errorWrongLength),
      ),

    ],
    regSubmitButton,

    'Поиск',
    'button_type_search',
    (tagElement, submit, inputs) => { return new FormValidator(tagElement, submit, inputs); },
    //['popup__form'],
  );

  const popupAuth = new Popup('Вход', formAuth, 'popup__content_size_m');
  const popupReg = new Popup('Зарегистрироваться', formReg, 'popup__content_size_l');

  const page = new Page(
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
  );

  page.render();
}());
