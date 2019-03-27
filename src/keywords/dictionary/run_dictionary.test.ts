import { runDictionary } from './run_dictionary';

describe('run_dictionary', () => {
  it('should run up a nice dictionary', () => {
    const dictionary = runDictionary();
    expect(Object.keys(dictionary)).toEqual([
      'jokes',
      'facts',
      'pretend',
    ]);
    expect(dictionary.jokes.length).toBeGreaterThan(10);
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
