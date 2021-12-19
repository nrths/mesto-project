export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.aboutElement = document.querySelector(aboutSelector);
        this.avatarElement = document.querySelector(avatarSelector);
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
}