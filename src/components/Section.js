export default class Section {
    constructor ({ data, renderer }, selector) {
        this._container = document.querySelector(selector);
        this._renderedItems = data;
        this._renderer = renderer;

    }
    
    clear() {
        this._container.innerHTML = '';
      }

    render() {
    
        this.clear();

        this._renderedItems.forEach((item) => {
            this._renderer(item);
      });
    }

    addItem (item) {
        this._container.prepend(item)
    }
}