export default class Popup {
    constructor (popupSelector) {
        this._element = document.querySelector(popupSelector);
    }

    open () {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close () {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

    setEventListeners () {
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__button_assignment_close') || evt.target.classList.contains('popup_opened')) {
              this.close();
            };
        });
    }
};