export default class Api {
    constructor ({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._getResponse = (res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`)
          }
        }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, { 
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }

    patchUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name, 
                about: data.about
            })
        }).then((res) => this._getResponse(res));
    };
    
    patchAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then((res) => this._getResponse(res));
    };

    postCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((res) => this._getResponse(res));
    };

   deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    };

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    };

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    };
};