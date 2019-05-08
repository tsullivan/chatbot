import * as apm from 'elastic-apm-node';
import * as express from 'express';
import { Bot } from '../..//bot';
import { json as parseJson } from 'body-parser';

const jsonParser = parseJson({ type: 'application/json' });

export function chatRoute(app: express.Application, bot: Bot) {
  app.post('/chat', jsonParser, async (req, res) => {
    apm.startTransaction();
    const log = bot.getLogger(['web', 'routes']);

    try {
      const result = await bot.handleChat(req.body, req.session.chat);
      res.json(result);
    } catch (err) {
      log.error([], err);
      res.statusCode = err.status || 500;
      res.end(err.message);
      throw err;
    }

    apm.setUserContext({
      username: req.session.chat.getName(),
    });
    apm.setCustomContext({
      avg_score: req.session.chat.getAverageScore(), // eslint-disable-line @typescript-eslint/camelcase
      num_messages: req.session.chat.getUserHistory().length, // eslint-disable-line @typescript-eslint/camelcase
    });
    apm.endTransaction();
  });
}

// method to handle chat: Bot:handleChat
// pass in the session object and the chat message object
