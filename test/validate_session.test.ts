import * as request from 'supertest';
import { getServer } from '../src/web';

describe('detect invalid session', () => {
  it('double syn', async () => {
    const app = getServer();
    const agent = request.agent(app);

    const { body: syn1 } = await agent
      .post('/chat')
      .send({ format: 'syn', message: 'HELO' })
      .expect(200);
    expect(syn1.message).toEqual('Hello! What is your name?');

    const { body: syn2 } = await agent
      .post('/chat')
      .send({ format: 'syn', message: 'HELO' })
      .expect(200);
    expect(syn2.message).toEqual('Hello! What is your name?');

    const { body: plain1 } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'Tim' })
      .expect(200);
    expect(plain1.message).toEqual('Hello, Tim! Nice to meet you.');
  });

  it('recover invalid session', async () => {
    const app = getServer();
    const agent = request.agent(app);

    const { body: plain1 } = await agent
      .post('/chat')
      .send({ format: 'plain', message: 'Glad to hear it.' })
      .expect(200);
    expect(plain1.message).toEqual(
      'My brain hurts!!! I think I just lost all of my memory!!!\n What is your name?'
    );
    const { body: plain2 } = await agent
      .post('/chat')
      .send({ format: 'plain', message: 'Pruneface' })
      .expect(200);
    expect(plain2.message).toEqual('Hello, Pruneface! Nice to meet you.');
  });
});
