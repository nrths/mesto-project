import './index.css';

import Api from '../components/api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {validationConfig, profileEdit, editAvatar, cardDeleteAccept, popups, placeAdd, 
  profileContainer, editButton, placeAddButton, nameInput, descriptionInput, profileEditForm, avatarEditButton} from '../utils/constants.js';
let user = undefined;

// экземпляр класса Api
const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
      authorization: '3874ec8d-d96c-4b9e-9955-f2d143817211',
      'Content-type': 'application/json',
  },
});

// экземпляр класса UserInfo
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});

// экземпляры класса FormValidator для разных форм
const editProfileFormValidation = new FormValidator(validationConfig, '.form[name="profile-edit-form"]');
editProfileFormValidation.enableValidation();
editProfileFormValidation._activeButton();

const addCardFormValidation = new FormValidator(validationConfig, '.form[name="place-add-form"]');
addCardFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(validationConfig, '.form[name="avatar-edit-form"]');
editAvatarFormValidation.enableValidation();



// экземпляры классов для попапов
  // user edit  
const popupUserEdit = new PopupWithForm('.popup__mode_profile-edit', {handlerSubmitForm: (inputValues) => {   
  api.patchUser(inputValues)
    .then((res) => {
      profileInfo.setUserInfo(res);
      this.button.textContent = 'Сохранение...';
      popupUserEdit.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      this.button.textContent = 'Сохранить';
    });   
  }
});
popupUserEdit.setEventListeners();



const popupAddCard = new PopupWithForm('.popup__mode_place-add', {handlerSubmitForm: (inputsValue) => {

}})
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup__mode_avatar-edit', {handlerSubmitForm: (inputsValue) => {

}});
popupEditAvatar.setEventListeners();

const popupImg = new PopupWithImage('.popup__mode_card-show');
popupImg.setEventListeners();

// слушатели событий на статичной странице
editButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupUserEdit.open()
  nameInput.value = profileInfo.getUserInfo().name;
  descriptionInput.value = profileInfo.getUserInfo().about;
});

placeAddButton.addEventListener('click',() => {
  popupAddCard.open() 
});

avatarEditButton.addEventListener('click',() => {
  popupEditAvatar.open()
});

Promise.all([api.getCards(), api.getUser()])
  .then(([cardsData, userData]) => {
    console.log(cardsData, userData);
    user = userData;
    const userId = userData._id;
    profileInfo.setUserInfo(userData);
    cardsData.reverse();
    const cardList = new Section({
      data: cardsData,

      renderer: (item) => {

        const card = new Card({cardData: item,
          handleCardClick: (item) => popupImg.open(item),
          handleLikeClick: (idCard, elementLike, countLike) => {

            const cardID = item._id;
            if (elementLike.classList.contains('element__like_active')) {
              api.deleteLike(cardID)
                .then((res) => {
                  elementLike.classList.remove('element__like_active');
                  countLike.textContent = res.likes.length;
                })
                .catch((err) => console.log(err));

            } else {
              api.putLike(cardID)
                .then((res => {
                  elementLike.classList.add('element__like_active');
                  countLike.textContent = res.likes.length;
                }))
                .catch((err) => console.log(err));
            }},

          handleDeleteButtonClick: () => {
            // аргумент: cardData, экземпляр попап подтверждения?.open(cardData)
          } }, userId, '#elements-item');
        const renderCard = card.generate();
        cardList.addItem(renderCard);
      }}, '.elements');
    cardList.renderItems(cardsData);
  })
  .catch((err) => console.log(err));


// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__item',
//   submitButtonSelector: '.popup__submit',
//   //errorClass: ,
//   //inactiveButtonClass: ,
//   inputErrorClass: 'form__item_type_error',
// }); 

// Promise.all([getCards(), getUser()])
// .then(([cardsData, userData]) => {
//   console.log(cardsData, userData);
//   cardsData.reverse();
//   cardsData.forEach((cardData) => {
//     user = userData; // переназначаем, потому что форма добавления не знает какой юзер и ищет глобально
//     handleLoadCard(makeNewCard(cardData, userData));
//     updateProfile(userData.name, userData.about, userData.avatar);
//   }) 
// })
// .catch((err) => console.log(err));


// // обновление данных в профиле
// function updateProfile(name, about, avatar) {
//   profileUsername.textContent = name;
//   profileDescription.textContent = about;
//   profileAvatar.src = avatar;
// };

// // открытие модального окна редактирования личной информации
// editButton.addEventListener('click', function () {
//   openPopupFunc(profileEdit);
//   nameInput.value = profileUsername.textContent;
//   descriptionInput.value = profileDescription.textContent;
//   enableSubmitButton(profileSubmitButton);
// });

// // сохранение личной информации и закрытие модального окна
// profileEditForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   profileSubmitButton.textContent = 'Сохранение...';
//   patchUser(nameInput.value, descriptionInput.value)
//     .then((res) => {
//       updateProfile(res.name, res.about, res.avatar);
//       closePopupFunc(profileEdit);
//       profileEditForm.reset();
//   })
//     .catch((err) => alert(err))
//     .finally(() => {
//       profileSubmitButton.textContent = 'Сохранить';
//     });   
// });


// // модальное окно добавления карточки
// // открытие
// placeAddButton.addEventListener('click', function () {
//   openPopupFunc(placeAdd);
//   disableSubmitButton(placeSaveButton);
// });

// // закрытие с добавлением карточки
// placeForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   placeSaveButton.textContent = 'Создание...';
//   postCard({'name': placeName.value, 'link': placeLink.value}).then((res) => {
//   handleLoadCard(makeNewCard(res, user)); // при создании карточки получает значение переменной user из промис.олл
//   closePopupFunc(placeAdd);
//   placeForm.reset();
//   })
//   .catch((err) => console.log(err))
//   .finally(() => placeSaveButton.textContent = 'Создать');
// });

// // модальное окно обновления аватара
// // открытие
// avatarEditButton.addEventListener('click', function () {
//   openPopupFunc(editAvatar);
//   disableSubmitButton(avatarSaveButton);
// })

// // закрытие с изменением аватара
// editAvatarForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   avatarSaveButton.textContent = 'Сохранение...';
//   patchAvatar(avatarInput.value)
//     .then((res) => {
//       profileAvatar.src = res.avatar;
//       closePopupFunc(editAvatar);
//       editAvatarForm.reset();
//     })
//     .catch((err) => console.log(err))
//     .finally(() => avatarSaveButton.textContent = 'Сохранить')
// });

// // модальное окно подтверждения удаления карточки
// // открытие, назначение атрибутов = handleDeleteButtonClick
// export function handleDeleteCard (evt) {
//   openPopupFunc(cardDeleteAccept);
//   const card = evt.target.closest('.element');
//   const cardID = card.getAttribute('id', cardID);

//   cardDeleteAccept.setAttribute('id', cardID);
// }

// // закрытие с подтверждением удаления и удалением карточки
// function affirmDeleteCard () {
//   const cardID = cardDeleteAccept.getAttribute('id');
//   const card = document.getElementById(`${cardID}`);
//   deleteCard(cardID).then((res) => {
//     console.log(res);
//     card.remove();
//     closePopupFunc(cardDeleteAccept);
//   })
//   .catch((err) => console.log(err));
// };
// cardDeleteAcceptSubmit.addEventListener('click', affirmDeleteCard);

// // слушатель с условием закрытия по клику на оверлей и по кнопкам закрытия
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup__button_assignment_close') || evt.target.classList.contains('popup_opened')) {
//       closePopupFunc(popup);
//     };
//   });
// });
