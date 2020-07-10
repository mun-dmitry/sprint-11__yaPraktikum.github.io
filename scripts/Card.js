class Card {

    constructor (cardData, template, popupObject, api) {
        this._cardData = cardData;
        this._template = template;
        this._popup = popupObject;
        this._api = api;

        this._view = this._template.content.cloneNode(true).children[0];
        this._view.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        this._view.querySelector('.place-card__delete-icon').addEventListener('click', this._removeHandler);
        this._view.querySelector('.place-card__image').addEventListener('click', this._popup.openHandler);
    }

    _like = () => {
        this._api.likeCard(this)
            .then (cardData => {
                this._view.querySelector('.place-card__likes-counter').textContent = cardData.likes.length;
                this._view.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
                this._view.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
                this._view.querySelector('.place-card__like-icon').addEventListener('click', this._dislike);
            })
            .catch (err => {
                console.log(err);
            });
    }

    _dislike = () => {
        this._api.dislikeCard(this)
            .then (cardData => {
                this._view.querySelector('.place-card__likes-counter').textContent = cardData.likes.length;
                this._view.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
                this._view.querySelector('.place-card__like-icon').removeEventListener('click', this._dislike);
                this._view.querySelector('.place-card__like-icon').addEventListener('click', this._like);
            })
            .catch (err => {
                console.log(err);
            })
    }

    _removeHandler = (event) => {
        event.stopPropagation();
        if (window.confirm("I am just a script written by one JS-monkey, so don't ask much. Human confirmation to delete needed.")) { 
            this._api.deleteCard(this)
                .then (() => {
                    this._view.remove();
                })
                .catch (err => {
                    console.log(err);
                });
        }
    }
    
    _checkMyLike = () => {
        this._isLiked = this._cardData.likes.some(like => {
            return (like._id == this._api._myId)
        })
        if (this._isLiked) {
            this._view.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
            this._view.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
            this._view.querySelector('.place-card__like-icon').addEventListener('click', this._dislike);
        }
    }

    _checkDeleteAbility = () => {
      console.log(this._api._myId, this._cardData.owner._id);
        if (this._cardData.owner._id == this._api._myId) {
            this._view.querySelector('.place-card__delete-icon').style.display = 'block';
        }
    }

    create = (parentObject) => {
        this._view.querySelector('.place-card__name').textContent = this._cardData.name;
        this._view.querySelector('.place-card__image').style.backgroundImage = `url(${this._cardData.link})`;
        this._view.querySelector('.place-card__likes-counter').textContent = this._cardData.likes.length;
        this._checkDeleteAbility();
        this._checkMyLike();

        parentObject.append(this._view);
    }

}
