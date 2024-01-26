export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleCardLike
  ) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardLike = handleCardLike;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", (evt) => {
      // this._cardElement.remove();
      // this._handleDeleteCard(this._cardImage.id);
      this._handleDeleteCard(this._cardImage.id, this._cardElement);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeButton() {
    this._handleCardLike(this._isLiked, this._id);
  }
  toggleLike() {
    this._isLiked = !this._isLiked;
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardImage.id = this._id;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
    this._setEventListeners();
    return this._cardElement;
  }
}
