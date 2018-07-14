const { runServer } = require('../server');
const request = require('supertest');

const app = runServer();

describe('Chatbot', () => {
  test('should respond with the time and the bot name', async () => {
    const res = await request(app)
      .post('/chat')
      .send({ name: 'integration test' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Beep Beep Beep');
  });
});
