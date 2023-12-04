const showInputErr = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("modal__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("modal__input-error_active");
};

const hideInputErr = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

const hasInvalInput = (inputElements) => {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtnState = (inputElements, buttonElement) => {
  if (hasInvalInput(inputElements)) {
    buttonElement.classList.add("modal__button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("modal__button_inactive");
    buttonElement.disabled = false;
  }
};

const checkInputVal = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputErr(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputErr(formElement, inputElement);
  }
};

function setEvtListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const sbmtButton = formElement.querySelector(".modal__button");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputVal(formElement, inputElement);
      toggleButtnState(inputElements, sbmtButton);
    });
  });
  addButton.addEventListener("click", () => {
    openPopup(newCardModal);
    toggleButtnState(inputElements, sbmtButton);
  });
  editButton.addEventListener("click", () => {
    inputName.value = profileName.textContent;
    inputDesc.value = profileDesc.textContent;
    toggleButtnState(inputElements, sbmtButton);
    openPopup(profileModal);
  });
}

function enableVal(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    setEvtListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
enableVal(config);
