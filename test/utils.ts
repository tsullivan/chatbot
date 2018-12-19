export const utilFactory = agent => {
  if (!agent) {
    throw new Error('agent param required');
  }

  return {
    handshake: async () => {
      await agent
        .post('/chat')
        .send({ format: 'syn', message: 'HELO' })
        .expect(200)
        .then(res => {
          expect(res.body.format).toEqual('plain');
          expect(res.body.name).toEqual('Beep Beep Beep');

          if (res.body.message === 'Hello! What is your name?') {
            return agent
              .post('/chat')
              .send({ format: 'user', message: 'Tim' })
              .expect(200)
              .then(ret => {
                expect(ret.body.message).toEqual('Hello, Tim! Nice to meet you.');
              });
          } else {
            expect(res.body.message).toEqual('Hello again, Tim!');
          }
        });
    },

    send: message => {
      return agent.post('/chat').send({ format: 'user', message });
    },

    checkResponses: resps => {
      resps.forEach(({ body }) => expect(body.message).toMatchSnapshot());
    },
  };
};
