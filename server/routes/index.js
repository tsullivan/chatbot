const apm = require('elastic-apm-node');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: 'application/json' });
const { chatRouteHandler } = require('./chat');

function initRoutes(app, chat) {
  app.post('/chat', jsonParser, async (req, res) => {
    apm.startTransaction();
    const response = chatRouteHandler(req.body, await chat);
    res.json(response);
    apm.endTransaction();
  });
}

module.exports = { initRoutes };
