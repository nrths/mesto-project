export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form_item-error',
};
export const cardConfig = {
  elementCardSelector : '.element',
  elementImageSelector: '.element__image',
  elementTitleSelector: '.element__title',
  likeActiveClass: 'element__like_active',
  likeButtonSelector: '.element__like',
  likeCounterSelector: '.element__like-count',
  deleteButtonSelector: '.element__delete-button',
  templateCardSelector: '#elements-item',
};
export const popupConfig = {
  popupOpenedClass: 'popup_opened',
  popupButtonCloseClass: 'popup__button_assignment_close',
  popupSubmitSelector: '.popup__submit',
  popupFormSelector: '.form',
  popupInputSelector: '.form__item',
};
export const profileConfig = {
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar',
};

export const placeAddButton = document.querySelector('.profile__add-button');
export const editButton = document.querySelector('.profile__edit-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

export const placeAddSelector = '.popup__mode_place-add';
export const placeFormSelector = '.form[name="place-add-form"]';

export const profileEditSelector = '.popup__mode_profile-edit';
export const profileEditFormSelector = '.form[name="profile-edit-form"]';
export const profileEditForm = document.querySelector('.form[name="profile-edit-form"]');
export const nameInput = profileEditForm.querySelector('.form__item[id="username"]');
export const descriptionInput = profileEditForm.querySelector('.form__item[id="description"]');

export const editAvatarSelector = '.popup__mode_avatar-edit';
export const editAvatarFormSelector = '.form[name="avatar-edit-form"]';

export const cardDeleteAcceptSelector = '.popup__mode_accept-delete';
export const cardDeleteAccept = document.querySelector(cardDeleteAcceptSelector);

export const popupCardShowSelector = '.popup__mode_card-show';