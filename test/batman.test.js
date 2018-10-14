const request = require('supertest');
const { getServer } = require('../server');
const { utilFactory } = require('./utils');

const app = getServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

const testFields = body => ({
  message: body.message,
  format: body.format,
});

const sendTest = message =>
  agent
    .post('/chat')
    .send({ format: 'user', message })
    .expect(200);

describe('batman', () => {
  test('should win at the batman game', async () => {
    await handshake();

    const { body: a1 } = await sendTest('play batman');
    expect(testFields(a1)).toMatchSnapshot();

    const { body: b1 } = await sendTest('batmobile');
    expect(testFields(b1)).toMatchSnapshot();

    const { body: c1 } = await sendTest('77');
    expect(testFields(c1)).toMatchSnapshot();
  });

  test('should lose at the batman game', async () => {
    await handshake(app);

    const { body: a2 } = await sendTest('play batman');
    expect(testFields(a2)).toMatchSnapshot();

    const { body: b2 } = await sendTest('batgirl');
    expect(testFields(b2)).toMatchSnapshot();

    const { body: c2 } = await sendTest('kl');
    expect(testFields(c2)).toMatchSnapshot();
  });
});
