export default class Section {
  constructor({ data, renderer }, container) {
    this._cardData = data;
    this._renderer = renderer;
    this._container = container;
  }
  renderItems() {
    this._cardData.forEach((item) => {
      this._renderer(item);
    });
  }
  renderItem() {
    this._renderer(this._cardData);
  }
  addItem(element) {
    this._container.append(element);
  }
}
