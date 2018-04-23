const { app } = require('../server');
const { expect } = require('chai');
const request = require('supertest');

const handshake = async () => {
  const greetHello = await request(app)
    .post('/chat')
    .send({ format: 'syn', message: 'HELO' });

  expect(greetHello.statusCode).to.equal(200);
  expect(greetHello.body.format).to.equal('plain');
  expect(greetHello.body.message).to.equal('Hello! What is your name?');
  expect(greetHello.body.name).to.equal('Beep Beep Beep');

  const sayName = await request(app)
    .post('/chat')
    .send({ format: 'user', message: 'Tim' });

  expect(sayName.body.message).to.equal('Hello, Tim! Nice to meet you.');
};

describe('#POST / chat', () => {
  let server;
  beforeEach(() => {
    server = app.listen(3033);
  });

  afterEach(async () => {
    await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'kl' });
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

  it('should win at the batman game', async () => {
    await handshake();

    const startGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'play batman' });

    expect(startGame.body.message).to.equal(
      `Let's play Batman. Type in stuff for the Batcave. Type "77" to keep your points or "kl" to throw it all away.`
    );

    const sayBatmobile = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'batmobile' });

    expect(sayBatmobile.body.message).to.equal(
      'Adding batmobile to the Batcave.'
    );

    const winGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: '77' });

    expect(
      winGame.body.message.indexOf(
        `You won! Right now!! "77" ended the Batgame. Your Batstuff is: batmobile. Your Batscore is`
      )
    ).to.equal(0);
  });

  it('should lose at the batman game', async () => {
    await handshake();

    const startGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'play batman' });

    expect(startGame.body.message).to.equal(
      `Let's play Batman. Type in stuff for the Batcave. Type "77" to keep your points or "kl" to throw it all away.`
    );

    const sayBatmobile = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'batgirl' });

    expect(sayBatmobile.body.message).to.equal(
      'Adding batgirl to the Batcave.'
    );

    const loseGame = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'kl' });

    expect(
      loseGame.body.message.indexOf(
        `Type "kl" and you lose the Batgame :( "kl" ended the Batgame. Your Batstuff is: batgirl. Your Batscore is`
      )
    ).to.equal(0);
  });
});
