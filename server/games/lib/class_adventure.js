const { ChatGame } = require('../chat_game');
const { getKeywordsHelper } = require('./keywords_helper');
const { getGameKeywords } = require('./game_keywords');
const { ItemCollection } = require('./class_item_collection');
const { Location } = require('./class_location');
const { parajoin } = require('./parajoin');

class Adventure extends ChatGame {
  constructor(session) {
    super(session);
    Object.assign(this, getKeywordsHelper());

    this._itemCollection = new ItemCollection();
    this._inventory = new Set(); // ids of items in the collection

    this.notDone = response => ({ response, isDone: false });
    this.yesDone = response => ({ response, isDone: true });

    // should override
    this._currentLocation = null;
    this.name = 'unknown game';
    this.locations = {};
  }

  addItemToCollection(id, item) {
    this._itemCollection.addItem(id, item);
  }

  updateState() {
    // set game keywords
    this.clearKeywords();
    getGameKeywords(this).forEach(({ key, description, fn }) => {
      this.addKeyword(key, description, fn);
    });

    // update inventory item states
    const items = ItemCollection.getAllItemsFromSet(this._inventory, this);
    items.forEach(item => item.setItemActions(this));

    // update location states
    this._currentLocation.clearKeywords();
    this._currentLocation.setLocationKeywords(this);
    this._currentLocation.setVisibleItemKeywords(this);

    // update npc states
  }

  getCurrentLocation() {
    if (!(this._currentLocation instanceof Location)) {
      throw new Error('_currentLocation is not a Location instance');
    }
    return this._currentLocation;
  }

  getInputHandlerItem(items, input) {
    let foundItem = null;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.hasKeyword(input)) {
        foundItem = item;
        break;
      }
    }
    return foundItem;
  }

  win() {
    throw new Error('win method is to override');
  }
  lose() {
    throw new Error('lose method is to override');
  }

  init() {
    this.score = 50;
    this.turns = 0;
  }

  setLocation(location) {
    this._currentLocation = location;
  }

  testInput(input) {
    input = input.toUpperCase();
    const responseSet = [];
    let response,
      changeScore, // FIXME should be independent of keyword response: game.updateScore()
      isDone = false, // FIXME should be independent of keyword response game.isDone()
      showInstructions = true;

    /* array of functions to call to look through areas
     * for which the input can be a keyword */
    const checks = [
      {
        inputCheck: () => this.hasKeyword(input), // game keyword (quit, look, score, etc)
        getResponder: () => this.getInputResponse(input, this),
      },
      {
        inputCheck: game =>
          game.getCurrentLocation().hasKeyword(input) && game.getCurrentLocation(), // location keyword
        getResponder: currentLocation => currentLocation.getInputResponse(input, this),
      },
      {
        inputCheck: () => {
          const inventoryItems = this.getVisibleInventoryItems(); // keyword of a visible item in inventory
          return this.getInputHandlerItem(inventoryItems, input);
        },
        getResponder: inventoryItem => inventoryItem.getInputResponse(input, this),
      },
      {
        inputCheck: () => {
          const locationItems = this.getVisibleLocationItems(); // keyword of a visible item in the location
          return this.getInputHandlerItem(locationItems, input);
        },
        getResponder: locationItem => locationItem.getInputResponse(input, this),
      },
    ];

    let foundResponse = false;
    for (let c = 0; c < checks.length; c++) {
      const { inputCheck, getResponder } = checks[c];
      const contextResult = inputCheck(this);
      if (contextResult) {
        let isCascade = false;
        ({ response, changeScore, isDone, showInstructions, isCascade } = getResponder(
          contextResult
        ));

        foundResponse = true;

        responseSet.push(response);

        if (!isCascade) {
          break;
        }
      }
    }
    if (!foundResponse) {
      // if show item keywords of itemCollection items for visible items on floor or in inventory
      ({ response } = this.getInputResponse('HELP', this, this));
      responseSet.push(
        `ERROR! LOSE 2 POINTS. Type HELP to show all the commands` + '\n\n' + response
      );
      changeScore = -2;
      showInstructions = false;
    }

    responseSet.reverse();
    response = parajoin(responseSet);
    this.score += changeScore;

    if (this.score <= 0) {
      return this.lose(response);
    } else if (isDone) {
      return this.win(response);
    } else {
      this.turns += 1;
      return this.notDone(this.getNext(response, showInstructions));
    }
  }

  getItemFromCollection(id) {
    return this._itemCollection.get(id);
  }

  addToInventory(id) {
    this._inventory.add(id);
  }
  inInventory(id) {
    return this._inventory.has(id);
  }
  dropInventory(id, location) {
    this._inventory.delete(id);
    location.addFloorItem(id);
  }
  takeFromLocation(id, location) {
    this._inventory.add(id);
    location.removeFloorItem(id);
  }
  deleteFromInventory(id) {
    this._inventory.delete(id);
  }
  getVisibleInventoryItems() {
    return ItemCollection.getVisibleItemsFromSet(this._inventory, this);
  }
  getVisibleLocationItems() {
    return this._currentLocation.getVisibleFloorItems(this);
  }

  getNext(prefix, showInstructions) {
    let next = prefix;
    if (showInstructions) {
      next += '\n\n' + this.getLocationInstructions();
    }
    return next;
  }

  getLocationDescription() {
    const { response: locationText } = this.getInputResponse('LOOK', this, this);
    return locationText;
  }

  getLocationInstructions() {
    return this._currentLocation.getInstructions(this);
  }

  getWelcome(prefix = '') {
    const lns = [];
    if (prefix !== '') {
      lns.push(prefix);
    }
    const locationDescription = this._currentLocation.getDescriptionInternal(this);
    const { response: locationHelp } = this.getInputResponse('HELP', this, this);
    lns.push(locationDescription);
    lns.push(locationHelp);
    return parajoin(lns);
  }
}

module.exports = { Adventure };
