export class Api {
    constructor (baseUrl) {
        this._baseURL = baseUrl;
    }

    async _fetchFunction (adress, method, tokenFlag, body) {
        const res = await fetch(`${this._baseURL}${adress}`, {
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: tokenFlag ? `Bearer ${localStorage.getItem('token')}` : null,
            },
            body: body ? JSON.stringify(body) : null,
        });
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    async getUserData () {
        const response = await this._fetchFunction('users/me', 'GET', true);
        return response.data;
    }

    async loadDefaultCards () {
        const response = await this._fetchFunction('cards', 'GET', false);
        return response.data;
    }

    async changeUserInfo (userData) {
        const response = await this._fetchFunction('users/me', 'PATCH', true, userData);
        return response.data;
    }

    async addCard (cardData) {
        const response = await this._fetchFunction('cards', 'POST', true, cardData);
        return response.data;
    }

    async deleteCard (card) {
        const response = await this._fetchFunction(`cards/${card._cardData._id}`, 'DELETE', true);
        return response.data;
    }

    async likeCard (card) {
        const response = await this._fetchFunction(`cards/${card._cardData._id}/likes`, 'PUT', true);
        return response.data;
    }

    async dislikeCard (card) {
        const response = await this._fetchFunction(`cards/${card._cardData._id}/likes`, 'DELETE', true);
        return response.data;
    }

    async uploadNewAvatar (link) {
        const response = await this._fetchFunction('users/me/avatar', 'PATCH', true, { avatar: link });
        return response.data;
    }

    signIn (credentials) {
        return this._fetchFunction('signin', 'POST', false, credentials);
    }

    signUp(userData) {
        return this._fetchFunction('signup', 'POST', false, userData);
    }
}