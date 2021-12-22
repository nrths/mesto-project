import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirmDel from '../components/PopupConfirmDel.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {validationConfig, profileUsername, profileDescription, cardDeleteAccept, 
  editButton, placeAddButton, nameInput, descriptionInput, profileEditFormSelector, 
  placeFormSelector, editAvatarFormSelector, profileEditSelector, placeAddSelector, 
  editAvatarSelector, cardDeleteAcceptSelector, popupCardShowSelector, templateCardSelector, 
  likeActiveSelector, elementCardSelector, elementsCardSelector, profileAvatarSelector, avatarEditButton} from '../utils/constants.js';

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
  nameSelector: profileUsername,
  aboutSelector: profileDescription,
  avatarSelector: profileAvatarSelector,
});

// экземпляры класса FormValidator для разных форм
const editProfileFormValidation = new FormValidator(validationConfig, profileEditFormSelector);
editProfileFormValidation.enableValidation();
editProfileFormValidation._activeButton();

const addCardFormValidation = new FormValidator(validationConfig, placeFormSelector);
addCardFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(validationConfig, editAvatarFormSelector);
editAvatarFormValidation.enableValidation();

// экземпляры классов для попапов
  // user edit  
const popupUserEdit = new PopupWithForm(profileEditSelector, {handlerSubmitForm: (inputValues) => {  
  popupUserEdit.textLoading(true);
  api.patchUser(inputValues)
    .then((res) => {
      popupUserEdit.textLoading(true)
      profileInfo.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});
      popupUserEdit.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupUserEdit.textLoading(false);

   });   
  }
});
popupUserEdit.setEventListeners();

  // add card
const popupAddCard = new PopupWithForm(placeAddSelector, {handlerSubmitForm: function() {
  popupAddCard.textLoading(true);
  const { name, link } = popupAddCard._getInputValues();
  api.postCard(name, link)
    .then((res) => {
      cardList.addItem(res);
      popupAddCard.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupAddCard.textLoading(false);
  })
}})
popupAddCard.setEventListeners();

  // avatar edit
const popupEditAvatar = new PopupWithForm(editAvatarSelector, {handlerSubmitForm: (inputValues) => {
  popupEditAvatar.textLoading(true)
  api.patchAvatar(inputValues)
  .then((res) => {
    profileInfo.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});
    popupEditAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
    .finally(() => {
      popupEditAvatar.textLoading(false)

    });
}});
popupEditAvatar.setEventListeners();

// экземпляр класса PopupConfirmDel
const approveDeletePopup = new PopupConfirmDel(cardDeleteAcceptSelector, {handleSubmit: () => {
  const cardID = cardDeleteAccept.getAttribute('id');
  const card = document.getElementById(cardID);
  approveDeletePopup.textLoading(true);
  api.deleteCard(cardID)
    .then(() => {
      card.remove();
      approveDeletePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => approveDeletePopup.textLoading(false))
}})
approveDeletePopup.setEventListeners();

// экземпляр класса PopupWithImage
const popupImg = new PopupWithImage(popupCardShowSelector);
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

const cardList = new Section((item) => {
  const userID = profileInfo.getUserID();
  const card = new Card(item, templateCardSelector,
  { 
    handleCardClick: function(item) {
      popupImg.open(item);
    },
    handleLikeClick: function(evt) {
      if (card._isLiked()) {
        api
          .deleteLike(card.getID())
          .then((res) => {
            const likes = res.likes;
            evt.target.classList.remove(likeActiveSelector);
            card._elementLikeCounter.textContent = likes.length; 
          })
          .catch((err) => console.log(err));
      } else {
        api
          .putLike(card.getID())
          .then((res) => {
            const likes = res.likes;
            evt.target.classList.add(likeActiveSelector);
            card._elementLikeCounter.textContent = likes.length;
          })
          .catch((err) => console.log(err));
      }},
      handleDeleteButtonClick: function (evt) {
        approveDeletePopup.open();
        const card = evt.target.closest(elementCardSelector);
        const cardID = card.getAttribute('id', cardID);
        cardDeleteAccept.setAttribute('id', cardID);
      }
  }, userID);
  return card.generate();
}, elementsCardSelector);

Promise.all([api.getUser(), api.getCards()])
.then(([user, cards]) => {
    profileInfo.setUserID(user._id);
    profileInfo.setUserInfo(user);
    cardList.renderItems(cards);
  })
.catch((err) => console.log(err));
