module.exports = {
  env: 'docker',
  session_secret: process.env.SESSION_SECRET,
  apm: {
    serviceName: 'chatbot-docker',
    secretToken: process.env.ELASTIC_APM_TOKEN,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  },
  slack: {
    token: process.env.SLACK_BOT_TOKEN,
    name: process.env.SLACK_BOT_NAME,
  },
};
