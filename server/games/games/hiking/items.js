const snl = require('strip-newlines');
const { InventoryItem, KeywordResponse } = require('../../lib');
const { ENEMIES, CAR, APPLES, YOGURT, KEY } = require('./constants');

function setItems(game) {
  /*
   * Enemies
   */
  const enemiesItem = new InventoryItem({
    name: 'Enemies',
    id: ENEMIES,
    description: snl`Tiny enemies have harbored in your pocket. They will jump
      out and grow to full size if there is water.`,
    seen: false,
    game,
  });

  /*
   * Key
   */
  const keyItem = new InventoryItem({
    game,
    name: 'Jail Key',
    id: KEY,
    description: snl`The key you stole from the jail. Since you were put into
      jail accidentally, you had to steal the key because the bad guys made
      you.`,
  });
  keyItem.setKeywords = _game => {
    keyItem.setDroppable({
      keyword: 'DROP_JAIL_KEY',
      keywordDescription: 'Drop the key you stole from the jail.',
      fn: () =>
        new KeywordResponse({
          text: snl`The key has been dropped. You didn't need it anyways.`,
        }),
    });
    keyItem.setTakeable({
      keyword: 'TAKE_JAIL_KEY',
      keywordDescription: 'Pick up the key you stole from the jail.',
      fn: () =>
        new KeywordResponse({
          text: snl`You now have the key. Again.`,
        }),
    });
  };

  /*
   * Car
   */
  const carItem = new InventoryItem({
    name: 'Flying silver car',
    id: CAR,
    description: snl`This car does not have wheels, instead it has flyers on
      the bottom that point at the ground and lift it up, making it go really
      fast. It is created inside the tall mountain.`,
    game,
  });
  carItem.setKeywords = _game => {
    carItem.setDroppable({
      keyword: 'CRASH_CAR',
      keywordDescription: 'Crash the silver flying car',
      fn: () => {
        carItem.setName('Flying silver car (destroyed)');
        carItem.setDescription(snl`This flying silver car has been crashed into a
          tree. It's flyers have become completely destroyed, and it will no
          longer go fast or go at all.`);
        return new KeywordResponse({
          text: snl`You steer the car towards a tree, make it go really really
            fast, then CRASH! EXPLODE! The flying car is destroyed.`,
        });
      },
    });
    carItem.setTakeable({ isTakeable: false });
  };

  /*
   * Apple & Yogurt
   */
  const applesItem = new InventoryItem({
    name: 'Apples',
    id: APPLES,
    description: '100 red apples.',
    game,
  });
  const yogurtItem = new InventoryItem({
    name: 'Yogurt',
    id: YOGURT,
    description: snl`This yogurt is haunted with ghosts. They look like they
      want to get out.`,
    seen: false,
    game,
  });

  /*
   * Set to game
   */
  game.addItemToCollection(ENEMIES, enemiesItem);
  game.addItemToCollection(KEY, keyItem);
  game.addItemToCollection(CAR, carItem);
  game.addItemToCollection(APPLES, applesItem);
  game.addItemToCollection(YOGURT, yogurtItem);

  // starting items
  game.addToInventory(KEY);
  game.addToInventory(ENEMIES); // global item

  // register all the keywords given to items
  game.setInventoryKeywords();
}

module.exports = { setItems };
