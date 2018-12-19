import * as request from 'supertest';
import { getServer } from '../src/web';
import { utilFactory } from './utils';

const app = getServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('handshake', () => {
  test('should remember my name', async () => {
    return handshake();
  });
});
