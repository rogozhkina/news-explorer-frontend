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
      const cards = card.domElement();
      this.container.appendChild(cards);
    });
  }
}
