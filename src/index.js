import './css/index.css';

import Api from './js/api/api';
import NewsApi from './js/api/newsapi';
import Button from './js/button';
import Form from './js/components/form';
import NewsCard from './js/components/newscard';
import NewsCardList from './js/components/newscardlist';
import FormAuth from './js/formauth';
import FormReg from './js/formreg';
// import FormSucsess from './js/formsucsess';
import FormValidator from './js/formvalidator';
import InputValidator from './js/inputvalidator';
import Page from './js/page';
import BlockLink from './js/block-link';
import Popup from './js/components/popup';
import TextInput from './js/textinput';
import UserInfo from './js/userinfo';

(function () {
  const domRootNode = document.querySelector('.page');
  const domAuthButton = document.querySelector('.button_type_authorization');
  const domCardListContainer = document.querySelector('.articles__list');

  const api = new Api({
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://localhost:8080'
        : 'http://localhost:8080',
    headers: {
      authorization: '098deaea-e99e-492d-906f-622aa2508f6d',
      'Content-Type': 'application/json',
    },
  });

  const errorEmptyField = 'Это обязательное поле';
  const errorWrongLength = 'Должно быть от 2 до 30 символов';
  const errorWrongLink = 'Это не ссылка';

  const userInfo = new UserInfo(
    '.user__name',
    '.user__email',
    '.user__password',
  );

  // const newsCardList = new NewsCardList(domNewsCardListContainer, (cardData) => {
  //   const newsCard = new NewsCard(cardData);
  //   return newsCard;
  // });

  // const formAdd = new FormCard(
  //   cardList,
  //   [
  //     new TextInput(
  //       'Название',
  //       'cardname',
  //       'text',
  //       new InputValidator(2, 30, errorEmptyField, errorWrongLength),
  //     ),
  //     new TextInput(
  //       'Ссылка на картинку',
  //       'link',
  //       'text',
  //       new URLValidator(errorEmptyField, errorWrongLink),
  //     ),
  //   ],
  //   new Button('+', ['popup__button'], 'popup__button_disabled'),
  //   (tagElement, submit, inputs) => new FormValidator(tagElement, submit, inputs),
  //   ['popup__form'],
  // );
  // const popupAdd = new Popup('Новое место', formAdd);


  // const formEdit = new FormUser(
  //   userInfo,
  //   [
  //     new TextInput(
  //       'Имя',
  //       'username',
  //       'text',
  //       new InputValidator(2, 30, errorEmptyField, errorWrongLength),
  //     ),
  //     new TextInput(
  //       'О себе',
  //       'job',
  //       'text',
  //       new InputValidator(2, 30, errorEmptyField, errorWrongLength),
  //     ),
  //   ],
  //   new Button(
  //     'Сохранить',
  //     ['popup__button', 'popup__button_edit'],
  //     'popup__button_disabled',
  //   ),
  //   (tagElement, submit, inputs) => new FormValidator(tagElement, submit, inputs),
  //   ['popup__form'],
  // );
  // const popup = new Popup('Редактировать профиль', formEdit);

  // const largeImage = new LargeImage();
  // const popupImage = new PopupImage(largeImage);

  // const link = new BlockLink('registration', 'registration__link', 'или ', 'Зарегистрироваться');

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
        'text',
        new InputValidator(2, 30, errorEmptyField, errorWrongLength),
      ),
    ],
    new BlockLink('registration', 'registration__link', 'или ', 'Войти'),
    new Button(
      'Button',
      ['popup__button', 'button_type_entry'],
      'popup__button_disabled',
    ),
    (tagElement, submit, inputs) => { return new FormValidator(tagElement, submit, inputs); },
    ['popup__form'],
  );



  const authSubmitButton = new Button(
    'Зарегистрироваться',
    ['popup__button', 'button_type_entry'],
    'popup__button_disabled',
  );

  // authSubmitButton.enable(false);



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
    new BlockLink('registration', 'registration__link', 'или ', 'Зарегистрироваться'),
    authSubmitButton,
    (tagElement, submit, inputs) => {return new FormValidator(tagElement, submit, inputs); },
    ['popup__form'],
  );

  // const formSucsess = new FormSucsess(
  //   new Button(
  //     'Войти',
  //     ['popup__button', 'button_type_entry'],
  //     'popup__button_disabled',
  //   ),
  //   (tagElement, submit, inputs) => new FormValidator(tagElement, submit, inputs),
  //   ['popup__form'],
  // );

  const popupAuth = new Popup('Вход', formAuth);
  const popupReg = new Popup('Зарегистрироваться', formReg);

  // link.addEventListener('click', popupReg.open);

  // const popupSucsess = new Popup('Пользователь успешно зарегистрирован!', formSucsess);

  const page = new Page(
    api,
    domRootNode,
    domAuthButton,
    popupAuth,
    popupReg,
    // popupSucsess,
    formAuth,
    formReg,
    // formSucsess,
    // cardList,
    userInfo,
    // popupAdd,
    // popupUser,
    // formEdit,
    // formAdd,
    // popupImage,
    // largeImage,
  );

  page.render();

  // popupReg.open();
}());
