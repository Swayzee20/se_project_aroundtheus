export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputErr(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputErr(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  _toggleButtnState() {
    if (this._hasInvalInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  _hasInvalInput() {
    console.log(this._inputElements);
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputVal(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputErr(inputElement);
    } else {
      this._hideInputErr(inputElement);
    }
  }
  _setEventListeners() {
    this._inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtnState();
      }, 0);
    });
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputVal(inputElement);
        this._toggleButtnState();
      });
    });
  }
  enableValidation() {
    const formElements = Array.from(this._formElement);
    formElements.forEach((formElement) => {
      this._setEventListeners();
    });
  }
}
