const session = require('express-session');
const { session_secret: sessionSecret } = require('../../config');
const { ChatSession } = require('./chat_session');
const { getGames } = require('../games');

const games = getGames();

function initSession(app) {
  app.use(session({
    secret: sessionSecret,
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  }));

  app.use((req, res, next) => {
    const sess = new ChatSession(req.session); // new instance for every request
    if (!req.session.chat) {
      req.session.chat = sess.getInitial();
    } else {
      req.session.chat = sess.getResumed(req.session);
      // resume game
      if (req.session.chat.game !== null) {
        const game = new games[req.session.chat.game.name].Game(req.session.chat);
        game.resume(req.session.chat.game);
        req.session.chat.game = game;
      }
    }
    next();
  });
}

module.exports = { initSession };
