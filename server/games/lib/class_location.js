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

    this.followExit = (direction, prefix) => this.followExitInternal(game, direction, prefix);

    this.updateState(game);
  }

  updateState() {
    throw new Error('updateState must be overridden in ' + this._name);
  }

  followExitInternal(game, direction, prefix = '') {
    if (this._exits.has(direction)) {
      const exit = this._exits.get(direction);
      game.setLocation(exit);
      game.updateState();

      const ps = [game.getLocationDescription()];
      if (prefix !== '') {
        ps.unshift(prefix);
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
    return `${this._name}\n${this.getDescription(game)}`;
  }

  addFloorItem(id) {
    // BUG this gets the readable name not the const
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
