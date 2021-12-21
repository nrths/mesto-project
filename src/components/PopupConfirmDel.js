import Popup from "./Popup";

export default class PopupConfirmDel extends Popup{
    constructor (popupSelector, {handleSubmit}) {
        super(popupSelector)
        this._handleSubmit = handleSubmit;
        this.submitButton = this._element.querySelector('.popup__submit');
    }

    textLoading(isLoading, buttonText='Да') {
        if (isLoading) {
            this.submitButton.textContent = 'Удаление...';
        } else {
            this.submitButton.textContent = buttonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this.submitButton.addEventListener('click', this._handleSubmit)
    }
}