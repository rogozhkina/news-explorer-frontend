export default class NewsCardList {
  constructor(domContainer, cardCreator) {
    this.container = domContainer;
    this._cardCreator = cardCreator;
    this._newsCardList = [];
    this._onImageRemoved = this._onImageRemoved.bind(this);
  }

  addCard(cardData) {
    const newCard = this._cardCreator(cardData);
    newCard.subscribeRemove(this._onImageRemoved);
    this._newsCardList.push(newCard);
    return newCard;
  }

  _onImageRemoved(card) {
    const newList = [];
    this._newsCardList.forEach((object) => {
      if (card === object) {
        return;
      }
      newList.push(object);
    });

    this._newsCardList = newList;
  }

  clear() {
    this._newsCardList = [];
  }

  render() {
    this.container.textContent = ' ';
    this._newsCardList.forEach((card) => {
      const domCard = card.domElement();
      this.container.appendChild(domCard);
    });
  }

  /**
   * from - порядковый номер zero-based от начала списка откуда начинать добавление карточек
   * howMany - сколько карточек добавить в dom
   */
  renderPartial(from, howMany) {
    const l = this._newsCardList.length;
    for (let n = 0; n < howMany && (from < l - n); n++) {
      const card = this._newsCardList[from + n];
      const domCard = card.domElement();
      this.container.appendChild(domCard);
    }
  }
}
