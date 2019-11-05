import * as request from 'supertest';
import { Bot } from '../src/bot';
import { utilFactory } from './utils';

const bot = new Bot();
const { handshake, send, checkResponses } = utilFactory();

describe('bubble_gun', () => {
  beforeAll(() => utilFactory().beforeAll(bot));

  beforeEach(() => handshake());

  let resps: request.Response[];
  beforeEach(() => {
    resps = [];
  });

  test('default bridge', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('bridge');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  test('magneted bridge', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('magnets');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('explore');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('secret_door');
    resps[resps.length] = await send('status_cycle'); // doors open
    resps[resps.length] = await send('status_cycle'); // building crashes up
    resps[resps.length] = await send('status_cycle'); // zaps up the playground
    resps[resps.length] = await send('status_cycle'); // zaps up the bridge
    resps[resps.length] = await send('up');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('bridge');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  test('magneted playground', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('magnets');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('explore');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('secret_door');
    resps[resps.length] = await send('status_cycle'); // doors open
    resps[resps.length] = await send('status_cycle'); // building crashes up
    resps[resps.length] = await send('status_cycle'); // zaps up the playground
    resps[resps.length] = await send('up');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  /*
  test('lighted playground', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });
   */

  test('crashed magnet store and basement', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('magnets');
    resps[resps.length] = await send('explore');
    resps[resps.length] = await send('secret_door');
    resps[resps.length] = await send('status_cycle');
    resps[resps.length] = await send('up');
    resps[resps.length] = await send('look'); // normal
    resps[resps.length] = await send('secret_door');
    resps[resps.length] = await send('look'); // opened floor
    resps[resps.length] = await send('status_cycle');
    resps[resps.length] = await send('up');
    resps[resps.length] = await send('look'); // crashed up the ceiling
    resps[resps.length] = await send('secret_door');
    resps[resps.length] = await send('look'); // machine extended
    resps[resps.length] = await send('status_cycle'); // zaps 1
    resps[resps.length] = await send('status_cycle'); // zaps 2
    resps[resps.length] = await send('up');
    resps[resps.length] = await send('look'); // crashed and emptied of magnets
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  test('fall down in soap store', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('soaps');
    resps[resps.length] = await send('spill');
    resps[resps.length] = await send('slip');
    resps[resps.length] = await send('spill');
    resps[resps.length] = await send('slip');
    resps[resps.length] = await send('spill');
    resps[resps.length] = await send('slip');
    resps[resps.length] = await send('spill');
    resps[resps.length] = await send('slip');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  test('cross bridge', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('magnets');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('explore');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('secret_door');
    resps[resps.length] = await send('status_cycle'); // doors open
    resps[resps.length] = await send('status_cycle'); // building crashes up
    resps[resps.length] = await send('status_cycle'); // zaps up the playground
    resps[resps.length] = await send('status_cycle'); // zaps up the bridge
    resps[resps.length] = await send('up');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('electronics');
    resps[resps.length] = await send('take_aa_batteries');
    resps[resps.length] = await send('take_lr41_batteries');
    resps[resps.length] = await send('take_led');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('soaps');
    resps[resps.length] = await send('take_soap');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('bridge');
    // BUG: should automatically suggest what you can do with items you are holding
    resps[resps.length] = await send('help');
    resps[resps.length] = await send('COMBINE_BUBBLE_GUN_AND_BATTERIES');
    resps[resps.length] = await send('COMBINE_BUBBLE_GUN_AND_SOAP');
    resps[resps.length] = await send('COMBINE_LED_AND_BATTERIES');
    resps[resps.length] = await send('throw_led');
    resps[resps.length] = await send('bubble_blast');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

});
