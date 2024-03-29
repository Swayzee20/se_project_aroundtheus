import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings, profileInfo } from "../utils/constants.js";
import "./index.css";

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_inactive",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__input-error_active",
// };

const profileModal = document.querySelector("#edit-modal");
const newCardModal = document.querySelector("#add-modal");
const imageModal = document.querySelector("#image-modal");
const editButton = document.querySelector(".profile__edit-button");
const imageModalCloseButton = imageModal.querySelector(".modal__close");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const inputName = document.querySelector(".modal__input-name");
const inputDesc = document.querySelector(".modal__input-description");
const newCardTitle = document.querySelector(".modal__input-title");
const newCardURL = document.querySelector(".modal__input-url");
const profileForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#add-card-form");
const mediaList = document.querySelector(".media__list");
const forms = [profileForm, addCardForm];
// const profileInfo = [profileName, profileDesc];
const profileInputs = [inputName, inputDesc];
//Popups
const imagePopup = new PopupWithImage(imageModal);
function handleImageClick(name, link) {
  imagePopup.openPopup({ name, link });
}

//Popup Forms
const profilePopup = new PopupWithForm(profileModal, (data) => {
  console.log(data);
  userInfo.setUserInfo(data);
  profilePopup.closePopup();
});
const cardForm = new PopupWithForm(newCardModal, (data) => {
  const name = newCardTitle.value;
  const link = newCardURL.value;
  addCard({ name, link }, mediaList);
  cardForm.closePopup();
});
function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
}
function addCard(data, wrapper) {
  const newCard = createCard(data);
  cardsList.addItem(newCard);
}
const cardsList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const newCard = createCard(cardItem);
      cardsList.addItem(newCard);
    },
  },
  mediaList
);
addButton.addEventListener("click", () => {
  cardForm.openPopup();
});
editButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputDesc.value = info.about;
  profilePopup.openPopup();
});

forms.forEach(function (form) {
  const newFormValidator = new FormValidator(settings, form);
  newFormValidator.enableValidation();
});
const userInfo = new UserInfo(
  profileInfo
  // profileInfo.nameSelector,
  // profileInfo.aboutMeSelector
);
cardsList.renderItems();

profilePopup.setEventListeners();
cardForm.setEventListeners();
imagePopup.setEventListeners();
