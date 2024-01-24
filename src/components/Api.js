export default class Api {
  constructor(url) {
    this._url = url;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
      },
    }).then(this._checkResponse);
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
      },
    }).then(this._checkResponse);
  }
  saveUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }
  addNewCard(cardInfo) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link,
        _id: cardInfo.id,
      }),
    }).then(this._checkResponse);
  }
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
      },
    }).then(this._checkResponse);
  }
  cardLikeToggle(isLiked, id) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
        },
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
        },
      }).then(this._checkResponse);
    }
  }
  updatePicture(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "09c7eb58-4864-40aa-bfac-2e0d5eb72b05",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._checkResponse);
  }
}
