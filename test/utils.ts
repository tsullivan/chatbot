import * as request from 'supertest';
import { Bot } from '../src/bot';
import { getServer } from '../src/web';

export type HandshakeFn = () => Promise<void>;
export type SendFn = (message: string) => Promise<request.Response>;
export type CheckRespFn = (resps: any[]) => void;
export type BeforeAllFn = (bot: Bot) => Promise<{
  agent: request.SuperTest<request.Test>;
  handshake: HandshakeFn;
}>;

type UtilFactory = () => {
  getAgent: () => request.SuperTest<request.Test>;
  handshake: HandshakeFn;
  send: SendFn;
  checkResponses: CheckRespFn;
  beforeAll: BeforeAllFn;
};

export const utilFactory: UtilFactory = () => {
  return {
    getAgent: () => this.agent,
    beforeAll: async (bot: Bot) => {
      await bot.init();
      const app = await getServer(bot);
      this.agent = request.agent(app);

      return {
        agent: this.agent,
        handshake: utilFactory().handshake,
      };
    },

    handshake: async () => {
      await this.agent
        .post('/chat')
        .send({ format: 'syn', message: 'HELO' })
        .expect(200)
        .then(
          (res: any): Promise<void> => {
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
          }
        );
    },

    send: (message: string) => {
      return this.agent.post('/chat').send({ format: 'user', message });
    },

    checkResponses: (resps: any[]) => {
      resps.forEach(({ body }: { body: any }) =>
        expect(body.message).toMatchSnapshot()
      );
    },
  };
};
