module.exports = {
  env: 'test',
  session_secret: process.env.SESSION_SECRET,
  apm: {
    serviceName: 'chatbot-test',
    active: false,
  },
};
