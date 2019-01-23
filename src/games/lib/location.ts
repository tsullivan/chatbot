import { Adventure as AdventureGame } from './adventure';
import { ItemCollection } from './item_collection';
import { KeywordResponse } from './keyword_response';
import { getKeywordsHelper } from './keywords_helper';
import { parajoin } from './parajoin';

export class Location {
  public followExit: (direction: string, prefix?: string) => KeywordResponse;
  public getInstructions: (game: AdventureGame) => string;
  public hasKeyword: (keyword: string) => boolean;
  public addKeyword: (
    keyword: string | string[],
    keywordDescription: string,
    fn: () => KeywordResponse,
  ) => void;
  public clearKeywords: () => void;
  public removeKeyword: (keyword: string) => void;
  public getInputResponse: (input: string, game: AdventureGame) => KeywordResponse;

  private name: string;
  private exits: Map<string, Location>;
  private floorItems: Set<string>;

  constructor({ game, name }: { game: AdventureGame; name: string }) {
    const keywordsHelper = getKeywordsHelper();
    Object.assign(this, keywordsHelper);

    this.exits = new Map();

    this.name = name;
    this.floorItems = new Set();

    this.followExit = (direction: string, prefix: string) => {
      return this.followExitInternal(game, direction, prefix);
    };

    this.getInstructions = (adventureGame: AdventureGame) => {
      return this.getInstructionsInternal(game, keywordsHelper);
    };

    this.setLocationKeywords(game);
  }

  public setLocationKeywords(adventureGame: AdventureGame) {
    throw new Error('setLocationKeywords must be overridden in ' + this.name);
  }

  /*
   * For location, need the commands for the visible items in the room
   */
  public getInstructionsInternal(game: AdventureGame, keywordsHelper) {
    const getInstructions = keywordsHelper.getInstructions.bind(this);
    const locationInstructions = getInstructions();

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

  public addExit({
    location,
    exit,
    inverseExit,
  }: {
    location: Location;
    exit: string;
    inverseExit?: string;
  }) {
    this.exits.set(exit, location);

    if (inverseExit) {
      location.addExit({
        exit: inverseExit,
        location: this,
      });
    }
  }

  public getDescription(game: AdventureGame) {
    throw new Error('Location superclass has no description of its own');
  }

  public getDescriptionInternal(game: AdventureGame) {
    return `You are at: **${this.getName()}**\n\n${this.getDescription(game)}`;
  }

  public getName() {
    return this.name;
  }

  public addFloorItem(id: string) {
    this.floorItems.add(id);
  }
  public hasFloorItem(id: string) {
    return this.floorItems.has(id);
  }
  public removeFloorItem(id: string) {
    this.floorItems.delete(id);
  }
  public getVisibleFloorItems(game: AdventureGame) {
    return ItemCollection.getVisibleItemsFromSet(game, this.floorItems);
  }
  public setVisibleItemKeywords(game: AdventureGame) {
    const items = ItemCollection.getVisibleItemsFromSet(game, this.floorItems);
    items.forEach(item => item.setItemActions(game));
  }

  private followExitInternal(game: AdventureGame, direction, prefix = '') {
    if (this.exits.has(direction)) {
      const exit = this.exits.get(direction);
      game.setLocation(exit);
      game.updateState();

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
