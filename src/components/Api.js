export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._header = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._header,
    }).then(this._checkResponse);
  }
  getCardInfo(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._header,
    }).then(this._checkResponse);
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._header,
    }).then(this._checkResponse);
  }
  saveUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }
  addNewCard(cardInfo) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
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
      headers: this._header,
    }).then(this._checkResponse);
  }
  cardLikeToggle(isLiked, id) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._header,
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._header,
      }).then(this._checkResponse);
    }
  }
  updatePicture(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._checkResponse);
  }
}
