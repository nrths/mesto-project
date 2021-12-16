export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const about = this._aboutElement.textContent;
        
        return { name, about };
    }

    renderUserInfo(user) {
        this._nameElement.textContent = user.name;
        this._aboutElement.textContent = user.about;
        this._avatarElement.src = user.avatar;
        this._userId = user.userId;
    }

    setUserInfo(name, about, avatar, userId) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.src = avatar;
        this._userId = userId;   
    }

    getId() {
        return this._userId;
    }
}