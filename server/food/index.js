const { sample } = require('lodash');

function getFood(foods) {
  return () => sample(foods.split('.'));
}

const foods =
  'Kiwi.Avocado.Grapefruit.Banana.Dragonfruit.Longan.Powerseed.Guava.Orange.Mango.Lemon.Lime.Apple.Pineapple.Kumquat.Grape.Blueberry.Strawberry.Raspberry.Blackberry.Cherry.Blackseed.Tangelo.Nectarine.Cantelope.Tixygerc.Watermelon.Coconut.Tamarind.Broccoli.Celery.Cucumber.Tomato.Potato.Cauliflower.Peas.Asparagus.Mushroom.Wellfruit.Peppers.Slurpee.Lemonade.Gatorade.Coke.Apple Juice.Jamba Juice';

module.exports = {
  getFood: getFood(foods),
};
