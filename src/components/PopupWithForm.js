
import { popupSubmitSelector, validationConfig } from '../utils/constants.js';
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor (popupSelector, { handlerSubmitForm }) {
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._element.querySelector(validationConfig.formSelector);
        this._inputList = this._form.querySelectorAll(validationConfig.inputSelector);
        this._button = this._form.querySelector(popupSubmitSelector);        
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