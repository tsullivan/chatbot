import { ChatGame } from '../';
import { ChatSession } from '../../session';
import { Item } from './class_item';
import { ItemCollection } from './class_item_collection';
import { KeywordResponse } from './class_keyword_response';
import { Location } from './class_location';
import { getGameKeywords } from './game_keywords';
import { getKeywordsHelper, IKeywordResponseValue } from './keywords_helper';
import { parajoin } from './parajoin';

export class Adventure extends ChatGame {
  public branchToGame: (BranchGame: (session: any) => void, prefix: string) => KeywordResponse;
  public clearKeywords: () => void;
  public getInputResponse: (input: string, game: ChatGame) => IKeywordResponseValue;
  public getInstructions: () => string;
  public addKeyword: (key: string, description: string, fn: () => KeywordResponse) => string;
  public hasKeyword: (key: string) => boolean;
  public score: number;
  public turns: number;
  public postInit?: () => void;
  public startFromTrunk: () => void;

  private itemCollection: ItemCollection;
  private inventory: Set<string>;
  private currentLocation: Location;

  constructor(session: ChatSession) {
    super(session);
    Object.assign(this, getKeywordsHelper());

    this.itemCollection = new ItemCollection();
    this.inventory = new Set(); // ids of items in the collection

    // KeywordResponse helpers
    this.branchToGame = (BranchGame, prefix) => {
      const newGame = new BranchGame(session);
      newGame.startFromTrunk(this);
      return new KeywordResponse({
        text: prefix ? parajoin([prefix, newGame.getWelcome()]) : newGame.getWelcome(),
      });
    };
    this.startFromTrunk = () => {
      this.init();
      session.setGame(this.getName());
    };

    // should override
    this.currentLocation = null;
    this.setName(null);
  }

  public addItemToCollection(id: string, item: Item) {
    this.itemCollection.addItem(id, item);
  }

  public setGameKeywords() {
    // set game keywords
    this.clearKeywords();
    getGameKeywords().forEach(({ key, description, fn }) => {
      this.addKeyword(key, description, fn);
    });
  }

  public updateState() {
    this.setGameKeywords();
    this.updateInventoryItems();
    this.updateLocation();
  }

  public updateLocation() {
    this.currentLocation.clearKeywords();
    this.currentLocation.setLocationKeywords(this);
    this.currentLocation.setVisibleItemKeywords(this);
  }

  public updateInventoryItems() {
    // update inventory item states
    const items = ItemCollection.getAllItemsFromSet(this, this.inventory);
    items.forEach((item) => item.setItemActions(this));
  }

  public getCurrentLocation() {
    if (!(this.currentLocation instanceof Location)) {
      throw new Error('currentLocation is not a Location instance');
    }
    return this.currentLocation;
  }

  public getInputHandlerItem(items, input: string) {
    let foundItem = null;
    for (const item of items) {
      if (item.hasKeyword(input)) {
        foundItem = item;
        break;
      }
    }
    return foundItem;
  }

  public win(response?: string, format?: string): KeywordResponse {
    throw new Error('win method is to override');
  }
  public lose(response?: string, format?: string): KeywordResponse {
    throw new Error('lose method is to override');
  }

  public init() {
    this.score = 50;
    this.turns = 0;

    if (this.postInit) {
      this.postInit();
    }
    this.updateState();
  }

  public setLocation(location: Location) {
    this.currentLocation = location;
  }

  public testInput(input: string): KeywordResponse {
    input = input.toUpperCase();
    const responseSet = [];
    let response;
    let format;
    let changeScore; // FIXME should be independent of keyword response: game.updateScore()
    let isDone = false; // FIXME should be independent of keyword response game.isDone()
    let showInstructions = true;

    interface ICheck {
      getResponder: (contextResult?: any) => KeywordResponse;
      inputCheck: (game?: Adventure) => any;
    }

    /* Array of functions to call to look through areas
     * for which the input can be a keyword */
    let checks: ICheck[];
    checks = [
      {
        getResponder: () => this.getInputResponse(input, this),
        inputCheck: () => this.hasKeyword(input), // game keyword (quit, look, score, etc)
      },
      {
        getResponder: (currentLocation) => currentLocation.getInputResponse(input, this),
        inputCheck: (game) =>
          game.getCurrentLocation().hasKeyword(input) && game.getCurrentLocation(), // location keyword
      },
      {
        getResponder: (inventoryItem) => inventoryItem.getInputResponse(input, this),
        inputCheck: () => {
          const inventoryItems = this.getVisibleInventoryItems(); // keyword of a visible item in inventory
          return this.getInputHandlerItem(inventoryItems, input);
        },
      },
      {
        getResponder: (locationItem) => locationItem.getInputResponse(input, this),
        inputCheck: () => {
          const locationItems = this.getVisibleLocationItems(); // keyword of a visible item in the location
          return this.getInputHandlerItem(locationItems, input);
        },
      },
    ];

    let foundResponse = false;
    for (const check of checks) {
      const { inputCheck, getResponder } = check;
      const contextResult = inputCheck(this);
      if (contextResult) {
        let isCascade = false;
        const responder = getResponder(contextResult);
        ({
          changeScore,
          format,
          isCascade,
          isDone,
          response,
          showInstructions,
        } = responder.getFields());

        foundResponse = true;

        responseSet.push(response);

        if (!isCascade) {
          break;
        }
      }
    }
    if (!foundResponse) {
      // if show item keywords of itemCollection items for visible items on floor or in inventory
      ({ response } = this.getInputResponse('HELP', this));
      responseSet.push(
        `ERROR! LOSE 2 POINTS. Type HELP to show all the commands` + '\n\n' + response,
      );
      changeScore = -2;
      showInstructions = false;
    }

    responseSet.reverse();
    response = parajoin(responseSet);
    this.score += changeScore;

    if (this.score <= 0) {
      return this.lose(response, format);
    } else if (isDone) {
      return this.win(response, format);
    } else {
      this.turns += 1;
      return new KeywordResponse({
        isDone: false,
        text: this.getNext(response, showInstructions),
      });
    }
  }

  public getItemFromCollection(id: string): Item {
    return this.itemCollection.get(id);
  }

  public addToInventory(id: string) {
    this.inventory.add(id);
  }
  public inInventory(id: string): boolean {
    return this.inventory.has(id);
  }
  public dropInventory(id: string, location: Location) {
    this.inventory.delete(id);
    location.addFloorItem(id);
  }
  public takeFromLocation(id: string, location: Location) {
    this.inventory.add(id);
    location.removeFloorItem(id);
  }
  public deleteFromInventory(id: string) {
    this.inventory.delete(id);
  }
  public getVisibleInventoryItems(): Item[] {
    return ItemCollection.getVisibleItemsFromSet(this, this.inventory);
  }
  public getVisibleLocationItems(): Item[] {
    return this.currentLocation.getVisibleFloorItems(this);
  }

  public getNext(prefix, showInstructions): string {
    let next = prefix;
    if (showInstructions) {
      next += '\n---\nYou can:\n' + this.getLocationInstructions();
    }
    return next;
  }

  public getLocationDescription() {
    const { response: locationText } = this.getInputResponse('LOOK', this);
    return locationText;
  }

  public getLocationInstructions() {
    return this.currentLocation.getInstructions(this);
  }

  public getWelcome(prefix = '') {
    const lns = [];
    if (prefix !== '') {
      lns.push(prefix);
    }
    const locationDescription = this.currentLocation.getDescriptionInternal(this);
    const { response: locationHelp } = this.getInputResponse('HELP', this);
    lns.push(locationDescription);
    lns.push(locationHelp);
    return parajoin(lns);
  }
}
