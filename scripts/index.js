const profileContainer = document.querySelector('.profile');
const profileEdit = document.querySelector('.popup__mode_profile-edit');

const placeAdd = document.querySelector('.popup__mode_place-add');

const cardShowPopup = document.querySelector('.popup__mode_card-show');
const popupImage = cardShowPopup.querySelector('.popup__figure-image');
const popupCaption = cardShowPopup.querySelector('.popup__figcaption');



function openPopupFunc(popup) {
  popup.classList.add('popup_opened');
}; // функция открытия модального окна
function closePopupFunc(popup) {
  popup.classList.remove('popup_opened');
} // функция закрытия модального окна
function removeCard(evt) {
  evt.target.closest('.element').remove();
} // функция удаления карточки
function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
} // функция лайка
function showCard(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopupFunc(cardShowPopup);
} // функция открытия модального окна с содержимым карточки

const cardShowCloseButton = cardShowPopup.querySelector('.popup__button_assignment_close');
cardShowCloseButton.addEventListener('click', () => closePopupFunc(cardShowPopup)); // закрытие модального окна с содержимым карточки


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
// карточка для проверки добавления: Мурманск, https://images.unsplash.com/photo-1615924631431-3a5c33d767d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80
    

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

// f(x) добавления карточки в панель (spread - use array elements in agruments, dont forget)
const photoGrid = document.querySelector('.elements');
function addNewCard(photoGrid, ...initialCards) {
  initialCards.forEach((card) => {
    photoGrid.prepend(makeNewCard(card.name, card.link));
  });
}   

// инициализация базовых карточек
addNewCard(photoGrid, ...initialCards);


// модальное окно добавления карточки
// открытие
const placeAddButton = profileContainer.querySelector('.profile__add-button');
placeAddButton.addEventListener('click', () => openPopupFunc(placeAdd));
// закрытие без добавления карточки
const placeCloseButton = placeAdd.querySelector('.popup__button_assignment_close');
placeCloseButton.addEventListener('click', function () {
  closePopupFunc(placeAdd);
});
// закрытие с добавлением карточки
const placeForm = placeAdd.querySelector('.form[name="place-add-form"]');
const placeName = placeForm.querySelector('.form__item[name="place-name"]');
const placeLink = placeForm.querySelector('.form__item[name="place-link"]');
const placeSaveButton = placeAdd.querySelector('.popup__button_assignment_save');
placeSaveButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  addNewCard(photoGrid, {name : placeName.value, link : placeLink.value});
  closePopupFunc(placeAdd);
});
placeForm.addEventListener('submit', makeNewCard);

// открытие модального окна редактирования личной информации
const editButton = profileContainer.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
    openPopupFunc(profileEdit);
    nameInput.value = profileUsername.textContent;
    descriptionInput.value = profileDescription.textContent;
});
// закрытие модального окна редактирования личной информации без сохранения
const profileEditCloseButton = profileEdit.querySelector('.popup__button_assignment_close');
profileEditCloseButton.addEventListener('click', function () {
    closePopupFunc(profileEdit);
});

// закрытие модального окна редактирования личной информации с сохранением (до перезагрузки)
const profileEditForm = document.querySelector('.form[name="profile-edit-form"]');
const nameInput = document.querySelector('.form__item[id="username"]');
const descriptionInput = document.querySelector('.form__item[id="description"]');
const saveButton = document.querySelector('.popup__button_assignment_save');
const profileUsername = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
function submitHandlerForm (evt) {
  evt.preventDefault();
  profileUsername.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopupFunc(profileEdit);
}
profileEditForm.addEventListener('submit', submitHandlerForm);




