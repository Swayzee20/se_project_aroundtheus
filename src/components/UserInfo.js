export default class UserInfo {
  constructor(data) {
    this._userInfo = data;
  }
  getUserInfo() {
    const info = {
      username: "",
      description: "",
    };
    info.username = this._userInfo[0].textContent;
    info.description = this._userInfo[1].textContent;
    return info;
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
