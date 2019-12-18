import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { Bot } from '../src/bot';
import { getServer } from '../src/web';

export type HandshakeFn = () => Promise<void>;
export type AgentFn = () => SuperTest<Test>;
export type SendFn = (message: string) => Promise<request.Response>;
export type CheckFn = (resps: any[]) => void;

class Util {
  private readonly agent: request.SuperTest<request.Test>;

  public constructor(agent: request.SuperTest<request.Test>) {
    this.agent = agent;

    this.getAgent = this.getAgent.bind(this);
    this.handshake = this.handshake.bind(this);
    this.send = this.send.bind(this);
  }

  public getAgent() {
    return this.agent;
  }

  public async handshake() {
    await this.agent
      .post('/chat')
      .send({ format: 'syn', message: 'HELO' })
      .expect(200)
      .then((res: any) => {
        expect(res.body.format).toEqual('plain');
        expect(res.body.name).toEqual('Beep Beep Beep');

        if (res.body.message === 'Hello! What is your name?') {
          return this.agent
            .post('/chat')
            .send({ format: 'user', message: 'Tim' })
            .expect(200)
            .then((ret: any) => {
              expect(ret.body.message).toEqual('Hello, Tim! Nice to meet you.');
            });
        }

        return expect(res.body.message).toEqual('Hello again, Tim!');
      });
  }

  public async send(message: string) {
    return await this.agent.post('/chat').send({ format: 'user', message });
  }

  public checkResponses(resps: any[]) {
    resps.forEach(({ body }: { body: any }) => expect(body.message).toMatchSnapshot());
  }
}

export const utilFactory = async (bot: Bot) => {
  await bot.init();
  const app = await getServer(bot);
  const agent = request.agent(app);
  const util = new Util(agent);

  return util;
};
