import { HandshakeFn, utilFactory } from './utils';
import { Bot } from '../src/bot';

let handshake: HandshakeFn;

const bot = new Bot();

describe('handshake', () => {
  beforeAll(async () => {
    ({ handshake } = await utilFactory().beforeAll(bot));
  });

  test('should remember my name', async () => {
    return handshake();
  });
});
