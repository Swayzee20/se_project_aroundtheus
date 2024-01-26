export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutMeElement.textContent,
    };
  }
  setUserInfo(data) {
    // const inputObject = [];
    // data.forEach((input) => {
    //   inputObject[input.name] = input.value;
    // });
    this._nameElement.textContent = data.name;
    this._aboutMeElement.textContent = data.about;
    // this._avatarElement.src = data.avatar;
  }
  setAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
