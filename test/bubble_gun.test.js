const { handshake, send, checkResponses } = require('./utils');

describe('bubble_gun', () => {
  beforeAll(() => {
    return handshake();
  });

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
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('playground');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('soaps');
    resps[resps.length] = await send('look');
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
