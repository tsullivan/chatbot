/* eslint-disable no-console */
const { apm: apmConfig } = require('./config');
const apm = require('elastic-apm-node').start(apmConfig);

const express = require('express');
const { initSession } = require('./server/session');
const { BOT_NAME } = require('./server/constants');
const { initRoutes } = require('./server');

const app = express();

app.use(express.static(__dirname + '/public')); // home html page, static js
app.use(apm.middleware.connect());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const chatSession = initSession(app);
initRoutes(app, chatSession);

app.listen(3000, () => {
  console.log(`${BOT_NAME} listening on port 3000!`);
});

module.exports = { app };
