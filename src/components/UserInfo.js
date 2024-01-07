export default class UserInfo {
  constructor(nameSelector, aboutMeSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
  }
  getUserInfo() {
    // const info = {
    //   username: "",
    //   description: "",
    // };
    // info.username = this._userInfo[0].textContent;
    // info.description = this._userInfo[1].textContent;
    // return info;
    return {
      name: this._nameElement.textContent,
      about: this.aboutMeElement,
    };
  }
  setUserInfo(data) {
    const inputObject = [];
    data.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    console.log(inputObject);
    return inputObject;
  }
}
