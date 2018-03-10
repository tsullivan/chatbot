module.exports = {
  env: 'production',
  session_secret: 'omgponies',
  apm: {
    serviceName: 'chatbot', // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    secretToken: '12345', // Use if APM Server requires a token
    serverUrl: 'http://localhost:8200', // Set custom APM Server URL (default: http://localhost:8200)
    verifyServerCert: false
  }
};
