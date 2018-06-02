const { app } = require('../server');
const request = require('supertest');
const { handshake } = require('./handshake');

describe('adventure', () => {
  test('start', async () => {
    await handshake();

    const { body } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'play adventure' });
    expect(body.message).toMatchSnapshot();
  });

  test('exit fail', async () => {
    const { body: exitFail } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'exit' });
    expect(exitFail.message).toMatchSnapshot();
  });

  test('cave', async () => {
    const { body: caveLocation } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'cave' });
    expect(caveLocation.message).toMatchSnapshot();
  });

  test('cave look', async () => {
    const { body: caveLook } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'look' });
    expect(caveLook.message).toMatchSnapshot();
  });

  test('take_handle', async () => {
    const { body: takeHandle } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'take_handle' });
    expect(takeHandle.message).toMatchSnapshot();
  });

  test('cave exit', async () => {
    const { body: startLocation } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'exit' });
    expect(startLocation.message).toMatchSnapshot();
  });

  test('castle', async () => {
    const { body: castleLocation } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'castle' });
    expect(castleLocation.message).toMatchSnapshot();
  });

  test('castle sleep fail', async () => {
    const { body: sleep1 } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'sleep' });
    expect(sleep1.message).toMatchSnapshot();
  });

  test('use_window_handle', async () => {
    const { body: useHandle1 } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'use_window_handle' });
    expect(useHandle1.message).toMatchSnapshot();
  });

  test('castle look 1', async () => {
    const { body: lookCastle } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'look' });
    expect(lookCastle.message).toMatchSnapshot();
  });

  test('use_window_handle', async () => {
    const { body: useHandle2 } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'use_window_handle' });
    expect(useHandle2.message).toMatchSnapshot();
  });

  test('castle look 2', async () => {
    const { body: lookCastle } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'look' });
    expect(lookCastle.message).toMatchSnapshot();
  });

  test('castle sleep success', async () => {
    const { body: sleep2 } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'sleep' });
    expect(sleep2.message).toMatchSnapshot();
  });

  test('score', async () => {
    const { body: score } = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'score' });
    expect(score.message).toMatchSnapshot();
  });
});
