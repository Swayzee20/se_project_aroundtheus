// const showInputErr = (
//   formElement,
//   inputElement,
//   { errorClass, inputErrorClass }
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   errorElement.classList.add(errorClass);
//   console.log(options.errorClass);
// };

// const hideInputErr = (
//   formElement,
//   inputElement,
//   { errorClass, inputErrorClass }
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = "";
// };

// const hasInvalInput = (inputElements) => {
//   return inputElements.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleButtnState = (
//   inputElements,
//   buttonElement,
//   { inactiveButtonClass }
// ) => {
//   if (hasInvalInput(inputElements)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// };

// const checkInputVal = (formElement, inputElement, options) => {
//   if (!inputElement.validity.valid) {
//     showInputErr(formElement, inputElement, options);
//   } else {
//     hideInputErr(formElement, inputElement, options);
//   }
// };

// function setEvtListeners(formElement, options) {
//   const { inputSelector } = options;
//   const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
//   const sbmtButton = formElement.querySelector(options.submitButtonSelector);
//   formElement.addEventListener("reset", () => {
//     setTimeout(() => {
//       toggleButtnState(inputElements, sbmtButton, options);
//     }, 0);
//   });
//   inputElements.forEach((inputElement) => {
//     inputElement.addEventListener("input", (evt) => {
//       checkInputVal(formElement, inputElement, options);
//       toggleButtnState(inputElements, sbmtButton, options);
//     });
//   });
// }

// function enableValidation(options) {
//   const formElements = Array.from(
//     document.querySelectorAll(options.formSelector)
//   );
//   formElements.forEach((formElement) => {
//     setEvtListeners(formElement, options);
//   });
// }

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
// enableValidation(options);
