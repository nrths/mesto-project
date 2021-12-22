import { popupOpenedClass, popupSubmitSelector } from "../utils/constants";

export default class Popup {
    constructor (popupSelector) {
        this._element = document.querySelector(popupSelector);
        this.submitButton = this._element.querySelector(popupSubmitSelector)
    }

    open() {
        this._element.classList.add(popupOpenedClass);
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._element.classList.remove(popupOpenedClass);
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  textLoading(isLoading) {
    this.submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

    setEventListeners () {
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__button_assignment_close') || evt.target.classList.contains(popupOpenedClass)) {
              this.close();
            };
        });
    }
};