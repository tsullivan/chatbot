const { sample } = require('lodash');

function getNormal(logs) {
  return () => {
    return sample(logs);
  };
}

const normalLogs = [
  ':rolleyes:',
  'Definitely!',
  'DUDE',
  'HA! Good one.',
  'I like it',
  'Is that your favorite?',
  'Thanks',
  'You sure know a lot about Star Wars',
  'aww, cute!',
  'cute',
  'eww',
  'good one',
  'good to know',
  'hahahahahahahaha',
  'heh.',
  'hungry?',
  'if you say I did, then I guess I did',
  'if you say so',
  'likewise',
  'LOL',
  'love it',
  'nasty!',
  'nice',
  'nope',
  'nopers',
  'oh man...',
  'okay',
  'sorry',
  'sure, if you really think so',
  'totally!',
  'uh uh',
  'ummm, yeah?',
  'what else can we talk about?',
  'yeah, those are good',
  'you sound confused',
  'you sound repetitive',
  'you\'re scaring me',
  'yuck!',
  'yummy!'
];

module.exports = { getNormal: getNormal(normalLogs) };
