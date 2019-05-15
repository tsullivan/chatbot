import { Bot } from '../src/bot';
import { utilFactory } from './utils';

const bot = new Bot();
const { handshake } = utilFactory();

describe('handshake', () => {
  beforeAll(() => utilFactory().beforeAll(bot));

  test('should remember my name', async () => {
    return handshake();
  });
});
