const { partial } = require('lodash');
const { getKeywordsHelper } = require('./keywords_helper');

const noop = () => {};

class Item {
  /*
   * name
   * description
   * options
   */
  constructor({ game, name, id, description, seen = true, setActions = noop }) {
    if (!(game instanceof Object)) {
      throw new Error('game must be an Adventure object');
    }
    if (!game.getCurrentLocation()) {
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
    this._setActions = setActions;

    this._combinedWith = new Set();

    this.setItemActions(game);
  }

  /*
   * Info that does not include the keyword instructions
   */
  getInfo() {
    return `${this.getName()} - ${this.getDescription()}`;
  }

  setItemActions(game) {
    return this._setActions({
      setDroppable: partial(this.setDroppable, game).bind(this),
      setTakeable: partial(this.setTakeable, game).bind(this),
      setCombinables: combinableArray => {
        for (const combinable of combinableArray) {
          const updatedComb = Object.assign({}, combinable, {
            numberToCombineWith: combinableArray.length,
          });
          this.setCombinable(game, updatedComb);
        }
      },
    });
  }

  /*
   * You can only combine items when holding both of them
   */
  setCombinable(
    game,
    { combinesWith, keyword, keywordDescription, fn, numberToCombineWith = 0 }
  ) {
    if (typeof combinesWith !== 'string') {
      throw new Error('invalid combinesWith ' + combinesWith);
    }
    if (typeof keyword !== 'string') {
      throw new Error('invalid keyword ' + keyword);
    }
    if (typeof keywordDescription !== 'string') {
      throw new Error('invalid keywordDescription ' + keywordDescription);
    }
    if (typeof fn !== 'function') {
      throw new Error('invalid function ' + fn);
    }
    const self = this;
    if (game.inInventory(self._id) && game.inInventory(combinesWith)) {
      self.addKeyword(keyword, keywordDescription, () => {
        self.removeKeyword(keyword);
        self._combinedWith.add(combinesWith);
        self._isComplete = self._combinedWith.size >= numberToCombineWith; // TODO
        game.deleteFromInventory(combinesWith);
        return fn(self, self._combinedWith);
      });
    }
  }

  isComplete() {
    return this._isComplete === true;
  }

  combineWith(combinesWith) {
    this._combinedWith.add(combinesWith);
  }

  setDroppable(game, { keyword, keywordDescription, fn }) {
    // add a drop keyword if item is currently in inventory
    if (game.inInventory(this._id)) {
      this.addKeyword(keyword, keywordDescription, () => {
        game.dropInventory(this._id, game.getCurrentLocation());
        return fn(this);
      });
    }
  }
  setTakeable(game, { keyword, keywordDescription, fn }) {
    // add a take keyword if game location has the item
    if (game.getCurrentLocation().hasFloorItem(this._id)) {
      this.addKeyword(keyword, keywordDescription, () => {
        game.takeFromLocation(this._id, game.getCurrentLocation());
        return fn(this);
      });
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

module.exports = { Item };
