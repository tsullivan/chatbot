const request = require('supertest');
const { getServer } = require('../src/web');
const { utilFactory } = require('./utils');

const app = getServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('Keywords', () => {
  test('should repeat', async () => {
    await handshake();
    const { statusCode, body } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'repeat 450 💀' });
    expect(statusCode).toEqual(200);
    expect(body.message).toMatchSnapshot();
  });

  test('should help', async () => {
    await handshake();
    const { statusCode, body } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'help' });
    expect(statusCode).toEqual(200);
    expect(body.message).toMatchSnapshot();
  });

  test('should say', async () => {
    await handshake();
    const { statusCode, body } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'say mama say mama saw' });
    expect(statusCode).toEqual(200);
    expect(body.message).toMatchSnapshot();
  });

  test('should what', async () => {
    await handshake();
    const { body: body1 } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'say 🍍' });
    expect(body1.message).toMatchSnapshot();

    const { body: body2 } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'what' });
    expect(body2.message).toMatchSnapshot();
  });

  test('should name', async () => {
    await handshake();

    (async () => {
      const { statusCode, body } = await agent
        .post('/chat')
        .send({ format: 'user', message: 'name' });
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
    (async () => {
      const { statusCode, body } = await agent
        .post('/chat')
        .send({ format: 'user', message: 'Mit' });
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
    (async () => {
      const { statusCode, body } = await agent
        .post('/chat')
        .send({ format: 'user', message: 'name' });
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
    (async () => {
      const { statusCode, body } = await agent
        .post('/chat')
        .send({ format: 'user', message: 'Tim' }); // reset
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
  });
});
