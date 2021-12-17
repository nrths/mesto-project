export default class FormValidator {
    constructor(config, selector) {
        this._config = config;
        this._selector = selector;
        this._inputList = Array.from(this._selector.querySelectorAll(config.inputSelector));
        this._button = this._selector.querySelector(config.submitButtonSelector);
    }

    enableValidation() {
      this._setEventListeners();
    }

  //   clear() {
  //     this._inputList.forEach((inputElement) => {
  //       const errorElement = this._selector.querySelector(`#${inputElement.id}-error`);
  //         this._hideInputError(errorElement, inputElement);
  //       });
  //     this._toggleButtonState();
  // }
  
   // добавление слушателей всем полям ввода
   _setEventListeners () {
    this._selector.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        // check each input is valid
        this._checkInputValidity(inputElement);
        // toggle button state
        this._toggleButtonState();
      })
      this._toggleButtonState();
    });
  };

  // валидация поля ввода
  _checkInputValidity(inputElement) {
    const errorElement = this._selector.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    };
  };

    // проверка валидности всех полей ввода (проверить аргумент)
  _isFormValid (inputList) {
      this._inputList.every(inputElement => inputElement.validity.valid);
    };

    // отображение ошибки валидации поля ввода
  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  // скрытие ошибки валидации поля ввода
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';   
  };

  _hasInvalidInput(){
    return this._inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
  });
}
  // переключение состояния кнопки, в зависимости от валидности полей ввода
  _toggleButtonState () {
    if(this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._activeButton();
    }
  };
 
  _disableButton() {
    this._button.setAttribute('disabled', true);
  }
  
  _activeButton(){
    this._button.removeAttribute('disabled', false);
  }
  
}