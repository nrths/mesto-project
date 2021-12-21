export default class Card {
    constructor({ _id, name, link, likes, owner }, templateSelector, 
      { handleCardClick, handleLikeClick, handleDeleteButtonClick },
      userId) {
        this._id = _id;
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._owner = owner;
        this._userId = userId;
        this._selector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._element = this._getElement();
        this._elementLike = this._element.querySelector('.element__like');
        this._elementLikeCounter = this._element.querySelector('.element__like-count');
        this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    }
    
    _getElement() {
      const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);
      
      return cardElement;
    }

    getID() {
      return this._id;
    }

    _isLiked() {
      return this._elementLike.classList.contains('element__like_active');
    }

    _updateLikesState(data, isActive = true) {
      if (isActive) {
        this._elementLike.classList.remove('element__active');
      } else {
        this._elementLike.classList.add('element__active');
      }
      this._elementLikeCounter.textContent = this._likes.length; 
    }

    _setEventListeners() {
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick({
          link: this._link,
          name: this._name,
        })
      });
      this._elementLike.addEventListener('click', (evt) => {
        this._handleLikeClick(evt);
      });
      this._elementDeleteButton.addEventListener('click', (evt) => {
        this._handleDeleteButtonClick(evt)
      })
    }

    _renderDeleteButton() {
      if (this._owner._id !== this._userId) {
        this._elementDeleteButton.style.display = 'none';
      }
    }

    generate() {      
      this._elementImage =  this._element.querySelector('.element__image');
      this._elementTitle = this._element.querySelector('.element__title');     

      this._elementImage.src = this._link;
      this._elementTitle.textContent = this._name;
      this._elementLikeCounter.textContent = this._likes.length;
      this._element.setAttribute('id', this._id);

      this._likes.some(el => {
        if (el._id === this._userId) {
          this._elementLike.classList.add('element__like_active');
        }
      });

      this._renderDeleteButton();
      this._updateLikesState();
      this._setEventListeners();
      return this._element;
    }

   
}