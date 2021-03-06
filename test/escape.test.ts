import * as request from 'supertest';
import { CheckFn, HandshakeFn, SendFn, utilFactory } from './utils';
import { Bot } from '../src/bot';

let checkResponses: CheckFn;
let handshake: HandshakeFn;
let send: SendFn;
const bot = new Bot();

describe('escape-jail', () => {
  beforeAll(async () => {
    ({ checkResponses, handshake, send } = await utilFactory(bot));
  });

  beforeEach(() => handshake());

  let resps: request.Response[];
  beforeEach(() => {
    resps = [];
  });


  test('escape', async () => {
    await handshake();
    resps[resps.length] = await send('play escape_jail');
    resps[resps.length] = await send('items');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('take_jail_key');
    resps[resps.length] = await send('force_key');
    resps[resps.length] = await send('wait');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('escape');
    resps[resps.length] = await send('jump');
    checkResponses(resps);
  });
});
