const { get } = require('lodash');
const session = require('express-session');
const { session_secret: sessionSecret } = require('../../config');
const { ChatSession } = require('./chat_session');
const { getGames } = require('../games');

const games = getGames();

function initSession(app) {
  return new Promise(resolve => {
    app.use(
      session({
        secret: sessionSecret,
        cookie: { maxAge: 60000 },
        resave: true,
        saveUninitialized: true,
      })
    );

    app.use((req, res, next) => {
      const chat = new ChatSession(req.session); // new instance for every request
      if (!req.session.chat) {
        req.session.chat = chat.save();
      } else {
        req.session.chat = chat.getResumed(req.session);
        // resume game
        if (req.session.chat.game !== null) {
          const sessionGame = get(req, 'session.chat.game', null);
          if (sessionGame != null) {
            if (!sessionGame.name || !games[sessionGame.name]) {
              throw new Error('Bad game name in session! ' + sessionGame.name);
            }
            const game = new games[sessionGame.name].Game(req.session.chat);
            game.resume(sessionGame);
            req.session.chat.game = game;
          }
        }
      }

      resolve(req.session.chat);
      next();
    });
  });
}

module.exports = { initSession };
