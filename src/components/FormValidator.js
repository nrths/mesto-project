export default class FormValidator {
    constructor(config, selector) {
        this._element = document.querySelector(selector);
        this._inputList = Array.from(this._element.querySelectorAll(config.inputSelector));
        this._button = this._element.querySelector(config.submitButtonSelector);
        this._inputErrorClass = config._inputErrorClass;
    }

    // проверка валидности всех полей ввода (проверить аргумент)
  _isFormValid (_inputList) {
      this._inputList.every(inputElement => inputElement.validity.valid);
    };

    // отображение ошибки валидации поля ввода
  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  // скрытие ошибки валидации поля ввода
  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);    
  };

  // переключение состояния кнопки, в зависимости от валидности полей ввода
  _toggleButtonState = () => {
    if (isFormValid(_inputList)) {
        this._button.disabled = false;
    } else {
        this._button.disabled = true;
    };
  };

  // валидация поля ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    };
  };

  // добавление слушателей всем полям ввода
  _setEventListeners = () => {
    this._toggleButtonState();
    this._element.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        // check each input is valid
        this._checkInputValidity(inputElement);
        // toggle button state
        this._toggleButtonState();
      })
    });
  };

  _clear() {
      this._inputList.forEach((inputElement) => this.__hideInputError(inputElement));
      this._toggleButtonState();
  }
}