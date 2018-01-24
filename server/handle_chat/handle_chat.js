const moment = require('moment');
const { DATE_FORMAT, BOT_NAME } = require('../constants');

module.exports = function (req, res) {
  res.json({
    format: 'plain',
    message: `Interesting that you would say "${req.body.message}"`,
    name: BOT_NAME,
    time: moment(req.body.time).format(DATE_FORMAT),
  });
};
