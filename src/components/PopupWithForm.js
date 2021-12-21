
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
            this._inputValues[input.name] = input.value
        });
        return this._inputValues;
    }

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