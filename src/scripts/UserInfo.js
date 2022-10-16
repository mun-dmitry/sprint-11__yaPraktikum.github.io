export class UserInfo {

    constructor (dataContainer) {
        this._dataContainer = dataContainer;
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
    }
}