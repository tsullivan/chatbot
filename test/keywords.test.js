const request = require('supertest');
const { runServer } = require('../server');
const { utilFactory } = require('./utils');

const app = runServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('Keywords', () => {
  test('should give a requested joke', async () => {
    await handshake();

    const res = await agent.post('/chat').send({ format: 'user', message: 'joke 5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatchSnapshot();
  });
});
