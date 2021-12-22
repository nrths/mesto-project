

export default class Popup {
    constructor (popupSelector, popupConfig) {
        this._popupConfig = popupConfig;
        this._element = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._element.classList.add(this._popupConfig.popupOpenedClass);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._element.classList.remove(this._popupConfig.popupOpenedClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

    setEventListeners () {
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._popupConfig.popupButtonCloseClass) || evt.target.classList.contains(this._popupConfig.popupOpenedClass)) {
              this.close();
            };
        });
    }
};