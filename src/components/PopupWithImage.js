import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }
  openPopup(data) {
    const previewImage = this._popupElement.querySelector(".modal__image");
    console.log(this._popupElement);
    const previewImageDescr = this._popupElement.querySelector(
      ".modal__image-description"
    );

    previewImage.alt = data.name;
    previewImage.src = data.link;
    previewImageDescr.textContent = data.name;
    super.openPopup();
  }
}
