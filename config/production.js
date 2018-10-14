module.exports = {
  env: 'production',
  session_secret: process.env.SESSION_SECRET,
  apm: {
    serviceName: 'chatbot',
    secretToken: process.env.APM_TOKEN,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  },
};
