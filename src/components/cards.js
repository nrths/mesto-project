import { openPopupFunc } from "./modal.js";

const cardShowPopup = document.querySelector('.popup__mode_card-show');
const popupImage = cardShowPopup.querySelector('.popup__figure-image');
const popupCaption = cardShowPopup.querySelector('.popup__figcaption');

// функция удаления карточки
function removeCard(evt) {
  evt.target.closest('.element').remove();
} 

// функция лайка
function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
} 
  
// функция открытия модального окна с содержимым карточки
function showCard(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopupFunc(cardShowPopup);
} 

// функция создания новой карточки
function makeNewCard(name, link) {
  const newCardTemplate = document.querySelector('#elements-item').content;
  const newCard = newCardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardCaption = newCard.querySelector('.element__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardCaption.textContent = name;
  // модальное окно карточки
  cardImage.addEventListener('click', () => showCard(link, name)); 
  // лайк карточки
  const cardLike = newCard.querySelector('.element__like');
  cardLike.addEventListener('click', likeCard);
  // удаление карточки
  const cardDeleteButton = newCard.querySelector('.element__delete-button');
  cardDeleteButton.addEventListener('click', removeCard);

  return newCard;
}

export { makeNewCard }