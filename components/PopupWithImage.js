import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  openPopup(data) {
    const previewImage = this._selector.querySelector(".modal__image");
    const previewImageDescr = this._selector.querySelector(
      ".modal__image-description"
    );

    previewImage.alt = data.name;
    previewImage.src = data.link;
    previewImageDescr.textContent = data.name;
    super.openPopup();
  }
}
