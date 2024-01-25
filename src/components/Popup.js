export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleCancelDelete(id) {
    console.log(id);
  }
  openPopup(id) {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose, true);
  }
  closePopup(id) {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose, true);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.closePopup();
      });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target == this._popupElement) {
        this.closePopup();
      }
    });
  }
}
