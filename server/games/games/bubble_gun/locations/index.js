const { NORTH, SOUTH, EAST, WEST, UP, DOWN } = require('../constants');

const { PlaygroundLocation } = require('./playground');
const { ElectronicsLocation } = require('./electronics');
const { SoapLocation } = require('./soap');
const { MagnetLocation } = require('./magnet');
const { TreeFortLocation } = require('./treefort');
const { BridgeLocation } = require('./bridge');

function getLocations(game) {
  const playgroundLocation = new PlaygroundLocation(game);
  const bridgeLocation = new BridgeLocation(game);
  const electronicsLocation = new ElectronicsLocation(game);
  const soapLocation = new SoapLocation(game);
  const magnetLocation = new MagnetLocation(game);
  const treeFortLocation = new TreeFortLocation(game);

  playgroundLocation.addExit({
    location: bridgeLocation,
    exit: SOUTH,
    inverseExit: NORTH,
  });
  playgroundLocation.addExit({
    location: treeFortLocation,
    exit: UP,
    inverseExit: DOWN,
  });
  playgroundLocation.addExit({
    location: electronicsLocation,
    exit: WEST,
    inverseExit: EAST,
  });
  playgroundLocation.addExit({
    location: soapLocation,
    exit: NORTH,
    inverseExit: SOUTH,
  });
  playgroundLocation.addExit({
    location: magnetLocation,
    exit: EAST,
    inverseExit: WEST,
  });

  return {
    playgroundLocation,
    soapLocation,
    electronicsLocation,
    magnetLocation,
    treeFortLocation,
    bridgeLocation,
  };
}

module.exports = { getLocations };
