const { capitalize } = require('lodash');

function getPhrases({ adjective: upperA, noun: upperN }) {
  const proper = `${upperA} ${upperN}`;
  const lower = proper.toLowerCase();
  const lowerA = upperA.toLowerCase();
  const lowerN = upperN.toLowerCase();

  return [
    `${capitalize(lower)}. Pass it on.`,
    `${capitalize(lowerN)} with a cherry on top.`,
    `${proper} for President!`,
    `A ${proper} Really A ${proper}`,
    `Aint no ${lowerN} like a ${lowerA} ${lowerN} because a ${lowerA} ${lowerN} don't stop!`,
    `Are you out there, ${proper}?`,
    `Are you there, God? It's me, ${proper}.`,
    `Did you say "${proper}"?`,
    `Everything I know I learned from a ${lowerN}.`,
    `Free ${lowerN} with every happy meal!`,
    `I could really go for a nice cold ${lowerN} right about now.`,
    `I once saw a giant ${lowerN}.`,
    `I punched it in the ${lowerN}!`,
    `I'm feeling ${lowerA}. How about you?`,
    `I'm not ${lowerA}!`,
    `If you say "${lowerN}", I'm going to turn ${lowerA}`,
    `It ain't over until the ${lowerN} sings.`,
    `Let's talk more about ${lowerN}s. ${upperN}s that are ${lowerA}`,
    `Never look a ${lowerN} in the eye.`,
    `Oh my god. Look at her ${lowerN}.`,
    `On Wednesdays I go bowling with a ${lowerN}.`,
    `Once upon a time there was a beautiful princess named ${proper}a.`,
    `Pancakes and ${lowerN}s. Mm-mm good.`,
    `Say it with me: ${proper}.`,
    `Tacos and ${lowerN}s.`,
    `Take my ${lowerN}! Just don't hurt me :(`,
    `Thats nice but what about ${lowerN}s?`,
    `The only good ${lowerN} is a ${lowerA} ${lowerN}`,
    `The only thing that really matters is ${lowerN}s.`,
    `There's a ${lower} right behind you!`,
    `Today's secret word is "${proper}".`,
    `Would you still love me if I was ${lowerA}?`,
    `Would you still love me if I was a ${lowerN}?`
  ];
}

module.exports = {
  getPhrases
};
