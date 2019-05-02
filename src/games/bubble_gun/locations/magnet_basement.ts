// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse, Location, parajoin } from '../../lib';
import { BRIDGE, MAGNET, PLAYGROUND, UP } from '../constants';
import { BridgeLocation } from './bridge';
import { MagnetLocation } from './magnet';
import { PlaygroundLocation } from './playground';

const STAT_LOOMING = 'LOOMING';
const STAT_EXPOSED = 'EXPOSED';
const STAT_UNDEFINED = 'UNDEFINED';
const STAT_IGNITED_TARGET1 = 'IGNITED_TARGET1';
const STAT_IGNITED_TARGET2 = 'IGNITED_TARGET2';
const STAT_ERROR = 'ERROR';
const MACHINE_CYCLES = [
  STAT_LOOMING,
  STAT_EXPOSED,
  STAT_UNDEFINED,
  STAT_IGNITED_TARGET1,
  STAT_IGNITED_TARGET2,
  STAT_ERROR,
];

export class MagnetBasementLocation extends Location {
  private machineUncovered = false;
  private machineExtended = false;
  private machineCycles = MACHINE_CYCLES;
  private machineCycleCurrent = 0;

  public constructor(game: Adventure) {
    super({ game, name: 'The Secret Basement of the Magnet Store' });
  }

  public getDescription(game: Adventure) {
    return parajoin([
      snl`You're at the bottom of a long set of stairs, in a room with a wide, open floor, and a very tall ceiling.`,
      snl`A metal box on the wall stands out as it is the only thing that makes out a shape in the room. The section of wall with the box is protected by
      a guard rail, which you can walk behind to access the control panel. There are many magnets stuck to the box and the guard rail, just like the shelves upstairs.`,
      [
        snl`It is a very well-lit and clean place - it almost feels sterile.`,
        snl`There is a lot of complicated machinery curled up in a really big hole in the floor. The room is a bit dusty now. It seems like this floor
        hasn't been opened up in a long time: maybe ever.`,
        snl`An enormous machine arm has extended out of the floor, crashed through the ceiling, and crashed through both the inside of and the roof
        of the magnet store.`,
      ][this.machineUncovered ? (this.machineExtended ? 2 : 1) : 0],
    ]);
  }

  public get machineStatus() {
    if (this.machineCycleCurrent in this.machineCycles) {
      return this.machineCycles[this.machineCycleCurrent];
    }
    return this.machineCycleCurrent;
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('UP', 'Go back to the magnet store', () => {
      return this.followExit(UP);
    });
    this.addKeyword(
      'EXAMINE_CONTROL_PANEL',
      'Take a look at what this control panel has to offer.',
      () => {
        const text = snl`The panel has a small screen and a button of about the same size. The screen reads one message: **STATUS: ${
          this.machineStatus
        }**.
        The button is labeled **STATUS_CYCLE**. There is another slightly larger screen on the control panel: a map showing all of Bubble Gun
        World. It shows targets on the Playground and the Bridge.`;
        return new KeywordResponse({ text });
      }
    );

    this.addKeyword('STATUS_CYCLE', 'Press the STATUS_CYCLE button', () => {
      // increment
      this.machineCycleCurrent = Math.min(
        this.machineCycleCurrent + 1,
        this.machineCycles.length - 1
      );

      const storeLocation = game.getLocationById(MAGNET) as MagnetLocation;
      const playgroundLocation = game.getLocationById(PLAYGROUND) as PlaygroundLocation;
      const bridgeLocation = game.getLocationById(BRIDGE) as BridgeLocation;

      // react to new status
      let machineText;
      switch (this.machineStatus) {
      case STAT_EXPOSED:
        this.machineUncovered = true;
        machineText = parajoin([
          snl`The bright florescent lights suddently shut off. Red alerting lights turn on and paint the large room with red light and long
            shadows.`,
          snl`The floor starts to shake, and it becomes necessary for you to grab onto the guard rail to remain standing. The floor starts to
            separate in the middle - opening like cargo doors - to reveal complicated-looking machinery beneath the floor.`,
          snl`In the glow of the red light, you can still read the message on the control panel status screen. It has changed to: **STATUS: ${
            this.machineStatus
          }**`,
        ]);
        break;
      case STAT_UNDEFINED:
        this.machineExtended = true;
        storeLocation.machine();
        machineText = parajoin([
          snl`Gears in the machinery start to slowly turn, and parts of the machine start to unfold. First, metal arms and cranks
            reach out of the separated floor, into the air, higher and higher. It crashes the ceiling, and creates a new window into the Magnet
            Store above. Magnets are wapping off the shelves and wapping onto the machine arm. But the machine arm still goes up and up and up.
            It crashes out of the roof of the building, and then finally becomes still.`,
          snl`All the crashing has created a lot of debris, rubble and dust in the basement around you. But the
            control panel is still working. Now the status screen reads: **STATUS: ${
  this.machineStatus
}**`,
          snl`It seems this part of the machine functionality has never been tested before. That would explain why the ceilings and roof wasn't destroyed when
            you got into town.`,
          snl`The Playground and the Bridge on the map of the control panel have their targets blinking.`,
        ]);
        break;
      case STAT_IGNITED_TARGET1:
        playgroundLocation.magnite();
        machineText = parajoin([
          snl`Magnets start flying off the control panel box and the guard rail, hit the machine in the center of the room, and slide up and up the machine.
            You watch them go up through the ceiling and into the store, where more magnets are crashing into the machine and sliding up, up, up.`,
          snl`Suddenly, a loud noise blasts your ears: THUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUD. The noise is coming from high above you, in the air above the building.`,
          snl`The Playground's icon on the map changed from a target to an X.`,
          snl`What have you done?`,
        ]);
        break;
      case STAT_IGNITED_TARGET2:
        bridgeLocation.magnite();
        storeLocation.empty();
        machineText = parajoin([
          snl`Again a loud noise blasts your ears: THUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUD. It's just as loud and long as last time.`,
          snl`The Bridge's icon on the map changed from a target to an X.`,
          snl`What. Have. You. Done.`,
        ]);
        break;
      default:
        machineText = parajoin([
          snl`When you push the button now, the machine shakes a little bit and makes some clunking sounds, but nothing happens. It seems to be out of ammunition.`,
          snl`You wonder if you have just emptied the entire store of all of its magnets somehow.`,
        ]);
      }

      // report
      return new KeywordResponse({ text: machineText });
    });
  }
}
