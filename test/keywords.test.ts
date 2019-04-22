import * as request from 'supertest';
import { getServer } from '../src/web';
import { utilFactory } from './utils';

const app = getServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

interface ChatbotRes extends request.Response {
  statusCode?: number;
}

describe('Keywords', () => {
  test('should repeat', async () => {
    await handshake();
    const res: ChatbotRes = await agent
      .post('/chat')
      .send({ format: 'user', message: 'repeat 450 💀' });
    const { statusCode, body } = res;
    expect(statusCode).toEqual(200);
    expect(body.message).toMatchSnapshot();
  });

  test('should help', async () => {
    await handshake();
    const res: ChatbotRes = await agent
      .post('/chat')
      .send({ format: 'user', message: 'help' });
    const { statusCode, body } = res;
    expect(statusCode).toEqual(200);
    expect(body.message).toMatchSnapshot();
  });

  test('should say', async () => {
    await handshake();
    const res: ChatbotRes = await agent
      .post('/chat')
      .send({ format: 'user', message: 'say mama say mama saw' });
    const { statusCode, body } = res;
    expect(statusCode).toEqual(200);
    expect(body.message).toMatchSnapshot();
  });

  test('should what', async () => {
    await handshake();
    const { body: body1 } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'say 🍍' });
    expect(body1.message).toMatchSnapshot();

    const { body: body2 } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'what' });
    expect(body2.message).toMatchSnapshot();
  });

  test('should name', async () => {
    await handshake();

    (async () => {
    const res: ChatbotRes = await agent
        .post('/chat')
        .send({ format: 'user', message: 'name' });
    const { statusCode, body } = res;
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
    (async () => {
    const res: ChatbotRes = await agent
        .post('/chat')
        .send({ format: 'user', message: 'Mit' });
    const { statusCode, body } = res;
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
    (async () => {
    const res: ChatbotRes = await agent
        .post('/chat')
        .send({ format: 'user', message: 'name' });
    const { statusCode, body } = res;
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
    (async () => {
    const res: ChatbotRes = await agent
        .post('/chat')
        .send({ format: 'user', message: 'Tim' }); // reset
    const { statusCode, body } = res;
      expect(statusCode).toEqual(200);
      expect(body.message).toMatchSnapshot();
    })();
  });
});
