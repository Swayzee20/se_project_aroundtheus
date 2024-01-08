export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
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
    this._aboutMeElement.textContent = data.description;
  }
}
