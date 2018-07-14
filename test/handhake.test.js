const request = require('supertest');
const { runServer } = require('../server');
const { utilFactory } = require('./utils');

const app = runServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('handshake', () => {
  test('should remember my name', async () => {
    return handshake();
  });
});
