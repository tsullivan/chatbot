import { values as getValues } from 'lodash';
import { LI, UL } from '../../../constants';
import { Adventure as AdventureGame } from './class_adventure';
import { Item } from './class_item';
import { parajoin } from './parajoin';

// give name and instructions for each inventory and floor item
function describeItSimple(item: Item) {
  return item.getInfo(UL);
}
// just mention visible items, ignore inventory
function prefixItSimple({
  floorItems,
  inventoryItems,
}: {
  floorItems: string;
  inventoryItems: string;
}) {
  return { floorItems: floorItems != null ? 'You see:\n\n' + floorItems : floorItems };
}

export class ItemCollection {
  /*
   * Get the stuff to say about the items, but get them prefixed in a specific
   * way determined by the caller
   * @return {String}
   */
  public static describeGameItems(
    game: AdventureGame,
    describeIt: (item: Item) => string = describeItSimple,
    prefixIt = prefixItSimple
  ) {
    const getTheirInfo = items => {
      return items.length ? items.map(describeIt).join('\n') : null;
    };
    const blocks = getValues(
      prefixIt({
        floorItems: getTheirInfo(game.getCurrentLocation().getVisibleFloorItems(game)),
        inventoryItems: getTheirInfo(game.getVisibleInventoryItems()),
      })
    ).filter(Boolean); // drop null info

    return blocks.length > 0 ? parajoin(blocks) : null;
  }

  /*
   * Get the stuff to say about the items, prefixed for where the item is, with
   * the instructions for each item
   * @return {String}
   */
  public static describeGameItemsFull(game: AdventureGame) {
    // give name and instructions for each inventory and floor item
    const describeIt = (item: Item) => {
      let words = item.getInfo();
      const instructions = item.getInstructions(LI);
      if (instructions && instructions.length) {
        words += '\n' + instructions;
      }
      return words;
    };
    const prefixIt = ({
      floorItems,
      inventoryItems,
    }: {
      floorItems: string;
      inventoryItems: string;
    }) => {
      const myFloorItems =
        floorItems != null
          ? `In ${game.getCurrentLocation().getName()}, You see:\n\n` + floorItems
          : floorItems;
      const myInventoryItems =
        inventoryItems != null ? 'You are holding:\n\n' + inventoryItems : inventoryItems;
      return {
        floorItems: myFloorItems,
        inventoryItems: myInventoryItems,
      };
    };
    return ItemCollection.describeGameItems(game, describeIt, prefixIt);
  }

  public static getAllItemsFromSet(
    game,
    collection: Set<string>,
    { pushCondition = (item?: any) => true } = {}
  ): Item[] {
    return Array.from(collection).reduce((accum: Item[], value) => {
      const item = game.getItemFromCollection(value);
      if (pushCondition(item)) {
        return [...accum, item];
      }
      return accum;
    }, []);
  }

  public static getVisibleItemsFromSet(game: AdventureGame, collection: Set<string>): Item[] {
    return ItemCollection.getAllItemsFromSet(game, collection, {
      pushCondition(item) {
        return item.isSeen();
      },
    });
  }

  private items: any;

  constructor() {
    this.items = new Map();
  }

  public addItem(id, item) {
    this.items.set(id, item);
  }
  public get(id) {
    return this.items.get(id);
  }
}
