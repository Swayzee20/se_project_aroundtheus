import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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

const api = new Api("https://around-api.en.tripleten-services.com/v1");

const profileModal = document.querySelector("#edit-modal");
const newCardModal = document.querySelector("#add-modal");
const deleteModal = document.querySelector("#delete-modal");
const imageModal = document.querySelector("#image-modal");
const profilePictureModal = document.querySelector("#profile-picture-modal");
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
const profilePictureForm = document.querySelector("#profile-picture-form");
const mediaList = document.querySelector(".media__list");
const profileImage = document.querySelector(".profile__avatar");
const profileEditIcon = document.querySelector(".profile__avatar-icon");
const forms = [profileForm, addCardForm, profilePictureForm];
// const initCards = [];

// const profileInfo = [profileName, profileDesc];
const profileInputs = [inputName, inputDesc];
//Popups
const imagePopup = new PopupWithImage(imageModal);
function handleImageClick(name, link) {
  imagePopup.openPopup({ name, link });
}

//Popup Forms
const profilePopup = new PopupWithForm(profileModal, (data, button) => {
  userInfo.setUserInfo(data);
  api.saveUserInfo(data).then(() => {
    button.textContent = "Save";
    profilePopup.closePopup();
  });
  button.textContent = "Saving...";
});

const profilePicturePopup = new PopupWithForm(
  profilePictureModal,
  (data, button) => {
    api
      .updatePicture(data.url)
      .then((res) => {
        button.textContent = "Save";
        profilePicturePopup.closePopup();
      })
      .catch((err) => {
        console.error(err);
      });
    button.textContent = "Saving...";
  }
);

const deletePopup = new PopupWithForm(deleteModal, () => {});
// const cardForm = new PopupWithForm(newCardModal, (data) => {
//   const name = newCardTitle.value;
//   const link = newCardURL.value;
//   addCard({ name, link }, mediaList);
//   api.addNewCard({ name, link });
//   cardForm.closePopup();
// });

function handleDeleteCard(cardId, cardElement) {
  deletePopup.openPopup();
  const id = cardId;
  deleteModal.addEventListener("submit", (evt) => {
    evt.preventDefault();
    api.deleteCard(id);
    cardElement.remove();
    deletePopup.closePopup();
  });
}
function handleCardLike(isLiked, cardId) {
  api.cardLikeToggle(isLiked, cardId);
}
function createCard(data) {
  const cardElement = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleCardLike
  );
  return cardElement.getView();
}

// function addCard(data, wrapper) {
//   const newCard = createCard(data);
//   cardsList.addItem(newCard);
// }
// const cardsList = new Section(
//   {
//     data: initialCards,
//     renderer: (cardItem) => {
//       console.log(cardItem);
//       const newCard = createCard(cardItem);
//       cardsList.addItem(newCard);
//     },
//   },
//   mediaList
// );
// cardsList.renderItems();
// addButton.addEventListener("click", () => {
//   cardForm.openPopup();
// });
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
const userInfo = new UserInfo(profileInfo);

profilePopup.setEventListeners();
// cardForm.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
profilePicturePopup.setEventListeners();
profileImage.addEventListener("mouseover", () => {
  profileEditIcon.style.visibility = "visible";
});
profileImage.addEventListener("mouseout", () => {
  profileEditIcon.style.visibility = "hidden";
});
profileImage.addEventListener("click", () => {
  profilePicturePopup.openPopup();
});

const apiInfo = {
  url: "https://around-api.en.tripleten-services.com/v1/users/me",
};

// api.getInitialCards().then((res) => {
//   const initCards = res;
//   console.log(initCards);
//   const cardsList = new Section(
//     {
//       data: initCards,
//       renderer: (cardItem) => {
//         const newCard = createCard(cardItem);
//         cardsList.addItem(newCard);
//       },
//     },
//     mediaList
//   );
//   cardsList.renderItems();
// });

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    const profileInfo = res[0];
    const initCards = res[1];
    userInfo.setUserInfo(profileInfo);
    const cardsList = new Section(
      {
        data: initCards,
        renderer: (cardItem) => {
          const newCard = createCard(cardItem);
          cardsList.addItem(newCard);
        },
      },
      mediaList
    );
    function addCard(data, wrapper) {
      const newCard = createCard(data);
      cardsList.addItem(newCard);
    }
    const cardForm = new PopupWithForm(newCardModal, (data, button) => {
      const name = newCardTitle.value;
      const link = newCardURL.value;
      api
        .addNewCard({ name, link })
        .then((res) => {
          const _id = res._id;
          addCard({ name, link, _id }, mediaList);
          button.textContent = "Create";
          cardForm.closePopup();
        })
        .catch((err) => {
          console.error(err);
        });
      button.textContent = "Saving...";
    });
    addButton.addEventListener("click", () => {
      cardForm.openPopup();
    });
    cardsList.renderItems();
    cardForm.setEventListeners();
  })
  .catch((err) => {
    console.error(err);
  });

// cardIds.forEach((item) => {
//   api.deleteCard(item.id);
// });
// api.getInitialCards().then((res) => {
//   console.log(res);
// });
// api.addNewCard({
//   name: "New York",
//   link: "https://images.unsplash.com/photo-1512850183-6d7990f42385?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// }).then();
// api.getInitialCards().then((res) => {
//   res.forEach((item) => {
//     console.log(item._id);
//     api.deleteCard(item._id);
//   });
// });