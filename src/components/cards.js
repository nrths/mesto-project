import { deleteCard } from "./api.js";
import { openPopupFunc } from "./modal.js";

const photoGrid = document.querySelector('.elements');
const cardDeleteAccept = document.querySelector('.popup__mode_accept-delete');

const cardShowPopup = document.querySelector('.popup__mode_card-show');
const popupImage = cardShowPopup.querySelector('.popup__figure-image');
const popupCaption = cardShowPopup.querySelector('.popup__figcaption');

const newCardTemplate = document.querySelector('#elements-item').content;

// функция удаления карточки


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

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
  
 if (cardData.owner._id !== userData._id) {
   cardDeleteButton.style.display = 'none';
 }
  
  // модальное окно карточки
  cardImage.addEventListener('click', () => showCard(cardData));

  // лайк карточки
  // cardLike.addEventListener('click', likeCard);

  // удаление карточки
  cardDeleteButton.addEventListener('click', () => {
    console.log(cardData._id);
    deleteCard(cardData).then((res) => {
      console.log(res);
      cardDeleteButton.closest('.element').remove();
    })
  });
  

  return newCard;
}



export { handleLoadCard, makeNewCard }