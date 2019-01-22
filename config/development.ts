export const env = 'development';
export const sessionSecret = process.env.SESSION_SECRET;
export const apm = {
  serviceName: 'chatbot-development',
  active: false,
};
export const slack = {
  token: process.env.SLACK_BOT_TOKEN,
};
