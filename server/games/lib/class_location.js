const { ItemCollection } = require('./class_item_collection');
const { KeywordResponse } = require('./class_keyword_response');
const { getKeywordsHelper } = require('./keywords_helper');
const { parajoin } = require('./parajoin');

class Location {
  constructor({ game, name }) {
    if (!(game instanceof Object)) {
      throw new Error('game must be an Adventure object');
    }
    if (typeof name !== 'string') {
      throw new Error('name must be string');
    }

    const keywordsHelper = getKeywordsHelper();
    Object.assign(this, keywordsHelper);

    this._exits = new Map();

    this._name = name;
    this._floorItems = new Set();

    this.followExit = (direction, prefix) => {
      return this.followExitInternal(game, direction, prefix);
    };

    this.getInstructions = (_game, ...args) => {
      return this.getInstructionsInternal(game, keywordsHelper, ...args);
    };

    this.setLocationKeywords(game);
  }

  setLocationKeywords() {
    throw new Error('setLocationKeywords must be overridden in ' + this._name);
  }

  followExitInternal(game, direction, prefix = '') {
    if (this._exits.has(direction)) {
      const exit = this._exits.get(direction);
      game.setLocation(exit);
      game.updateState(exit);

      const lns = [];
      if (prefix !== '') {
        lns.push(prefix);
      }
      lns.push(game.getLocationDescription());

      return new KeywordResponse({
        text: parajoin(lns),
      });
    }

    return new KeywordResponse({
      text: 'Bad directions!!! ' + direction,
    });
  }

  /*
   * For location, need the commands for the visible items in the room
   */
  getInstructionsInternal(game, keywordsHelper, prefix = '') {
    const getInstructions = keywordsHelper.getInstructions.bind(this);
    const locationInstructions = getInstructions(prefix);

    // show any items on the floor
    const itemInfos = this.getVisibleFloorItems(game).reduce((accum, item) => {
      if (item.hasKeywords()) {
        return [...accum, item.getInstructions()];
      }
      return accum;
    }, []);

    const lns = [];
    if (itemInfos.length > 0) {
      lns.push(itemInfos.join('\n'));
    }
    lns.push(locationInstructions);
    return lns.join('\n');
  }

  addExit({ location, exit, inverseExit }) {
    if (!(location instanceof Location)) {
      throw new Error('bad location: ' + location);
    }
    this._exits.set(exit, location);

    if (inverseExit) {
      location.addExit({
        location: this,
        exit: inverseExit,
      });
    }
  }

  getDescriptionInternal(game) {
    return `You are at: ${this.getName()}\n${this.getDescription(game)}`;
  }

  getName() {
    return this._name;
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
