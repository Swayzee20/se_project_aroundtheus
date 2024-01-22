import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const inputObject = [];
    inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }
  closePopup() {
    this._popupForm.reset();
    super.closePopup();
  }
  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputObject = this._getInputValues();
      this._handleFormSubmit(inputObject);
    });
    super.setEventListeners();
  }
}
