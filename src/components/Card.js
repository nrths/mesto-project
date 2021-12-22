export default class Card {
    constructor({ _id, name, link, likes, owner }, templateSelector, 
      { handleCardClick, handleLikeClick, handleDeleteButtonClick },
      userId, cardConfig) {
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
        this._cardConfig = cardConfig;
        this._element = this._getElement();
        this._elementLike = this._element.querySelector(this._cardConfig.likeButtonSelector);
        this._elementLikeCounter = this._element.querySelector(this._cardConfig.likeCounterSelector);
        this._elementDeleteButton = this._element.querySelector(this._cardConfig.deleteButtonSelector);
    }
    
    _getElement() {
      const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector(this._cardConfig.elementCardSelector)
        .cloneNode(true);
      
      return cardElement;
    }

    getID() {
      return this._id;
    }

    isLiked() {
      return this._elementLike.classList.contains(this._cardConfig.likeActiveClass);
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
      this._elementImage =  this._element.querySelector(this._cardConfig.elementImageSelector);
      this._elementTitle = this._element.querySelector(this._cardConfig.elementTitleSelector);     

      this._elementImage.src = this._link;
      this._elementTitle.textContent = this._name;
      this._elementLikeCounter.textContent = this._likes.length;
      this._element.setAttribute('id', this._id);

      this._likes.some(el => {
        if (el._id === this._userId) {
          this._elementLike.classList.add(this._cardConfig.likeActiveClass);
        }
      });

      this._renderDeleteButton();
      this._setEventListeners();
      return this._element;
    } 
    updateLikes(data, evt) {
      const likes = data.likes;
      if (this._elementLike.classList.contains(this._cardConfig.likeActiveClass)) {
        evt.target.classList.remove(this._cardConfig.likeActiveClass);
        this._elementLikeCounter.textContent = likes.length; 
      } else {
        evt.target.classList.add(this._cardConfig.likeActiveClass);
        this._elementLikeCounter.textContent = likes.length; 
      }

    }
}