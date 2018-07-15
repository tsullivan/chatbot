const { values: getValues } = require('lodash');
const { UL, LI } = require('../../constants');
const { parajoin } = require('./parajoin');

// give name and instructions for each inventory and floor item
function describeItSimple(item) {
  return UL + item.getInfo();
}
// just mention visible items, ignore inventory
function prefixItSimple({ floorItems /*, inventoryItems */ }) {
  return { floorItems: floorItems != null ? 'You see:\n' + floorItems : floorItems };
}

class ItemCollection {
  constructor() {
    this._items = new Map();
  }

  /*
   * Get the stuff to say about the items, but get them prefixed in a specific
   * way determined by the caller
   * @return {String}
   */
  static describeGameItems(
    game,
    describeIt = describeItSimple,
    prefixIt = prefixItSimple
  ) {
    const getTheirInfo = items => {
      return items.length ? items.map(describeIt).join('\n') : null;
    };
    const blocks = getValues(
      prefixIt({
        floorItems: getTheirInfo(game.getCurrentLocation().getVisibleFloorItems(game)),
        inventoryItems: getTheirInfo(game.getVisibleInventoryItems()),
      })
    ).filter(Boolean); // drop null info

    return blocks.length > 0 ? parajoin(blocks) : null;
  }

  /*
   * Get the stuff to say about the items, prefixed for where the item is, with the instructions for each item
   * @return {String}
   */
  static describeGameItemsFull(game) {
    // give name and instructions for each inventory and floor item
    const describeIt = item => {
      let words = UL + item.getInfo();
      const instructions = item.getInstructions(LI);
      if (instructions && instructions.length) {
        words += '\n' + instructions;
      }
      return words;
    };
    const prefixIt = ({ floorItems, inventoryItems }) => {
      return {
        floorItems:
          floorItems != null
            ? `In ${game.getCurrentLocation().getName()}, You see:\n` + floorItems
            : floorItems,
        inventoryItems:
          inventoryItems != null
            ? 'You are holding:\n' + inventoryItems
            : inventoryItems,
      };
    };
    return ItemCollection.describeGameItems(game, describeIt, prefixIt);
  }

  static getAllItemsFromSet(game, collection, { pushCondition = () => true } = {}) {
    return Array.from(collection).reduce((accum, value) => {
      const item = game.getItemFromCollection(value);
      if (pushCondition(item)) {
        return [...accum, item];
      }
      return accum;
    }, []);
  }

  static getVisibleItemsFromSet(game, collection) {
    if (game == null) {
      throw new Error('game param not given');
    }

    return ItemCollection.getAllItemsFromSet(game, collection, {
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
