module.exports = {
  env: 'development',
  session_secret: 'YhqbEu2tVaT1v0bf7QHhT59Nv2JmpXFd',
  apm: {
    serviceName: 'chatbot-dev',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  },
};
