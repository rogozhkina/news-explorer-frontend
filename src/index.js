import './css/index.css';

import Button from './js/button';
import Form from './js/components/form';
import FormAuth from './js/formauth';
import FormValidator from './js/formvalidator';
import InputValidator from './js/inputvalidator';
import Page from './js/page';
import Popup from './js/components/popup';
import TextInput from './js/textinput';
import UserInfo from './js/userinfo';

(function () {
  const domRootNode = document.querySelector('.page');
  const domAuthButton = document.querySelector('.button_type_authorization');

  const errorEmptyField = 'Это обязательное поле';
  const errorWrongLength = 'Должно быть от 2 до 30 символов';
  const errorWrongLink = 'Это не ссылка';

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
    (tagElement, submit, inputs) => {return new FormValidator(tagElement, submit, inputs); },
    ['popup__form'],
  );

  const popupAuth = new Popup('Вход', formAuth, 'popup__content_size_m');

  const page = new Page(
    domRootNode,
    userInfo,
    domAuthButton,
    formAuth,
    popupAuth,
  );

  page.render();
}());
