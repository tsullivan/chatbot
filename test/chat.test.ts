import * as express from 'express';
import * as request from 'supertest';
import { Bot } from '../src/bot';
import { getServer } from '../src/web';

let app: express.Application;
let agent: request.SuperTest<request.Test>;

const bot = new Bot();

interface ChatbotRes extends request.Response {
  statusCode?: number;
}

describe('Chatbot', () => {
  beforeAll(async () => {
    await bot.init();
    app = await getServer(bot);
    agent = request.agent(app);
  });


  test('should respond with the time and the bot name', async () => {
    const res: ChatbotRes = await agent.post('/chat').send({ name: 'integration test' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Beep Beep Beep');
  });
});
