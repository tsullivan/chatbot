import * as express from 'express';
import * as session from 'express-session';
import { sessionSecret } from '../../../config';
import { Bot } from '../../bot';
import { ChatSession  } from './chat_session';

export function initSession(bot: Bot, app: express.Application) {
  app.use(
    session({
      cookie: { maxAge: 86000 * 1000 },
      resave: true,
      saveUninitialized: true,
      secret: sessionSecret,
    }),
  );

  app.use((req: express.Request, res: express.Response, next) => {
    const chat = new ChatSession(bot, req.session); // new instance for every request
    // tslint:disable-next-line prefer-conditional-expression
    if (!req.session.chat) {
      req.session.chat = chat.save();
    } else {
      req.session.chat = chat.getResumed(req.session);
    }
    next();
  });
}