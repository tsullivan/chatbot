import { Location } from '../../lib/location';
import {
  BASEMENT,
  BRIDGE,
  DOWN,
  EAST,
  ELECTRONICS,
  MAGNET,
  NORTH,
  PLAYGROUND,
  SOAP,
  SOUTH,
  TREEFORT,
  UP,
  WEST,
} from '../constants';
import { BridgeLocation } from './bridge';
import { ElectronicsLocation } from './electronics';
import { MagnetLocation } from './magnet';
import { MagnetBasementLocation } from './magnet_basement';
import { PlaygroundLocation } from './playground';
import { SoapLocation } from './soap';
import { TreeFortLocation } from './treefort';

export function getLocationsMap(game): Map<string, Location> {
  const playgroundLocation = new PlaygroundLocation(game);
  const bridgeLocation = new BridgeLocation(game);
  const electronicsLocation = new ElectronicsLocation(game);
  const soapLocation = new SoapLocation(game);
  const magnetLocation = new MagnetLocation(game);
  const magnetBasementLocation = new MagnetBasementLocation(game);
  const treeFortLocation = new TreeFortLocation(game);

  playgroundLocation.addExit({
    exit: SOUTH,
    inverseExit: NORTH,
    location: bridgeLocation,
  });
  playgroundLocation.addExit({
    exit: UP,
    inverseExit: DOWN,
    location: treeFortLocation,
  });
  playgroundLocation.addExit({
    exit: WEST,
    inverseExit: EAST,
    location: electronicsLocation,
  });
  playgroundLocation.addExit({
    exit: NORTH,
    inverseExit: SOUTH,
    location: soapLocation,
  });
  playgroundLocation.addExit({
    exit: EAST,
    inverseExit: WEST,
    location: magnetLocation,
  });
  magnetLocation.addExit({
    exit: DOWN,
    inverseExit: UP,
    location: magnetBasementLocation,
  });

  const locationMap = new Map();
  locationMap.set(BRIDGE, bridgeLocation);
  locationMap.set(ELECTRONICS, electronicsLocation);
  locationMap.set(MAGNET, magnetLocation);
  locationMap.set(BASEMENT, magnetBasementLocation);
  locationMap.set(PLAYGROUND, playgroundLocation);
  locationMap.set(SOAP, soapLocation);
  locationMap.set(TREEFORT, treeFortLocation);

  return locationMap;
}
