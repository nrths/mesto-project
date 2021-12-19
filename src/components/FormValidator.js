export default class FormValidator {
    constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = document.querySelector(`${formElement}`);
      this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
      this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);   
    }

  // проверка валидности всех полей ввода
  _isFormValid () {
    this._inputList.every(inputElement => inputElement.validity.valid);
  };
  // наличие невалидного инпута
  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // поиск спана с ошибкой
  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  // отображение ошибки валидации поля ввода
  _showInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  // скрытие ошибки валидации поля ввода
  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';   
  };

  // валидация поля ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  };
  
  // переключение состояния кнопки, в зависимости от валидности полей ввода
  _toggleButtonState () {
    
    if(this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._activeButton();
    }
  };
 
  _disableButton() {
    this._submitButton.disabled = true;
  }
  
  _activeButton(){
    this._submitButton.disabled = false;
  }
  
  // добавление слушателей всем полям ввода
  _setEventListeners () {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
      
      // слушатель и сброс валидации (наверное forEach + _hideInputError)

      //this._isFormValid();
      this._toggleButtonState();
    });
  };

  // включение валидации полей ввода 
  enableValidation() {
    this._setEventListeners();
  }

}