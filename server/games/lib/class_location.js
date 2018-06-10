const { KeywordResponse } = require('./class_keyword_response');
const { getKeywordsHelper } = require('./keywords_helper');

class Location {
  constructor({ game, name }) {
    Object.assign(this, getKeywordsHelper());

    this.name = name;
    this.game = game;

    this.exits = new Map();
    this.floorItems = new Set();

    this.setKeywords(game);
  }

  setKeywords() {
    throw new Error('setKeywords must be overridden in ' + this.name);
  }

  followExit(direction, prefix = '') {
    if (this.exits.has(direction)) {
      const exit = this.exits.get(direction);
      this.game.setLocation(exit);
      exit.clearKeywords();
      exit.setKeywords(this.game);

      const ps = [exit.getDescriptionInternal(this.game)];
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
    this.exits.set(exit, location);

    if (inverseExit) {
      location.addExit({
        location: this,
        exit: inverseExit,
      });
    }
  }

  getDescriptionInternal(game) {
    return `${this.name}\n${this.getDescription(game)}`;
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
