const { app } = require('./server');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`chatbot server listening on :${PORT}!`); // eslint-disable-line no-console
});

module.exports = app;
