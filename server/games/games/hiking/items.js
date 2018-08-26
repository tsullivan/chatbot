const snl = require('strip-newlines');
const { Item, KeywordResponse } = require('../../lib');
const { ENEMIES, CAR, APPLES, YOGURT, BUBBLE_GUN } = require('./constants');

function getItems(game) {
  /*
   * Enemies
   */
  const enemiesItem = new Item({
    name: 'Enemies',
    id: ENEMIES,
    description: snl`Tiny enemies have harbored in your pocket. They will jump
      out and grow to full size if there is water.`,
    seen: false,
    game,
  });

  /*
   * Car
   */
  const carItem = new Item({
    name: 'Flying silver car',
    id: CAR,
    description: snl`This car does not have wheels, instead it has flyers on
      the bottom that point at the ground and lift it up, making it go really
      fast. It is created inside the tall mountain.`,
    game,
    setActions: ({ setDroppable }) => {
      setDroppable({
        keyword: 'CRASH_CAR',
        keywordDescription: 'Crash the silver flying car',
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
      });
    },
  });

  /*
   * Apple & Yogurt
   */
  const applesItem = new Item({
    name: 'Apples',
    id: APPLES,
    description: '100 red apples.',
    game,
  });
  const yogurtItem = new Item({
    name: 'Yogurt',
    id: YOGURT,
    description: snl`This yogurt is haunted with ghosts. They look like they
      want to get out.`,
    seen: false,
    game,
  });

  /*
   * Random ones
   */
  const bubbleGunItem = new Item({
    name: 'Bubble Gun',
    id: BUBBLE_GUN,
    description: snl`It's a bubble gun for gunning out bubbles. It looks very interesting.`,
    game,
    setActions: ({ setTakeable, setDroppable }) => {
      setTakeable({
        keyword: 'TAKE_BUBBLE_GUN',
        keywordDescription: 'Pick up interesting looking bubble gun.',
        fn: () =>
          new KeywordResponse({
            text: snl`The bubble gun is now yours.`,
          }),
      });
      setDroppable({
        keyword: 'DROP_BUBBLE_GUN',
        keywordDescription: 'Drop the interesting looking bubble gun.',
        fn: () =>
          new KeywordResponse({
            text: snl`The bubble gun now belongs to the floor.`,
          }),
      });
    },
  });

  return {
    enemiesItem,
    carItem,
    applesItem,
    yogurtItem,
    bubbleGunItem,
  };
}

function setItemsToLocations(
  { enemiesItem, carItem, applesItem, yogurtItem, bubbleGunItem },
  { appleShed, car: garage, mountain },
  game
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

module.exports = { setItemsToLocations, getItems };
