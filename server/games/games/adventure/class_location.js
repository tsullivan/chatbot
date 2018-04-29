const { LocationKeywordResponse } = require('./class_location_keyword_response');

class Location {
  constructor({ game, name, description, instructions }) {
    this.name = name;
    this.description = description;
    this.instructions = instructions;
    this.game = game;

    this.exits = new Map();
    this.keywords = new Map();
    this.floorItems = new Set();
  }

  followExit(direction) {
    if (this.exits.has(direction)) {
      const exit = this.exits.get(direction);
      this.game.setLocation(exit);

      return new LocationKeywordResponse({
        text: this.game.getRoomDescription()
      });
    }

    return new LocationKeywordResponse({
      text: 'Bad directions!!! ' + direction
    });
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

  /*
   * fn {Function} function that must return LocationKeywordResponse
   */
  addKeyword(keyword, fn) {
    this.keywords.set(keyword, fn);
  }

  addFloorItem(item) {
    this.floorItems.add(item);
  }
  // find the item and remove it from the floor
  removeFloorItem(item) {
    this.floorItems.delete(item);
  }
  hasItem(item) {
    this.floorItems.has(item);
  }

  getInputResponse(input) {
    let response;
    if (this.keywords.has(input)) {
      const fn = this.keywords.get(input);
      response = LocationKeywordResponse.getResponseFromHandler(fn);
    } else {
      response = new LocationKeywordResponse({
        text: this.instructions + '!!!',
        reduceScore: 2
      });
    }

    return response.get();
  }
}

module.exports = { Location };
