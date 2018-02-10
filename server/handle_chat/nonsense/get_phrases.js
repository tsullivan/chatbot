const { capitalize } = require('lodash');

function getPhrases(proper) {
  const lower = proper.toLowerCase();
  return [
    `${proper} for President! 🦅`,
    `${capitalize(lower)} with a cherry on top. 😋`,
    `${capitalize(lower)}. Pass it on. 😏`,
    `A ${proper}‽ Really‽ A ${proper}‽ 😲`,
    `Are you out there, ${proper}? 😶`,
    `Are you there, God? It's me, ${proper}. 🙏🏼`,
    `Everything I know I learned from a ${proper}. 👨🏼‍🎓`,
    `Free ${lower} with every happy meal! ᴹ`,
    `I could really go for a nice cold ${lower} right about now. 🍻`,
    `I once saw a giant ${lower}. 😨`,
    `I punched it in the ${lower}! 🥋`,
    `It ain't over until the ${lower} sings. 👨🏻‍🎤`,
    `Take my ${lower}! Just don't hurt me :(`,
    `Never look a ${lower} in the eye. 🦍`,
    `On Wednesdays I go bowling with a ${lower}. 🎳`,
    `Once upon a time there was a beautiful princess named ${proper}a. 👸🏼`,
    `Pancakes and ${lower}. 🥞 Mm-mm good.`,
    `Say it with me: ${lower}. 👩🏽‍🏫👨🏼‍🏫`,
    `Oh my god. Look at her ${lower}. 🍑`,
    `Tacos and ${lower}. 🌮`,
    `Thats nice but what about that ${lower}? 🤔`,
    `The only thing that really matters is ${lower}s. 🙉`,
    `There's a ${lower} right behind you! 🙀`,
    `Today's secret word is "${proper}".   🎈🎈🎈 🎈`,
  ];
}

module.exports = {
  getPhrases
};
