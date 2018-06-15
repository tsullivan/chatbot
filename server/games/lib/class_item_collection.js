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

  static getAllItemsFromSet(collection, game, { pushCondition = null } = {}) {
    if (pushCondition == null) {
      pushCondition = () => true;
    }

    const items = [];
    const iterator = collection.values(); // method of Set class
    let loopDone = false;
    while (!loopDone) {
      const { value, done } = iterator.next();
      loopDone = done;
      if (loopDone) {
        break;
      } else {
        const item = game.getItemFromCollection(value);
        if (pushCondition(item)) {
          items.push(item);
        }
      }
    }

    return items;
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
