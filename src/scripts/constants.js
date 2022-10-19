const pageElements = {
    page: document.querySelector('.root'),
    authorizationButton: document.querySelector('#authorize-button'),
    logoutButton: document.querySelector('#logout-button'),
    profileRootSection: document.querySelector('.profile'),
}

const templates = {
    addCard: document.querySelector('#addcard-template'),
    profile: document.querySelector('#edit-profile-template'),
    image: document.querySelector('#image-template'),
    avatar: document.querySelector('#avatar-upload-template'),
    login: document.querySelector('#login-template'),
    registration: document.querySelector('#registration-template'),
    success: document.querySelector('#success-template'),
    cardTemplate: document.querySelector('#place-card-template'),
    cardListTemplate: document.querySelector('#places-list-template'),
    profileSection: document.querySelector('#profile-section-template'),
}

const baseUrl = NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://api.yapr-mestoapp.tk/';

const userInfoButtons = {
    authorizationButton: pageElements.authorizationButton,
    logoutButton: pageElements.logoutButton
}

const validationErrorMessages = {
    emptyInput: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    urlTypeMismatch: 'Здесь должна быть ссылка',
    emailTypeMismatch: 'Введите корректный e-mail адрес'
  }

module.exports = {
    baseUrl,
    userInfoButtons,
    templates,
    pageElements,
    validationErrorMessages
}