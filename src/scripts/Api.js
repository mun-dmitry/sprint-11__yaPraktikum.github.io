export class Api {
    constructor (apiProperties) {
        this._baseURL = apiProperties.baseUrl;
        this._token = apiProperties.token;
    }

    /**
     * Можно лучше:
     * Перенести общую часть с fetch и
     *             .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })

     в отдельный метод и использовать его. Тогда в классе не будет дублирующихся частей и исчезнет риск где-то
     пропустить этот участок или ошибиться в нем.
     */

  getUserData () {
        return fetch (`${this._baseURL}users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then (userData => {
                this._myId = userData._id;
                return userData;
            })
    }

    loadDefaultCards () {
        return fetch (`${this._baseURL}cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    changeUserInfo (userData) {
        return fetch(`${this._baseURL}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    addCard (cardData) {
        return fetch(`${this._baseURL}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    deleteCard (card) {
        return fetch(`${this._baseURL}cards/${card._cardData._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    likeCard (card) {
        return fetch(`${this._baseURL}cards/like/${card._cardData._id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    dislikeCard (card) {
        return fetch(`${this._baseURL}cards/like/${card._cardData._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    uploadNewAvatar (link) {
        return fetch(`${this._baseURL}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }
}