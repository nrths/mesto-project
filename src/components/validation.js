// валидация форм
  
// включение валидации полей ввода всех форм
export const enableValidation = (config) => {

  // проверка валидности всех полей ввода 
  const isFormValid = (inputList) => inputList
  .every(inputElement => inputElement.validity.valid);

  // поиск спана с ошибкой
  const getErrorElement = (inputElement, formElement) => 
  formElement.querySelector(`#${inputElement.id}-error`);

  // отображение ошибки валидации поля ввода
  function showInputError(inputElement, formElement) {
    const errorElement = getErrorElement(inputElement, formElement);

    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
  };

  // скрытие ошибки валидации поля ввода
  const hideInputError = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);    
  };

  // переключение состояния кнопки, в зависимости от валидности полей ввода
  const toggleButtonState = (submitButton, inputList) => {
    if (isFormValid(inputList)) {
      enableSubmitButton(submitButton);
    } else {
      disableSubmitButton(submitButton);
    };
  };

  // валидация поля ввода
  const checkInputValidity = (inputElement, formElement) => {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, formElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement, formElement);
    };
  };

  // добавление слушателей всем полям ввода
  const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); //find all inputs
    const submitButton = formElement.querySelector(config.submitButtonSelector); // find submit button

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        // check each input is valid
        checkInputValidity(inputElement, formElement);
        // toggle button state
        toggleButtonState(submitButton, inputList);
      })
    });

    toggleButtonState(submitButton, inputList); // initial button 
  };

  const formList = Array.from(document.querySelectorAll(config.formSelector)); // find all forms
      
  formList.forEach((formElement) => {
    setEventListeners(formElement); // set evt lesteners each form
  });
};

export const enableSubmitButton = (submitButton) => {
  submitButton.disabled = false;
};

export const disableSubmitButton = (submitButton) => {
  submitButton.disabled = true;
};