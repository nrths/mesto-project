export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'form__item_type_error',
};

export const profileContainer = document.querySelector('.profile');
export const placeAddButton = profileContainer.querySelector('.profile__add-button');
export const editButton = profileContainer.querySelector('.profile__edit-button');
export const profileAvatar = profileContainer.querySelector('.profile__avatar');
export const avatarEditButton = profileContainer.querySelector('.profile__avatar-edit-button');

export const placeAdd = document.querySelector('.popup__mode_place-add');
export const placeForm = placeAdd.querySelector('.form[name="place-add-form"]');
export const placeName = placeForm.querySelector('.form__item[name="place-name"]');
export const placeLink = placeForm.querySelector('.form__item[name="place-link"]');
export const placeSaveButton = placeAdd.querySelector('.popup__submit');

export const profileEdit = document.querySelector('.popup__mode_profile-edit');
export const profileEditForm = profileEdit.querySelector('.form[name="profile-edit-form"]');
export const nameInput = profileEditForm.querySelector('.form__item[id="username"]');
export const descriptionInput = profileEditForm.querySelector('.form__item[id="description"]');
export const profileUsername = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileSubmitButton = profileEdit.querySelector('.popup__submit');

export const editAvatar = document.querySelector('.popup__mode_avatar-edit');
export const editAvatarForm = editAvatar.querySelector('.form[name="avatar-edit-form"]');
export const avatarInput = editAvatar.querySelector('.form__item[id="new-avatar"]');
export const avatarSaveButton = editAvatar.querySelector('.popup__submit');

export const cardDeleteAccept = document.querySelector('.popup__mode_accept-delete');
export const cardDeleteAcceptSubmit = cardDeleteAccept.querySelector('.popup__submit');

export const popups = document.querySelectorAll('.popup');