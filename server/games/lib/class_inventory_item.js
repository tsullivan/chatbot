const { partial } = require('lodash');
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
    Object.assign(this, getKeywordsHelper());

    this._name = name;
    this._id = id;
    this._description = description;
    this._seen = seen;

    this._droppable = false;
    this._takeable = false;
    this._combinable = false;
    this._combinedWith = new Set();

    this._setActions = setActions;

    this.updateState(game);
  }

  updateState(game) {
    return this._setActions({
      setDroppable: partial(this.setDroppable, game).bind(this),
      setTakeable: partial(this.setTakeable, game).bind(this),
      setCombinable: partial(this.setCombinable, game).bind(this),
    });
  }

  setCombinable(
    game,
    { isCombinable = true, combinesWith, keyword, keywordDescription, fn }
  ) {
    if (
      isCombinable &&
      (game.inInventory(this._id) || game.currentLocation.hasFloorItem(this._id))
    ) {
      this._combinable = true;
      this.addKeyword(keyword, keywordDescription, () => {
        this._combinedWith.add(combinesWith);
        // fn checks if combo is complete
        return fn(game, this._combinedWith);
      });
    } else {
      this._combinable = false;
      this.removeKeyword(keyword);
    }
  }

  setDroppable(game, { isDroppable = true, keyword, keywordDescription, fn }) {
    // add a drop keyword if item is currently in inventory
    if (isDroppable && game.inInventory(this._id)) {
      this._droppable = true;
      this.addKeyword(keyword, keywordDescription, () => {
        game.dropInventory(this._id, game.currentLocation);
        return fn(game);
      });
    } else {
      this._droppable = false;
      this.removeKeyword(keyword);
    }
  }
  setTakeable(game, { isTakeable = true, keyword, keywordDescription, fn }) {
    // add a take keyword if game location has the item
    if (isTakeable && game.currentLocation.hasFloorItem(this._id)) {
      this._takeable = true;
      this.addKeyword(keyword, keywordDescription, () => {
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
