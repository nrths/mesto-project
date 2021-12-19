
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor (popupSelector, { handlerSubmitForm }) {
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._element.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__item');
        this._button = this._form.querySelector('.popup__submit');        
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();        
        this._button.addEventListener('submit', () => {
            this.handlerSubmitForm(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}