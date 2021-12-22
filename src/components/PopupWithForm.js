import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor (popupSelector, popupConfig, { handlerSubmitForm }) {
        super(popupSelector, popupConfig);
        this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._element.querySelector(popupConfig.popupFormSelector);
        this._inputList = this._form.querySelectorAll(popupConfig.popupInputSelector);
        this.submitButton = this._form.querySelector(popupConfig.popupSubmitSelector);        
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value
        });
        return this._inputValues;
    }

    renderLoading(isLoading, buttonText='Сохранить') {
        if (this.submitButton) {
        this.submitButton.textContent = isLoading ? 'Сохранение...' : buttonText;
    }}

    setEventListeners() {
        super.setEventListeners();        
        this._form.addEventListener('submit', () => {
            this._handlerSubmitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}