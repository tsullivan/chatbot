function getPhrases({ adjective: upperA, noun: upperN }) {
  const proper = `${upperA} ${upperN}`;
  const lower = proper.toLowerCase();
  const lowerA = upperA.toLowerCase();
  const lowerN = upperN.toLowerCase();

  return [
    `A ${lowerN}‽ Really‽ A ${lower}‽`,
    `Are you out there, ${lower}s?`,
    `Are you there? It's me, ${proper}.`,
    `Did you say "${proper}"?`,
    `Does your mother know you're talking about ${lower}s?`,
    `Everything I know I learned from a ${lowerN}.`,
    `Free ${lowerN} with every happy meal!`,
    `I could really go for a nice cold ${lowerN} right about now.`,
    `I once saw a ${lowerN} looking very ${lowerA}.`,
    `I'm feeling ${lowerA}. How about you?`,
    `If you say "${lowerN}", I'm going to get ${lowerA}`,
    `It ain't over until the ${lowerN} sings.`,
    `Just don't say "${proper}".`,
    `Let's talk more about ${lowerN}s. ${upperN}s that are ${lowerA}`,
    `Oh. My. God. Look at her ${lowerN}.`,
    `On Wednesdays I go bowling with a ${lowerN}.`,
    `Once upon a time there was a beautiful princess named ${proper}-a.`,
    `Pancakes and ${lowerN}s. Mm-mm good.`,
    `Say it with me: ${proper}.`,
    `Tacos and ${lowerN}s.`,
    `Take this ${lowerN}. It will help you along the way.`,
    `That's what a ${lower} would say.`,
    `Thats nice but what about ${lowerN}s?`,
    `The only good ${lowerN} is a ${lowerA} ${lowerN}.`,
    `The only thing that really matters is ${lowerN}s. Really ${lowerA} ${lowerN}s`,
    `There's a ${lower} right behind you!`,
    `Today's secret word is "${proper}".`,
    `Want a ${lowerN}? How about a ${lowerA} ${lowerN}?`,
    `${upperN}s! Get your ${lowerN}s here! Nice ${lower}s, come and get 'em!`,
    `Would you still love me if I was ${lowerA}-ish?`,
    `Would you still love me if I was a ${lowerN}?`
  ];
}

module.exports = {
  getPhrases
};
