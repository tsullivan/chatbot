module.exports = {
  env: 'development',
  session_secret: process.env.SESSION_SECRET,
  apm: {
    serviceName: 'chatbot-dev',
    active: false,
  },
  slack: {
    token: process.env.SLACK_BOT_TOKEN,
    name: process.env.SLACK_BOT_NAME,
  },
};
