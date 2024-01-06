export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }
  openPopup() {
    this._selector.classList.add("modal_opened");
    document.addEventListener("keydown", _handleEscClose, true);
  }
  closePopup() {
    this._selector.classList.remove("modal_opened");
    document.removeEventListener("keydown", _handleEscClose, true);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = this._selector;
      this.closePopup(openedPopup);
    }
  }
  setEventListeners() {
    this._selector
      .querySelector(".modal__close")
      .addEventListener("click", () => this.closePopup());
    this._selector.addEventListener("click", function (evt) {
      if (evt.target == this._selector) {
        this.closePopup();
      }
    });
  }
}
