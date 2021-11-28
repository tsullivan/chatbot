import { EAST, NORTH, SOUTH, WEST } from '../constants';
import { Adventure } from '../../lib';
import { CastleLocation } from './castle';
import { CaveLocation } from './cave';
import { StartLocation } from './start';

export function getLocations(game: Adventure) {
  const startLocation = new StartLocation(game);
  const caveLocation = new CaveLocation(game);
  const castleLocation = new CastleLocation(game);

  startLocation.addExit({
    exit: EAST,
    inverseExit: WEST,
    location: caveLocation,
  });
  startLocation.addExit({
    exit: NORTH,
    inverseExit: SOUTH,
    location: castleLocation,
  });

  return {
    castleLocation,
    caveLocation,
    startLocation,
  };
}
