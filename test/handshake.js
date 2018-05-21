const { app } = require('../server');
const request = require('supertest');

const handshake = async () => {
  const greetHello = await request(app)
    .post('/chat')
    .send({ format: 'syn', message: 'HELO' });

  expect(greetHello.statusCode).toEqual(200);
  expect(greetHello.body.format).toEqual('plain');
  expect(greetHello.body.message).toEqual('Hello! What is your name?');
  expect(greetHello.body.name).toEqual('Beep Beep Beep');

  const sayName = await request(app)
    .post('/chat')
    .send({ format: 'user', message: 'Tim' });

  expect(sayName.body.message).toEqual('Hello, Tim! Nice to meet you.');
};

module.exports = { handshake };
