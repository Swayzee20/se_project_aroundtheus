import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._popupForm = this._selector.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const inputObject = [];
    inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    console.log(inputObject);
    return inputObject;
  }
  setEventListeners() {
    this._selector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputObject = this._getInputValues();
      this._handleFormSubmit(inputObject);
    });
  }
}
