export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const about = this._aboutElement.textContent;
        this._profileArray = {};
        this._profileArray.name = name;
        this._profileArray.about = about;
        return this._profileArray;
    }

    setUserInfo(name, about, avatar) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.src = avatar;   
    }

    // может не надо?
    getId() {
        return this._id = userId;
    }
    

    



}