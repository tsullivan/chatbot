const { apm: apmConfig } = require('../config');
const apm = require('elastic-apm-node').start(apmConfig);

const express = require('express');
const { initSession } = require('./session');
const { initRoutes } = require('./routes');

const app = express();

app.use(express.static(__dirname + '/public')); // home html page, static js
app.use(apm.middleware.connect());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// init chat route
initRoutes(app, initSession(app));

module.exports = { app };
