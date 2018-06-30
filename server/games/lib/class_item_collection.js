const { UL, LI } = require('../../constants');
const { parajoin } = require('./parajoin');

class ItemCollection {
  constructor() {
    this._items = new Map();
  }

  static describeGameItems(game) {
    const describeIt = item => {
      let words = UL + item.getInfo();
      const instructions = item.getInstructions(LI);
      if (instructions && instructions.length) {
        words += '\n' + instructions;
      }
      return words;
    };
    const getTheirInfo = (items, prefix) => {
      let infos = '';
      if (items.length) {
        infos += `${prefix}\n`;
        infos += items.map(describeIt).join('\n');
      }
      return infos;
    };

    const floorInfos = getTheirInfo(
      game.currentLocation.getVisibleFloorItems(game),
      `Items in ${game.currentLocation.getName()}`
    );

    const invInfos = getTheirInfo(
      game.getVisibleInventoryItems(),
      'Items in your inventory:'
    );

    const text = parajoin([floorInfos, invInfos]);
    return text.length ? text : null;
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

  addItem(id, item) {
    this._items.set(id, item);
  }
  get(id) {
    return this._items.get(id);
  }
}

module.exports = { ItemCollection };
