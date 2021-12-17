import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);

        this._img = this._element.querySelector('.popup__figure-image');
        this._title = this._element.querySelector('.popup__figcaption');
    }

    open(item) {
        super.open();

        this._img.src = item.link;
        this._title.textContent = item.name;
        this._img.alt = item.name;
        
    }
}