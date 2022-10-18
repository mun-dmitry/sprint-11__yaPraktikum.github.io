export class Popup {

    constructor (templates, createFormValidator, userInfo, userInfoDataContainer, parentObject, cardList, api, validationErrorMessages) {
        this._createFormValidator = createFormValidator;
        this._userInfo = userInfo;
        this._userInfoDataContainer = userInfoDataContainer;
        this._templates = templates;
        this._parentObject = parentObject;
        this._cardList = cardList;
        this._api = api;
        this._validationErrorMessages = validationErrorMessages;
    }

    openHandler = (event) => {
        if (event.target.classList.contains('user-info__button')) {
            this._openAddCardPopup();
        } else if (event.target.classList.contains('user-info__edit-button')) {
            this._openUserInfoEditPopup();
        } else if (event.target.classList.contains('place-card__image')) {
            this._openImagePopup(event);
        } else if (event.target.classList.contains('user-info__photo')) {
            this._openAvatarUploadPopup();
        } else if (event.target.classList.contains('header__bordered-button')) {
            this._openLoginPopup();
        }
    }

    _close = () => {
        this._view.remove();
    }

    _onEscCloser = (event) => {
        if (event.keyCode == 27) {
            this._close();
        }
    }

    _onOutsideClickCloser = (event) => {
        if (event.target.classList.contains('popup')) {
          this._close();
        }
      }

    _switchPopup = (event) => {
        this._close();
        if(!event) {
            this._openSuccessPopup();   
        } else if (event.target.innerText === 'Войти') {
            this._openLoginPopup();
        } else if (event.target.innerText === 'Зарегистрироваться') {
            this._openRegistrationPopup();
        }
    }

    _openAddCardPopup = () => {
        this._view = this._templates.addCard.content.cloneNode(true).children[0];
        this._setFormValidator();
        this._view.querySelector('.popup__button').addEventListener('click', this._submitAddCardForm);
        this._setState();
    }

    _openUserInfoEditPopup = () => {
        this._view = this._templates.profile.content.cloneNode(true).children[0];
        this._setFormValidator();
        this._view.querySelector('#profile-form').elements.name.value = this._userInfoDataContainer.querySelector('.user-info__name').textContent;
        this._view.querySelector('#profile-form').elements.about.value = this._userInfoDataContainer.querySelector('.user-info__job').textContent;
        this._view.querySelector('.popup__button').addEventListener('click', this._submitProfileForm);
        this._setState();
    }

    _openImagePopup = (event) => {
        this._view = this._templates.image.content.cloneNode(true).children[0];
        const imageUrl = event.target.style.backgroundImage.substr(5, event.target.style.backgroundImage.length - 7);
        this._view.querySelector('.popup__image').setAttribute('src', imageUrl);
        this._setState();
    }

    _openAvatarUploadPopup = () => {
        this._view = this._templates.avatar.content.cloneNode(true).children[0];
        this._setFormValidator();
        this._view.querySelector('.popup__button').addEventListener('click', this._submitAvatarForm);
        this._setState();
    }

    _openLoginPopup = () => {
        this._view = this._templates.login.content.cloneNode(true).children[0];
        this._setFormValidator();
        this._view.querySelector('.popup__link').addEventListener('click', this._switchPopup);
        this._view.querySelector('.popup__button').addEventListener('click', this._submitLoginForm);
        this._setState();
    }

    _openRegistrationPopup = () => {
        this._view = this._templates.registration.content.cloneNode(true).children[0];
        this._setFormValidator();
        this._view.querySelector('.popup__link').addEventListener('click', this._switchPopup);
        this._view.querySelector('.popup__button').addEventListener('click', this._submitRegistrationForm);
        this._setState();
    }

    _openSuccessPopup = () => {
        this._view = this._templates.success.content.cloneNode(true).children[0];
        this._view.querySelector('.popup__link').addEventListener('click', this._switchPopup);
        this._setState();
    }

    _setFormValidator = () => {
        const formValidator = this._createFormValidator(this._view.querySelector('form'), this._validationErrorMessages);
        formValidator.setEventListeners();
        formValidator.setSubmitButtonState();
    }

    _animateLoadingButton = () => {
        this._loadingButton = this._view.querySelector('.popup__button');
        this._loadingButton.style.fontSize = '18px';
        this._loadingButton.textContent = 'Загрузка...';
    }

    _submitAddCardForm = () => {
        const cardData = {};
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
        const userData ={};
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

    _submitAvatarForm = () => {
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

    _submitLoginForm = () => {
        this._view.querySelector('.popup__button').setAttribute('disabled', true);
        const credentials = {
            email: this._view.querySelector('form').elements.email.value,
            password: this._view.querySelector('form').elements.password.value,
        }
        this._animateLoadingButton();
        this._api.signIn(credentials)
            .then((data) => {
                this._view.querySelector('.popup__button').removeAttribute('disabled');
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('myId', data.id);
                    this._api.getUserData()
                        .then(data => {
                            this._userInfo.setUserInfo(data);
                            this._userInfo.updateUserInfo();
                            this._userInfo.showLogoutButton();
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this._close();
            })
    }

    _submitRegistrationForm = () => {
        this._view.querySelector('.popup__button').setAttribute('disabled', true);
        const userData = {
            email: this._view.querySelector('form').elements.email.value,
            password: this._view.querySelector('form').elements.password.value,
            about: this._view.querySelector('form').elements.about.value,
            avatar: this._view.querySelector('form').elements.avatar.value,
            name: this._view.querySelector('form').elements.name.value,
        }
        this._animateLoadingButton();
        this._api.signUp(userData)
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this._switchPopup();
            })
    }

    _setEventListeners = () => {
        this._view.querySelector('.popup__close').addEventListener('click', this._close);
        window.addEventListener('keydown', this._onEscCloser);
        this._view.addEventListener('click', this._onOutsideClickCloser);
    }

    _setState = () => {
        this._view.classList.add('popup_is-opened');
        this._setEventListeners();
        this._parentObject.append(this._view);
    }
}