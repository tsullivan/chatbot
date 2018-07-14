const utilFactory = agent => {
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
          expect(res.body.message).toEqual('Hello! What is your name?');
          expect(res.body.name).toEqual('Beep Beep Beep');
        });

      await agent
        .post('/chat')
        .send({ format: 'user', message: 'Tim' })
        .expect(200)
        .then(res => {
          expect(res.body.message).toEqual('Hello, Tim! Nice to meet you.');
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

module.exports = { utilFactory };
