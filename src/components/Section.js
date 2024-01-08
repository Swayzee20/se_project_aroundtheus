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
  //This function renders the new cards
  //since it is not an array/then addItem adds them
  renderItem() {
    this._renderer(this._items);
  }
  //i changed this to "prepend" but this not only
  // adds new cards, it also adds the array of initial cards
  // so i'm not sure if its correct
  addItem(element) {
    this._container.prepend(element);
  }
}
