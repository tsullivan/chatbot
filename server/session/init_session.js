const session = require('express-session');
const { ChatSession } = require('./chat_session');

function initSession(app) {
  app.use(session({
    secret: 'XyJYNFxy MRD7o2mS E1pTOJzG 84gcEmPb', // FIXME: dotfile or something
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
