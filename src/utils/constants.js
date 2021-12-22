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
};



export const popupOpenedClass = 'popup_opened';

export const profileContainer = document.querySelector('.profile');
export const placeAddButton = profileContainer.querySelector('.profile__add-button');
export const editButton = profileContainer.querySelector('.profile__edit-button');
export const profileAvatarSelector = '.profile__avatar';
export const avatarEditButton = profileContainer.querySelector('.profile__avatar-edit-button');

export const placeAddSelector = '.popup__mode_place-add';
export const placeAdd = document.querySelector(placeAddSelector);
export const placeFormSelector = '.form[name="place-add-form"]';
export const placeForm = placeAdd.querySelector('.form[name="place-add-form"]');
export const placeName = placeForm.querySelector('.form__item[name="name"]');
export const placeLink = placeForm.querySelector('.form__item[name="link"]');
export const placeSaveButton = placeAdd.querySelector(popupSubmitSelector);

export const profileEditSelector = '.popup__mode_profile-edit';
export const profileEdit = document.querySelector(profileEditSelector);
export const profileEditFormSelector = '.form[name="profile-edit-form"]';
export const profileEditForm = profileEdit.querySelector('.form[name="profile-edit-form"]');
export const nameInput = profileEditForm.querySelector('.form__item[id="username"]');
export const descriptionInput = profileEditForm.querySelector('.form__item[id="description"]');
export const profileUsername = '.profile__name';
export const profileDescription = '.profile__description';
export const profileSubmitButton = profileEdit.querySelector(popupSubmitSelector);

export const editAvatarSelector = '.popup__mode_avatar-edit';
export const editAvatar = document.querySelector(editAvatarSelector);
export const editAvatarFormSelector = '.form[name="avatar-edit-form"]';
export const editAvatarForm = editAvatar.querySelector('.form[name="avatar-edit-form"]');
export const avatarInput = editAvatar.querySelector('.form__item[id="new-avatar"]');
export const avatarSaveButton = editAvatar.querySelector(popupSubmitSelector);


export const cardDeleteAcceptSelector = '.popup__mode_accept-delete';
export const cardDeleteAccept = document.querySelector(cardDeleteAcceptSelector);
export const cardDeleteAcceptSubmit = cardDeleteAccept.querySelector(popupSubmitSelector);

export const popups = document.querySelectorAll('.popup');
export const popupCardShowSelector = '.popup__mode_card-show';
export const templateCardSelector = '#elements-item';
export const likeActiveSelector = 'element__like_active';
export const elementCardSelector = '.element';
export const elementsCardSelector = '.elements';
export const elementImageSelector = '.element__image';
export const elementTitleSelector = '.element__title';