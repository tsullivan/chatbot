const request = require('supertest');
const { getServer } = require('../server');
const { utilFactory } = require('./utils');

const app = getServer();
const agent = request.agent(app);
const { handshake, send, checkResponses } = utilFactory(agent);

describe('escape-jail', () => {
  test('escape', async () => {
    await handshake(app);
    const resps = [];
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
