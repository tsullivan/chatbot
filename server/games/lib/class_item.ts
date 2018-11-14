import { noop, partial } from 'lodash';
import { Adventure as AdventureGame } from './';
import { Keywordable } from './keywordable';
import { getKeywordsHelper } from './keywords_helper';

interface ICombinable {
  combinesWith: string;
  keyword: string;
  keywordDescription: string;
  fn: () => void;
}

interface IInteractable {
  fn: () => void;
  keyword: string;
  keywordDescription: string;
}

interface IActionOpts {
  setCombinables: (combinableArray: ICombinable[]) => void;
  setDroppable: (opts: IInteractable) => void;
  setTakeable: (opts: IInteractable) => void;
}

interface IOpts {
  game: any;
  name: string;
  id: string;
  description: string;
  seen?: boolean;
  setActions?: (opts: IActionOpts, item: Item) => void;
}

export class Item implements Keywordable {
  public addKeyword: (
    keyword: string,
    keywordDescription: string,
    fn: () => void
  ) => void;
  public removeKeyword: (keyword: string) => void;
  public hasKeywords: () => boolean;
  public getInstructions: (prefix?: string) => string;

  private name: string;
  private id: string;
  private description: string;
  private calculatedIsComplete: boolean;
  private seen: boolean;
  private combinedWith: Set<any>;
  private setActions: (actions: IActionOpts, item: Item) => void;

  constructor(options: IOpts) {
    const { game, name, id, description, seen = true, setActions = noop } = options;

    if (!(game instanceof Object)) {
      throw new Error('game must be an Adventure object');
    }
    if (!game.getCurrentLocation()) {
      throw new Error('need a current location for the game');
    }
    if (typeof name !== 'string') {
      throw new Error('name must be string');
    }
    if (typeof id !== 'string') {
      throw new Error('id must be string');
    }
    if (typeof description !== 'string') {
      throw new Error('description must be string');
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

  public getId(): string {
    return this.id;
  }

  /*
   * Info that does not include the keyword instructions
   */
  public getInfo(prefix?: string): string {
    const prefFull = prefix ? prefix : '';
    return `${prefFull}${this.getName()} - ${this.getDescription()}`;
  }

  public setItemActions(game: AdventureGame) {
    return this.setActions(
      {
        setCombinables: (combinableArray: ICombinable[]) => {
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
    game: AdventureGame,
    {
      combinesWith,
      keyword,
      keywordDescription,
      fn,
      numberToCombineWith = 0,
    }: {
      combinesWith: string;
      keyword: string;
      keywordDescription: string;
      fn: (item: Item, combinedWith: Set<any>) => void;
      numberToCombineWith: number;
    }
  ) {
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

  public isComplete(): boolean {
    return this.calculatedIsComplete === true;
  }

  public combineWith(combinesWith: string) {
    this.combinedWith.add(combinesWith);
  }

  public setDroppable(game, { keyword, keywordDescription, fn }) {
    // add a drop keyword if item is currently in inventory
    if (game.inInventory(this.id)) {
      this.addKeyword(keyword, keywordDescription, () => {
        game.dropInventory(this.id, game.getCurrentLocation());
        return fn(this);
      });
    }
  }
  public setTakeable(game, { keyword, keywordDescription, fn }) {
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

  public setName(name) {
    this.name = name;
  }
  public setDescription(description) {
    this.description = description;
  }
  public getName() {
    return this.name;
  }
  public getDescription() {
    return this.description;
  }
}
