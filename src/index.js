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
const api = new Api(baseUrl);
const placesList = new Cardlist(templates.cardListTemplate, pageElements.page, createCard, templates.cardTemplate, api);
const popup = new Popup(templates, createFormValidator, pageElements.page, placesList, api, validationErrorMessages);
const userInfo = new UserInfo(templates.profileSection, pageElements.profileRootSection, userInfoButtons, popup);

popup.connectUserInfo(userInfo);
placesList.connectPopup(popup);
placesList.render();

if (localStorage.isLoggedIn) {
    userInfo.render();
    api.getUserData()
        .then (userData => {
            userInfo.setUserInfo(userData);
            userInfo.updateUserInfo();
        })
        .catch (err => {
            console.log(err);
        })
    userInfo.showLogoutButton();
    
}

api.loadDefaultCards()
    .then(defaultCards => {
        placesList.createList(defaultCards);
    })

pageElements.authorizationButton.addEventListener('click', popup.openHandler);
pageElements.logoutButton.addEventListener('click', () => {
    userInfo.logout();
    placesList.checkCards();
})