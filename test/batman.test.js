const request = require('supertest');
const { runServer } = require('../server');
const { utilFactory } = require('./utils');

const app = runServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('batman', () => {
  test('should win at the batman game', async () => {
    await handshake();

    const startGame = await agent
      .post('/chat')
      .send({ format: 'user', message: 'play batman' });

    expect(startGame.body.message).toMatchSnapshot();

    const sayBatmobile = await agent
      .post('/chat')
      .send({ format: 'user', message: 'batmobile' });

    expect(sayBatmobile.body.message).toMatchSnapshot();

    const winGame = await agent.post('/chat').send({ format: 'user', message: '77' });

    expect(winGame.body.message).toMatchSnapshot();
  });

  test('should lose at the batman game', async () => {
    await handshake(app);

    const startGame = await agent
      .post('/chat')
      .send({ format: 'user', message: 'play batman' });

    expect(startGame.body.message).toMatchSnapshot();

    const sayBatmobile = await agent
      .post('/chat')
      .send({ format: 'user', message: 'batgirl' });

    expect(sayBatmobile.body.message).toMatchSnapshot();

    const loseGame = await agent.post('/chat').send({ format: 'user', message: 'kl' });

    expect(loseGame.body.message).toMatchSnapshot();
  });
});
