import './index.css';

import Api from '../components/api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {profileEdit, editAvatar, cardDeleteAccept, popups, placeAdd, profileContainer} from '../utils/constants.js';
let user = undefined;

const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
      authorization: '3874ec8d-d96c-4b9e-9955-f2d143817211',
      'Content-type': 'application/json',
  },
});

const initialUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});

const makeNewCard = (cardData) => {
  
};



const popupImg = new PopupWithImage('.popup__mode_card-show');
popupImg.setEventListeners();

Promise.all([api.getCards(), api.getUser()])
  .then(([cardsData, userData]) => {
    console.log(cardsData, userData);
    user = userData;
    initialUserInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData.userId);
    cardsData.reverse();
    const cardList = new Section({
      data: cardsData,
      renderer: (item) => {
        const card = new Card({cardData: item,
          handleCardClick: (cardData) => popupImg.open(cardData),
          handleLikeClick: (cardData, evt) => {
            const cardID = cardData._id;
            if (evt.target.classList.contains('element__like_active')) {
              api.deleteLike(cardID)
                .then((res) => {
                  evt.target.classList.remove('element__like_active');
                  this._elementLikeCounter.textContent = res.likes.length;
                })
                .catch((err) => console.log(err));
            } else {
              api.putLike(cardID)
                .then((res => {
                  evt.target.classList.add('element__like_active');
                  this._elementLikeCounter.textContent = res.likes.length;
                }))
                .catch((err) => console.log(err));
            }},
          handleDeleteButtonClick: () => {
            // аргумент: cardData, экземпляр попап подтверждения?.open(cardData)
          } }, initialUserInfo.getId(), '#elements-item');
        console.log(card);
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
