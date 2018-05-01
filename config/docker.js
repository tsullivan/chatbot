module.exports = {
  env: 'docker',
  session_secret: 'wxhJK02esNBjcSFWnZPfuyUoJDJGZ3Ib',
  apm: {
    serviceName: 'chatbot',
    secretToken: '6C5VF4saR7m1LjCoslakZzNCPMFy7VoV',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL
  }
};
