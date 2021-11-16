// общие функции для всех модальных окон

// функция открытия модального окна, добавление слушателя закрытия по esc
function openPopupFunc(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEsc);
}; 

// функция закрытия модального окна, удаление слушателя закрытия по esc
function closePopupFunc(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
}; 

// функция закрытия попапа нажатием Esc
function closePopupOnEsc (evt) {
    if (evt.key === 'Escape') {
      closePopupFunc(document.querySelector('.popup_opened'));
    }
};

export { openPopupFunc, closePopupFunc, closePopupOnEsc }
  
  

  
  
  