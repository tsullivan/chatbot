const { runServer } = require('../server');
const request = require('supertest');
const { utilFactory } = require('./utils');

const app = runServer();
const { handshake } = utilFactory(app);

describe('batman', () => {
  test('should win at the batman game', async () => {
    await handshake(app);

    const startGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'play batman' });

    expect(startGame.body.message).toMatchSnapshot();

    const sayBatmobile = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'batmobile' });

    expect(sayBatmobile.body.message).toMatchSnapshot();

    const winGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: '77' });

    expect(winGame.body.message).toMatchSnapshot();
  });

  test('should lose at the batman game', async () => {
    await handshake(app);

    const startGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'play batman' });

    expect(startGame.body.message).toMatchSnapshot();

    const sayBatmobile = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'batgirl' });

    expect(sayBatmobile.body.message).toMatchSnapshot();

    const loseGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'kl' });

    expect(loseGame.body.message).toMatchSnapshot();
  });
});
