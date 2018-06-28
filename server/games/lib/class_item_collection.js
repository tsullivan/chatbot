class ItemCollection {
  constructor() {
    this._items = new Map();
  }
  addItem(id, item) {
    this._items.set(id, item);
  }
  get(id) {
    return this._items.get(id);
  }

  static getAllItemsFromSet(collection, game, { pushCondition = () => true } = {}) {
    return Array.from(collection).reduce((accum, value) => {
      const item = game.getItemFromCollection(value);
      if (pushCondition(item)) {
        return [...accum, item];
      }
      return accum;
    }, []);
  }

  static getVisibleItemsFromSet(collection, game) {
    return ItemCollection.getAllItemsFromSet(collection, game, {
      pushCondition(item) {
        return item.isSeen();
      },
    });
  }
}

module.exports = { ItemCollection };
