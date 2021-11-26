import './index.css';

import { openPopupFunc, closePopupFunc } from '../components/modal.js';
import { handleLoadCard, makeNewCard } from '../components/cards.js';
import { enableValidation, enableSubmitButton, disableSubmitButton } from '../components/validation.js';
import { getCards, getUser, patchUser, patchAvatar, postCard } from '../components/api.js';

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__submit',
  //errorClass: ,
  //inactiveButtonClass: ,
  inputErrorClass: 'form__item_type_error',
}); 

const profileContainer = document.querySelector('.profile');
const placeAddButton = profileContainer.querySelector('.profile__add-button');
const editButton = profileContainer.querySelector('.profile__edit-button');
const profileAvatar = profileContainer.querySelector('.profile__avatar');
const avatarEditButton = profileContainer.querySelector('.profile__avatar-edit-button');

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

const editAvatar = document.querySelector('.popup__mode_avatar-edit');
const editAvatarForm = editAvatar.querySelector('.form[name="avatar-edit-form"]');
const avatarInput = editAvatar.querySelector('.form__item[id="new-avatar"]');
const avatarSaveButton = editAvatar.querySelector('.popup__submit');



const popups = document.querySelectorAll('.popup');
let user = undefined;


Promise.all([getCards(), getUser()])
.then(([cardsData, userData]) => {
  console.log(cardsData, userData);
  //console.log(userData._id);
  cardsData.reverse();
  cardsData.forEach((cardData) => {
    user = userData; // переназначаем, потому что форма добавления не знает какой юзер и ищет глобально
    handleLoadCard(makeNewCard(cardData, userData));
    updateProfile(userData.name, userData.about, userData.avatar);
  })
  
  
})
.catch((err) => console.log(err));


// обновление данных в профиле
function updateProfile(name, about, avatar) {
  profileUsername.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.src = avatar;
};

// открытие модального окна редактирования личной информации
editButton.addEventListener('click', function () {
  openPopupFunc(profileEdit);
  nameInput.value = profileUsername.textContent;
  descriptionInput.value = profileDescription.textContent;
  enableSubmitButton(profileSubmitButton);
});

// сохранение личной информации и закрытие модального окна
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохранение...';
  patchUser(nameInput.value, descriptionInput.value)
    .then((res) => {
      updateProfile(res.name, res.about, res.avatar);
      closePopupFunc(profileEdit);
      profileEditForm.reset();
  })
    .catch((err) => alert(err))
    .finally(() => {
      profileSubmitButton.textContent = 'Сохранить';
    });   
});


// модальное окно добавления карточки
// открытие
placeAddButton.addEventListener('click', function () {
  openPopupFunc(placeAdd);
  disableSubmitButton(placeSaveButton);
});

// закрытие с добавлением карточки
placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  placeSaveButton.textContent = 'Создание...';
  postCard({'name': placeName.value, 'link': placeLink.value}).then((res) => {
  handleLoadCard(makeNewCard(res, user)); // при создании карточки получает значение переменной user из промис.олл
  closePopupFunc(placeAdd);
  placeForm.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => placeSaveButton.textContent = 'Создать');
});

// модальное окно обновления аватара
// открытие
avatarEditButton.addEventListener('click', function () {
  openPopupFunc(editAvatar);
  disableSubmitButton(avatarSaveButton);
})

// закрытие с изменением аватара
editAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  avatarSaveButton.textContent = 'Сохранение...';
  patchAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closePopupFunc(editAvatar);
      editAvatarForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarSaveButton.textContent = 'Сохранить')
});

// модальное окно подтверждения удаления карточки
// закрытие с подтверждением удаления и удалением карточки


// слушатель с условием закрытия по клику на оверлей и по кнопкам закрытия
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button_assignment_close') || evt.target.classList.contains('popup_opened')) {
      closePopupFunc(popup);
    };
  });
});
