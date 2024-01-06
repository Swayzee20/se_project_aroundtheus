import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector, data) {
    super(selector);
    // this._selector = selector;
    this._name = data.name;
    this._link = data.link;
  }
  openPopup() {
    const previewImage = this._selector.querySelector(".modal__image");
    const previewImageDescr = this._selector.querySelector(
      ".modal__image-description"
    );
    previewImage.alt = this._name;
    previewImage.src = this._link;
    previewImageDescr.textContent = this._name;
    super.openPopup();
  }
}
