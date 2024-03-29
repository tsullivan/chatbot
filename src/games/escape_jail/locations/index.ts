import { Adventure } from '../../lib';
import { CellLocation } from './cell';
import { FenceLocation } from './fence';
import { HallwayLocation } from './hallway';
import { SOUTH } from '../constants';
import { VanLocation } from './van';

export function getLocations(game: Adventure) {
  const cellLocation = new CellLocation(game);
  const hallwayLocation = new HallwayLocation(game);
  const vanLocation = new VanLocation(game);
  const fenceLocation = new FenceLocation(game);

  cellLocation.addExit({
    exit: SOUTH,
    location: hallwayLocation,
  });
  hallwayLocation.addExit({
    exit: SOUTH,
    location: vanLocation,
  });
  vanLocation.addExit({
    exit: SOUTH,
    location: fenceLocation,
  });

  return {
    cellLocation,
    fenceLocation,
    hallwayLocation,
    vanLocation,
  };
}
