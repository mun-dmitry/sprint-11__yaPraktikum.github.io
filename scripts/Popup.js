class Popup {

    constructor (templates, createFormValidator, userInfo, userInfoDataContainer, parentObject, cardList, api) {
        this._createFormValidator = createFormValidator;
        this._userInfo = userInfo;
        this._userInfoDataContainer = userInfoDataContainer;
        this._templates = templates;
        this._parentObject = parentObject;
        this._cardList = cardList;
        this._api = api;
    }

    openHandler = (event) => {
        if (event.target.classList.contains('user-info__button')) {
            this._view = this._templates.addCard.content.cloneNode(true).children[0];
            this._setFormValidator();
            this._view.querySelector('.popup__button').addEventListener('click', this._submitAddCardForm);
        } else if (event.target.classList.contains('user-info__edit-button')) {
            this._view = this._templates.profile.content.cloneNode(true).children[0];
            this._setFormValidator();
            this._view.querySelector('#profile-form').elements.name.value = this._userInfoDataContainer.querySelector('.user-info__name').textContent;
            this._view.querySelector('#profile-form').elements.about.value = this._userInfoDataContainer.querySelector('.user-info__job').textContent;
            this._view.querySelector('.popup__button').addEventListener('click', this._submitProfileForm);
        } else if (event.target.classList.contains('place-card__image')) {
            this._view = this._templates.image.content.cloneNode(true).children[0];
            const imageUrl = event.target.style.backgroundImage.substr(5, event.target.style.backgroundImage.length - 7);
            this._view.querySelector('.popup__image').setAttribute('src', imageUrl);
        } else if (event.target.classList.contains('user-info__photo')) {
            this._view = this._templates.avatar.content.cloneNode(true).children[0];
            this._setFormValidator();
            this._view.querySelector('.popup__button').addEventListener('click', this._uploadAvatar);
        }

        this._view.classList.add('popup_is-opened');
        this._setEventListeners();
        this._parentObject.append(this._view);
    }

    _close = () => {
        this._view.remove();
    }

    _onEscCloser = (event) => {
        if (event.keyCode == 27) {
            this._close();
        }
    }

    _setFormValidator = () => {
        const formValidator = this._createFormValidator(this._view.querySelector('form'), validationErrorMessages);
        formValidator.setEventListeners();
        formValidator.setSubmitButtonState();
    }

    _animateLoadingButton = () => {
        this._loadingButton = this._view.querySelector('.popup__button');
        this._loadingButton.style.fontSize = '18px';
        this._loadingButton.textContent = 'Загрузка...';
    }

    _submitAddCardForm = () => {
        const cardData = [];
        cardData.name = this._view.querySelector('form').elements.name.value;
        cardData.link = this._view.querySelector('form').elements.link.value;
        this._animateLoadingButton();
        this._api.addCard(cardData)
            .then (card => {
                this._cardList.addCard(card);
            })
            .catch (err => {
                console.log(err);
            })
            .finally (() => {
                this._close();
            })
    }

    _submitProfileForm = () => {
        const userData =[];
        userData.name = this._view.querySelector('form').elements.name.value;
        userData.about = this._view.querySelector('form').elements.about.value;
        this._animateLoadingButton();
        this._api.changeUserInfo(userData)
            .then (userData => {
                this._userInfo.setUserInfo(userData);
                this._userInfo.updateUserInfo();
            })
            .catch (err => {
                console.log(err);
            })
            .finally (() => {
                this._close();
            })
    }

    _uploadAvatar = () => {
        const link = this._view.querySelector('form').elements.link.value;
        this._animateLoadingButton();
        this._api.uploadNewAvatar(link)
            .then (userData => {
                this._userInfo.setUserInfo(userData);
                this._userInfo.updateUserInfo(userData);
            })
            .catch (err => {
                console.log(err);
            })
            .finally (() => {
                this._close();
            });
    }

    _setEventListeners = () => {
        this._view.querySelector('.popup__close').addEventListener('click', this._close);
        this._parentObject.addEventListener('keydown', this._onEscCloser);
    }
}
