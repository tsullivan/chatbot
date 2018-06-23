const { handshake, send, checkResponses } = require('./utils');

describe('escape-jail', () => {
  beforeAll(() => {
    return handshake();
  });

  let resps;
  beforeEach(() => {
    resps = [];
  });

  test('escape', async () => {
    resps[resps.length] = await send('play escape_jail');
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
