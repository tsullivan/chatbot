const { runServer } = require('../server');
const { utilFactory } = require('./utils');

const app = runServer();
const { handshake, send, checkResponses } = utilFactory(app);

describe('escape-jail', () => {
  beforeEach(() => handshake(app));

  let resps;
  beforeEach(() => {
    resps = [];
  });

  test('escape', async () => {
    resps[resps.length] = await send('play escape_jail');
    resps[resps.length] = await send('items');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('take_jail_key');
    resps[resps.length] = await send('force_key');
    resps[resps.length] = await send('wait');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('jump');
    checkResponses(resps);
  });
});
