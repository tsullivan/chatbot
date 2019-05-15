import * as request from 'supertest';
import { HandshakeFn, utilFactory } from './utils';
import { Bot } from '../src/bot';

let agent: request.SuperTest<request.Test>;
let handshake: HandshakeFn;

const bot = new Bot();

const testFields = (body: { format: string; message: string }) => ({
  format: body.format,
  message: body.message,
});

const sendTest = (message: string) =>
  agent
    .post('/chat')
    .send({ format: 'user', message })
    .expect(200);

describe('batman', () => {
  beforeAll(async () => {
    ({ agent, handshake } = await utilFactory().beforeAll(bot));
  });

  test('should win at the batman game', async () => {
    await handshake();

    const { body: a1 } = await sendTest('play batman');
    expect(testFields(a1)).toMatchSnapshot();

    const { body: b1 } = await sendTest('batmobile');
    expect(testFields(b1)).toMatchSnapshot();

    const { body: c1 } = await sendTest('77');
    expect(testFields(c1)).toMatchSnapshot();
  });

  test('should lose at the batman game', async () => {
    await handshake();

    const { body: a2 } = await sendTest('play batman');
    expect(testFields(a2)).toMatchSnapshot();

    const { body: b2 } = await sendTest('batgirl');
    expect(testFields(b2)).toMatchSnapshot();

    const { body: c2 } = await sendTest('kl');
    expect(testFields(c2)).toMatchSnapshot();
  });
});
