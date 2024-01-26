import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { initialCards, settings, profileInfo } from "../utils/constants.js";
import "./index.css";

const api = new Api({
  url: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
    "Content-Type": "application/json",
  },
});

const profileModal = document.querySelector("#edit-modal");
const newCardModal = document.querySelector("#add-modal");
const deleteModal = document.querySelector("#delete-modal");
const imageModal = document.querySelector("#image-modal");
const profilePictureModal = document.querySelector("#profile-picture-modal");
const profileAvatar = document.querySelector(".profile__avatar");
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

const profileInputs = [inputName, inputDesc];
//Popups
const imagePopup = new PopupWithImage(imageModal);
function handleImageClick(name, link) {
  imagePopup.openPopup({ name, link });
}

//Popup Forms
const profilePopup = new PopupWithForm(profileModal, (data, button) => {
  api
    .saveUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
      profilePopup.closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally((res) => {
      button.textContent = "Save";
    });
  button.textContent = "Saving...";
});

const profilePicturePopup = new PopupWithForm(
  profilePictureModal,
  (data, button) => {
    api
      .updatePicture(data.url)
      .then((res) => {
        userInfo.setAvatar(res);
        profilePicturePopup.closePopup();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally((res) => {
        button.textContent = "Save";
      });
    button.textContent = "Saving...";
  }
);
const deletePopup = new PopupWithConfirmation(deleteModal);
deletePopup.setEventListeners();

function handleDeleteCard(cardId, cardElement) {
  const id = cardId;
  deletePopup.openPopup();
  deletePopup.setSubmitAction(() => {
    api
      .deleteCard(id)
      .then((res) => {
        cardElement.remove();
        deletePopup.closePopup();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
// function cancelDeleteCard();
function handleCardLike(isLiked, cardId, cardInstance) {
  api
    .cardLikeToggle(isLiked, cardId)
    .then((res) => {
      console.log(res);
      cardInstance.toggleLike();
    })
    .catch((err) => {
      console.error(err);
    });
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
imagePopup.setEventListeners();

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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    const profileInfo = res[0];
    const initCards = res[1];
    userInfo.setUserInfo(profileInfo);
    userInfo.setAvatar(profileInfo);
    const cardsList = new Section(
      {
        data: initCards,
        renderer: (cardItem) => {
          const newCard = createCard(cardItem);
          console.log(cardItem);
          cardsList.addItem(newCard);
        },
      },
      mediaList
    );
    function addCard(data, wrapper) {
      const newCard = createCard(data);
      cardsList.addItem(newCard);
    }
    const cardModal = new PopupWithForm(newCardModal, (data, button) => {
      const name = data.title;
      const link = data.url;
      api
        .addNewCard({ name, link })
        .then((res) => {
          const _id = res._id;
          addCard({ name, link, _id }, mediaList);
          cardModal.closePopup();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally((res) => {
          button.textContent = "Create";
        });
      button.textContent = "Saving...";
    });
    addButton.addEventListener("click", () => {
      cardModal.openPopup();
    });
    cardsList.renderItems();
    cardModal.setEventListeners();
  })
  .catch((err) => {
    console.error(err);
  });
