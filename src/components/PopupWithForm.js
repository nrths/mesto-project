
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor (popupSelector, {handlerSubmitForm}) {
        super(popupSelector);
        this.handlerSubmitForm = handlerSubmitForm;
        this._form = this._element.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__item');
        this._button = this._form.querySelector('.popup__submit');        
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
        this._button.addEventListener('submit', () => {
            this.handlerSubmitForm(this._getInputValues());
          });
    }

    close() {
        this._form.reset();
        super.close();
    }
}