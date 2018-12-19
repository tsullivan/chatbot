export const env = 'reference';
export const sessionSecret = 'omgponies';
export const apm = {
  serviceName: 'chatbot-reference', // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  secretToken: '12345', // Use if APM Server requires a token
  serverUrl: 'http://localhost:8200', // Set custom APM Server URL (default: http://localhost:8200)
};
export const slack = {
  token: process.env.SLACK_BOT_TOKEN,
};
