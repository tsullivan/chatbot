const { SOUTH } = require('../constants');
const { CellLocation } = require('./cell');
const { HallwayLocation } = require('./hallway');
const { VanLocation } = require('./van');
const { FenceLocation } = require('./fence');

function getLocations(game) {
  const cellLocation = new CellLocation(game);
  const hallwayLocation = new HallwayLocation(game);
  const vanLocation = new VanLocation(game);
  const fenceLocation = new FenceLocation(game);

  cellLocation.addExit({
    location: hallwayLocation,
    exit: SOUTH,
  });
  hallwayLocation.addExit({
    location: vanLocation,
    exit: SOUTH,
  });
  vanLocation.addExit({
    location: fenceLocation,
    exit: SOUTH,
  });

  return {
    cellLocation,
    hallwayLocation,
    vanLocation,
    fenceLocation,
  };
}

module.exports = { getLocations };
