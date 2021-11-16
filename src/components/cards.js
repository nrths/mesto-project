import { openPopupFunc } from "./modal.js";

const photoGrid = document.querySelector('.elements');
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

// функция добавления карточки в панель (spread - use array elements in agruments, dont forget)
function addNewCard(photoGrid, ...initialCards) {
  initialCards.forEach((card) => {
    photoGrid.prepend(makeNewCard(card.name, card.link));
  });
}

// базовые карточки
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];
// карточка для проверки добавления: Мурманск, 
// https://images.unsplash.com/photo-1615924631431-3a5c33d767d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80
    
// инициализация базовых карточек
addNewCard(photoGrid, ...initialCards);

export { photoGrid, makeNewCard, addNewCard }