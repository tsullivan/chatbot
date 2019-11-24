import { KeywordsHelper, getKeywordsHelper } from './keywords_helper';
import { Adventure } from './adventure';
import { ItemCollection } from './item_collection';
import { KeywordResponse } from './keyword_response';
import { Person } from './person';
import { parajoin } from './parajoin';

export class Location {
  public followExit: (direction: string, prefix?: string) => KeywordResponse;
  public getInstructions: (game: Adventure) => string;
  public hasKeyword: (keyword: string) => boolean;
  public addKeyword: (
    keyword: string | string[],
    keywordDescription: string,
    fn: () => KeywordResponse
  ) => void;
  public clearKeywords: () => void;
  public removeKeyword: (keyword: string) => void;
  public getInputResponse: (input: string, game: Adventure) => KeywordResponse;

  private name: string;
  private exits: Map<string, Location>;
  private floorItems: Set<string>;

  public constructor({ game, name }: { game: Adventure; name: string }) {
    const keywordsHelper = getKeywordsHelper();
    Object.assign(this, keywordsHelper);

    this.exits = new Map();

    this.name = name;
    this.floorItems = new Set();

    this.followExit = (direction: string, prefix: string) => {
      return this.followExitInternal(game, direction, prefix);
    };

    this.getInstructions = (adventureGame: Adventure) => {
      return this.getInstructionsInternal(game, keywordsHelper);
    };

    this.setLocationKeywords(game);
  }

  public setLocationKeywords(adventureGame: Adventure) {
    throw new Error('setLocationKeywords must be overridden in ' + this.name);
  }

  /*
   * For location, need the commands for the visible items in the room
   */
  public getInstructionsInternal(game: Adventure, keywordsHelper: KeywordsHelper) {
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

  /// Person aware
  public addPerson(person: Person) {
  }

  public getDescription(game: Adventure) {
    throw new Error('Location superclass has no description of its own');
  }

  public getDescriptionInternal(game: Adventure) {
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
  public getVisibleFloorItems(game: Adventure) {
    return ItemCollection.getVisibleItemsFromSet(game, this.floorItems);
  }
  public setVisibleItemKeywords(game: Adventure) {
    const items = ItemCollection.getVisibleItemsFromSet(game, this.floorItems);
    items.forEach(item => item.setItemActions(game));
  }

  private followExitInternal(game: Adventure, direction: string, prefix = '') {
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
