export default class UserInfo {
    constructor(profileConfig) {
        this.nameElement = document.querySelector(profileConfig.userNameSelector);
        this.aboutElement = document.querySelector(profileConfig.userAboutSelector);
        this.avatarElement = document.querySelector(profileConfig.userAvatarSelector);
    }

    getUserInfo() {
        const currentUser = {
            name: this.nameElement.textContent,
            about: this.aboutElement.textContent,
            avatar: this.avatarElement.src
        }
        
        return currentUser;
    }

    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.aboutElement.textContent = data.about;
        this.avatarElement.src = data.avatar;
    }

    setUserID(id) {
        this._id = id;
    }

    getUserID() {
        return this._id;
    }
}