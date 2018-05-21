const { apm: apmConfig } = require('../config');
const apm = require('elastic-apm-node').start(apmConfig);

const { join } = require('path');
const express = require('express');
const { initSession } = require('./session');
const { initRoutes } = require('./routes');

const app = express();
const pubs = join(__dirname, '..', 'public');

app.use(express.static(pubs)); // home html page, static js
app.use(apm.middleware.connect());

app.get('/', (req, res) => {
  res.sendFile(join(pubs, 'index.html'));
});

// init chat route
initRoutes(app, initSession(app));

module.exports = { app };
