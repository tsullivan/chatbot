const request = require('supertest');
const { getServer } = require('../src/web');
const { utilFactory } = require('./utils');

const app = getServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('handshake', () => {
  test('should remember my name', async () => {
    return handshake();
  });
});
