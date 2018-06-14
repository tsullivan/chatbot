const { KeywordResponse } = require('./class_keyword_response');
const { getKeywordsHelper } = require('./keywords_helper');

class Location {
  constructor({ game, name }) {
    Object.assign(this, getKeywordsHelper());

    this._game = game;
    this._exits = new Map();

    this._name = name;
    this.floorItems = new Set();

    this.setKeywords(game);
  }

  setKeywords() {
    throw new Error('setKeywords must be overridden in ' + this._name);
  }

  followExit(direction, prefix = '') {
    if (this._exits.has(direction)) {
      const exit = this._exits.get(direction);
      this._game.setLocation(exit);
      exit.clearKeywords();
      exit.setKeywords(this._game);

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

  addFloorItem(item) {
    this.floorItems.add(item);
  }
  hasFloorItem(item) {
    return this.floorItems.has(item);
  }
  // find the item and remove it from the floor
  removeFloorItem(item) {
    this.floorItems.delete(item);
  }
}

module.exports = { Location };
