const request = require('supertest');
const { runServer } = require('../server');
const { utilFactory } = require('./utils');

const app = runServer();
const agent = request.agent(app);
const { handshake, send, checkResponses } = utilFactory(agent);

describe('bubble_gun', () => {
  beforeEach(() => handshake());

  let resps;
  beforeEach(() => {
    resps = [];
  });

  test('walk around', async () => {
    resps[resps.length] = await send('play bubble_gun');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('bridge');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('tree_fort');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('electronics');
    resps[resps.length] = await send('take_lr41_batteries');
    resps[resps.length] = await send('take_aa_batteries');
    resps[resps.length] = await send('take_led');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('items');
    resps[resps.length] = await send('combine_bubble_gun_and_batteries');
    resps[resps.length] = await send('combine_led_and_batteries');
    resps[resps.length] = await send('items');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('soaps');
    resps[resps.length] = await send('steal_the_soap');
    resps[resps.length] = await send('combine_bubble_gun_and_soap');
    resps[resps.length] = await send('items');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('magnets');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('look');
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
});
