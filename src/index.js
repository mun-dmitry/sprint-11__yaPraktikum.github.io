import {Api} from './scripts/Api.js';
import {Card} from './scripts/Card.js';
import {Cardlist} from './scripts/Cardlist.js';
import {FormValidator} from './scripts/FormValidator.js';
import {Popup} from './scripts/Popup.js';
import {UserInfo} from './scripts/UserInfo.js';
import {validationErrorMessages} from './scripts/validationErrorMessages.js';
import './pages/index.css';

const page = document.querySelector('.root');
const addCardButton = document.querySelector('.user-info__button');
const profileEditButton = document.querySelector('.user-info__edit-button');
const avatarUploadButton = document.querySelector('.user-info__photo');
const authorizationButton = document.querySelector('#authorize-button');
const createCard = (...arg) => new Card(...arg);
const createFormValidator = (...arg) => new FormValidator(...arg);
const userInfoDataContainer = document.querySelector('.user-info');
const cardTemplate = document.querySelector('#place-card-template');
const cardListTemplate = document.querySelector('#places-list-template');
const popupTemplates = {
    addCard: document.querySelector('#addcard-template'),
    profile: document.querySelector('#edit-profile-template'),
    image: document.querySelector('#image-template'),
    avatar: document.querySelector('#avatar-upload-template'),
    login: document.querySelector('#login-template'),
    registration: document.querySelector('#registration-template'),
    success: document.querySelector('#success-template'),
}
const apiProperties = {
    baseUrl: NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://api.yapr-mestoapp.tk/',
    token: '8ab3f6fe-db55-4026-9a8e-96b5421c8f61',
}

const userInfo = new UserInfo(userInfoDataContainer);
const api = new Api(apiProperties);
const placesList = new Cardlist(cardListTemplate, page, createCard, cardTemplate, api);
const popup = new Popup(popupTemplates, createFormValidator, userInfo, userInfoDataContainer, page, placesList, api, validationErrorMessages);

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
authorizationButton.addEventListener('click', popup.openHandler);