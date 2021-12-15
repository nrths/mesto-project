import { every } from 'core-js/core/array';
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor (popupSelector, handlerSubmitForm) {
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._element.querySelector('.popup__container');
        this._inputList = this._element.querySelectorAll('.form__item');
        this._button = this._element.querySelector('.popup__submit');
    }

    _getInputValues() {
        this.inputValues = {};
        this._inputList.forEach((input) => {
            this.inputValues[input.name] = input.value
        });

        return this.inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerSubmitForm();
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}