export class UserInfo {

    constructor (dataContainer, buttons) {
        this._dataContainer = dataContainer;
        this._buttons = buttons;
    }

    setUserInfo = (userData) => {
        this._name = userData.name;
        this._about = userData.about;
        this._avatar = userData.avatar;
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
        this.showAuthorizationButton();
    }
}