import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this.img = this._element.querySelector('.element__image');
        this.title = this._element.querySelector('.element__title');
    }

    open (card) {
        this.img.src = card.link;
        this.title.textContent = card.name;
        this.img.alt = card.name;

        super.open();
    }
}