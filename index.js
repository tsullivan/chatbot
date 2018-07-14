const { runServer } = require('./server');
const { BOT_NAME } = require('./server/constants');

const PORT = 8080;
const app = runServer();

app.listen(PORT, () => {
  console.log(`${BOT_NAME} listening on [:${PORT}]`); // eslint-disable-line no-console
});

module.exports = app;
