import { noop, partial } from 'lodash';
import { Adventure } from './';
import { Keywordable } from './keywordable';
import { getKeywordsHelper } from './keywords_helper';

interface Combinable {
  combinesWith: Item;
  keyword: string | string[];
  keywordDescription: string;
  fn: (context: Item, combineWith: Set<Combinable>) => void;
  numberToCombineWith: number;
}

interface Interactable {
  fn: (item: Item) => void;
  keyword: string | string[];
  keywordDescription: string;
}

interface ActionOpts {
  setCombinables: (combinableArray: Combinable[]) => void;
  setDroppable: (opts: Interactable) => void;
  setTakeable: (opts: Interactable) => void;
}

export class Item implements Keywordable {
  public addKeyword: (
    keyword: string | string[],
    keywordDescription: string,
    fn: () => void
  ) => void;
  public removeKeyword: (keyword: string) => void;
  public hasKeyword: (keyword: string) => boolean;
  public hasKeywords: () => boolean;
  public getInstructions: (prefix?: string) => string;

  private name: string;
  private id: string;
  private description: string;
  private calculatedIsComplete: boolean;
  private seen: boolean;
  private combinedWith: Set<Combinable>;
  private setActions: (actions: ActionOpts, item: Item) => void;

  public constructor(options: {
    game: Adventure;
    name: string;
    id: string;
    description: string;
    seen?: boolean;
    setActions?: (opts: ActionOpts, item: Item) => void;
  }) {
    const { game, name, id, description, seen = true, setActions = noop } = options;
    if (!game.getCurrentLocation()) {
      throw new Error('need a current location for the game');
    }
    Object.assign(this, getKeywordsHelper()); // FIXME this is how I'm mix it in

    this.name = name;
    this.id = id;
    this.description = description;
    this.seen = seen;
    this.setActions = setActions;
    this.combinedWith = new Set();
    this.setItemActions(game);
  }

  public getId() {
    return this.id;
  }

  /*
   * Info that does not include the keyword instructions
   */
  public getInfo() {
    return `${this.getName()} - ${this.getDescription()}`;
  }

  public setItemActions(game: Adventure) {
    return this.setActions(
      {
        setCombinables: (combinableArray: Combinable[]) => {
          for (const combinable of combinableArray) {
            const updatedComb = {
              ...combinable,
              numberToCombineWith: combinableArray.length,
            };
            this.setCombinable(game, updatedComb);
          }
        },
        setDroppable: partial(this.setDroppable, game).bind(this),
        setTakeable: partial(this.setTakeable, game).bind(this),
      },
      this
    );
  }

  /*
   * You can only combine items when holding both of them
   */
  public setCombinable(
    game: Adventure,
    {
      combinesWith,
      keyword,
      keywordDescription,
      fn,
      numberToCombineWith = 0,
    }: Combinable
  ) {
    if (typeof combinesWith !== 'string') {
      throw new Error('invalid combinesWith ' + combinesWith);
    }
    if (typeof keyword !== 'string') {
      throw new Error('invalid keyword ' + keyword);
    }
    if (typeof keywordDescription !== 'string') {
      throw new Error('invalid keywordDescription ' + keywordDescription);
    }
    if (typeof fn !== 'function') {
      throw new Error('invalid function ' + fn);
    }
    if (game.inInventory(this.id) && game.inInventory(combinesWith)) {
      this.addKeyword(keyword, keywordDescription, () => {
        this.removeKeyword(keyword);
        this.combinedWith.add(combinesWith);
        this.calculatedIsComplete = this.combinedWith.size >= numberToCombineWith;
        game.deleteFromInventory(combinesWith);
        return fn(this, this.combinedWith);
      });
    }
  }

  public isComplete() {
    return this.calculatedIsComplete === true;
  }

  public combineWith(combinesWith: Combinable) {
    this.combinedWith.add(combinesWith);
  }

  public setDroppable(
    game: Adventure,
    { keyword, keywordDescription, fn }: Interactable
  ) {
    // add a drop keyword if item is currently in inventory
    if (game.inInventory(this.id)) {
      this.addKeyword(keyword, keywordDescription, () => {
        game.dropInventory(this.id, game.getCurrentLocation());
        return fn(this);
      });
    }
  }
  public setTakeable(
    game: Adventure,
    { keyword, keywordDescription, fn }: Interactable
  ) {
    // add a take keyword if game location has the item
    if (game.getCurrentLocation().hasFloorItem(this.id)) {
      this.addKeyword(keyword, keywordDescription, () => {
        game.takeFromLocation(this.id, game.getCurrentLocation());
        return fn(this);
      });
    }
  }

  public examine() {
    return `${this.name} - ${this.description}`;
  }

  public see() {
    this.seen = true;
  }
  public hide() {
    this.seen = false;
  }
  public isSeen() {
    return this.seen === true;
  }

  public setName(name: string) {
    this.name = name;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public getName() {
    return this.name;
  }
  public getDescription() {
    return this.description;
  }
}
