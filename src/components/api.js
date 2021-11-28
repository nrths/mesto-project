const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    headers: {
        authorization: '3874ec8d-d96c-4b9e-9955-f2d143817211',
        'Content-type': 'application/json',
    },
};
// общаяя проверка
const getResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
};

// функции взаимодействия с профилем
// запрос информации о пользователе с сервера
const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
        .then(getResponse);
};
// редактирование профиля
const patchUser = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name, 
            about: about,
        }),
    })
    .then(getResponse);
};

// редактирование аватара
const patchAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url,
        }),
    })
    .then(getResponse);
};


// функции взаимодействия с карточками
// запрос карточек с сервера
const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(getResponse);
};

// добавление новой карточки
const postCard = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link,
        }),
    })
    .then(getResponse);
};

// удаление карточки
const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(getResponse)
};

// лайки
const putLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(getResponse)
};

const deleteLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(getResponse)
};


export { getResponse, getUser, patchUser, patchAvatar, getCards, postCard, deleteCard, putLike, deleteLike }