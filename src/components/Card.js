export default class Card {
    constructor({ link, name, _id, likes, owner }, userId, { handleCardClick, handleLikeClick, handleDeleteButtonClick }, selector) {
        this._link = link;
        this._name = name;
        this._id = _id;
        this._likes = likes;
        this.owner = owner;
        this.selector = selector;
        this.handleCardClick = handleCardClick;
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

    generate() {
        this._elementImage.src = this._link;
        this._elementTitle.textContent = this._name;
        this._elementLikeCounter.textContent = this._likes.length;

        this._spotLikeInitState();


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
    _switchLikes (cardData, evt) {
        const cardID = cardData._id;
          if (evt.target.classList.contains('element__like_active')) {
          deleteLike(cardID)
            .then((res) => {
              evt.target.classList.remove('element__like_active');
              cardLikeCounter.textContent = res.likes.length;
            })
            .catch((err) => console.log(err));
        } else {
          putLike(cardID)
            .then((res => {
              evt.target.classList.add('element__like_active');
              cardLikeCounter.textContent = res.likes.length;
            }))
            .catch((err) => console.log(err));
          }
      }
      
    
}