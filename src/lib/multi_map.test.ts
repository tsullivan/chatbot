import { MultiMap } from './';

describe('MultiMap', () => {
  it('should get by alias', () => {
    const myMulti = new MultiMap();
    myMulti.set('things', ['here', 'are', 'some', 'things', 'and', 'stuff']);
    myMulti.addAlias('stuff', 'things');
    expect(myMulti.get('stuff')).toEqual([
      'here',
      'are',
      'some',
      'things',
      'and',
      'stuff',
    ]);
  });

  it('should get by direct keyname', () => {
    const myMulti = new MultiMap();
    myMulti.set('things', ['here', 'are', 'some', 'things', 'and', 'stuff']);
    expect(myMulti.get('things')).toEqual([
      'here',
      'are',
      'some',
      'things',
      'and',
      'stuff',
    ]);
  });

  it('should remove by keyname', () => {
    const myMulti = new MultiMap();
    myMulti.set('things', ['here', 'are', 'some', 'things', 'and', 'stuff']);
    myMulti.addAlias('stuff', 'things');
    myMulti.delete('things');
    expect(myMulti.get('things')).toBeUndefined();
    expect(myMulti.get('stuff')).toBeUndefined();
  });

  it('should remove by alias', () => {
    const myMulti = new MultiMap();
    myMulti.set('things', ['here', 'are', 'some', 'things', 'and', 'stuff']);
    myMulti.addAlias('stuff', 'things');
    myMulti.delete('stuff');
    expect(myMulti.get('stuff')).toBeUndefined();
    expect(myMulti.get('things')).toBeUndefined();
  });
});
