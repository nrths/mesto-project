export default class Api {
    constructor ({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // _getResponse = (res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return Promise.reject(`Ошибка: ${res.status}`);
    // }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, { 
            headers: this._headers,
        }).then(this._getResponse); // возможно вызвать как функцию
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._getResponse);
    }

    patchUser(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name, 
                about: about,
            }),
        }).then(this._getResponse);
    };
    
    patchAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        }).then(this._getResponse);
    };

    postCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        }).then(this._getResponse);
    };

   deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this_.headers,
        }).then(this._getResponse);
    };

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._getResponse);
    };

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._getResponse);
    };
};