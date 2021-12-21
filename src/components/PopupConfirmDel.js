import Popup from "./Popup";

export default class PopupConfirmDel extends Popup{
    constructor (popupSelector, handleSubmit) {
        super(popupSelector)
        this._handleSubmit = this._handleSubmit;
        this._handleSubmitButton = this._handleSubmitButton.bind(this);
    }

    open() {
        super.open();


    }
}