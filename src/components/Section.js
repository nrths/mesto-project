export default class Section {
    constructor ({ data, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._array = data;
        this._renderer = renderer;

    }
    
    clear() {
        this._container.innerHTML = '';
      }

    renderItems(items) {
        this.clear();
        items.forEach((item) => {
            this._renderer(item);
      });
    }

    addItem (item) {
        this._container.prepend(item)
    }
}