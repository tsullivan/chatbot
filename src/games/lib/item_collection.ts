import { LI, UL } from '../../constants';
import { Adventure } from '.';
import { Item } from './item';
import { values as getValues } from 'lodash';
import { parajoin } from './parajoin';

// give name and instructions for each inventory and floor item
function describeItSimple(item: Item) {
  return UL + item.getInfo();
}
// just mention visible items, ignore inventory
function prefixItSimple({
  floorItems,
}: {
  floorItems: string;
  inventoryItems: string;
}) {
  return { floorItems: floorItems != null ? 'You see:\n\n' + floorItems : floorItems };
}

export class ItemCollection {
  public static getItemsAsArray(items: ItemCollection) {
    return Array.from(items.items).map(([_key, item]: [string, Item]) => item);
  }

  /*
   * Get the stuff to say about the items, but get them prefixed in a specific
   * way determined by the caller
   * @return {String}
   */
  public static describeGameItems(
    game: Adventure,
    describeIt = describeItSimple,
    prefixIt = prefixItSimple
  ) {
    const getTheirInfo = (items: Item[]) => {
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
  public static describeGameItemsFull(game: Adventure) {
    // give name and instructions for each inventory and floor item
    const describeIt = (item: Item) => {
      let words = UL + item.getInfo();
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
      floorItems: any;
      inventoryItems: any;
    }) => {
      return {
        floorItems:
          floorItems != null
            ? `In ${game.getCurrentLocation().getName()}, You see:\n` + floorItems
            : floorItems,
        inventoryItems:
          inventoryItems != null
            ? 'You are holding:\n' + inventoryItems
            : inventoryItems,
      };
    };
    return ItemCollection.describeGameItems(game, describeIt, prefixIt);
  }

  public static getAllItemsFromSet(
    game: Adventure,
    collection: Set<string>,
    { pushCondition = (_item?: any) => true } = {}
  ): Item[] {
    return Array.from(collection).reduce((accum: Item[], value) => {
      const item = game.getItemFromCollection(value);
      if (pushCondition(item)) {
        return [...accum, item];
      }
      return accum;
    }, []);
  }

  public static getVisibleItemsFromSet(
    game: Adventure,
    collection: Set<string>
  ): Item[] {
    if (game == null) {
      throw new Error('game param not given');
    }

    return ItemCollection.getAllItemsFromSet(game, collection, {
      pushCondition(item) {
        return item.isSeen();
      },
    });
  }

  private items: Map<string, Item>;

  public constructor() {
    this.items = new Map();
  }

  public addItem(id: string, item: Item) {
    this.items.set(id, item);
  }
  public get(id: string) {
    return this.items.get(id);
  }
}
