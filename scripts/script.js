const page = document.querySelector('.root');
const addCardButton = document.querySelector('.user-info__button');
const profileEditButton = document.querySelector('.user-info__edit-button');
const avatarUploadButton = document.querySelector('.user-info__photo');
const createCard = (...arg) => new Card(...arg);
const createFormValidator = (...arg) => new FormValidator(...arg);
const userInfoDataContainer = document.querySelector('.user-info');
const cardTemplate = document.querySelector('#place-card-template');
const cardListTemplate = document.querySelector('#places-list-template');
const popupTemplates = {
    addCard: document.querySelector('#addcard-template'),
    profile: document.querySelector('#edit-profile-template'),
    image: document.querySelector('#image-template'),
    avatar: document.querySelector('#avatar-upload-template')
}
const apiProperties = {
    baseUrl: 'https://praktikum.tk/cohort11/',
    token: '8ab3f6fe-db55-4026-9a8e-96b5421c8f61',
}

const userInfo = new UserInfo(userInfoDataContainer);
const api = new Api(apiProperties);
const placesList = new Cardlist(cardListTemplate, page, createCard, cardTemplate, api);
const popup = new Popup(popupTemplates, createFormValidator, userInfo, userInfoDataContainer, page, placesList, api);

placesList.uploadPopup(popup);
placesList.render();

api.getUserData()
    .then (userData => {
        userInfo.setUserInfo(userData);
        userInfo.updateUserInfo();
    })
    .catch (err => {
        console.log(err);
    })

api.loadDefaultCards()
    .then (defaultCards => {
        defaultCards.forEach(card => {placesList.addCard(card)});
    })
    .catch (err => {
        console.log(err);
    });

addCardButton.addEventListener('click', popup.openHandler);
profileEditButton.addEventListener('click', popup.openHandler);
avatarUploadButton.addEventListener('click', popup.openHandler);

/**
 * Отлично, помимо основых замечаний были исправлены и дополнительные.
 * Работа принята, желаю успехов в дальнейшем обучении!
 */