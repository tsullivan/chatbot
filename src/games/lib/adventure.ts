import { Item, KeywordResponse, Location, parajoin } from './';
import { ChatGame } from './chat_game';
import { ItemCollection } from './item_collection';
import { ResponseFormat } from '../../types';
import { Session } from '../../bot';
import { getGameKeywords } from './game_keywords';
import { getKeywordsHelper } from './keywords_helper';

export class Adventure extends ChatGame {
  public branchToGame: (BranchGame: AdventureClass, prefix: string) => KeywordResponse;
  public clearKeywords: () => void;
  public getInputResponse: (input: string, game: ChatGame) => KeywordResponse;
  public getInstructions: () => string;
  public addKeyword: (
    key: string,
    description: string,
    fn: () => KeywordResponse
  ) => string;
  public hasKeyword: (key: string) => boolean;
  public score: number;
  public turns: number;
  public postInit?: () => void;
  public startFromTrunk: () => void;

  private itemCollection: ItemCollection;
  private inventory: Set<string>;
  private locationsMap: Map<string, Location>;
  private currentLocation: Location;

  public constructor(session: Session) {
    super(session);
    Object.assign(this, getKeywordsHelper());

    this.itemCollection = new ItemCollection();
    this.inventory = new Set(); // ids of items in the collection

    // KeywordResponse helpers
    this.branchToGame = (BranchGame: AdventureClass, prefix: string) => {
      const newGame: Adventure = new BranchGame(session);
      newGame.startFromTrunk();
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
    items.forEach(item => item.setItemActions(this));
  }

  public getCurrentLocation(): Location {
    return this.currentLocation;
  }

  public getInputHandlerItem(items: Item[], input: string) {
    let foundItem = null;
    for (const item of items) {
      if (item.hasKeyword(input)) {
        foundItem = item;
        break;
      }
    }
    return foundItem;
  }

  public win(response?: string, format?: ResponseFormat): KeywordResponse {
    throw new Error('win method is to override');
  }
  public lose(response?: string, format?: ResponseFormat): KeywordResponse {
    throw new Error('lose method is to override');
  }

  public init(): void {
    this.score = 50;
    this.turns = 0;

    if (this.postInit) {
      this.postInit();
    }
    this.updateState();
  }

  public setLocationsMap(locationsMap: Map<string, Location>): void {
    this.locationsMap = locationsMap;
  }

  public setLocation(location: Location): void {
    this.currentLocation = location;
  }

  /*
   2416: Property 'testInput' in type 'Adventure' is not assignable to the same property in base type 'ChatGame'.  Type '(input: string) => Keywo rdResponse' is not assignable to type '(userMessage: string) => KeywordResponseValue'.    Type 'KeywordResponse' is not assignable to type 'Ke ywordResponseValue'.      Property 'changeScore' is private in type 'KeywordResponse' but not in type 'KeywordResponseValue'.
  *
   */
  public testInput(input: string): KeywordResponse {
    input = input.toUpperCase();
    const responseSet = [];
    let response: string;
    let format: ResponseFormat;
    let changeScore; // FIXME should be independent of keyword response: game.updateScore()
    let isDone = false; // FIXME should be independent of keyword response game.isDone()
    let showInstructions = true;

    interface CheckMethods {
      getResponder: (contextResult?: any) => KeywordResponse;
      inputCheck: (game?: Adventure) => any;
    }

    /* Array of functions to call to look through areas
     * for which the input can be a keyword */
    let checks: CheckMethods[];
    checks = [
      {
        getResponder: () => this.getInputResponse(input, this),
        inputCheck: () => this.hasKeyword(input), // game keyword (quit, look, score, etc)
      },
      {
        getResponder: currentLocation => currentLocation.getInputResponse(input, this),
        inputCheck: game =>
          game.getCurrentLocation().hasKeyword(input) && game.getCurrentLocation(), // location keyword
      },
      {
        getResponder: inventoryItem => inventoryItem.getInputResponse(input, this),
        inputCheck: () => {
          const inventoryItems = this.getVisibleInventoryItems(); // keyword of a visible item in inventory
          return this.getInputHandlerItem(inventoryItems, input);
        },
      },
      {
        getResponder: locationItem => locationItem.getInputResponse(input, this),
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
        `ERROR! LOSE 2 POINTS. Type HELP to show all the commands` + '\n\n' + response
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

  public getItemFromCollection(id: string): Item | undefined {
    return this.itemCollection.get(id);
  }

  public getLocationById(id: string): Location {
    return this.locationsMap.get(id);
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

  public getNext(prefix: string, showInstructions: boolean): string {
    let next = prefix;
    if (showInstructions) {
      next += ['\n\n---', 'You can:', this.getLocationInstructions()].join('\n\n');
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
    const { response: locationHelp } = this.getInputResponse('HELP', this as ChatGame);
    lns.push(locationDescription);
    lns.push(locationHelp);
    return parajoin(lns);
  }
}

interface AdventureClass {
  new (session: Session): Adventure;
};
