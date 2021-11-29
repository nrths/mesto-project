import {  putLike, deleteLike } from "./api.js";
import {  openPopupFunc } from "./modal.js";
import { handleDeleteCard } from "../pages/index.js";

const photoGrid = document.querySelector('.elements');

const cardShowPopup = document.querySelector('.popup__mode_card-show');
const popupImage = cardShowPopup.querySelector('.popup__figure-image');
const popupCaption = cardShowPopup.querySelector('.popup__figcaption');

const newCardTemplate = document.querySelector('#elements-item').content;


// функция открытия модального окна с содержимым карточки
function showCard(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopupFunc(cardShowPopup);
} 
// функция добавления карточки в панель 
function handleLoadCard(cardData) {
  photoGrid.prepend(cardData);
}

// функция создания новой карточки
function makeNewCard(cardData, userData) {
  const newCard = newCardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardCaption = newCard.querySelector('.element__title');
  const cardLike = newCard.querySelector('.element__like');
  const cardDeleteButton = newCard.querySelector('.element__delete-button');
  const cardLikeCounter = newCard.querySelector('.element__like-count');
  

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;
  newCard.setAttribute('id', cardData._id);

  // модальное окно карточки
  cardImage.addEventListener('click', () => showCard(cardData));

  // лайки карточки 
  const spotLikeInitState = cardData.likes.some(function (el) {
    if (el._id === userData._id) {
      return true;
    }
  });

  if (spotLikeInitState) {
    cardLike.classList.add('element__like_active');
  }

  function switchLikes (cardData, evt) {
    const cardID = cardData._id;
      if (evt.target.classList.contains('element__like_active')) {
      deleteLike(cardID)
        .then((res) => {
          evt.target.classList.remove('element__like_active');
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      putLike(cardID)
        .then((res => {
          evt.target.classList.add('element__like_active');
          cardLikeCounter.textContent = res.likes.length;
        }))
        .catch((err) => console.log(err));
      }
    }
  cardLike.addEventListener('click', (evt) => switchLikes(cardData, evt))
 
  // удаление карточки
    // проверка карточки на собственность
  if (cardData.owner._id !== userData._id) {
    cardDeleteButton.style.display = 'none';
  }
  cardDeleteButton.addEventListener('click', (evt) => handleDeleteCard(evt));
  
  return newCard;
}

export { handleLoadCard, makeNewCard }