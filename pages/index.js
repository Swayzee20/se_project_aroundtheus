import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

const initialCards = [
  {
    name: "New York City",
    link: "https://images.unsplash.com/photo-1512850183-6d7990f42385?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Seattle",
    link: "https://images.unsplash.com/photo-1604966546340-4870667f1f44?auto=format&fit=crop&q=80&w=3118&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Disney World",
    link: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Scottland",
    link: "https://images.unsplash.com/photo-1578240747034-5ba1efe22426?auto=format&fit=crop&q=80&w=3173&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Iceland",
    link: "https://images.unsplash.com/photo-1489593426629-5e4e00ce821c?auto=format&fit=crop&q=80&w=2143&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bora Bora",
    link: "https://images.unsplash.com/photo-1662283804757-ef81acd5471e?auto=format&fit=crop&q=80&w=3165&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const profileModal = document.querySelector("#edit-modal");
const newCardModal = document.querySelector("#add-modal");
const imageModal = document.querySelector("#image-modal");
const editButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileModal.querySelector(".modal__close");
const addCardCloseButton = newCardModal.querySelector(".modal__close");
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
const popups = document.querySelectorAll(".modal");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardElement = cardTemplate.cloneNode(true);
const mediaList = document.querySelector(".media__list");
const forms = [profileForm, addCardForm];
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}
function handleImageClick(name, link) {
  openPopup(imageModal);
  const previewImage = imageModal.querySelector(".modal__image");
  const previewImageDescr = imageModal.querySelector(
    ".modal__image-description"
  );
  previewImage.alt = name;
  previewImage.src = link;
  previewImageDescr.textContent = name;
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape, true);
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");

  document.removeEventListener("keydown", handleEscape, true);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closePopup(profileModal);
}
function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
}
function addCard(data, wrapper) {
  const newCard = createCard(data);
  wrapper.prepend(newCard);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = newCardTitle.value;
  const link = newCardURL.value;
  addCard({ name, link }, mediaList);
  closePopup(newCardModal);
  addCardForm.reset();
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
// initialCards.forEach(function (data) {
//   const newCard = createCard(data);
//   mediaList.append(newCard);
// });
addButton.addEventListener("click", () => {
  openPopup(newCardModal);
});
editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
  openPopup(profileModal);
});

profileCloseButton.addEventListener("click", () => closePopup(profileModal));

profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleCardFormSubmit);
addCardCloseButton.addEventListener("click", () => closePopup(newCardModal));
imageModalCloseButton.addEventListener("click", () => closePopup(imageModal));
newCardModal.addEventListener("click", function (evt) {
  if (evt.target == newCardModal) {
    closePopup(newCardModal);
  }
});
profileModal.addEventListener("click", function (evt) {
  if (evt.target == profileModal) {
    closePopup(profileModal);
  }
});
imageModal.addEventListener("click", function (evt) {
  if (evt.target == imageModal) {
    closePopup(imageModal);
  }
});
forms.forEach(function (form) {
  const newFormValidator = new FormValidator(settings, form);
  newFormValidator.enableValidation();
});
cardsList.renderItems();
