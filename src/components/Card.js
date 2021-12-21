export default class Card {
    constructor({ cardData, 
      handleCardClick, handleLikeClick, handleDeleteButtonClick },
      userId,  
      templateSelector) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._id = cardData._id;
        this._likes = cardData.likes;
        this._ownerID = cardData.owner._id;
        this._userId = userId;
        this._selector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick.bind(this);
    }
    
    _getElement() {
      const cardElement = document
        .querySelector(this._selector) //'#elements-item';
        .content
        .querySelector('.element')
        .cloneNode(true);
      
      return cardElement;
    }

    getID() {
      return this._id;
    }

    _spotLikeInitState() {
      this._likes.some(el => {
      
    if (el._id === this._userId) {
      this._elementLike.classList.add('element__like_active');
      }
      this._elementLikeCounter.textContent = this._likes.length;
      
    })}

    _setEventListeners() {
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick({
          link: this._link,
          name: this._name,
        })
      });
      this._elementLike.addEventListener('click', () => {
        this._handleLikeClick(this._id, this._elementLike, this._elementLikeCounter);
      });
      this._elementDeleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      })
    }

    _renderDeleteButton() {
      if (this._ownerID !== this._userId) {
        this._elementDeleteButton.style.display = 'none';
      }
    }

    generate() {
      this._element = this._getElement();
      this._elementImage =  this._element.querySelector('.element__image');
      this._elementTitle = this._element.querySelector('.element__title');
      this._elementLike = this._element.querySelector('.element__like');
      this._elementLikeCounter = this._element.querySelector('.element__like-count');
      this._elementDeleteButton = this._element.querySelector('.element__delete-button');

      this._elementImage.src = this._link;
      this._elementTitle.textContent = this._name;
      this._elementLikeCounter.textContent = this._likes.length;
      this._element.setAttribute('data-id', this._id);

      this._renderDeleteButton();
      this._spotLikeInitState();
      this._setEventListeners();
      return this._element;
    }

   
}