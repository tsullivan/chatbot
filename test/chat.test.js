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

describe('Chatbot', () => {
  let server;
  beforeEach(() => {
    server = app.listen(3033);
  });

  afterEach(async () => {
    await request(app)
      .post('/chat')
      .send({ format: 'hup', message: 'Bye!' });
    server.close();
  });

  describe('POST endpoint', () => {
    it('should respond with the time and the bot name', async () => {
      const res = await request(app)
        .post('/chat')
        .send({ name: 'integration test' });

      expect(res.statusCode).to.equal(200);
      expect(res.body.name).to.equal('Beep Beep Beep');
      expect(res.body.time).to.be.a('string');
    });
  });

  describe('Games', () => {
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

    it.skip('should win at the adventure game', async () => {
      await handshake();

      const { body: start } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'play adventure' });
      expect(start.message).to.equal(
        `It is the night time. You are outside, surrounded by dark trees, and you're very tired. There is a castle and a cave. Which way looks to be best to find a nice comfy bed to rest? I didn't mean for that to rhyme.\nType CAVE to go down into the cave or CASTLE to head up to the castle.`
      );

      const { body: caveLocation } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'cave' });
      expect(caveLocation.message).to.equal(
        `It's unnaturally cheery in this smelly old cave. Probably because of the tiny village of tiny dancing skeleton hands. So cute! So tiny! So skeleton handsy!\nType DANCE to dance with the tiny skeleton hands, LOOK to look closer at the tiny village, EXIT to get out of the cheery smelly old cave.`
      );

      const { body: startLocation } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'exit' });
      expect(startLocation.message).to.equal(
        `It is the night time. You are outside, surrounded by dark trees, and you're very tired. There is a castle and a cave. Which way looks to be best to find a nice comfy bed to rest? I didn't mean for that to rhyme.\nType CAVE to go down into the cave or CASTLE to head up to the castle.`
      );

      const { body: castleLocation } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'castle' });
      expect(castleLocation.message).to.equal(
        `In the great hall of the castle, there are beautiful open-air windows with warm, nice-smelling air drifting through. Sunlight is catching a few specks of dust floating in the air. Not that much though, because it's pretty clean in here. There's also a nice looking comfy bed in the middle of the great hall. Hey wait - isn't it night time? Where is that light coming from?\nType SLEEP to sleep on the comfy bed, LOOK to look closer at the open-air windows, EXIT to leave the beautful great hall and the castle.`
      );

      const { body: sleepTime } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'sleep' });
      expect(sleepTime.message).to.equal(
        `I guess you win becase With the windows closed and blocking out the the unusually bright outside night air, you rest your weary body on the comfy bed in the exquisitely decorated great hall, close your eyes and have a pleasant sleep. You dream pleasant dreams as your subconscious has been steeped from conscious knowledge that all the oddities you've encountered have been safely dealt with and you are out of harm's reach. Let's not think about what happens when you wake up. You deserve this rest so enjoy it completely. YOU WIN you got to fall asleep! Goodnight, sweet Tim! Bye! Turns: 3 Score: 100\nThat was fun, Tim!`
      );
    });
  });
});
