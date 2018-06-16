const { app } = require('../server');
const request = require('supertest');
const { handshake } = require('./handshake');

const send = message => {
  return request(app)
    .post('/chat')
    .send({ format: 'user', message });
};

const checkResponses = resps => {
  resps.forEach(({ body }) => expect(body.message).toMatchSnapshot());
};

describe('hiking', () => {
  beforeAll(() => {
    return handshake();
  });

  let resps;
  beforeEach(() => {
    resps = [];
  });

  test('swim fail', async () => {
    resps[resps.length] = await send('play hiking');
    resps[resps.length] = await send('lake');
    resps[resps.length] = await send('swim');
    checkResponses(resps);
  });

  test('help', async () => {
    resps[resps.length] = await send('play hiking');
    resps[resps.length] = await send('help');
    resps[resps.length] = await send('blahblah');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  test('items and drop key and pick up key', async () => {
    resps[resps.length] = await send('play hiking');
    resps[resps.length] = await send('lake');
    resps[resps.length] = await send('items');
    resps[resps.length] = await send('drop_jail_key');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('rocks');
    resps[resps.length] = await send('lake');
    resps[resps.length] = await send('take_jail_key');
    resps[resps.length] = await send('rocks');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  test('explore sun', async () => {
    resps[resps.length] = await send('play hiking');
    resps[resps.length] = await send('lake');
    resps[resps.length] = await send('bridge');
    resps[resps.length] = await send('ship');
    resps[resps.length] = await send('push_button');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('back');
    resps[resps.length] = await send('exit');
    resps[resps.length] = await send('quit');
    checkResponses(resps);
  });

  test('get sprayed at the waterfall', async () => {
    resps[resps.length] = await send('play hiking');
    resps[resps.length] = await send('lake');
    resps[resps.length] = await send('rocks');
    resps[resps.length] = await send('waterfall');
    resps[resps.length] = await send('check_dryness');
    resps[resps.length] = await send('rope');
    resps[resps.length] = await send('mountain');
    resps[resps.length] = await send('get_sprayed');
    resps[resps.length] = await send('check_dryness');
    checkResponses(resps);
  });

  test('purchase some items at the apple shop', async () => {
    resps[resps.length] = await send('rope');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('buy_apple');
    resps[resps.length] = await send('exit');
    resps[resps.length] = await send('check_dryness');
    resps[resps.length] = await send('get_sprayed');
    resps[resps.length] = await send('rope');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('buy_yogurt');
    resps[resps.length] = await send('drop_jail_key');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('exit');
    checkResponses(resps);
  });

  test('fly a car back to the lake', async () => {
    resps[resps.length] = await send('check_dryness');
    resps[resps.length] = await send('get_sprayed');
    resps[resps.length] = await send('mountain');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('take_bubble_gun');
    resps[resps.length] = await send('house');
    resps[resps.length] = await send('sleep');
    resps[resps.length] = await send('down');
    resps[resps.length] = await send('ladder');
    resps[resps.length] = await send('sleep');
    resps[resps.length] = await send('hole');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('car');
    resps[resps.length] = await send('bridge');
    resps[resps.length] = await send('lake');
    resps[resps.length] = await send('throw_apples');
    checkResponses(resps);
  });

  test('explode the ghosts on the sun', async () => {
    resps[resps.length] = await send('bridge');
    resps[resps.length] = await send('ship');
    resps[resps.length] = await send('push_me');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('throw_yogurt');
    resps[resps.length] = await send('look');
    resps[resps.length] = await send('back');
    resps[resps.length] = await send('exit');
    checkResponses(resps);
  });

  test('finish the game', async () => {
    resps[resps.length] = await send('finish_line');
    resps[resps.length] = await send('finish');
    checkResponses(resps);
  });

  test('score', async () => {
    const { body: score } = await send('score');
    expect(score.message).toMatchSnapshot();
  });
});
