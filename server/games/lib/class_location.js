const { ItemCollection } = require('./class_item_collection');
const { KeywordResponse } = require('./class_keyword_response');
const { getKeywordsHelper } = require('./keywords_helper');

class Location {
  constructor({ game, name }) {
    if (!(game instanceof Object)) {
      throw new Error('game must be an Adventure object');
    }
    if (typeof name !== 'string') {
      throw new Error('name must be string');
    }

    Object.assign(this, getKeywordsHelper());

    this._exits = new Map();

    this._name = name;
    this._floorItems = new Set();

    this.followExit = (direction, prefix) =>
      this.followExitInternal(game, direction, prefix);

    this.updateState(game);
  }

  updateState() {
    throw new Error('updateState must be overridden in ' + this._name);
  }

  followExitInternal(game, direction, suffix = '') {
    if (this._exits.has(direction)) {
      const exit = this._exits.get(direction);
      game.setLocation(exit);
      game.updateState();

      const ps = [game.getLocationDescription()];
      if (suffix !== '') {
        ps.push(suffix);
      }

      return new KeywordResponse({
        text: ps.join('\n\n'),
      });
    }

    return new KeywordResponse({
      text: 'Bad directions!!! ' + direction,
    });
  }

  addExit({ location, exit, inverseExit }) {
    this._exits.set(exit, location);

    if (inverseExit) {
      location.addExit({
        location: this,
        exit: inverseExit,
      });
    }
  }

  getDescriptionInternal(game) {
    const ps = [`You are at: ${this._name}\n${this.getDescription(game)}`];

    // show any items on the floor
    const {
      itemsCount: locItemsCount,
      itemInfos: locItemInfos,
    } = game.currentLocation.getVisibleFloorItems(game).reduce(
      ({ itemInfos, itemsCount }, item) => {
        return {
          itemsCount: itemsCount + 1,
          itemInfos: itemInfos.concat(item.getInfo()),
        };
      },
      { itemInfos: [], itemsCount: 0 }
    );
    if (locItemsCount > 0) {
      let itemsPre = `There is an item here you may be interested in:`;
      if (locItemsCount > 1) {
        itemsPre = `There are ${locItemsCount} items here you may be interested in:`;
      }
      ps.push(itemsPre + '\n' + locItemInfos.join('\n'));
    }

    return ps.join('\n\n');
  }

  addFloorItem(id) {
    this._floorItems.add(id);
  }
  hasFloorItem(id) {
    return this._floorItems.has(id);
  }
  removeFloorItem(id) {
    this._floorItems.delete(id);
  }
  getVisibleFloorItems(game) {
    return ItemCollection.getVisibleItemsFromSet(this._floorItems, game);
  }
  setVisibleItemKeywords(game) {
    const items = ItemCollection.getVisibleItemsFromSet(this._floorItems, game);
    items.forEach(item => item.updateState(game));
  }
}

module.exports = { Location };
