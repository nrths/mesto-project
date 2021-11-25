import { deleteCard } from "./api.js";
import { openPopupFunc } from "./modal.js";


const cardDeleteAccept = document.querySelector('.popup__mode_accept-delete');

const cardShowPopup = document.querySelector('.popup__mode_card-show');
const popupImage = cardShowPopup.querySelector('.popup__figure-image');
const popupCaption = cardShowPopup.querySelector('.popup__figcaption');

const newCardTemplate = document.querySelector('#elements-item').content;

// функция удаления карточки
function removeCard(evt) {
  evt.target.closest('.element').remove();
} 

// функция лайка
function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
} 
  
// функция открытия модального окна с содержимым карточки
function showCard(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopupFunc(cardShowPopup);
} 

// функция добавления иконки корзины на карточки пользователя
function setDeleteButtonToCard (card, owner, user) {
  if (owner === user) {
    card.querySelector('.element__delete-button').style.display = 'block';
  }
};

// функция создания новой карточки
function makeNewCard(cardData, userData) {
  const newCard = newCardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardCaption = newCard.querySelector('.element__title');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
  
  // модальное окно карточки
  cardImage.addEventListener('click', () => showCard(cardData)); 
  // лайк карточки
  const cardLike = newCard.querySelector('.element__like');
  // cardLike.addEventListener('click', likeCard);
  // удаление карточки
  const cardDeleteButton = newCard.querySelector('.element__delete-button');
  console.log(cardData.owner._id);
  
  //if (cardData.owner._id === userData._id) {
  //  cardDeleteButton.style.display = "none";
  //}
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(cardData).then((res) => removeCard)
  });

  return newCard;
}

export { makeNewCard }