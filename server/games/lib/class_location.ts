import { Adventure as AdventureGame } from './class_adventure';
import { ItemCollection } from './class_item_collection';
import { KeywordResponse } from './class_keyword_response';
import { getKeywordsHelper } from './keywords_helper';
import { parajoin } from './parajoin';

interface IAddExit {
  location: Location;
  exit: string;
  inverseExit?: string;
}

export class Location {
  public followExit: (direction: string, prefix?: string) => KeywordResponse;
  public getDescription: (game: AdventureGame) => string;
  public getInstructions: (chatGame: AdventureGame) => string;
  public hasKeyword: (keyword: string) => boolean;
  public addKeyword: (keyword: string, keywordDescription: string, fn: () => KeywordResponse) => void;
  public clearKeywords: () => void;
  public removeKeyword: (keyword: string) => void;
  public getInputResponse: (input: string, game: AdventureGame) => KeywordResponse;

  private name: string;
  private exits: Map<string, Location>;
  private floorItems: Set<string>;

  constructor({ game, name }) {
    if (!(game instanceof Object)) {
      throw new Error('game must be an Adventure object');
    }
    if (typeof name !== 'string') {
      throw new Error('name must be string');
    }

    const keywordsHelper = getKeywordsHelper();
    Object.assign(this, keywordsHelper);

    this.exits = new Map();

    this.name = name;
    this.floorItems = new Set();

    this.followExit = (direction: string, prefix: string) => {
      return this.followExitInternal(game, direction, prefix);
    };

    this.getInstructions = (chatGame, ...args) => {
      return this.getInstructionsInternal(game, keywordsHelper, ...args);
    };

    this.setLocationKeywords(game);
  }

  public setLocationKeywords(chatGame) {
    throw new Error('setLocationKeywords must be overridden in ' + this.name);
  }

  /*
   * For location, need the commands for the visible items in the room
   */
  public getInstructionsInternal(game, keywordsHelper, prefix = '') {
    const getInstructions = keywordsHelper.getInstructions.bind(this);
    const locationInstructions = getInstructions(prefix);

    // show any items on the floor
    const itemInfos = this.getVisibleFloorItems(game).reduce((accum, item) => {
      if (item.hasKeywords()) {
        return [...accum, item.getInstructions()];
      }
      return accum;
    }, []);

    const lns = [];
    if (itemInfos.length > 0) {
      lns.push(itemInfos.join('\n'));
    }
    lns.push(locationInstructions);
    return lns.join('\n');
  }

  public addExit(opts: IAddExit) {
    const { location, exit, inverseExit } = opts;
    if (!(location instanceof Location)) {
      throw new Error('bad location: ' + location);
    }
    this.exits.set(exit, location);

    if (inverseExit) {
      location.addExit({
        exit: inverseExit,
        location: this,
      });
    }
  }

  public getDescriptionInternal(game) {
    return `You are at: **${this.getName()}**\n\n${this.getDescription(game)}`;
  }

  public getName() {
    return this.name;
  }

  public addFloorItem(id) {
    this.floorItems.add(id);
  }
  public hasFloorItem(id) {
    return this.floorItems.has(id);
  }
  public removeFloorItem(id) {
    this.floorItems.delete(id);
  }
  public getVisibleFloorItems(game) {
    if (game == null) {
      throw new Error('game param not given');
    }

    return ItemCollection.getVisibleItemsFromSet(game, this.floorItems);
  }
  public setVisibleItemKeywords(game) {
    if (game == null) {
      throw new Error('game param not given');
    }

    const items = ItemCollection.getVisibleItemsFromSet(game, this.floorItems);
    items.forEach((item) => item.setItemActions(game));
  }

  private followExitInternal(game, direction, prefix = '') {
    if (this.exits.has(direction)) {
      const exit = this.exits.get(direction);
      game.setLocation(exit);
      game.updateState(exit);

      const lns = [];
      if (prefix !== '') {
        lns.push(prefix);
      }
      lns.push(game.getLocationDescription());

      return new KeywordResponse({
        text: parajoin(lns),
      });
    }

    return new KeywordResponse({
      text: 'Bad directions!!! ' + direction,
    });
  }
}
