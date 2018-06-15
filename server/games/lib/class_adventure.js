const { ChatGame } = require('../chat_game');
const { getKeywordsHelper } = require('./keywords_helper');
const { getGameKeywords } = require('./game_keywords');
const { ItemCollection } = require('./class_item_collection');

class Adventure extends ChatGame {
  constructor(session) {
    super(session);
    Object.assign(this, getKeywordsHelper());

    this._itemCollection = new ItemCollection();
    this._inventory = new Set(); // ids of items in the collection

    this.notDone = response => ({ response, isDone: false });
    this.yesDone = response => ({ response, isDone: true });

    // should override
    this.name = 'unknown game';
    this.locations = {};

    this.setKeywords();
  }

  addItemToCollection(id, item) {
    this._itemCollection.addItem(id, item);
  }

  setKeywords() {
    const gameKeywords = getGameKeywords(this);
    gameKeywords.forEach(({ key, description, fn }) => {
      this.addKeyword(key, description, fn);
    });
  }
  setInventoryKeywords() {
    const items = ItemCollection.getAllItemsFromSet(this._inventory, this);
    items.forEach(item => item.setKeywords(this));
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
    this.currentLocation = location;
  }

  testInput(input) {
    input = input.toUpperCase();
    let response,
      changeScore,
      isDone = false,
      showInstructions = true;

    /* array of functions to call to look through areas
     * for which the input can be a keyword */
    const checks = [
      {
        inputCheck: () => this.hasKeyword(input),
        getResponder: () => this.getInputResponse(input, this),
      },
      {
        inputCheck: game => game.currentLocation.hasKeyword(input) && game.currentLocation, // location keyword
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
          const locationItems = this.currentLocation.getFloorItems(); // keyword of a visible item in the location
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
        ({ response, changeScore, isDone, showInstructions } = getResponder(contextResult));
        foundResponse = true;
        break;
      }
    }
    if (!foundResponse) {
      // if show item keywords of itemCollection items for  visible items on floor or in inventory
      ({ response } = this.getInputResponse('HELP', this, this));
      response = `ERROR! LOSE 2 POINTS. Type HELP to show all the commands` + '\n\n' + response;
      changeScore = -2;
      showInstructions = false;
    }

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
  deleteInventory(id) {
    this._inventory.delete(id);
  }
  getVisibleInventoryItems() {
    return ItemCollection.getVisibleItemsFromSet(this._inventory, this);
  }

  getNext(prefix, showInstructions) {
    let next = prefix;
    if (showInstructions) {
      next += '\n\n' + this.currentLocation.getInstructions();
    }
    return next;
  }

  getWelcome() {
    const locationDescription = this.currentLocation.getDescriptionInternal(this);
    const { response: locationHelp } = this.getInputResponse('HELP', this, this);
    return [locationDescription, locationHelp].join('\n\n');
  }
}

module.exports = { Adventure };
