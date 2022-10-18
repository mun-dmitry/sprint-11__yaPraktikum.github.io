export class Api {
    constructor (baseUrl) {
        this._baseURL = baseUrl;
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
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then (userData => userData.data)
    }

    loadDefaultCards () {
        return fetch (`${this._baseURL}cards`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        })
            .then (res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then (response => (response.data))
    }

    changeUserInfo (userData) {
        return fetch(`${this._baseURL}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
                    return Promise.reject(res);
                }
            })
            .then (response => response.data);
    }

    addCard (cardData) {
        return fetch(`${this._baseURL}cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
            .then (response => response.data);
    }

    signIn (credentials) {
        return fetch(`${this._baseURL}signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.message)))
            .then((data) => data)
    }

    signUp(userData) {
        return fetch(`${this._baseURL}signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar,
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res.message);
          })
          .then((data) => data)
    }
}