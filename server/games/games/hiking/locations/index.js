const { NORTH, SOUTH, EAST, WEST, UP, DOWN } = require('../constants');

const { StartLocation } = require('./start');
const { RocksLocation } = require('./rocks');
const { WaterfallLocation } = require('./waterfall');
const { AppleShedLocation } = require('./apple_shed');
const { LakeLocation } = require('./lake');
const { BridgeLocation } = require('./bridge');
const { SunshipLocation } = require('./sunship');
const { TheSunLocation } = require('./sun');
const { MountainLocation } = require('./mountain');
const { MountainHouseLocation } = require('./mountain_house');
const { CarLocation } = require('./car');
const { FinishLocation } = require('./finish');

function getLocations(game) {
  const start = new StartLocation(game);
  const rocks = new RocksLocation(game);
  const waterfall = new WaterfallLocation(game);
  const appleShed = new AppleShedLocation(game);
  const lake = new LakeLocation(game);
  const bridge = new BridgeLocation(game);
  const sunship = new SunshipLocation(game);
  const theSun = new TheSunLocation(game);
  const mountain = new MountainLocation(game);
  const mountainHouse = new MountainHouseLocation(game);
  const car = new CarLocation(game);
  const finish = new FinishLocation(game);

  start.addExit({
    location: lake,
    exit: NORTH,
    inverseExit: SOUTH
  });
  start.addExit({
    location: rocks,
    exit: WEST,
    inverseExit: EAST
  });
  rocks.addExit({
    location: waterfall,
    exit: WEST,
    inverseExit: EAST,
  });
  waterfall.addExit({
    location: appleShed, // dead end
    exit: WEST,
    inverseExit: EAST,
  });
  waterfall.addExit({
    location: mountain,
    exit: UP,
    inverseExit: DOWN,
  });
  lake.addExit({
    location: bridge,
    exit: NORTH,
    inverseExit: SOUTH,
  });
  bridge.addExit({
    location: finish, // dead end
    exit: NORTH,
    inverseExit: SOUTH,
  });
  bridge.addExit({
    location: sunship,
    exit: WEST,
    inverseExit: EAST,
  });
  sunship.addExit({
    location: theSun, // dead end
    exit: UP,
    inverseExit: DOWN,
  });
  sunship.addExit({
    location: bridge,
    exit: EAST,
    inverseExit: WEST,
  });
  mountain.addExit({
    location: mountainHouse,
    exit: EAST,
    inverseExit: WEST,
  });
  mountainHouse.addExit({
    location: car,
    exit: DOWN,
    inverseExit: UP
  });
  car.addExit({
    location: lake,
    exit: DOWN, // no way back to the car
  });

  return { start };
}

module.exports = { getLocations };
