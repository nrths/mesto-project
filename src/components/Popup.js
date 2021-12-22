import { popupOpenedClass, popupSubmitSelector } from "../utils/constants";

export default class Popup {
    constructor (popupSelector) {
        this._element = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._element.classList.add(popupOpenedClass);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._element.classList.remove(popupOpenedClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

    setEventListeners () {
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__button_assignment_close') || evt.target.classList.contains(popupOpenedClass)) {
              this.close();
            };
        });
    }
};