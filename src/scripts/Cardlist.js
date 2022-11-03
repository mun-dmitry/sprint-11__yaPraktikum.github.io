export class Cardlist {

    constructor (template, container, createCard, cardTemplate, api) {
        this._container = container;
        this._createCard = createCard;
        this._cardTemplate = cardTemplate;
        this._template = template;
        this._api = api;
        this._cardlist = [];
    }

    createList = (cardList) => {
        cardList.forEach(card => {
            this._addCard(card);
        })
    }

    checkCards = () => {
        this._cardlist.forEach(card => {
            card._checkMyLike();
            card._checkDeleteAbility();
        })
    }

    _addCard = (cardData) => {
        const cardObj = this._createCard(cardData, this._cardTemplate, this._popup, this._api);
        this._cardlist.push(cardObj);
        cardObj.create(this._view);
    }

    render = () => {
        this._view = this._template.content.cloneNode(true).children[0];
        this._container.append(this._view);
    }

    connectPopup (popupObject) {
        this._popup = popupObject;
    }
}
