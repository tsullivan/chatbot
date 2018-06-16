const { ItemCollection } = require('./class_item_collection');
const { KeywordResponse } = require('./class_keyword_response');
const { getKeywordsHelper } = require('./keywords_helper');

class Location {
  constructor({ game, name }) {
    Object.assign(this, getKeywordsHelper('setLocationKeywords'));

    this._game = game;
    this._exits = new Map();

    this._name = name;
    this._floorItems = new Set();

    this.setLocationKeywords(game);
  }

  setLocationKeywords() {
    throw new Error('setLocationKeywords must be overridden in ' + this._name);
  }

  followExit(direction, prefix = '') {
    if (this._exits.has(direction)) {
      const exit = this._exits.get(direction);
      this._game.setLocation(exit);
      exit.clearKeywords();
      exit.setLocationKeywords(this._game);
      exit.setVisibleItemKeywords(this._game);

      const ps = [exit.getDescriptionInternal(this._game)];
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
    items.forEach(item => item.setItemKeywords());
  }
}

module.exports = { Location };
