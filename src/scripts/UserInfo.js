export class UserInfo {

    constructor (dataContainer, buttonsContainer) {
        this._dataContainer = dataContainer;
        this._logoutContainer = buttonsContainer.querySelector('#logout-name');
        this._authButton = buttonsContainer.querySelector('#authorize-button');
        this._logoutButton = buttonsContainer.querySelector('#logout-button');
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
        this._logoutContainer.textContent = this._name;
    }

    switchButtonsOnLogin = () => {
        this._authButton.classList.add('header__bordered-button_hidden');
        this._logoutButton.classList.remove('header__bordered-button_hidden');
    }

    switchButtonsOnLogoff = () => {
        this._authButton.classList.remove('header__bordered-button_hidden');
        this._logoutButton.classList.add('header__bordered-button_hidden');
    }

    logout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        // eslint-disable-next-line no-restricted-globals
        location.href = 'index.html';
        this.switchButtonsOnLogoff();
    }
}