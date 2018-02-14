const session = require('express-session');
const { session_secret: sessionSecret } = require('../../config');
const { ChatSession } = require('./chat_session');

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
    }
    next();
  });
}

module.exports = { initSession };
