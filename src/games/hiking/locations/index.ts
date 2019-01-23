import { DOWN, EAST, NORTH, SOUTH, UP, WEST } from '../constants';

import { AppleShedLocation } from './apple_shed';
import { BridgeLocation } from './bridge';
import { CarLocation } from './car';
import { FinishLocation } from './finish';
import { LakeLocation } from './lake';
import { MountainLocation } from './mountain';
import { MountainHouseLocation } from './mountain_house';
import { RocksLocation } from './rocks';
import { StartLocation } from './start';
import { TheSunLocation } from './sun';
import { SunshipLocation } from './sunship';
import { WaterfallLocation } from './waterfall';

export function getLocations(game) {
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
    exit: NORTH,
    location: lake,
  });
  start.addExit({
    exit: WEST,
    location: rocks,
  });
  rocks.addExit({
    exit: EAST,
    inverseExit: SOUTH, // trail bends
    location: lake, // no getting back to start
  });
  rocks.addExit({
    exit: WEST,
    inverseExit: EAST,
    location: waterfall,
  });
  waterfall.addExit({
    exit: WEST,
    inverseExit: EAST,
    location: appleShed, // dead end
  });
  waterfall.addExit({
    exit: UP,
    inverseExit: DOWN,
    location: mountain,
  });
  lake.addExit({
    exit: NORTH,
    inverseExit: SOUTH,
    location: bridge,
  });
  bridge.addExit({
    exit: NORTH,
    inverseExit: SOUTH,
    location: finish, // dead end
  });
  bridge.addExit({
    exit: WEST,
    inverseExit: EAST,
    location: sunship,
  });
  sunship.addExit({
    exit: UP,
    inverseExit: DOWN,
    location: theSun, // dead end
  });
  sunship.addExit({
    exit: EAST,
    inverseExit: WEST,
    location: bridge,
  });
  mountain.addExit({
    exit: EAST,
    inverseExit: WEST,
    location: mountainHouse,
  });
  mountainHouse.addExit({
    exit: DOWN,
    inverseExit: UP,
    location: car,
  });
  car.addExit({
    exit: DOWN, // no way back to the car
    location: lake,
  });

  // any location that game init needs to know about
  // e.g. if you need to add floor items to the location
  return {
    appleShed,
    bridge,
    car,
    finish,
    lake,
    mountain,
    mountainHouse,
    rocks,
    start,
    sunship,
    theSun,
    waterfall,
  };
}
