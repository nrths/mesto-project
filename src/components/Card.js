export default class Card {
    constructor({ link, name, _id, likes, owner }, userId, 
      { handleCardClick, handleLikeClick, handleDeleteButtonClick }, 
      selector) {
        this._link = link;
        this._name = name;
        this._id = _id;
        this._likes = likes;
        this.owner = owner;
        this.userId = userId;
        this.selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._element = this._getElement();
        this._elementImage =  this._element.querySelector('.element__image');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementLike = this._element.querySelector('.element__like');
        this._elementLikeCounter = this._element.querySelector('.element__like-count');
        this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    }
    
    _getElement() {
        
      const cardElement = document
        .querySelector(this._selector) //'#elements-item';
        .content
        .querySelector('.element')
        .cloneNode(true);
      
      return cardElement;
    }

    _setEventListeners() {
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick()
      });
      this._elementLike.addEventListener('click', () => {
        this._handleLikeClick();
      });
      this._elementDeleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      })
    }

    generate() {
        this._elementImage.src = this._link;
        this._elementTitle.textContent = this._name;
        this._elementLikeCounter.textContent = this._likes.length;

        this._spotLikeInitState();

        if (this.owner._id !== this.userId._id) {
          this._elementDeleteButton.style.display = 'none';
        }

        this._setEventListeners();
        return this._element;
    }

    _spotLikeInitState() {
        this._likes.some(function (el) {
      if (el._id === userId._id) {
        return true;
      }
        });
  
        if (spotLikeInitState) {
            this._elementLike.classList.add('element__like_active');
        }
    }  
    
}