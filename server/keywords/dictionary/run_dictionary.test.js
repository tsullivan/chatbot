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
    expect(dictionary.jokes.length).toBeGreaterThan(10);
    expect(dictionary.jokes.length).toBeLessThan(22);
    expect(dictionary.superherofacts.length).toBeGreaterThan(10);
    expect(dictionary.superherofacts.length).toBeLessThan(34);
    expect(dictionary.starwarsfacts.length).toBeGreaterThan(7);
    expect(dictionary.starwarsfacts.length).toBeLessThan(22);
  });

  it('should change in consecutive runs', () => {
    const dictionary_1 = runDictionary('jokes');
    const dictionary_2 = runDictionary('jokes');
    expect(dictionary_1[0]).not.toEqual(undefined);
    expect(dictionary_2[0]).not.toEqual(undefined);
    expect(dictionary_1[0]).not.toEqual(dictionary_2[0]);
  });
});
