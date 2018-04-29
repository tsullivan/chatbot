const { app } = require('../server');
const { expect } = require('chai');
const request = require('supertest');

describe('#POST / chat', () => {
  let server;
  beforeEach(() => {
    server = app.listen(3033);
  });

  afterEach(async () => {
    server.close();
  });

  it('should respond with the time and the bot name', async () => {
    const res = await request(app)
      .post('/chat')
      .send({ name: 'integration test' });

    expect(res.statusCode).to.equal(200);
    expect(res.body.name).to.equal('Beep Beep Beep');
    expect(res.body.time).to.be.a('string');
  });
});
