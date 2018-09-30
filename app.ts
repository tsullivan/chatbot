import { runServer } from './server';
import { BOT_NAME } from './server/constants';

const PORT = 8080;
const app = runServer();

app.listen(PORT, () => {
  console.log(`${BOT_NAME} listening on [:${PORT}]`); // eslint-disable-line no-console
});

module.exports = app;
