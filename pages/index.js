import Card from "../components/Card.js";

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
const mediaList = document.querySelector(".media__list");
// const newCard = new Card("#card-template", "#card-template");
// newCard.getView();
function escClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
    console.log("ran");
  }
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", escClose, true);
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");

  document.removeEventListener("keydown", escClose, true);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closePopup(profileModal);
}

function addCard(data, wrapper) {
  const cardElement = getCardElement(data);
  wrapper.prepend(cardElement);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = newCardTitle.value;
  const link = newCardURL.value;
  addCard({ name, link }, mediaList);
  closePopup(newCardModal);
  addCardForm.reset();
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}

// initialCards.forEach(function (data) {
//   const cardElement = getCardElement(data);
//   mediaList.append(cardElement);
// });
initialCards.forEach(function (data) {
  const cardElement = new Card(data, "#card-template");
  const newCard = cardElement.getView();
  mediaList.append(newCard);
});
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
