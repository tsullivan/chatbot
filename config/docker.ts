export const env = 'docker';
export const sessionSecret = process.env.SESSION_SECRET;
export const apm = {
  active: true,
  serviceName: 'chatbot-docker',
  secretToken: process.env.APM_TOKEN,
  serverUrl: process.env.APM_URL,
};
export const slack = {
  token: process.env.SLACK_BOT_TOKEN,
};
