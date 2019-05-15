import { Bot } from '../src/bot';
import { utilFactory } from './utils';

const bot = new Bot();
const { handshake, getAgent } = utilFactory();
const sendTest = (message: string) =>
  getAgent()
    .post('/chat')
    .send({ format: 'user', message })
    .expect(200);

describe('formatting', () => {
  beforeAll(() => utilFactory().beforeAll(bot));

  test('markdown', async () => {
    await handshake();

    await sendTest('play bubble_gun').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('electronics').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('take_aa_batteries').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('playground').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('soaps').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('steal_the_soap').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('items').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('combine_bubble_gun_and_batteries').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('combine_bubble_gun_and_soap').then(({ body }) => {
      console.log(body.message);
    });
    await sendTest('items').then(({ body }) => {
      console.log(body.message);
    });
  });
});
