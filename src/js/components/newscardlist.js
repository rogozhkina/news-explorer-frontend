export default class CardList {
  constructor(domContainer, cardCreator) {
    this.container = domContainer;
    this._cardCreator = cardCreator;
    this._cardList = [];
    this._onImageRemoved = this._onImageRemoved.bind(this);
  }

  addCard(cardData) {
    const newCard = this._cardCreator(cardData);
    newCard.subscribeRemove(this._onImageRemoved);
    this._cardList.push(newCard);
  }

  _onImageRemoved(card) {
    const newList = [];
    this._cardList.forEach((object) => {
      if (card === object) {
        return;
      }
      newList.push(object);
    });

    this._cardList = newList;
  }

  render() {
    this.container.textContent = ' ';
    this._cardList.forEach((card) => {
      const cards = card.domElement();
      this.container.appendChild(cards);
    });
  }
}
