import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirmDel from '../components/PopupConfirmDel.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {validationConfig, cardConfig, popupConfig, profileConfig,
  editButton, placeAddButton, avatarEditButton,
  nameInput, descriptionInput, profileEditSelector, profileEditFormSelector, 
  editAvatarSelector, editAvatarFormSelector,  
  placeAddSelector, placeFormSelector, popupCardShowSelector,
  cardDeleteAcceptSelector, cardDeleteAccept } from '../utils/constants.js';

// экземпляр класса Api
const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
      authorization: '3874ec8d-d96c-4b9e-9955-f2d143817211',
      'Content-type': 'application/json',
  },
});
// экземпляр класса UserInfo
const profileInfo = new UserInfo(profileConfig);

// экземпляры класса FormValidator для разных форм
const editProfileFormValidation = new FormValidator(validationConfig, profileEditFormSelector);
editProfileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(validationConfig, placeFormSelector);
addCardFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(validationConfig, editAvatarFormSelector);
editAvatarFormValidation.enableValidation();

// экземпляры классов для попапов
  // user edit  
const popupUserEdit = new PopupWithForm(profileEditSelector, popupConfig, {handlerSubmitForm: (inputValues) => {  
  popupUserEdit.renderLoading(true);
  api.patchUser(inputValues)
    .then((res) => {
      profileInfo.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});
      popupUserEdit.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupUserEdit.renderLoading(false);

   });   
  }
});
popupUserEdit.setEventListeners();

  // add card
const popupAddCard = new PopupWithForm(placeAddSelector, popupConfig, {handlerSubmitForm: function(inputValues) {
  popupAddCard.renderLoading(true);
  const { name, link } = inputValues;
  api.postCard(name, link)
    .then((res) => {
      cardList.addItem(res);
      popupAddCard.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupAddCard.renderLoading(false);
  })
}})
popupAddCard.setEventListeners();

  // avatar edit
const popupEditAvatar = new PopupWithForm(editAvatarSelector, popupConfig, {handlerSubmitForm: (inputValues) => {
  popupEditAvatar.renderLoading(true)
  api.patchAvatar(inputValues)
  .then((res) => {
    profileInfo.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});
    popupEditAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
    .finally(() => {
      popupEditAvatar.renderLoading(false)

    });
}});
popupEditAvatar.setEventListeners();

// экземпляр класса PopupConfirmDel
const approveDeletePopup = new PopupConfirmDel(cardDeleteAcceptSelector, popupConfig, {handleSubmit: () => {
  const cardID = cardDeleteAccept.getAttribute('id');
  const card = document.getElementById(cardID);
  approveDeletePopup.renderLoading(true);
  api.deleteCard(cardID)
    .then(() => {
      card.remove();
      approveDeletePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => approveDeletePopup.renderLoading(false))
}})
approveDeletePopup.setEventListeners();

// экземпляр класса PopupWithImage
const popupImg = new PopupWithImage(popupCardShowSelector, popupConfig);
popupImg.setEventListeners();

// слушатели событий на статичной странице
editButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupUserEdit.open();
  const profile = profileInfo.getUserInfo();
  nameInput.value = profile.name;
  descriptionInput.value = profile.about;
});

placeAddButton.addEventListener('click',() => {
  popupAddCard.open() 
});

avatarEditButton.addEventListener('click',() => {
  popupEditAvatar.open()
});

const cardList = new Section((item) => {
  const userID = profileInfo.getUserID();
  const card = new Card(item, cardConfig.templateCardSelector,
  { 
    handleCardClick: function(item) {
      popupImg.open(item);
    },
    handleLikeClick: function(evt) {
      if (card.isLiked()) {
        api
          .deleteLike(card.getID())
          .then((res) => {
            card.updateLikes(res, evt) 
          })
          .catch((err) => console.log(err));
      } else {
        api
          .putLike(card.getID())
          .then((res) => {
            card.updateLikes(res, evt)
          })
          .catch((err) => console.log(err));
      }},
      handleDeleteButtonClick: function (evt) {
        approveDeletePopup.open();
        const card = evt.target.closest(cardConfig.elementCardSelector);
        const cardID = card.getAttribute('id', cardID);
        cardDeleteAccept.setAttribute('id', cardID);
      }
  }, userID, cardConfig);
  return card.generate();
}, '.elements');

Promise.all([api.getUser(), api.getCards()])
.then(([user, cards]) => {
    profileInfo.setUserID(user._id);
    profileInfo.setUserInfo(user);
    cardList.renderItems(cards);
  })
.catch((err) => console.log(err));
