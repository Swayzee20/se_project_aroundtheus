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
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const inputName = document.querySelector(".modal__input-name");
const inputDesc = document.querySelector(".modal__input-description");
const profileForm = document.querySelector("#edit-profile-form");
const profileModal = document.querySelector("#edit-modal");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const mediaList = document.querySelector(".media__list");
function toggleModal() {
  profileModal.classList.toggle("modal_opened");
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  toggleModal();
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}

editButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
initialCards.forEach(function (data) {
  const cardElement = getCardElement(data);
  mediaList.append(cardElement);
});
