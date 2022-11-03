export class UserInfo {

    constructor (template, parentElement, buttons, popupObject) {
        this._template = template;
        this._parentElement = parentElement;
        this._buttons = buttons;
        this._popup = popupObject;
    }

    render = () => {
        this._view = this._template.content.cloneNode(true).children[0];
        this._parentElement.append(this._view);
        this._dataContainer = document.querySelector('.user-info');
        this._setListeners();
    }

    setUserInfo = (userData) => {
        this._name = userData.name;
        this._about = userData.about;
        this._avatar = userData.avatar;
    }

    returnValue = (value) => {
        switch (value) {
            case 'name': return this._name;
            case 'about': return this._about;
            case 'avatar': return this._avatar;
            default: return null;
        }
    }

    updateUserInfo = () => {
        this._dataContainer.querySelector('.user-info__name').textContent = this._name;
        this._dataContainer.querySelector('.user-info__job').textContent = this._about;
        this._dataContainer.querySelector('.user-info__photo').style.backgroundImage = `url(${this._avatar})`;
        this._buttons.logoutButton.querySelector('#logout-name').textContent = this._name;
    }

    showLogoutButton = () => {
        this._buttons.logoutButton.classList.remove('header__bordered-button_hidden');
        this._buttons.authorizationButton.classList.add('header__bordered-button_hidden');
    }

    showAuthorizationButton = () => {
        this._buttons.authorizationButton.classList.remove('header__bordered-button_hidden');
        this._buttons.logoutButton.classList.add('header__bordered-button_hidden');
    }

    logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('myId');
        this._view.remove();
        this.showAuthorizationButton();
    }

    _setListeners = () => {
        this._view.querySelector('.user-info__button').addEventListener('click', this._popup.openHandler);
        this._view.querySelector('.user-info__edit-button').addEventListener('click', this._popup.openHandler);
        this._view.querySelector('.user-info__photo').addEventListener('click', this._popup.openHandler);
    }
}