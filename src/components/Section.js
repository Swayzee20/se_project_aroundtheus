export default class Section {
  constructor({ data, renderer }, container) {
    this._items = data;
    this._renderer = renderer;
    this._container = container;
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  //This function is used to add a single card from the new card form
  //since it is not an array
  renderItem() {
    this._renderer(this._items);
  }
  addItem(element) {
    this._container.append(element);
  }
}
