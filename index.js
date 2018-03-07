/* eslint-disable no-console */
const { apm: apmConfig } = require('./config');
require('elastic-apm-node').start(apmConfig);

const express = require('express');
const bodyParser = require('body-parser');
const { initSession } = require('./server/session');
const { handleChat } = require('./server/handle_chat');
const { BOT_NAME } = require('./server/constants');

const app = express();
const jsonParser = bodyParser.json({ type: 'application/json' });

app.use(express.static(__dirname + '/public')); // home html page, static js

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

initSession(app).then(chat => {
  console.log(`${BOT_NAME} listening on port 3000!`);
  app.post('/chat', jsonParser, (req, res) => {
    const json = handleChat(req, chat);
    res.json(json);
  });
});

app.listen(3000, () => {
  console.log(`${BOT_NAME} listening on port 3000!`);
});
