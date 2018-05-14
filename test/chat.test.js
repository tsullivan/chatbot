const snl = require('strip-newlines');
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

  describe('Keywords', () => {
    let message;
    afterEach(() => {
      console.log({ message }); // eslint-disable-line no-console
    });

    it('should make some random phrase', async () => {
      await handshake();

      const res = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'phrase' });
      expect(res.statusCode).to.equal(200);
      message = res.body.message;
    });
  });

  describe('Games', () => {
    it('should win at the batman game', async () => {
      await handshake();

      const startGame = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'play batman' });

      expect(startGame.body.message).to.equal(
        snl`Let's play Batman. Type in stuff for the Batcave. Type "77" to keep
          your points or "kl" to throw it all away.`
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
          snl`You won! Right now!! "77" ended the Batgame. Your Batstuff is:
            batmobile. Your Batscore is`
        )
      ).to.equal(0);
    });

    it('should lose at the batman game', async () => {
      await handshake();

      const startGame = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'play batman' });

      expect(startGame.body.message).to.equal(
        snl`Let's play Batman. Type in stuff for the Batcave. Type "77" to keep
          your points or "kl" to throw it all away.`
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
          snl`Type "kl" and you lose the Batgame :( "kl" ended the Batgame.
            Your Batstuff is: batgirl. Your Batscore is`
        )
      ).to.equal(0);
    });

    it('should win at the adventure game', async () => {
      await handshake();

      const { body: start } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'play adventure' });
      expect(start.message).to.equal(
        `It is the night time. You are outside, surrounded by dark trees, and you're very tired. There is a castle and a cave. Which way looks to be best to find a nice comfy bed to rest? I didn't mean for that to rhyme.\nType CAVE to go down into the cave, or CASTLE to head up to the castle.`
      );

      const { body: caveLocation } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'cave' });
      expect(caveLocation.message).to.equal(
        `It's unnaturally cheery in this smelly old cave. Probably because of the tiny village of tiny dancing skeleton hands. So cute! So tiny! So skeleton handsy!\nType DANCE to dance with the tiny skeleton hands, LOOK to look closer at the tiny village, or EXIT to get out of the cheery smelly old cave.`
      );

      const { body: caveLook } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'look' });
      expect(caveLook.message).to.equal(
        `The tiny village has a tiny hotel with tiny beds made for resting upon by tiny skeleton hands. It warms you heart to see, but it makes you no less tired and your warmed heart is at the same time shamed with the truthful knowledge that you can find no rest in this enjoyable place. The hotel roof has a weird looking pole that looks like a handle crank for a castle window. WEIRD, right? The hotel building has a strange type of flagpole on the roof that looks like it can be held in a normal human hand like your own. It's unnaturally cheery in this smelly old cave. Probably because of the tiny village of tiny dancing skeleton hands. So cute! So tiny! So skeleton handsy!\nType DANCE to dance with the tiny skeleton hands, LOOK to look closer at the tiny village, EXIT to get out of the cheery smelly old cave., or TAKE_HANDLE to take the handle and put it in your pocket where it will be safe`
      );

      const { body: takeHandle } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'take_handle' });
      expect(takeHandle.message).to.equal(
        `Can you handle the handle? I guess you can. The handle has been taken by you.`
      );

      const { body: startLocation } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'exit' });
      expect(startLocation.message).to.equal(
        `It is the night time. You are outside, surrounded by dark trees, and you're very tired. There is a castle and a cave. Which way looks to be best to find a nice comfy bed to rest? I didn't mean for that to rhyme.\nType CAVE to go down into the cave, or CASTLE to head up to the castle.`
      );

      const { body: castleLocation } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'castle' });
      expect(castleLocation.message).to.equal(
        `In the great hall of the castle, there are beautiful open-air windows with warm, nice-smelling air drifting through. Sunlight is catching a few specks of dust floating in the air. Not that much though, because it's pretty clean in here. There's also a nice looking comfy bed in the middle of the great hall. Hey wait - isn't it night time? Where is that light coming from?\nType SLEEP to sleep on the comfy bed, LOOK to look closer at the open-air windows, or EXIT to leave the beautful great hall and the castle.`
      );

      const { body: sleep1 } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'sleep' });
      expect(sleep1.message).to.equal(
        `There is too much light coming in through the open-air windows. You'll never be able to enjoy even a minute's rest in this spectacular great hall! Oh yeah, and there are no other beds in this castle and all the rooms will kill you if you try to go in them because there are poison arrow traps everywhere. LOSE A POINT`
      );

      const { body: useHandle1 } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'use_window_handle' });
      expect(useHandle1.message).to.equal(
        `Type SLEEP to sleep on the comfy bed, or LOOK to look closer at the open-air windows!!!`
      );

      const { body: lookCastle } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'look' });
      expect(lookCastle.message).to.equal(
        `They're nice windows and all, but it's so bright in here! What kind of weird forces are around that would make the sun so bright at this time of night!?Oh, also you notice that each window has a little socket in one corner, and that looks like the handle you're carrying in your pocket would fit in it! What do you say, want to give it a whirl???`
      );

      const { body: useHandle2 } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'use_window_handle' });
      expect(useHandle2.message).to.equal(
        `With a loud but suprisingly unrusty sounding "SSSSSSHNK" noise, metal roller doors slide down to cover the open-air windows. The windows are now closed-air windows. The room has much more cozy and relaxed lighting!`
      );

      const { body: sleep2 } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'sleep' });
      expect(sleep2.message).to.equal(
        `I guess you win becase With the windows closed and blocking out the the unusually bright outside night air, you rest your weary body on the comfy bed in the exquisitely decorated great hall, close your eyes and have a pleasant sleep. You dream pleasant dreams as your subconscious has been steeped from conscious knowledge that all the oddities you've encountered have been safely dealt with and you are out of harm's reach. Let's not think about what happens when you wake up. You deserve this rest so enjoy it completely. YOU WIN you got to fall asleep! Goodnight, sweet Tim! Bye! Turns: 9 Score: 103\nThat was fun, Tim!`
      );

      const { body: score } = await request(app)
        .post('/chat')
        .send({ format: 'user', message: 'score' });
      expect(score.message).to.equal(
        `The average score of the games you plaid are : 909`
      );
    });
  });
});
