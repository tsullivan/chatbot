const apm = require('elastic-apm-node');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: 'application/json' });
const { chatRouteHandler } = require('./chat');

function initRoutes(app, chatSession) {
  app.post('/chat', jsonParser, (req, res) => {
    apm.startTransaction();
    chatSession
      .then(chat => chatRouteHandler(req.body, chat))
      .then(response => {
        res.json(response);
        apm.endTransaction();
      });
  });
}

module.exports = { initRoutes };
