export default class Section {
  constructor({ data, renderer }, classSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = classSelector;
  }
  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.append(element);
  }
}
