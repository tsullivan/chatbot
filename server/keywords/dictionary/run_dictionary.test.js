/* eslint-disable no-console */
const { runDictionary } = require('./run_dictionary');
describe('run_dictionary', () => {
  it('should run up a nice dictionary', () => {
    const dictionary = runDictionary();
    expect(Object.keys(dictionary)).toEqual([
      'jokes',
      'superherofacts',
      'starwarsfacts',
      'pokemonfacts',
      'ninjafacts',
      'worldfacts',
    ]);
  });
});
