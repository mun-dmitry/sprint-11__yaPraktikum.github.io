import {Api} from './scripts/Api.js';
import {Card} from './scripts/Card.js';
import {Cardlist} from './scripts/Cardlist.js';
import {FormValidator} from './scripts/FormValidator.js';
import {Popup} from './scripts/Popup.js';
import {UserInfo} from './scripts/UserInfo.js';
import { pageElements, baseUrl, userInfoButtons, templates, validationErrorMessages } from './scripts/constants'
import './pages/index.css';

const createCard = (...arg) => new Card(...arg);
const createFormValidator = (...arg) => new FormValidator(...arg);
const userInfo = new UserInfo(pageElements.userInfoDataContainer, userInfoButtons);
const api = new Api(baseUrl);
const placesList = new Cardlist(templates.cardListTemplate, pageElements.page, createCard, templates.cardTemplate, api);
const popup = new Popup(templates, createFormValidator, userInfo, pageElements.userInfoDataContainer, pageElements.page, placesList, api, validationErrorMessages);

placesList.uploadPopup(popup);
placesList.render();

if (localStorage.isLoggedIn) {
    api.getUserData()
        .then (userData => {
            userInfo.setUserInfo(userData);
            userInfo.updateUserInfo();
        })
        .catch (err => {
            console.log(err);
        })
    
    userInfo.showLogoutButton();
    pageElements.logoutButton.addEventListener('click', userInfo.logout)
}

api.loadDefaultCards()
    .then (defaultCards => {
        defaultCards.forEach(card => {placesList.addCard(card)});
    })
    .catch (err => {
        console.log(err);
    });

pageElements.addCardButton.addEventListener('click', popup.openHandler);
pageElements.profileEditButton.addEventListener('click', popup.openHandler);
pageElements.avatarUploadButton.addEventListener('click', popup.openHandler);
pageElements.authorizationButton.addEventListener('click', popup.openHandler);