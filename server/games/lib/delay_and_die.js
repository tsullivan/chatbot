const snl = require('strip-newlines');
const { KeywordResponse } = require('./class_keyword_response');

const delayAndDie = () => {
  return [
    ['STAND_AROUND', 'WAIT'],
    snl`Stand around and let the weight of feeling of excitement,
      exersion, and curiousity resolve itself in your mind before deciding on
      something clever to do`,
    () =>
      new KeywordResponse({
        text: `You get caught by the cops and they throw you back in jail FOREVER.`,
        changeScore: -50,
        isDone: true,
      }),
  ];
};

module.exports = { delayAndDie };
