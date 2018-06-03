const { LocationKeywordResponse } = require('./class_location_keyword_response');

class Location {
  constructor({ game, name }) {
    this.name = name;
    this.game = game;

    this.exits = new Map();
    this.keywords = new Map();
    this.floorItems = new Set();

    this.setKeywords(game);
  }

  setKeywords() {
    throw new Error('setKeywords must be overridden in ' + this.name);
  }

  followExit(direction) {
    if (this.exits.has(direction)) {
      const exit = this.exits.get(direction);
      this.game.setLocation(exit);

      exit.updateKeywords(this.game);

      return new LocationKeywordResponse({
        text: exit.getDescriptionInternal(this.game)
      });
    }

    return new LocationKeywordResponse({
      text: 'Bad directions!!! ' + direction
    });
  }

  updateKeywords(game) {
    this.clearKeywords();
    this.setKeywords(game);
  }

  addExit({ location, exit, inverseExit }) {
    this.exits.set(exit, location);

    if (inverseExit) {
      location.addExit({
        location: this,
        exit: inverseExit
      });
    }
  }

  getDescriptionInternal(game) {
    return `${this.name}\n${this.getDescription(game)}`;
  }

  // get the instructions from the keywords
  getInstructions() {
    const instructions = [];
    const iterator = this.keywords.values();
    let loopDone = false;

    while (!loopDone) {
      const { value: instruction, done } = iterator.next();
      loopDone = done;
      if (loopDone) {
        break;
      } else {
        instructions.push(instruction.text);
      }
    }

    return `Type:\n${instructions.join('\n')}`;
  }

  /*
   * text {String} text used for getInstructions
   * fn {Function} function that must return LocationKeywordResponse
   */
  addKeyword(keyword, text, fn) {
    this.keywords.set(keyword, { text, fn });
  }
  removeKeyword(keyword) {
    this.keywords.delete(keyword);
  }
  clearKeywords() {
    this.keywords.clear();
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

  getInputResponse(input) {
    let response;
    if (this.keywords.has(input)) {
      const { fn } = this.keywords.get(input);
      response = LocationKeywordResponse.getResponseFromHandler(fn, this.game);
      this.updateKeywords(this.game); // handler can change available keywords
    } else {
      response = new LocationKeywordResponse({
        text: `ERROR! LOSE 2 POINTS`,
        changeScore: -2
      });
    }

    return response.get();
  }
}

module.exports = { Location };
