const express = require('express');
const bodyParser = require('body-parser');
const { handleChat } = require('./server/handle_chat');
const { BOT_NAME } = require('./server/constants');

const app = express();
const jsonParser = bodyParser.json({ type: 'application/json' });

app.use(express.static(__dirname + '/public')); // home html page, static js

/*
 * routes
 */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.post('/chat', jsonParser, (req, res) => {
  return handleChat(req, res);
});

app.listen(3000, () => {
  console.log(`${BOT_NAME} listening on port 3000!`); // eslint-disable-line no-console
});
