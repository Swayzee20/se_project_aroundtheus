export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  openPopup() {
    this._selector.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose, true);
  }
  closePopup() {
    this._selector.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose, true);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._selector
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.closePopup();
      });
    this._selector.addEventListener("click", (evt) => {
      if (evt.target == this._selector) {
        this.closePopup();
      }
    });
  }
}
