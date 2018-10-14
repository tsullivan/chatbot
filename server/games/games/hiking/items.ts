import * as snl from 'strip-newlines';
import { Item, KeywordResponse } from '../../lib';
import { APPLES, BUBBLE_GUN, CAR, ENEMIES, YOGURT } from './constants';

export function getItems(game) {
  /*
   * Enemies
   */
  const enemiesItem = new Item({
    description: snl`Tiny enemies have harbored in your pocket. They will jump
      out and grow to full size if there is water.`,
    game,
    id: ENEMIES,
    name: 'Enemies',
    seen: false,
  });

  /*
   * Car
   */
  const carItem = new Item({
    description: snl`This car does not have wheels, instead it has flyers on
      the bottom that point at the ground and lift it up, making it go really
      fast. It is created inside the tall mountain.`,
    game,
    id: CAR,
    name: 'Flying silver car',
    setActions: ({ setDroppable }) => {
      setDroppable({
        fn: () => {
          carItem.setName('Flying silver car (destroyed)');
          carItem.setDescription(snl`This flying silver car has been crashed
            into a tree. It's flyers have become completely destroyed, and it
            will no longer go fast or go at all.`);
          return new KeywordResponse({
            text: snl`You steer the car towards a tree, make it go really
              really fast, then CRASH! EXPLODE! The flying car is destroyed.`,
          });
        },
        keyword: 'CRASH_CAR',
        keywordDescription: 'Crash the silver flying car',
      });
    },
  });

  /*
   * Apple & Yogurt
   */
  const applesItem = new Item({
    description: '100 red apples.',
    game,
    id: APPLES,
    name: 'Apples',
  });
  const yogurtItem = new Item({
    description: snl`This yogurt is haunted with ghosts. They look like they
      want to get out.`,
    game,
    id: YOGURT,
    name: 'Yogurt',
    seen: false,
  });

  /*
   * Random ones
   */
  const bubbleGunItem = new Item({
    description: snl`It's a bubble gun for gunning out bubbles. It looks very interesting.`,
    game,
    id: BUBBLE_GUN,
    name: 'Bubble Gun',
    setActions: ({ setTakeable, setDroppable }) => {
      setTakeable({
        fn: () =>
          new KeywordResponse({
            text: snl`The bubble gun is now yours.`,
          }),
        keyword: 'TAKE_BUBBLE_GUN',
        keywordDescription: 'Pick up interesting looking bubble gun.',
      });
      setDroppable({
        fn: () =>
          new KeywordResponse({
            text: snl`The bubble gun now belongs to the floor.`,
          }),
        keyword: 'DROP_BUBBLE_GUN',
        keywordDescription: 'Drop the interesting looking bubble gun.',
      });
    },
  });

  return {
    applesItem,
    bubbleGunItem,
    carItem,
    enemiesItem,
    yogurtItem,
  };
}

export function setItemsToLocations(
  { enemiesItem, carItem, applesItem, yogurtItem, bubbleGunItem },
  { appleShed, car: garage, mountain },
  game,
) {
  /*
   * Set to game
   */
  game.addItemToCollection(ENEMIES, enemiesItem);
  game.addItemToCollection(CAR, carItem);
  game.addItemToCollection(APPLES, applesItem);
  game.addItemToCollection(YOGURT, yogurtItem);
  game.addItemToCollection(BUBBLE_GUN, bubbleGunItem);

  // starting inventory items
  game.addToInventory(ENEMIES); // global item

  // starting location items
  appleShed.addFloorItem(APPLES);
  appleShed.addFloorItem(YOGURT);
  garage.addFloorItem(CAR);
  mountain.addFloorItem(BUBBLE_GUN);
}
