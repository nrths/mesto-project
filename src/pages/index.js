import './index.css';
import { openPopupFunc, closePopupFunc } from '../components/modal.js';
import { photoGrid, makeNewCard, addNewCard } from '../components/cards.js';

const profileContainer = document.querySelector('.profile');
const placeAddButton = profileContainer.querySelector('.profile__add-button');
const editButton = profileContainer.querySelector('.profile__edit-button');

const placeAdd = document.querySelector('.popup__mode_place-add');
const placeForm = placeAdd.querySelector('.form[name="place-add-form"]');
const placeName = placeForm.querySelector('.form__item[name="place-name"]');
const placeLink = placeForm.querySelector('.form__item[name="place-link"]');
const placeSaveButton = placeAdd.querySelector('.popup__submit');

const profileEdit = document.querySelector('.popup__mode_profile-edit');
const profileEditForm = profileEdit.querySelector('.form[name="profile-edit-form"]');
const nameInput = profileEditForm.querySelector('.form__item[id="username"]');
const descriptionInput = profileEditForm.querySelector('.form__item[id="description"]');
const profileUsername = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileSubmitButton = profileEdit.querySelector('.popup__submit');

const popups = document.querySelectorAll('.popup');

// открытие модального окна редактирования личной информации
editButton.addEventListener('click', function () {
  openPopupFunc(profileEdit);
  nameInput.value = profileUsername.textContent;
  descriptionInput.value = profileDescription.textContent;
  profileSubmitButton.disabled = false;
});

// закрытие модального окна редактирования личной информации с сохранением (до перезагрузки)
function submitHandlerForm (evt) {
  evt.preventDefault();
  profileUsername.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  profileEditForm.reset(); 
  closePopupFunc(profileEdit);
}
profileEditForm.addEventListener('submit', submitHandlerForm);


// модальное окно добавления карточки
// открытие
placeAddButton.addEventListener('click', () => openPopupFunc(placeAdd));

// закрытие с добавлением карточки
placeSaveButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  addNewCard(photoGrid, {name : placeName.value, link : placeLink.value});
  placeForm.reset();
  closePopupFunc(placeAdd);
});
placeForm.addEventListener('submit', makeNewCard);


// слушатель с условием закрытия по клику на оверлей и по кнопкам закрытия
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button_assignment_close') || evt.target.classList.contains('popup_opened')) {
      closePopupFunc(popup);
    };
  });
});

import { enableValidation } from '../components/validation.js';
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__submit',
  //errorClass: ,
  //inactiveButtonClass: ,
  inputErrorClass: 'form__item_type_error',
}); 