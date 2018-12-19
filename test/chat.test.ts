import * as request from 'supertest';
import { getServer } from '../src/web';

const app = getServer();
const agent = request.agent(app);

describe('Chatbot', () => {
  test('should respond with the time and the bot name', async () => {
    const res = await agent.post('/chat').send({ name: 'integration test' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Beep Beep Beep');
  });
});