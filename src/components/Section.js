export default class Section {
  constructor({ data, renderer }, container) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = container;
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
