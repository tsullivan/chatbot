import { runDictionary } from './run_dictionary';

describe('run_dictionary', () => {
  it('should run up a nice dictionary', () => {
    const dictionary = runDictionary();
    expect(Object.keys(dictionary)).toEqual([
      'jokes',
      'ninjafacts',
      'pokemonfacts',
      'starwarsfacts',
      'superherofacts',
      'worldfacts',
    ]);
    expect(dictionary.jokes.length).toBeGreaterThan(10);
    expect(dictionary.superherofacts.length).toBeGreaterThan(10);
    expect(dictionary.starwarsfacts.length).toBeGreaterThan(7);
    expect(dictionary.worldfacts.length).toBeGreaterThan(17);
  });

  it('should change in consecutive runs', () => {
    const dictionary = [
      runDictionary('jokes'),
      runDictionary('jokes'),
    ];
    expect(dictionary[0][0]).not.toEqual(undefined);
    expect(dictionary[1][0]).not.toEqual(undefined);
    expect(dictionary[0][0]).not.toEqual(dictionary[1][0]);
  });
});
