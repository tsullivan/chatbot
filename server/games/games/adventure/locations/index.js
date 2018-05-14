const { NORTH, SOUTH, EAST, WEST } = require('../constants');
const { StartLocation } = require('./start');
const { CaveLocation } = require('./cave');
const { CastleLocation } = require('./castle');

function getLocations(game) {
  const startLocation = new StartLocation(game);
  const caveLocation = new CaveLocation(game);
  const castleLocation = new CastleLocation(game);

  startLocation.addExit({
    location: caveLocation,
    exit: EAST,
    inverseExit: WEST
  });
  startLocation.addExit({
    location: castleLocation,
    exit: NORTH,
    inverseExit: SOUTH
  });

  return {
    startLocation,
    caveLocation,
    castleLocation
  };
}

module.exports = { getLocations };

