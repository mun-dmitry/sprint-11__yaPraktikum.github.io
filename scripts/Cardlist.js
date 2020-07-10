class Cardlist {

    constructor (template, container, createCard, cardTemplate, api) {
        this._container = container;
        this._createCard = createCard;
        this._cardTemplate = cardTemplate;
        this._template = template;
        this._api = api;
    }

    addCard = (cardData) => {
        this._createCard(cardData, this._cardTemplate, this._popup, this._api).create(this._view);
    }

    render = (container) => {
        this._view = this._template.content.cloneNode(true).children[0];
        this._container.append(this._view);
    }

    uploadPopup (popupObject) {
        this._popup = popupObject;
    }
}
