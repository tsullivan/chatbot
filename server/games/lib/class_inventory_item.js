const { MultiMap } = require('../../../lib');
const { getKeywordsHelper } = require('./keywords_helper');

const noop = () => {};

class InventoryItem {
  /*
   * name
   * description
   * seen
   * droppable
   * takeable
   */
  constructor({ game, name, id, description, seen = true, setActions = noop }) {
    if (!(game instanceof Object)) {
      throw new Error('game must be an Adventure object');
    }
    if (!game.currentLocation) {
      throw new Error('need a current location for the game');
    }
    if (typeof name !== 'string') {
      throw new Error('name must be string');
    }
    if (typeof id !== 'string') {
      throw new Error('id must be string');
    }
    if (typeof description !== 'string') {
      throw new Error('description must be string');
    }
    Object.assign(this, getKeywordsHelper('setItemKeywords'));

    this._game = game;
    this._name = name;
    this._id = id;
    this._description = description;
    this._seen = seen;
    this._keywords = new MultiMap();

    this._droppable = false;
    this._takeable = false;

    this._setActions = setActions;
    this.setItemKeywords(game);
  }

  setItemKeywords() {
    return this._setActions({
      setDroppable: this.setDroppable.bind(this),
      setTakeable: this.setTakeable.bind(this),
    });
  }

  setDroppable({ isDroppable = true, keyword, keywordDescription, fn }) {
    // add a drop keyword if item is currently in inventory
    if (isDroppable && this._game.inInventory(this._id)) {
      this._droppable = true;
      this.addKeyword(keyword, keywordDescription, game => {
        game.dropInventory(this._id, game.currentLocation);
        return fn(game);
      });
    } else {
      this._droppable = false;
      this.removeKeyword(keyword);
    }
  }
  setTakeable({ isTakeable = true, keyword, keywordDescription, fn }) {
    // add a take keyword if game location has the item
    if (isTakeable && this._game.currentLocation.hasFloorItem(this._id)) {
      this._takeable = true;
      this.addKeyword(keyword, keywordDescription, game => {
        game.takeFromLocation(this._id, game.currentLocation);
        return fn(game);
      });
    } else {
      this._takeable = false;
      this.removeKeyword(keyword);
    }
  }

  examine() {
    return `${this._name} - ${this._description}`;
  }

  see() {
    this._seen = true;
  }
  hide() {
    this._seen = false;
  }
  isSeen() {
    return this._seen === true;
  }

  setName(name) {
    this._name = name;
  }
  setDescription(description) {
    this._description = description;
  }
  getName() {
    return this._name;
  }
  getDescription() {
    return this._description;
  }
}

module.exports = { InventoryItem };
